
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
const json=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{"Content-Type":"application/json"}});
async function sha256Hex(value:string){const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value));return Array.from(new Uint8Array(d)).map(b=>b.toString(16).padStart(2,"0")).join("");}
Deno.serve(async(req:Request)=>{
 if(req.method!=="POST") return json({error:"Method not allowed"},405);
 const p=await req.json().catch(()=>null) as Record<string,any>|null;
 const token=String(p?.token??""); const password=String(p?.password??"");
 if(token.length<20||password.length<12) return json({error:"Invalid invite or password"},400);
 const url=Deno.env.get("SUPABASE_URL")??""; const service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")??"";
 const admin=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const tokenHash=await sha256Hex(token);
 const {data:invite}=await admin.from("client_invites").select("id,user_id,email,expires_at,claimed_at,revoked_at").eq("token_hash",tokenHash).maybeSingle();
 if(!invite||invite.claimed_at||invite.revoked_at||new Date(invite.expires_at).getTime()<=Date.now()) return json({error:"Invite is invalid or expired"},410);
 const {error:updateError}=await admin.auth.admin.updateUserById(invite.user_id,{password,email_confirm:true});
 if(updateError) return json({error:updateError.message},400);
 await admin.from("client_invites").update({claimed_at:new Date().toISOString()}).eq("id",invite.id);
 await admin.from("audit_events").insert({actor_user_id:invite.user_id,event_type:"client.invite_claimed",entity_type:"user",entity_id:invite.user_id,details:{},user_agent:req.headers.get("user-agent")});
 return json({ok:true,email:invite.email});
});
