const services = [
  {id:'content-calendar',category:'content',platform:'all',price:12,min:1,max:20,name:{km:'ផែនការមាតិកាប្រចាំខែ',en:'Monthly Content Calendar'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ផែនការ 30 ថ្ងៃ',en:'30-day plan'},scope:{km:'មាតិកា + កាលវិភាគ',en:'Content + schedule'},details:{km:'Link: Public page / project URL\nStart: Within 1 business day\nDelivery: 30-day planning package\nScope: Content ideas + publishing cadence\n\nចំណាំសំខាន់៖\n• សេវានេះជាសេវារៀបចំផែនការ។\n• មិនធានា Followers, Likes ឬ Engagement ទេ។\n• កុំដាក់ព័ត៌មានសម្ងាត់ក្នុង Link ឬ Notes។',en:'Link: Public page / project URL\nStart: Within 1 business day\nDelivery: 30-day planning package\nScope: Content ideas + publishing cadence\n\nImportant notes:\n• This is a planning service.\n• It does not guarantee followers, likes, reach, or engagement.\n• Do not submit private credentials in links or notes.'}},
  {id:'short-video',category:'content',platform:'tiktok',price:9,min:1,max:50,name:{km:'ផែនការវីដេអូខ្លី TikTok',en:'TikTok Short-form Content Plan'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'10 វីដេអូ / កញ្ចប់',en:'10-video plan'},scope:{km:'Hook + Caption + Idea',en:'Hooks + captions + ideas'},details:{km:'កញ្ចប់គំនិតវីដេអូខ្លី សម្រាប់ TikTok/Reels មាន Hook, Caption និង Posting Structure។\n\nសម្រាប់មាតិកាស្របច្បាប់ និងការអភិវឌ្ឍគណនីតាមរបៀបធម្មតា។',en:'A short-form video planning package for TikTok/Reels with hooks, captions, and posting structure.\n\nDesigned for legitimate content strategy and organic account development.'}},
  {id:'meta-ads',category:'ads',platform:'facebook',price:18,min:1,max:10,name:{km:'ពិនិត្យ Meta Ads Campaign',en:'Meta Ads Campaign Review'},time:{km:'2–3 ថ្ងៃ',en:'2–3 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ក្នុងមួយ Campaign',en:'Per campaign'},scope:{km:'Setup + Creative Review',en:'Setup + creative review'},details:{km:'ពិនិត្យ Campaign Structure, Targeting, Creative និង Measurement Plan សម្រាប់ Meta Ads។',en:'Review campaign structure, targeting, creative organization, and measurement plan for Meta Ads.'}},
  {id:'youtube-seo',category:'analytics',platform:'youtube',price:15,min:1,max:10,name:{km:'ពិនិត្យ SEO ឆានែល YouTube',en:'YouTube Channel SEO Audit'},time:{km:'2 ថ្ងៃ',en:'2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ក្នុងមួយឆានែល',en:'Per channel'},scope:{km:'SEO Audit Report',en:'SEO audit report'},details:{km:'ពិនិត្យ Title, Description, Thumbnail, Channel Structure និង Discoverability។',en:'Audit titles, descriptions, thumbnails, channel structure, and discoverability.'}},
  {id:'community',category:'community',platform:'all',price:14,min:1,max:12,name:{km:'ផែនការគ្រប់គ្រង Community',en:'Community Management Plan'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'ផែនការប្រចាំសប្ដាហ៍',en:'Weekly plan'},scope:{km:'FAQ + Comment Framework',en:'FAQ + comment framework'},details:{km:'ផែនការឆ្លើយតប Comment, FAQ និង Moderation សម្រាប់ Page ឬ Brand។',en:'A response, FAQ, and moderation framework for a page or brand.'}},
  {id:'ig-captions',category:'content',platform:'instagram',price:10,min:1,max:50,name:{km:'កញ្ចប់ Caption Instagram',en:'Instagram Caption Pack'},time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'10 Posts / កញ្ចប់',en:'10-post pack'},scope:{km:'Caption + Content Angles',en:'Captions + content angles'},details:{km:'Caption 10 និងគំនិតមាតិកាសម្រាប់ Instagram Page ឬ Brand។',en:'Ten captions plus content angles for an Instagram page or brand.'}},
  {id:'telegram-plan',category:'analytics',platform:'telegram',price:11,min:1,max:20,name:{km:'ផែនការ Telegram Channel',en:'Telegram Channel Strategy'},time:{km:'2 ថ្ងៃ',en:'2 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'Strategy Report',en:'Strategy report'},scope:{km:'Organic Audience Plan',en:'Organic audience plan'},details:{km:'យុទ្ធសាស្ត្រមាតិកា Retention និង Cross-promotion តាមវិធីស្របច្បាប់។',en:'Content, retention, and cross-promotion strategy for legitimate organic audience development.'}},
  {id:'traffic-audit',category:'analytics',platform:'website',price:16,min:1,max:20,name:{km:'Website Social Traffic Audit',en:'Website Social Traffic Audit'},time:{km:'2–3 ថ្ងៃ',en:'2–3 days'},start:{km:'ក្នុង 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},speed:{km:'Audit Report',en:'Audit report'},scope:{km:'Funnel + Tracking',en:'Funnel + tracking'},details:{km:'ពិនិត្យ Social-to-Website Funnel, Tracking Setup និង Landing Page Alignment។',en:'Audit the social-to-website funnel, tracking setup, and landing-page alignment.'}}
];

let lang=localStorage.getItem('nexora_lang')||'km', selectedPlatform='all';
const $=id=>document.getElementById(id);
const sidebar=$('sidebar'), category=$('categorySelect'), service=$('serviceSelect'), search=$('serviceSearch'), quantity=$('quantity');

function readUser(){
  try{return JSON.parse(localStorage.getItem('nexora_demo_user')||'null')}catch{return null}
}
let currentUser=readUser();
if(!currentUser){location.replace('login.html')}
const userKey=()=>`nexora_demo_orders_${(currentUser?.email||'guest').toLowerCase()}`;
function readOrders(){
  try{return JSON.parse(localStorage.getItem(userKey())||'[]')}catch{return []}
}
let demoOrders=readOrders();
function saveOrders(){localStorage.setItem(userKey(),JSON.stringify(demoOrders))}
function initials(name){return (name||'NX').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'NX'}

function setupUserDashboard(){
  if(!currentUser)return;
  const displayName=currentUser.displayName||currentUser.email?.split('@')[0]||'NexoraUser';
  const email=currentUser.email||'';
  const avatarText=initials(displayName);

  const avatar=document.querySelector('.avatar');
  const mini=document.querySelector('.mini-user');
  if(avatar)avatar.textContent=avatarText;
  if(mini)mini.textContent=avatarText;

  const accountUser=document.querySelector('.account-meta span');
  if(accountUser){
    accountUser.dataset.km=`អ្នកប្រើ៖ ${displayName}`;
    accountUser.dataset.en=`User: ${displayName}`;
  }
  const welcomeName=document.querySelector('.summary-row > div:last-child strong');
  if(welcomeName)welcomeName.textContent=displayName;

  const topIcons=document.querySelector('.top-icons');
  if(topIcons&&!document.getElementById('logoutBtn')){
    const accountBtn=document.createElement('button');
    accountBtn.id='accountBtn';
    accountBtn.className='user-action-btn';
    accountBtn.title='Account';
    accountBtn.textContent='👤';
    topIcons.insertBefore(accountBtn,mini||null);

    const logout=document.createElement('button');
    logout.id='logoutBtn';
    logout.className='user-action-btn logout-btn';
    logout.title='Logout';
    logout.textContent='↪';
    topIcons.appendChild(logout);
  }

  const sideNav=document.querySelector('.side-nav');
  const showMore=$('showMore');
  if(sideNav&&showMore&&!document.querySelector('[data-view="account"]')){
    const btn=document.createElement('button');
    btn.className='nav-item';
    btn.dataset.view='account';
    btn.innerHTML='<span class="ico">👤</span><b data-km="គណនីរបស់ខ្ញុំ" data-en="My account">គណនីរបស់ខ្ញុំ</b>';
    sideNav.insertBefore(btn,showMore);
  }

  const content=document.querySelector('.content');
  if(content&&!$('account')){
    const view=document.createElement('section');
    view.className='view';
    view.id='account';
    view.innerHTML=`
      <section class="box account-view-box">
        <div class="account-view-head">
          <div class="account-big-avatar" id="accountBigAvatar"></div>
          <div>
            <span class="account-kicker">NEXORA ACCOUNT</span>
            <h2 data-km="គណនីរបស់ខ្ញុំ" data-en="My Account">គណនីរបស់ខ្ញុំ</h2>
            <p data-km="កែឈ្មោះបង្ហាញ និងមើលព័ត៌មានគណនី Demo របស់អ្នក។" data-en="Edit your display name and review your demo account information.">កែឈ្មោះបង្ហាញ និងមើលព័ត៌មានគណនី Demo របស់អ្នក។</p>
          </div>
        </div>
        <div class="account-form-grid">
          <label><span data-km="ឈ្មោះបង្ហាញ" data-en="Display name">ឈ្មោះបង្ហាញ</span><input id="profileName" type="text"></label>
          <label><span>Email</span><input id="profileEmail" type="email" readonly></label>
          <label><span data-km="សមតុល្យ" data-en="Balance">សមតុល្យ</span><input value="$0.00" readonly></label>
          <label><span data-km="ប្រភេទគណនី" data-en="Account type">ប្រភេទគណនី</span><input value="Demo User" readonly></label>
        </div>
        <div class="account-actions">
          <button id="saveProfile" class="submit-btn" data-km="រក្សាទុកព័ត៌មាន" data-en="Save profile">រក្សាទុកព័ត៌មាន</button>
          <button id="accountLogout" class="secondary-btn" data-km="ចាកចេញ / Logout" data-en="Logout">ចាកចេញ / Logout</button>
        </div>
        <p class="form-note" id="profileStatus"></p>
      </section>`;
    content.appendChild(view);
  }

  if($('accountBigAvatar'))$('accountBigAvatar').textContent=avatarText;
  if($('profileName'))$('profileName').value=displayName;
  if($('profileEmail'))$('profileEmail').value=email;

  const style=document.createElement('style');
  style.textContent=`
    .user-action-btn{border:1px solid rgba(255,255,255,.35)!important;background:rgba(255,255,255,.16)!important;color:#fff!important;font-weight:800}.logout-btn{background:rgba(100,20,70,.20)!important}.account-view-box{max-width:920px;margin:0 auto}.account-view-head{display:flex;gap:18px;align-items:center;padding-bottom:18px;border-bottom:1px solid #f2d4e3}.account-big-avatar{width:78px;height:78px;border-radius:24px;display:grid;place-items:center;background:linear-gradient(135deg,#f53f9d,#ff8bc7);color:white;font-size:25px;font-weight:800;box-shadow:0 14px 30px rgba(245,63,157,.22)}.account-kicker{font:800 10px Inter,sans-serif;letter-spacing:.14em;color:#f53f9d}.account-view-head h2{margin:5px 0}.account-view-head p{margin:0;color:#8d6d82;font-size:12px}.account-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}.account-form-grid label span{display:block;font-size:11px;font-weight:700;margin-bottom:6px;color:#735268}.account-form-grid input{width:100%;height:44px;border:1px solid #f0d2e0;border-radius:12px;background:#fff8fc;padding:0 12px}.account-actions{display:flex;gap:10px;margin-top:18px}.account-actions .submit-btn{width:auto;min-width:170px;margin-top:0}.secondary-btn{border:1px solid #efcade;background:#fff;color:#c83282;border-radius:12px;padding:0 18px;font-weight:800}@media(max-width:650px){.account-form-grid{grid-template-columns:1fr}.account-actions{flex-direction:column}.account-actions .submit-btn,.secondary-btn{width:100%;min-height:44px}}`;
  document.head.appendChild(style);
}

setupUserDashboard();

function translate(){
  document.documentElement.lang=lang;
  localStorage.setItem('nexora_lang',lang);
  document.querySelectorAll('[data-km][data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  document.querySelectorAll('option[data-km][data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  refreshServices(); renderOrders(); renderServiceCards();
}

document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;translate()}));
$('menuToggle').addEventListener('click',()=>sidebar.classList.toggle('closed'));
$('showMore').addEventListener('click',()=>{$('moreMenu').classList.toggle('open');$('showMore').classList.toggle('active')});

function bindNav(){
  document.querySelectorAll('.nav-item[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item[data-view]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));$(btn.dataset.view)?.classList.add('active');
    if(innerWidth<981) sidebar.classList.add('closed');
  }));
}
bindNav();

$('accountBtn')?.addEventListener('click',()=>{
  document.querySelector('[data-view="account"]')?.click();
});
function logout(){
  localStorage.removeItem('nexora_demo_user');
  location.href='login.html';
}
$('logoutBtn')?.addEventListener('click',logout);
$('accountLogout')?.addEventListener('click',logout);
$('saveProfile')?.addEventListener('click',()=>{
  const name=$('profileName').value.trim();
  if(name.length<2){$('profileStatus').textContent=lang==='km'?'ឈ្មោះត្រូវមានយ៉ាងតិច 2 តួអក្សរ។':'Display name must contain at least 2 characters.';return}
  currentUser={...currentUser,displayName:name};
  localStorage.setItem('nexora_demo_user',JSON.stringify(currentUser));
  $('profileStatus').textContent=lang==='km'?'បានរក្សាទុកឈ្មោះថ្មី។':'Profile saved.';
  const avatarText=initials(name);
  document.querySelector('.avatar').textContent=avatarText;
  document.querySelector('.mini-user').textContent=avatarText;
  $('accountBigAvatar').textContent=avatarText;
  const accountUser=document.querySelector('.account-meta span');
  accountUser.dataset.km=`អ្នកប្រើ៖ ${name}`;accountUser.dataset.en=`User: ${name}`;
  document.querySelector('.summary-row > div:last-child strong').textContent=name;
  translate();
});

document.querySelectorAll('.platform').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.platform').forEach(x=>x.classList.remove('active'));btn.classList.add('active');selectedPlatform=btn.dataset.platform;refreshServices();
}));

