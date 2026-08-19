const APP_VERSION='1.1.0';
const services=[
  {id:'content-calendar',category:'content',platform:'all',price:12,min:1,max:20,name:{km:'ផែនការមាតិកាប្រចាំខែ',en:'Monthly Content Calendar'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ផែនការ 30 ថ្ងៃ',en:'30-day plan'},scope:{km:'មាតិកា + កាលវិភាគ',en:'Content + schedule'},details:{km:'ផែនការមាតិកា 30 ថ្ងៃ សម្រាប់ Page ឬ Brand របស់អ្នក។\n\nចំណាំ៖ នេះជាសេវារៀបចំផែនការ ហើយមិនធានា Followers, Likes ឬ Engagement ទេ។',en:'A 30-day content planning package for your page or brand.\n\nNote: This is a planning service and does not guarantee followers, likes, reach or engagement.'}},
  {id:'short-video',category:'content',platform:'tiktok',price:9,min:1,max:50,name:{km:'ផែនការវីដេអូខ្លី TikTok',en:'TikTok Short-form Content Plan'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'10 វីដេអូ / កញ្ចប់',en:'10-video plan'},scope:{km:'Hook + Caption + Idea',en:'Hooks + captions + ideas'},details:{km:'គំនិតវីដេអូខ្លី, Hook, Caption និង Posting Structure សម្រាប់ TikTok/Reels។',en:'Short-form video ideas, hooks, captions and posting structure for TikTok/Reels.'}},
  {id:'meta-ads',category:'ads',platform:'facebook',price:18,min:1,max:10,name:{km:'ពិនិត្យ Meta Ads Campaign',en:'Meta Ads Campaign Review'},time:{km:'2–3 ថ្ងៃ',en:'2–3 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ក្នុងមួយ Campaign',en:'Per campaign'},scope:{km:'Setup + Creative Review',en:'Setup + creative review'},details:{km:'ពិនិត្យ Campaign Structure, Targeting, Creative និង Measurement Plan សម្រាប់ Meta Ads។',en:'Review campaign structure, targeting, creative organization and measurement planning.'}},
  {id:'youtube-seo',category:'analytics',platform:'youtube',price:15,min:1,max:10,name:{km:'ពិនិត្យ SEO ឆានែល YouTube',en:'YouTube Channel SEO Audit'},time:{km:'2 ថ្ងៃ',en:'2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ក្នុងមួយឆានែល',en:'Per channel'},scope:{km:'SEO Audit Report',en:'SEO audit report'},details:{km:'ពិនិត្យ Title, Description, Thumbnail, Channel Structure និង Discoverability។',en:'Audit titles, descriptions, thumbnails, channel structure and discoverability.'}},
  {id:'community',category:'community',platform:'all',price:14,min:1,max:12,name:{km:'ផែនការគ្រប់គ្រង Community',en:'Community Management Plan'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ផែនការប្រចាំសប្ដាហ៍',en:'Weekly plan'},scope:{km:'FAQ + Comment Framework',en:'FAQ + comment framework'},details:{km:'ផែនការឆ្លើយតប Comment, FAQ និង Moderation សម្រាប់ Page ឬ Brand។',en:'A response, FAQ and moderation framework for a page or brand.'}},
  {id:'ig-captions',category:'content',platform:'instagram',price:10,min:1,max:50,name:{km:'កញ្ចប់ Caption Instagram',en:'Instagram Caption Pack'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'10 Posts / កញ្ចប់',en:'10-post pack'},scope:{km:'Caption + Content Angles',en:'Captions + content angles'},details:{km:'Caption 10 និងគំនិតមាតិកាសម្រាប់ Instagram Page ឬ Brand។',en:'Ten captions plus content angles for an Instagram page or brand.'}},
  {id:'telegram-plan',category:'analytics',platform:'telegram',price:11,min:1,max:20,name:{km:'ផែនការ Telegram Channel',en:'Telegram Channel Strategy'},time:{km:'2 ថ្ងៃ',en:'2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'Strategy Report',en:'Strategy report'},scope:{km:'Organic Audience Plan',en:'Organic audience plan'},details:{km:'យុទ្ធសាស្ត្រមាតិកា Retention និង Cross-promotion តាមវិធីធម្មតា និងស្របច្បាប់។',en:'Content, retention and cross-promotion strategy for legitimate organic audience development.'}},
  {id:'traffic-audit',category:'analytics',platform:'website',price:16,min:1,max:20,name:{km:'Website Social Traffic Audit',en:'Website Social Traffic Audit'},time:{km:'2–3 ថ្ងៃ',en:'2–3 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'Audit Report',en:'Audit report'},scope:{km:'Funnel + Tracking',en:'Funnel + tracking'},details:{km:'ពិនិត្យ Social-to-Website Funnel, Tracking Setup និង Landing Page Alignment។',en:'Audit the social-to-website funnel, tracking setup and landing-page alignment.'}}
];

let lang=localStorage.getItem('nexora_lang')||'km';
let selectedPlatform='all';
let orderTab='all';
const $=id=>document.getElementById(id);
function readJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function saveJson(key,value){localStorage.setItem(key,JSON.stringify(value))}

let currentUser=readJson('nexora_demo_user',null);
if(!currentUser)location.replace('login.html');
const userId=()=>String(currentUser?.email||'guest').toLowerCase();
const key=n=>`nexora_${n}_${userId()}`;
let demoOrders=readJson(key('orders'),[]);
let tickets=readJson(key('tickets'),[]);
let favorites=readJson(key('favorites'),[]);
let demoBalance=Number(localStorage.getItem(key('balance'))||0);
let fundHistory=readJson(key('fund_history'),[]);
let notifications=readJson(key('notifications'),[
  {id:'welcome',title:{km:'សូមស្វាគមន៍មក Nexora SMM',en:'Welcome to Nexora SMM'},body:{km:'Theme v1.1.0 បានដំណើរការហើយ។',en:'Theme v1.1.0 is ready.'},read:false},
  {id:'demo',title:{km:'ចំណាំសុវត្ថិភាព',en:'Safety note'},body:{km:'កុំបញ្ចូល API Key, Password ឬ Payment secret ក្នុង Demo form។',en:'Do not enter API keys, passwords or payment secrets in demo forms.'},read:false}
]);

function initials(name){return(name||'NX').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'NX'}
function money(n){return`$${Number(n||0).toFixed(2)}`}
function serviceById(id){return services.find(s=>s.id===id)}
function currentService(){return serviceById($('serviceSelect')?.value)}
function saveState(){saveJson(key('orders'),demoOrders);saveJson(key('tickets'),tickets);saveJson(key('favorites'),favorites);localStorage.setItem(key('balance'),String(demoBalance));saveJson(key('fund_history'),fundHistory);saveJson(key('notifications'),notifications)}

function setupUser(){
  if(!currentUser)return;
  const name=currentUser.displayName||currentUser.email?.split('@')[0]||'NexoraUser';
  const email=currentUser.email||'';
  const init=initials(name);
  document.querySelectorAll('.avatar,.mini-user').forEach(el=>el.textContent=init);
  if($('sidebarUser'))$('sidebarUser').textContent=lang==='km'?`អ្នកប្រើ៖ ${name}`:`User: ${name}`;
  if($('topUserName'))$('topUserName').textContent=name;
  if($('menuUserName'))$('menuUserName').textContent=name;
  if($('menuUserEmail'))$('menuUserEmail').textContent=email;
  if($('fundUser'))$('fundUser').textContent=name;
  if($('accountAvatar'))$('accountAvatar').textContent=init;
  if($('accountDisplay'))$('accountDisplay').textContent=name;
  if($('accountEmail'))$('accountEmail').textContent=email;
  if($('profileName'))$('profileName').value=name;
  if($('profileEmail'))$('profileEmail').value=email;
}

const viewLabels={
  'new-order':{km:'បញ្ជាទិញថ្មី',en:'New order'},orders:{km:'ការបញ្ជាទិញរបស់ខ្ញុំ',en:'My orders'},funds:{km:'បញ្ចូលទឹកប្រាក់',en:'Add funds'},services:{km:'សេវាកម្ម',en:'Services'},tickets:{km:'សំបុត្រជំនួយ',en:'Tickets'},'mass-order':{km:'បញ្ជាទិញច្រើន',en:'Mass order'},dashboard:{km:'ផ្ទាំងសង្ខេប',en:'Dashboard'},api:{km:'API',en:'API'},faq:{km:'FAQ',en:'FAQ'},updates:{km:'បច្ចុប្បន្នភាព',en:'Updates'},terms:{km:'លក្ខខណ្ឌ',en:'Terms'},account:{km:'គណនីរបស់ខ្ញុំ',en:'My account'}
};

function translate(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-km][data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  document.querySelectorAll('option[data-km][data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  localStorage.setItem('nexora_lang',lang);
  setupUser();
  refreshServices();renderOrders();renderServices();renderTickets();renderFunds();renderActivity();renderNotifications();updateSummary();
}

function openView(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  $(id)?.classList.add('active');
  document.querySelectorAll('.nav-item[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view===id));
  if($('currentViewLabel'))$('currentViewLabel').textContent=(viewLabels[id]||viewLabels['new-order'])[lang];
  if(innerWidth<981)$('sidebar')?.classList.add('closed');
}

function updateSummary(){
  const total=demoOrders.reduce((a,o)=>a+Number(o.total||0),0);
  const pairs=[['summaryOrders',demoOrders.length],['summarySpend',money(total)],['summaryFavorites',favorites.length],['summaryBalance',money(demoBalance)],['sidebarBalance',money(demoBalance)],['fundBalance',money(demoBalance)],['dashOrders',demoOrders.length],['dashSpend',money(total)],['dashBalance',money(demoBalance)],['dashFavorites',favorites.length]];
  pairs.forEach(([id,val])=>{if($(id))$(id).textContent=val});
  if($('ticketBadge'))$('ticketBadge').textContent=tickets.length;
}

function filteredServices(){
  const q=($('serviceSearch')?.value||'').trim().toLowerCase();
  const cat=$('categorySelect')?.value||'all';
  return services.filter(s=>(selectedPlatform==='all'||s.platform==='all'||s.platform===selectedPlatform)&&(cat==='all'||s.category===cat)&&(!q||s.name.km.toLowerCase().includes(q)||s.name.en.toLowerCase().includes(q))&&(orderTab==='all'||favorites.includes(s.id)));
}
function refreshServices(){
  const select=$('serviceSelect');if(!select)return;
  const previous=select.value;
  const list=filteredServices();
  select.innerHTML=list.length?list.map(s=>`<option value="${s.id}">${s.name[lang]} · ${money(s.price)}</option>`).join(''):`<option value="">${lang==='km'?'មិនមានសេវាកម្មត្រូវគ្នា':'No matching services'}</option>`;
  if(list.some(s=>s.id===previous))select.value=previous;
  updateDetails();
}
function updateDetails(){
  const s=currentService();
  if(!s){if($('avgTime'))$('avgTime').value='';if($('charge'))$('charge').value='$0.00';if($('serviceDetails'))$('serviceDetails').textContent=lang==='km'?'មិនទាន់ជ្រើសសេវាកម្ម។':'No service selected.';updateFavoriteButton();return}
  const qty=Math.min(s.max,Math.max(s.min,Number($('quantity')?.value)||s.min));
  if($('quantity'))$('quantity').value=qty;
  if($('avgTime'))$('avgTime').value=s.time[lang];
  if($('charge'))$('charge').value=money(s.price*qty);
  if($('rangeText'))$('rangeText').textContent=`Min: ${s.min} · Max: ${s.max}`;
  if($('startTime'))$('startTime').textContent=s.start[lang];
  if($('speed'))$('speed').textContent=s.speed[lang];
  if($('guarantee'))$('guarantee').textContent=s.scope[lang];
  if($('detailAvg'))$('detailAvg').textContent=s.time[lang];
  if($('serviceDetails'))$('serviceDetails').textContent=s.details[lang];
  if($('exampleLink'))$('exampleLink').textContent=lang==='km'?'តំណសាធារណៈរបស់ Page ឬ Project':'Public page or project URL';
  updateFavoriteButton();
}
function updateFavoriteButton(){const btn=$('favoriteToggle'),s=currentService();if(!btn)return;const on=!!s&&favorites.includes(s.id);btn.classList.toggle('active',on);btn.textContent=on?'♥':'♡'}
function toggleFavorite(id){if(!id)return;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];saveState();updateFavoriteButton();renderServices();updateSummary();if(orderTab==='favorites')refreshServices()}

function renderOrders(){
  const box=$('ordersList');if(!box)return;
  const q=($('orderSearch')?.value||'').trim().toLowerCase();
  const list=demoOrders.filter(o=>{const s=serviceById(o.serviceId);return!q||(s?.name[lang]||'').toLowerCase().includes(q)||(o.link||'').toLowerCase().includes(q)});
  if(!list.length){box.className='empty-state';box.textContent=lang==='km'?'មិនទាន់មានការបញ្ជាទិញសាកល្បងទេ។':'No demo orders yet.';updateSummary();return}
  box.className='';
  box.innerHTML=list.map((o,i)=>{const s=serviceById(o.serviceId);return`<div class="order-item"><div><strong>#${String(demoOrders.length-i).padStart(4,'0')} · ${s?.name[lang]||'Service'}</strong><br><span>${o.link||(lang==='km'?'គ្មានតំណ':'No link')}</span></div><div>${money(o.total)}</div><div class="status-chip">Demo</div></div>`}).join('');
  updateSummary();
}

function renderServices(){
  const box=$('serviceCards');if(!box)return;
  const q=($('servicesPageSearch')?.value||'').trim().toLowerCase();
  const list=services.filter(s=>!q||s.name.km.toLowerCase().includes(q)||s.name.en.toLowerCase().includes(q));
  box.innerHTML=list.map(s=>`<article class="service-card"><button class="service-fav ${favorites.includes(s.id)?'active':''}" data-fav="${s.id}">${favorites.includes(s.id)?'♥':'♡'}</button><h3>${s.name[lang]}</h3><p>${s.details[lang].split('\n')[0]}</p><b>${money(s.price)}</b></article>`).join('');
  box.querySelectorAll('[data-fav]').forEach(btn=>btn.addEventListener('click',()=>toggleFavorite(btn.dataset.fav)));
}

function renderTickets(){
  const box=$('ticketList');if(!box)return;
  if(!tickets.length){box.innerHTML=`<div class="empty-state">${lang==='km'?'មិនទាន់មាន Ticket ទេ។':'No tickets yet.'}</div>`;updateSummary();return}
  box.innerHTML=tickets.map(t=>`<div class="ticket-item"><div class="ticket-copy"><strong>${escapeHtml(t.subject)}</strong><span>${escapeHtml(t.message)}</span></div><span class="ticket-status">${t.status||'Open'}</span></div>`).join('');
  updateSummary();
}

function renderFunds(){
  const box=$('fundHistory');if(!box)return;
  if(!fundHistory.length){box.innerHTML=`<div class="empty-state">${lang==='km'?'មិនទាន់មានប្រវត្តិ Demo Funds ទេ។':'No demo fund history yet.'}</div>`;updateSummary();return}
  box.innerHTML=fundHistory.slice(0,10).map(x=>`<div class="history-item"><div><strong>+${money(x.amount)}</strong><span>${new Date(x.createdAt).toLocaleString()}</span></div><span>Demo Wallet</span></div>`).join('');
  updateSummary();
}

function renderActivity(){
  const box=$('activityList');if(!box)return;
  const events=[];
  demoOrders.slice(0,4).forEach(o=>{const s=serviceById(o.serviceId);events.push({time:o.createdAt||'',title:lang==='km'?'បានបង្កើតសំណើ Demo':'Created demo request',detail:s?.name[lang]||'Service'})});
  fundHistory.slice(0,3).forEach(f=>events.push({time:f.createdAt||'',title:lang==='km'?'បានបន្ថែម Demo Balance':'Added demo balance',detail:money(f.amount)}));
  tickets.slice(0,3).forEach(t=>events.push({time:t.createdAt||'',title:lang==='km'?'បានបង្កើត Ticket':'Created ticket',detail:t.subject}));
  events.sort((a,b)=>String(b.time).localeCompare(String(a.time)));
  if(!events.length){box.innerHTML=`<div class="empty-state">${lang==='km'?'មិនទាន់មានសកម្មភាពទេ។':'No recent activity.'}</div>`;return}
  box.innerHTML=events.slice(0,8).map(e=>`<div class="activity-item"><div><strong>${escapeHtml(e.title)}</strong><span>${escapeHtml(e.detail)}</span></div><span>${e.time?new Date(e.time).toLocaleDateString():''}</span></div>`).join('');
}

function renderNotifications(){
  const box=$('notificationList');if(!box)return;
  const unread=notifications.filter(n=>!n.read).length;
  if($('notificationBadge')){$('notificationBadge').textContent=unread;$('notificationBadge').style.display=unread?'grid':'none'}
  if($('notificationCount'))$('notificationCount').textContent=unread;
  box.innerHTML=notifications.map(n=>`<div class="notification-item ${n.read?'':'unread'}"><strong>${escapeHtml(n.title[lang]||n.title.en)}</strong><span>${escapeHtml(n.body[lang]||n.body.en)}</span></div>`).join('');
}

function escapeHtml(value){return String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;translate()}));
$('menuToggle')?.addEventListener('click',()=>$('sidebar')?.classList.toggle('closed'));
$('showMore')?.addEventListener('click',()=>{$('moreMenu')?.classList.toggle('open');$('showMore')?.classList.toggle('active')});
document.querySelectorAll('.nav-item[data-view]').forEach(btn=>btn.addEventListener('click',()=>openView(btn.dataset.view)));
document.querySelectorAll('.platform').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.platform').forEach(x=>x.classList.remove('active'));btn.classList.add('active');selectedPlatform=btn.dataset.platform;refreshServices()}));
document.querySelectorAll('[data-order-tab]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-order-tab]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');orderTab=btn.dataset.orderTab;refreshServices()}));
$('notificationBtn')?.addEventListener('click',e=>{e.stopPropagation();$('notificationMenu')?.classList.toggle('open');$('profileMenu')?.classList.remove('open')});
$('profileMenuBtn')?.addEventListener('click',e=>{e.stopPropagation();$('profileMenu')?.classList.toggle('open');$('notificationMenu')?.classList.remove('open')});
document.addEventListener('click',()=>{$('profileMenu')?.classList.remove('open');$('notificationMenu')?.classList.remove('open')});
$('profileMenu')?.addEventListener('click',e=>e.stopPropagation());$('notificationMenu')?.addEventListener('click',e=>e.stopPropagation());
$('markAllRead')?.addEventListener('click',()=>{notifications=notifications.map(n=>({...n,read:true}));saveState();renderNotifications()});
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{if(btn.dataset.action==='account')openView('account');if(btn.dataset.action==='logout'){localStorage.removeItem('nexora_demo_user');location.href='login.html'}}));

$('categorySelect')?.addEventListener('change',refreshServices);$('serviceSearch')?.addEventListener('input',refreshServices);$('serviceSelect')?.addEventListener('change',updateDetails);$('quantity')?.addEventListener('input',updateDetails);$('favoriteToggle')?.addEventListener('click',()=>toggleFavorite(currentService()?.id));
$('submitOrder')?.addEventListener('click',()=>{const s=currentService();if(!s){$('formNote').textContent=lang==='km'?'សូមជ្រើសរើសសេវាកម្ម។':'Please choose a service.';return}const qty=Number($('quantity')?.value)||1;demoOrders.unshift({serviceId:s.id,total:s.price*qty,link:$('projectLink')?.value.trim()||'',status:'demo',createdAt:new Date().toISOString()});saveState();renderOrders();renderActivity();$('formNote').textContent=lang==='km'?'បានបន្ថែមសំណើ Demo។ មិនមានការទូទាត់ ឬការបញ្ជាទិញពិតទេ។':'Demo request added. No payment or real order was sent.'});
$('orderSearch')?.addEventListener('input',renderOrders);$('servicesPageSearch')?.addEventListener('input',renderServices);

document.querySelectorAll('[data-amount]').forEach(btn=>btn.addEventListener('click',()=>{if($('fundAmount'))$('fundAmount').value=btn.dataset.amount}));
$('demoAddFunds')?.addEventListener('click',()=>{const amount=Number($('fundAmount')?.value||0);if(!Number.isFinite(amount)||amount<=0){$('fundNote').textContent=lang==='km'?'សូមបញ្ចូលចំនួនលើស 0។':'Enter an amount greater than 0.';return}demoBalance+=amount;fundHistory.unshift({amount,createdAt:new Date().toISOString()});saveState();renderFunds();renderActivity();$('fundNote').textContent=lang==='km'?'បានបន្ថែម Demo Balance។ មិនមានការទូទាត់ពិតទេ។':'Demo balance added. No real payment occurred.';$('fundAmount').value=''});

$('ticketForm')?.addEventListener('submit',e=>{e.preventDefault();const subject=$('ticketSubject')?.value.trim(),message=$('ticketMessage')?.value.trim();if(!subject||!message)return;tickets.unshift({subject,message,status:'Open',createdAt:new Date().toISOString()});saveState();renderTickets();renderActivity();$('ticketForm').reset();$('ticketNote').textContent=lang==='km'?'បានបង្កើត Ticket Demo។':'Demo ticket created.'});

$('profileForm')?.addEventListener('submit',e=>{e.preventDefault();const name=$('profileName')?.value.trim();if(!name){$('profileNote').textContent=lang==='km'?'សូមបញ្ចូលឈ្មោះ។':'Enter a display name.';return}currentUser={...currentUser,displayName:name};saveJson('nexora_demo_user',currentUser);setupUser();$('profileNote').textContent=lang==='km'?'បានរក្សាទុកឈ្មោះ Demo។':'Demo display name saved.'});

$('parseMass')?.addEventListener('click',()=>{const lines=($('massInput')?.value||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);const box=$('massPreview');if(!lines.length){box.innerHTML=`<div class="empty-state">${lang==='km'?'មិនមានបន្ទាត់។':'No lines to preview.'}</div>`;return}box.innerHTML=lines.slice(0,20).map((line,i)=>`<div class="mass-row">${i+1}. ${escapeHtml(line)}</div>`).join('')});

setupUser();translate();
