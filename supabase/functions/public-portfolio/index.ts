
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
const json=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{"Content-Type":"application/json","Cache-Control":"public, max-age=60, s-maxage=300"}});
Deno.serve(async(req:Request)=>{
 const url=Deno.env.get("SUPABASE_URL")??"";
 const service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")??"";
 const admin=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const payload=req.method==="POST"?await req.json().catch(()=>({})):{};
 const action=String(payload?.action??"feed");
 const body=payload?.body??{};
 if(action==="feed"){
   const {data:galleries}=await admin.from("galleries").select("id,slug,title,description,category,event_date,location,cover_asset_id,is_featured,published_at").eq("status","published").order("is_featured",{ascending:false}).order("published_at",{ascending:false});
   const covers=(galleries??[]).map((g:any)=>g.cover_asset_id).filter(Boolean);
   const assetResult=covers.length?await admin.from("gallery_assets").select("id,public_storage_path,alt_text").in("id",covers):{data:[] as any[]};
   const assetById=new Map((assetResult.data??[]).map((a:any)=>[a.id,a]));
   const result=[];
   for(const gallery of galleries??[]){
     const cover:any=gallery.cover_asset_id?assetById.get(gallery.cover_asset_id):null;
     let coverUrl=null;
     if(cover?.public_storage_path){
       const {data:publicData}=admin.storage
         .from("portfolio-public")
         .getPublicUrl(cover.public_storage_path);
       coverUrl=publicData.publicUrl;
     }
     result.push({...gallery,cover_url:coverUrl,cover_alt:cover?.alt_text??""});
   }
   return json({galleries:result});
 }
 if(action==="gallery"){
   const slug=String(body.slug??"");
   const {data:gallery}=await admin.from("galleries").select("id,slug,title,description,category,event_date,location,cover_asset_id,published_at").eq("slug",slug).eq("status","published").maybeSingle();
   if(!gallery) return json({error:"Gallery not found"},404);
   const {data:assets}=await admin.from("gallery_assets").select("id,public_storage_path,filename,alt_text,caption,width,height,sort_order").eq("gallery_id",gallery.id).not("public_storage_path","is",null).order("sort_order");
   return json({
     gallery,
     assets:(assets??[]).map((a:any)=>{
       const publicData=a.public_storage_path
         ? admin.storage.from("portfolio-public").getPublicUrl(a.public_storage_path).data
         : null;
       return {
         ...a,
         url: publicData?.publicUrl ?? null,
       };
     }),
   });
 }
 return json({error:"Unknown action"},400);
});