function filtered(){const q=search.value.trim().toLowerCase();return services.filter(s=>(selectedPlatform==='all'||s.platform==='all'||s.platform===selectedPlatform)&&(category.value==='all'||s.category===category.value)&&(!q||s.name.km.toLowerCase().includes(q)||s.name.en.toLowerCase().includes(q)))}
function current(){return services.find(s=>s.id===service.value)}
function refreshServices(){const list=filtered();service.innerHTML=list.length?list.map(s=>`<option value="${s.id}">${s.name[lang]} · $${s.price.toFixed(2)}</option>`).join(''):`<option value="">${lang==='km'?'មិនមានសេវាកម្មត្រូវគ្នា':'No matching services'}</option>`;updateDetails()}
function updateDetails(){const s=current();if(!s){$('avgTime').value='';$('charge').value='$0.00';$('serviceDetails').textContent=lang==='km'?'មិនទាន់ជ្រើសសេវាកម្ម។':'No service selected.';return}const qty=Math.min(s.max,Math.max(s.min,Number(quantity.value)||s.min));quantity.value=qty;$('avgTime').value=s.time[lang];$('charge').value=`$${(s.price*qty).toFixed(2)}`;$('rangeText').textContent=`Min: ${s.min} · Max: ${s.max}`;$('startTime').textContent=s.start[lang];$('speed').textContent=s.speed[lang];$('guarantee').textContent=s.scope[lang];$('detailAvg').textContent=s.time[lang];$('serviceDetails').textContent=s.details[lang];$('exampleLink').textContent=lang==='km'?'តំណសាធារណៈរបស់ Page ឬ Project':'Public page or project URL'}
category.addEventListener('change',refreshServices);search.addEventListener('input',refreshServices);service.addEventListener('change',updateDetails);quantity.addEventListener('input',updateDetails);

