const ADMIN_VERSION='1.3.0';
const backend=window.NexoraBackend;
const client=backend?.client;
const $=id=>document.getElementById(id);
let lang=localStorage.getItem('nexora_lang')||'km';
let identity=null,profiles=[],wallets=[],orders=[],tickets=[];
const msg=(km,en)=>lang==='km'?km:en;
const money=v=>`$${Number(v||0).toFixed(2)}`;
const shortId=v=>String(v||'').slice(0,8);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function initials(v){return(v||'NX').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'NX'}
function setLanguage(next){lang=next;document.documentElement.lang=lang;localStorage.setItem('nexora_lang',lang);document.querySelectorAll('[data-km][data-en]').forEach(el=>el.textContent=el.dataset[lang]);document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));renderAll()}
async function checkAccess(){
  if(!client){showDenied(msg('Supabase មិនទាន់ត្រូវបានភ្ជាប់។','Supabase is not configured.'));return false}
  identity=await backend.getIdentity();
  if(!identity){location.replace('login.html');return false}
  const {data,error}=await client.rpc('is_admin');
  if(error||!data){showDenied(msg('គណនីនេះមិនទាន់មានសិទ្ធិ Admin ទេ។ បន្ទាប់ពី Register រួច ត្រូវបន្ថែម User ID នេះទៅ admin_users ដោយសុវត្ថិភាព។','This account does not have admin access yet. After registration, this user must be securely added to admin_users.'));return false}
  $('adminAvatar').textContent=initials(identity.displayName);$('adminName').textContent=identity.displayName||'Admin';$('adminEmail').textContent=identity.email||'';$('gate').hidden=true;$('adminApp').hidden=false;return true
}
function showDenied(text){$('gate').innerHTML=`<div class="admin-avatar" style="margin:auto">!</div><h2>${esc(msg('មិនអាចចូល Admin Console','Admin access unavailable'))}</h2><p>${esc(text)}</p><a class="ghost-btn" href="index.html">${esc(msg('← ត្រឡប់ទៅ Dashboard','← Back to dashboard'))}</a>`}
async function loadAdminData(){
  const [p,w,o,t]=await Promise.all([
    client.from('profiles').select('id,display_name,created_at,updated_at').order('created_at',{ascending:false}),
    client.from('wallets').select('user_id,balance,updated_at'),
    client.from('orders').select('id,user_id,service_id,link,quantity,status,created_at').order('created_at',{ascending:false}),
    client.from('tickets').select('id,user_id,subject,message,status,created_at').order('created_at',{ascending:false})
  ]);
  for(const r of [p,w,o,t])if(r.error)throw r.error;
  profiles=p.data||[];wallets=w.data||[];orders=o.data||[];tickets=t.data||[];renderAll();
}
function userName(id){return profiles.find(p=>p.id===id)?.display_name||`User ${shortId(id)}`}
function renderStats(){$('statUsers').textContent=profiles.length;$('statOrders').textContent=orders.length;$('statTickets').textContent=tickets.length;$('statWallet').textContent=money(wallets.reduce((a,w)=>a+Number(w.balance||0),0))}
function renderOverview(){
  const ro=$('recentOrders'),rt=$('recentTickets');
  ro.innerHTML=orders.slice(0,6).map(o=>`<div class="activity-row"><div><strong>#${o.id} · ${esc(o.service_id)}</strong><span>${esc(userName(o.user_id))} · Qty ${o.quantity}</span></div><span>${esc(o.status)}</span></div>`).join('')||`<div class="empty">${msg('មិនទាន់មាន Order','No orders yet')}</div>`;
  rt.innerHTML=tickets.slice(0,6).map(t=>`<div class="activity-row"><div><strong>#${t.id} · ${esc(t.subject)}</strong><span>${esc(userName(t.user_id))}</span></div><span>${esc(t.status)}</span></div>`).join('')||`<div class="empty">${msg('មិនទាន់មាន Ticket','No tickets yet')}</div>`;
}
function renderUsers(){
  const q=($('userSearch')?.value||'').toLowerCase().trim();
  const rows=profiles.filter(p=>!q||p.display_name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q));
  $('usersTable').innerHTML=rows.map(p=>{const w=wallets.find(x=>x.user_id===p.id);return`<tr><td><strong>${esc(p.display_name)}</strong><br><span class="muted">${shortId(p.id)}…</span></td><td>${new Date(p.created_at).toLocaleDateString()}</td><td>${money(w?.balance)}</td></tr>`}).join('')||`<tr><td colspan="3" class="empty">${msg('រកមិនឃើញអ្នកប្រើ','No users found')}</td></tr>`;
}
function renderOrders(){
  const f=$('orderFilter')?.value||'all',rows=orders.filter(o=>f==='all'||o.status===f);
  $('ordersTable').innerHTML=rows.map(o=>`<tr><td><strong>#${o.id} · ${esc(o.service_id)}</strong><br><span class="muted">${esc(o.link||'')}</span></td><td>${esc(userName(o.user_id))}</td><td>${o.quantity}</td><td><select class="status-select" data-order-id="${o.id}">${['pending','reviewing','processing','completed','cancelled'].map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></td><td>${new Date(o.created_at).toLocaleDateString()}</td></tr>`).join('')||`<tr><td colspan="5" class="empty">${msg('មិនមាន Order','No orders')}</td></tr>`;
  document.querySelectorAll('[data-order-id]').forEach(sel=>sel.addEventListener('change',()=>updateOrder(sel.dataset.orderId,sel.value)));
}
function renderTickets(){
  $('ticketsTable').innerHTML=tickets.map(t=>`<tr><td><strong>#${t.id} · ${esc(t.subject)}</strong><br><span class="muted">${esc(t.message).slice(0,120)}</span></td><td>${esc(userName(t.user_id))}</td><td><select class="status-select" data-ticket-id="${t.id}">${['open','answered','closed'].map(s=>`<option value="${s}" ${s===t.status?'selected':''}>${s}</option>`).join('')}</select></td><td>${new Date(t.created_at).toLocaleDateString()}</td></tr>`).join('')||`<tr><td colspan="4" class="empty">${msg('មិនមាន Ticket','No tickets')}</td></tr>`;
  document.querySelectorAll('[data-ticket-id]').forEach(sel=>sel.addEventListener('change',()=>updateTicket(sel.dataset.ticketId,sel.value)));
}
function renderAll(){if(!$('adminApp')||$('adminApp').hidden)return;renderStats();renderOverview();renderUsers();renderOrders();renderTickets()}
async function updateOrder(id,status){const {error}=await client.from('orders').update({status}).eq('id',id);if(error){alert(error.message);await loadAdminData();return}const row=orders.find(o=>String(o.id)===String(id));if(row)row.status=status;renderAll()}
async function updateTicket(id,status){const {error}=await client.from('tickets').update({status}).eq('id',id);if(error){alert(error.message);await loadAdminData();return}const row=tickets.find(t=>String(t.id)===String(id));if(row)row.status=status;renderAll()}
document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
document.querySelectorAll('.admin-nav').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.admin-nav').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.admin-section').forEach(x=>x.classList.toggle('active',x.id===`section-${b.dataset.section}`))}));
$('userSearch')?.addEventListener('input',renderUsers);$('orderFilter')?.addEventListener('change',renderOrders);$('refreshAdmin')?.addEventListener('click',()=>loadAdminData().catch(e=>alert(e.message)));
$('adminLogout')?.addEventListener('click',async()=>{try{await backend.signOut()}finally{location.href='login.html'}});
(async()=>{setLanguage(lang);if(await checkAccess())try{await loadAdminData()}catch(e){showDenied(e.message||msg('មិនអាចទាញទិន្នន័យ Admin បាន។','Could not load admin data.'))}})();
