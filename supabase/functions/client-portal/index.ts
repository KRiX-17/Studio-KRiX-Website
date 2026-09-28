
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
const json=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{"Content-Type":"application/json"}});
Deno.serve(async(req:Request)=>{
 if(req.method!=="POST") return json({error:"Method not allowed"},405);
 const authHeader=req.headers.get("Authorization");
 if(!authHeader) return json({error:"Unauthorized"},401);
 const url=Deno.env.get("SUPABASE_URL")??"";
 const anon=Deno.env.get("SUPABASE_ANON_KEY")??"";
 const service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")??"";
 const userClient=createClient(url,anon,{global:{headers:{Authorization:authHeader}},auth:{persistSession:false,autoRefreshToken:false}});
 const admin=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:userData,error:userError}=await userClient.auth.getUser();
 const user=userData.user;
 if(userError||!user) return json({error:"Unauthorized"},401);
 const {data:profile}=await admin.from("profiles").select("id,role,is_active").eq("id",user.id).maybeSingle();
 if(!profile?.is_active) return json({error:"Forbidden"},403);
 const payload=await req.json().catch(()=>null) as Record<string,any>|null;
 const action=String(payload?.action??"");
 const body=payload?.body??{};
 async function accessFor(galleryId:string){
   if(profile.role==="super_admin") return {allowed:true,canDownload:true};
   const {data:gallery}=await admin.from("galleries").select("id,status").eq("id",galleryId).maybeSingle();
   if(!gallery) return {allowed:false,canDownload:false};
   if(gallery.status==="published") return {allowed:true,canDownload:true};
   const {data:access}=await admin.from("gallery_access").select("can_download,expires_at").eq("gallery_id",galleryId).eq("user_id",user.id).maybeSingle();
   const valid=Boolean(access&&(!access.expires_at||new Date(access.expires_at).getTime()>Date.now()));
   return {allowed:valid,canDownload:valid&&Boolean(access?.can_download)};
 }
 if(action==="gallery"){
   const slug=String(body.slug??"");
   const {data:gallery}=await admin.from("galleries").select("id,slug,title,description,category,event_date,location,status,cover_asset_id").eq("slug",slug).maybeSingle();
   if(!gallery) return json({error:"Gallery not found"},404);
   const access=await accessFor(gallery.id);
   if(!access.allowed) return json({error:"Forbidden"},403);
   const {data:assets}=await admin.from("gallery_assets").select("id,gallery_id,storage_path,web_storage_path,filename,alt_text,caption,width,height,sort_order,is_downloadable").eq("gallery_id",gallery.id).order("sort_order");
   const paths=(assets??[]).map((a:any)=>a.web_storage_path||a.storage_path);
   const signedResult=paths.length?await admin.storage.from("client-galleries").createSignedUrls(paths,900):{data:[] as any[]};
   const urlByPath=new Map((signedResult.data??[]).map((s:any)=>[s.path,s.signedUrl]));
   const {data:selections}=await admin.from("gallery_selections").select("asset_id,selected").eq("gallery_id",gallery.id).eq("user_id",user.id);
   const {data:comments}=await admin.from("gallery_comments").select("id,asset_id,user_id,body,is_resolved,created_at").eq("gallery_id",gallery.id).order("created_at");
   return json({gallery,canDownload:access.canDownload,assets:(assets??[]).map((a:any)=>({...a,preview_url:urlByPath.get(a.web_storage_path||a.storage_path)??null})),selections:selections??[],comments:comments??[]});
 }
 if(action==="download_asset"){
   const assetId=String(body.assetId??"");
   const {data:asset}=await admin.from("gallery_assets").select("id,gallery_id,storage_path,filename,is_downloadable").eq("id",assetId).maybeSingle();
   if(!asset) return json({error:"Asset not found"},404);
   const access=await accessFor(asset.gallery_id);
   if(!access.allowed||!access.canDownload||!asset.is_downloadable) return json({error:"Forbidden"},403);
   const {data:signed,error}=await admin.storage.from("client-galleries").createSignedUrl(asset.storage_path,300,{download:asset.filename});
   if(error||!signed?.signedUrl) return json({error:"Download unavailable"},500);
   await Promise.all([
     admin.from("download_events").insert({user_id:user.id,gallery_id:asset.gallery_id,asset_id:asset.id,download_kind:"asset"}),
     admin.from("audit_events").insert({actor_user_id:user.id,event_type:"asset.downloaded",entity_type:"gallery_asset",entity_id:asset.id,details:{gallery_id:asset.gallery_id},user_agent:req.headers.get("user-agent")})
   ]);
   return json({url:signed.signedUrl,expiresIn:300});
 }
 if(action==="download_all"){
   const galleryId=String(body.galleryId??"");
   const access=await accessFor(galleryId);
   if(!access.allowed||!access.canDownload) return json({error:"Forbidden"},403);
   const {data:assets}=await admin.from("gallery_assets").select("id,storage_path,filename,is_downloadable").eq("gallery_id",galleryId).eq("is_downloadable",true).order("sort_order");
   const files:Array<{id:string;filename:string;url:string}>=[];
   for(const asset of assets??[]){
     const {data:signed}=await admin.storage.from("client-galleries").createSignedUrl(asset.storage_path,600,{download:asset.filename});
     if(signed?.signedUrl) files.push({id:asset.id,filename:asset.filename,url:signed.signedUrl});
   }
   await Promise.all([
     admin.from("download_events").insert({user_id:user.id,gallery_id:galleryId,asset_id:null,download_kind:"gallery_all"}),
     admin.from("audit_events").insert({actor_user_id:user.id,event_type:"gallery.download_all",entity_type:"gallery",entity_id:galleryId,details:{files:files.length},user_agent:req.headers.get("user-agent")})
   ]);
   return json({files,expiresIn:600});
 }
 if(action==="toggle_selection"){
   const galleryId=String(body.galleryId??"");
   const assetId=String(body.assetId??"");
   const selected=body.selected!==false;
   const access=await accessFor(galleryId);
   if(!access.allowed) return json({error:"Forbidden"},403);
   if(selected){
     await admin.from("gallery_selections").upsert({gallery_id:galleryId,asset_id:assetId,user_id:user.id,selected:true,updated_at:new Date().toISOString()});
   } else {
     await admin.from("gallery_selections").delete().eq("asset_id",assetId).eq("user_id",user.id);
   }
   return json({ok:true});
 }
 if(action==="comment"){
   const galleryId=String(body.galleryId??"");
   const assetId=body.assetId?String(body.assetId):null;
   const text=String(body.comment??"").trim();
   if(!text||text.length>2000) return json({error:"Invalid comment"},400);
   const access=await accessFor(galleryId);
   if(!access.allowed) return json({error:"Forbidden"},403);
   const {data:comment,error}=await admin.from("gallery_comments").insert({gallery_id:galleryId,asset_id:assetId,user_id:user.id,body:text}).select("id,asset_id,user_id,body,is_resolved,created_at").single();
   if(error||!comment) return json({error:error?.message??"Comment failed"},400);
   await admin.from("audit_events").insert({actor_user_id:user.id,event_type:"gallery.comment_added",entity_type:"gallery",entity_id:galleryId,details:{asset_id:assetId},user_agent:req.headers.get("user-agent")});
   return json({comment});
 }
 return json({error:"Unknown action"},400);
});