$('submitOrder').addEventListener('click',()=>{const s=current();if(!s)return;const qty=Number(quantity.value)||1;demoOrders.unshift({serviceId:s.id,total:s.price*qty,link:$('projectLink').value.trim(),createdAt:new Date().toISOString()});saveOrders();renderOrders();$('formNote').textContent=lang==='km'?'បានបន្ថែមសំណើសាកល្បង។ មិនមានការទូទាត់ ឬ Order ពិតត្រូវបានផ្ញើទេ។':'Demo request added. No payment or real order was sent.'});
function renderOrders(){const box=$('ordersList');$('summaryOrders').textContent=` ${demoOrders.length}`;const total=demoOrders.reduce((a,o)=>a+Number(o.total||0),0);$('summarySpend').textContent=` $${total.toFixed(2)}`;if(!demoOrders.length){box.className='empty-state';box.textContent=lang==='km'?'មិនទាន់មានការបញ្ជាទិញសាកល្បងទេ។':'No demo orders yet.';return}box.className='';box.innerHTML=demoOrders.map((o,i)=>{const s=services.find(x=>x.id===(o.serviceId||o.service?.id))||services[0];return `<div class="order-item"><div><strong>#${String(i+1).padStart(4,'0')} · ${s.name[lang]}</strong><br>${o.link||(lang==='km'?'គ្មានតំណ':'No link')}</div><div>$${Number(o.total||0).toFixed(2)}</div><div class="status-chip">${lang==='km'?'សាកល្បង':'Demo'}</div></div>`}).join('')}
function renderServiceCards(){$('serviceCards').innerHTML=services.map(s=>`<article class="service-card"><h3>${s.name[lang]}</h3><p>${s.details[lang].split('\n')[0]}</p><b>$${s.price.toFixed(2)}</b></article>`).join('')}
translate();