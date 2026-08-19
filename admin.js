const ADMIN_VERSION='1.4.0';
const backend=window.NexoraBackend;
const client=backend?.client;
const $=id=>document.getElementById(id);
let lang=localStorage.getItem('nexora_lang')||'km';
let identity=null,currentRole=null,profiles=[],wallets=[],orders=[],tickets=[],services=[];
let editingServiceId=null;
const msg=(km,en)=>lang==='km'?km:en;
const money=v=>`$${Number(v||0).toFixed(2)}`;
const shortId=v=>String(v||'').slice(0,8);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const initials=v=>(v||'NX').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'NX';
const canManageServices=()=>['owner','admin'].includes(currentRole);
function setLanguage(next){lang=next;document.documentElement.lang=lang;localStorage.setItem('nexora_lang',lang);document.querySelectorAll('[data-km][data-en]').forEach(el=>el.textContent=el.dataset[lang]);document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));renderAll();updateServicePermission()}
async function checkAccess(){
  if(!client){showDenied(msg('Supabase មិនទាន់ត្រូវបានភ្ជាប់។','Supabase is not configured.'));return false}
  identity=await backend.getIdentity();
  if(!identity){location.replace('login.html');return false}
  const access=await backend.getAdminAccess();
  if(!access){showDenied(msg('គណនីនេះមិនមានសិទ្ធិ Admin ទេ។','This account does not have admin access.'));return false}
  currentRole=access.role;
  $('adminAvatar').textContent=initials(identity.displayName);$('adminName').textContent=identity.displayName||'Admin';$('adminEmail').textContent=identity.email||'';$('adminRole').textContent=currentRole;
  $('gate').hidden=true;$('adminApp').hidden=false;updateServicePermission();return true
}
function showDenied(text){$('gate').innerHTML=`<div class="admin-avatar" style="margin:auto">!</div><h2>${esc(msg('មិនអាចចូល Admin Console','Admin access unavailable'))}</h2><p>${esc(text)}</p><a class="ghost-btn" href="index.html">${esc(msg('← ត្រឡប់ទៅ Dashboard','← Back to dashboard'))}</a>`}
async function loadAdminData(){
  const [p,w,o,t,s]=await Promise.all([
    client.from('profiles').select('id,display_name,created_at,updated_at').order('created_at',{ascending:false}),
    client.from('wallets').select('user_id,balance,updated_at'),
    client.from('orders').select('id,user_id,service_id,link,quantity,status,created_at').order('created_at',{ascending:false}),
    client.from('tickets').select('id,user_id,subject,message,status,created_at').order('created_at',{ascending:false}),
    client.from('services').select('id,category,platform,price,min_quantity,max_quantity,name_km,name_en,time_km,time_en,start_km,start_en,speed_km,speed_en,details_km,details_en,is_active,sort_order,created_at,updated_at').order('sort_order',{ascending:true}).order('name_en',{ascending:true})
  ]);
  for(const r of [p,w,o,t,s])if(r.error)throw r.error;
  profiles=p.data||[];wallets=w.data||[];orders=o.data||[];tickets=t.data||[];services=s.data||[];renderAll();
}
function userName(id){return profiles.find(p=>p.id===id)?.display_name||`User ${shortId(id)}`}
function userCounts(id){return{orders:orders.filter(o=>o.user_id===id).length,tickets:tickets.filter(t=>t.user_id===id).length,balance:Number(wallets.find(w=>w.user_id===id)?.balance||0)}}
function renderStats(){$('statUsers').textContent=profiles.length;$('statServices').textContent=services.filter(s=>s.is_active).length;$('statOrders').textContent=orders.length;$('statTickets').textContent=tickets.length;$('statWallet').textContent=money(wallets.reduce((a,w)=>a+Number(w.balance||0),0))}
function renderOverview(){
  const ro=$('recentOrders'),rt=$('recentTickets');
  ro.innerHTML=orders.slice(0,6).map(o=>`<div class="activity-row"><div><strong>#${esc(o.id)} · ${esc(o.service_id)}</strong><span>${esc(userName(o.user_id))} · Qty ${Number(o.quantity||0)}</span></div><span>${esc(o.status)}</span></div>`).join('')||`<div class="empty">${msg('មិនទាន់មាន Order','No orders yet')}</div>`;
  rt.innerHTML=tickets.slice(0,6).map(t=>`<div class="activity-row"><div><strong>#${esc(t.id)} · ${esc(t.subject)}</strong><span>${esc(userName(t.user_id))}</span></div><span>${esc(t.status)}</span></div>`).join('')||`<div class="empty">${msg('មិនទាន់មាន Ticket','No tickets yet')}</div>`;
}
function renderUsers(){
  const q=($('userSearch')?.value||'').toLowerCase().trim(),filter=$('userFilter')?.value||'all';
  const rows=profiles.filter(p=>{const c=userCounts(p.id),matches=!q||p.display_name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q);if(!matches)return false;if(filter==='orders')return c.orders>0;if(filter==='tickets')return c.tickets>0;if(filter==='balance')return c.balance>0;return true});
  $('usersTable').innerHTML=rows.map(p=>{const c=userCounts(p.id);return`<tr><td><strong>${esc(p.display_name)}</strong><br><span class="muted">${shortId(p.id)}…</span></td><td>${new Date(p.created_at).toLocaleDateString()}</td><td>${c.orders}</td><td>${c.tickets}</td><td>${money(c.balance)}</td></tr>`}).join('')||`<tr><td colspan="5" class="empty">${msg('រកមិនឃើញអ្នកប្រើ','No users found')}</td></tr>`;
}
function renderOrders(){
  const f=$('orderFilter')?.value||'all',rows=orders.filter(o=>f==='all'||o.status===f);
  $('ordersTable').innerHTML=rows.map(o=>`<tr><td><strong>#${esc(o.id)} · ${esc(o.service_id)}</strong><br><span class="muted">${esc(o.link||'')}</span></td><td>${esc(userName(o.user_id))}</td><td>${Number(o.quantity||0)}</td><td><select class="status-select" data-order-id="${esc(o.id)}">${['pending','reviewing','processing','completed','cancelled'].map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></td><td>${new Date(o.created_at).toLocaleDateString()}</td></tr>`).join('')||`<tr><td colspan="5" class="empty">${msg('មិនមាន Order','No orders')}</td></tr>`;
  document.querySelectorAll('[data-order-id]').forEach(sel=>sel.addEventListener('change',()=>updateOrder(sel.dataset.orderId,sel.value)));
}
function renderTickets(){
  $('ticketsTable').innerHTML=tickets.map(t=>`<tr><td><strong>#${esc(t.id)} · ${esc(t.subject)}</strong><br><span class="muted">${esc(t.message).slice(0,120)}</span></td><td>${esc(userName(t.user_id))}</td><td><select class="status-select" data-ticket-id="${esc(t.id)}">${['open','answered','closed'].map(s=>`<option value="${s}" ${s===t.status?'selected':''}>${s}</option>`).join('')}</select></td><td>${new Date(t.created_at).toLocaleDateString()}</td></tr>`).join('')||`<tr><td colspan="4" class="empty">${msg('មិនមាន Ticket','No tickets')}</td></tr>`;
  document.querySelectorAll('[data-ticket-id]').forEach(sel=>sel.addEventListener('change',()=>updateTicket(sel.dataset.ticketId,sel.value)));
}
function renderServices(){
  const q=($('serviceSearchAdmin')?.value||'').toLowerCase().trim(),filter=$('serviceStatusFilter')?.value||'all';
  const rows=services.filter(s=>(!q||s.id.toLowerCase().includes(q)||s.name_km.toLowerCase().includes(q)||s.name_en.toLowerCase().includes(q))&&(filter==='all'||(filter==='active'&&s.is_active)||(filter==='paused'&&!s.is_active)));
  $('servicesTable').innerHTML=rows.map(s=>`<tr><td class="service-name-cell"><strong>${esc(lang==='km'?s.name_km:s.name_en)}</strong><span>${esc(s.id)} · ${esc(s.category)}</span></td><td>${esc(s.platform)}</td><td>${money(s.price)}</td><td>${s.min_quantity}–${s.max_quantity}</td><td><span class="badge ${s.is_active?'active':'paused'}">${s.is_active?'ACTIVE':'PAUSED'}</span></td><td><button class="edit-service" data-service-edit="${esc(s.id)}" ${canManageServices()?'':'disabled'}>${msg('កែ','Edit')}</button></td></tr>`).join('')||`<tr><td colspan="6" class="empty">${msg('រកមិនឃើញសេវាកម្ម','No services found')}</td></tr>`;
  document.querySelectorAll('[data-service-edit]').forEach(b=>b.addEventListener('click',()=>editService(b.dataset.serviceEdit)));
}
function renderAll(){if(!$('adminApp')||$('adminApp').hidden)return;renderStats();renderOverview();renderUsers();renderServices();renderOrders();renderTickets()}
function updateServicePermission(){const allowed=canManageServices();if(!$('servicePermission'))return;$('servicePermission').textContent=allowed?`${currentRole||'admin'} · edit enabled`:'support · read only';$('saveService').disabled=!allowed;$('newService').disabled=!allowed;document.querySelectorAll('#serviceForm input,#serviceForm select,#serviceForm textarea').forEach(el=>el.disabled=!allowed);if(!allowed)$('serviceStatus').textContent=msg('Support role អាចមើលសេវាកម្ម ប៉ុន្តែមិនអាចកែបាន។','Support can view services but cannot edit them.')}
function resetServiceForm(){editingServiceId=null;$('serviceForm').reset();$('serviceId').disabled=!canManageServices();$('serviceId').value='';$('serviceSort').value='100';$('servicePrice').value='10';$('serviceMin').value='1';$('serviceMax').value='10';$('serviceActive').checked=true;$('serviceFormMode').textContent='CREATE';$('serviceStatus').textContent='';$('serviceStatus').className='form-status';updateServicePermission()}
function editService(id){const s=services.find(x=>x.id===id);if(!s||!canManageServices())return;editingServiceId=id;$('serviceId').value=s.id;$('serviceId').disabled=true;$('serviceSort').value=s.sort_order;$('serviceNameKm').value=s.name_km;$('serviceNameEn').value=s.name_en;$('serviceCategory').value=s.category;$('servicePlatform').value=s.platform;$('servicePrice').value=Number(s.price);$('serviceMin').value=s.min_quantity;$('serviceMax').value=s.max_quantity;$('serviceDetailsKm').value=s.details_km||'';$('serviceDetailsEn').value=s.details_en||'';$('serviceActive').checked=Boolean(s.is_active);$('serviceFormMode').textContent='EDIT';$('serviceStatus').textContent=msg('កំពុងកែសេវាកម្មដែលមានស្រាប់។','Editing an existing service.');document.querySelector('#section-services')?.scrollIntoView({behavior:'smooth',block:'start'})}
async function saveService(e){
  e.preventDefault();if(!canManageServices())return;
  const id=$('serviceId').value.trim().toLowerCase(),min=Number($('serviceMin').value),max=Number($('serviceMax').value),price=Number($('servicePrice').value);
  if(!/^[a-z0-9][a-z0-9-]{1,63}$/.test(id)){return serviceMessage(msg('Service ID ត្រូវប្រើ a-z, 0-9 និង - ប៉ុណ្ណោះ។','Service ID may use a-z, 0-9 and hyphens only.'),false)}
  if(min<1||max<min){return serviceMessage(msg('Quantity Min/Max មិនត្រឹមត្រូវ។','Invalid minimum/maximum quantity.'),false)}
  const payload={id,category:$('serviceCategory').value,platform:$('servicePlatform').value,price,min_quantity:min,max_quantity:max,name_km:$('serviceNameKm').value.trim(),name_en:$('serviceNameEn').value.trim(),details_km:$('serviceDetailsKm').value.trim(),details_en:$('serviceDetailsEn').value.trim(),is_active:$('serviceActive').checked,sort_order:Number($('serviceSort').value)||100,updated_at:new Date().toISOString()};
  if(!payload.name_km||!payload.name_en)return serviceMessage(msg('សូមបញ្ចូលឈ្មោះសេវាកម្មទាំងពីរភាសា។','Enter both Khmer and English service names.'),false);
  try{
    $('saveService').disabled=true;
    let result;
    if(editingServiceId){result=await client.from('services').update(payload).eq('id',editingServiceId).select().single()}
    else{Object.assign(payload,{time_km:'1–2 ថ្ងៃ',time_en:'1–2 days',start_km:'ក្នុង 1 ថ្ងៃធ្វើការ',start_en:'Within 1 business day',speed_km:'តាមកញ្ចប់',speed_en:'Per package'});result=await client.from('services').insert(payload).select().single()}
    if(result.error)throw result.error;
    serviceMessage(msg('បានរក្សាទុកសេវាកម្មក្នុង Supabase។','Service saved to Supabase.'),true);await loadAdminData();resetServiceForm();
  }catch(err){serviceMessage(err.message||msg('មិនអាចរក្សាទុកសេវាកម្មបាន។','Could not save service.'),false)}finally{$('saveService').disabled=!canManageServices()}
}
function serviceMessage(text,ok){$('serviceStatus').textContent=text;$('serviceStatus').className=`form-status ${ok?'ok':'error'}`}
async function updateOrder(id,status){const {error}=await client.from('orders').update({status}).eq('id',id);if(error){alert(error.message);await loadAdminData();return}const row=orders.find(o=>String(o.id)===String(id));if(row)row.status=status;renderAll()}
async function updateTicket(id,status){const {error}=await client.from('tickets').update({status}).eq('id',id);if(error){alert(error.message);await loadAdminData();return}const row=tickets.find(t=>String(t.id)===String(id));if(row)row.status=status;renderAll()}
document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
document.querySelectorAll('.admin-nav').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.admin-nav').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.admin-section').forEach(x=>x.classList.toggle('active',x.id===`section-${b.dataset.section}`))}));
$('userSearch')?.addEventListener('input',renderUsers);$('userFilter')?.addEventListener('change',renderUsers);$('serviceSearchAdmin')?.addEventListener('input',renderServices);$('serviceStatusFilter')?.addEventListener('change',renderServices);$('orderFilter')?.addEventListener('change',renderOrders);$('refreshAdmin')?.addEventListener('click',()=>loadAdminData().catch(e=>alert(e.message)));$('newService')?.addEventListener('click',resetServiceForm);$('cancelServiceEdit')?.addEventListener('click',resetServiceForm);$('serviceForm')?.addEventListener('submit',saveService);
$('adminLogout')?.addEventListener('click',async()=>{try{await backend.signOut()}finally{location.href='login.html'}});
(async()=>{setLanguage(lang);if(await checkAccess())try{await loadAdminData();resetServiceForm()}catch(e){showDenied(e.message||msg('មិនអាចទាញទិន្នន័យ Admin បាន។','Could not load admin data.'))}})();
