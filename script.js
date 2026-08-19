const services = [
  {
    id:'content-calendar', category:'content', platform:'all', price:12,
    name:{km:'ផែនការមាតិកាប្រចាំខែ',en:'Monthly Content Calendar'},
    time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'ផែនការប្រចាំខែ',en:'Monthly deliverable'},
    scope:{km:'ផែនការ 30 ថ្ងៃ',en:'30-day plan'},
    details:{
      km:'រួមមានផែនការមាតិកា 30 ថ្ងៃ គំនិតបង្ហោះ ប្រធានបទ និងកាលវិភាគបង្ហោះដែលបានណែនាំ។\n\nចំណាំ៖ សេវានេះជាសេវារៀបចំផែនការ និងមិនធានាចំនួនអ្នកតាមដាន Likes ឬ Engagement ណាមួយទេ។',
      en:'Includes a structured 30-day content calendar, posting ideas, themes, and suggested publishing cadence.\n\nImportant: This is a planning service and does not guarantee reach, followers, likes, or other engagement.'
    }
  },
  {
    id:'short-video', category:'content', platform:'tiktok', price:9,
    name:{km:'ផែនការវីដេអូខ្លី',en:'Short-form Video Content Plan'},
    time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'ផែនការ 10 វីដេអូ',en:'10-video plan'},
    scope:{km:'កញ្ចប់កំណត់ច្បាស់',en:'Defined deliverables'},
    details:{km:'កញ្ចប់រៀបចំគំនិតវីដេអូខ្លី Hook Caption និងរចនាសម្ព័ន្ធបង្ហោះ សម្រាប់ TikTok ឬ Reels។',en:'A planning package for short-form video concepts, hooks, captions, and posting structure for TikTok or Reels.'}
  },
  {
    id:'meta-ads', category:'ads', platform:'facebook', price:18,
    name:{km:'ពិនិត្យការរៀបចំ Meta Ads',en:'Meta Ads Campaign Setup Review'},
    time:{km:'2–3 ថ្ងៃ',en:'2–3 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'ក្នុងមួយ Campaign',en:'Per campaign'},
    scope:{km:'ពិនិត្យការរៀបចំ',en:'Setup review'},
    details:{km:'ពិនិត្យរចនាសម្ព័ន្ធ Campaign ការកំណត់ Target ការរៀបចំ Creative និងផែនការវាស់វែងសម្រាប់ Meta Ads។',en:'Review of campaign structure, targeting setup, creative organization, and measurement plan for Meta advertising.'}
  },
  {
    id:'youtube-seo', category:'analytics', platform:'youtube', price:15,
    name:{km:'ពិនិត្យ SEO ឆានែល YouTube',en:'YouTube Channel SEO Audit'},
    time:{km:'2 ថ្ងៃ',en:'2 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'ក្នុងមួយឆានែល',en:'Per channel'},
    scope:{km:'របាយការណ៍ពិនិត្យ',en:'Audit report'},
    details:{km:'ពិនិត្យឆានែលលើ Title, Description, រចនាសម្ព័ន្ធ, Thumbnail, Discoverability និងការរៀបចំមាតិកា។',en:'Channel audit covering titles, descriptions, structure, thumbnails, discoverability, and content organization.'}
  },
  {
    id:'community', category:'community', platform:'all', price:14,
    name:{km:'ផែនការគ្រប់គ្រងសហគមន៍',en:'Community Management Plan'},
    time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'ផែនការប្រចាំសប្ដាហ៍',en:'Weekly plan'},
    scope:{km:'គោលការណ៍ឆ្លើយតប',en:'Response framework'},
    details:{km:'គោលការណ៍ឆ្លើយតប និងគ្រប់គ្រង Comment រួមទាំង FAQ និងច្បាប់បញ្ជូនបញ្ហាទៅកាន់ Support។',en:'A practical response and moderation framework for legitimate community management, including FAQs, comment handling, and escalation rules.'}
  },
  {
    id:'ig-content', category:'content', platform:'instagram', price:10,
    name:{km:'កញ្ចប់មាតិកា និង Caption Instagram',en:'Instagram Content & Caption Pack'},
    time:{km:'1–2 ថ្ងៃ',en:'1–2 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'កញ្ចប់ 10 Post',en:'10-post pack'},
    scope:{km:'10 Caption',en:'10 captions'},
    details:{km:'Caption ចំនួន 10 ជាមួយគំនិតមាតិកា និងសំណើកាលវិភាគបង្ហោះសម្រាប់ Instagram Page ឬ Brand។',en:'Ten caption drafts with content angles and publishing suggestions for an Instagram page or brand.'}
  },
  {
    id:'telegram-plan', category:'analytics', platform:'telegram', price:11,
    name:{km:'ផែនការលូតលាស់ Telegram Channel',en:'Telegram Channel Growth Plan'},
    time:{km:'2 ថ្ងៃ',en:'2 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'របាយការណ៍យុទ្ធសាស្ត្រ',en:'Strategy report'},
    scope:{km:'ផែនការ Organic',en:'Organic plan'},
    details:{km:'យុទ្ធសាស្ត្រឆានែលផ្តោតលើមាតិកា Retention Cross-promotion និងការអភិវឌ្ឍ Audience តាមវិធីស្របច្បាប់។',en:'A channel strategy focused on content, retention, cross-promotion, and legitimate audience development.'}
  },
  {
    id:'site-traffic', category:'analytics', platform:'website', price:16,
    name:{km:'ពិនិត្យ Social Traffic សម្រាប់ Website',en:'Website Social Traffic Audit'},
    time:{km:'2–3 ថ្ងៃ',en:'2–3 days'},
    start:{km:'ក្នុងរយៈពេល 1 ថ្ងៃធ្វើការ',en:'Within 1 business day'},
    speed:{km:'របាយការណ៍ពិនិត្យ',en:'Audit report'},
    scope:{km:'វិភាគ Traffic',en:'Traffic analysis'},
    details:{km:'ពិនិត្យផ្លូវពី Social ទៅ Website ការកំណត់ Tracking ភាពស៊ីគ្នានៃ Landing Page និងយុទ្ធសាស្ត្រ Content-to-click។',en:'Audit your social-to-website funnel, tracking setup, landing page alignment, and content-to-click strategy.'}
  }
];

let selectedPlatform = 'all';
let demoOrders = [];
let currentLang = localStorage.getItem('nexoraLang') || 'km';

const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const categorySelect = document.getElementById('categorySelect');
const serviceSelect = document.getElementById('serviceSelect');
const serviceSearch = document.getElementById('serviceSearch');
const quantity = document.getElementById('quantity');
const avgTime = document.getElementById('avgTime');
const charge = document.getElementById('charge');
const formNote = document.getElementById('formNote');

const copy = {
  km:{
    noService:'មិនមានសេវាកម្មដែលត្រូវគ្នាទេ',
    noSelected:'មិនទាន់ជ្រើសរើសសេវាកម្មទេ។',
    noOrders:'មិនទាន់មានការបញ្ជាទិញសាកល្បងទេ។',
    noLink:'មិនបានបញ្ចូលតំណ',
    demoRequest:'សំណើសាកល្បង',
    chooseService:'សូមជ្រើសរើសសេវាកម្ម។',
    orderAdded:'បានបន្ថែមសំណើសាកល្បង។ មិនមានការទូទាត់ ឬការបញ្ជាទិញពិតត្រូវបានផ្ញើទេ។'
  },
  en:{
    noService:'No matching services',
    noSelected:'No service selected.',
    noOrders:'No demo orders yet.',
    noLink:'No link supplied',
    demoRequest:'Demo request',
    chooseService:'Please choose a service.',
    orderAdded:'Demo request added. No payment or real order was sent.'
  }
};

function applyLanguage(lang){
  currentLang = lang;
  localStorage.setItem('nexoraLang',lang);
  document.documentElement.lang = lang === 'km' ? 'km' : 'en';

  document.querySelectorAll('[data-km][data-en]').forEach(el=>{
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.lang === lang);
  });

  refreshServices();
  renderServiceCards();
  renderOrders();
  updateDetails();
}

menuToggle?.addEventListener('click',()=>sidebar.classList.toggle('closed'));

document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>applyLanguage(btn.dataset.lang));
});

document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById(btn.dataset.view)?.classList.add('active');
  if(window.innerWidth<981) sidebar.classList.add('closed');
}));

document.querySelectorAll('.platform').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.platform').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  selectedPlatform=btn.dataset.platform;
  refreshServices();
}));

function filteredServices(){
  const cat=categorySelect.value;
  const q=serviceSearch.value.trim().toLowerCase();
  return services.filter(s=>{
    const searchable=`${s.name.km} ${s.name.en}`.toLowerCase();
    return (selectedPlatform==='all'||s.platform==='all'||s.platform===selectedPlatform) &&
      (cat==='all'||s.category===cat) && (!q||searchable.includes(q));
  });
}

function refreshServices(){
  const oldValue=serviceSelect.value;
  const list=filteredServices();
  serviceSelect.innerHTML=list.length
    ? list.map(s=>`<option value="${s.id}">${s.name[currentLang]} — $${s.price.toFixed(2)}</option>`).join('')
    : `<option value="">${copy[currentLang].noService}</option>`;
  if(list.some(s=>s.id===oldValue)) serviceSelect.value=oldValue;
  updateDetails();
}

function currentService(){return services.find(s=>s.id===serviceSelect.value)}

function updateDetails(){
  const s=currentService();
  if(!s){
    avgTime.value='';
    charge.value='$0.00';
    document.getElementById('serviceDetails').textContent=copy[currentLang].noSelected;
    document.getElementById('startTime').textContent='—';
    document.getElementById('speed').textContent='—';
    document.getElementById('guarantee').textContent='—';
    document.getElementById('detailAvg').textContent='—';
    return;
  }
  const qty=Math.max(1,Number(quantity.value)||1);
  avgTime.value=s.time[currentLang];
  charge.value=`$${(s.price*qty).toFixed(2)}`;
  document.getElementById('startTime').textContent=s.start[currentLang];
  document.getElementById('speed').textContent=s.speed[currentLang];
  document.getElementById('guarantee').textContent=s.scope[currentLang];
  document.getElementById('detailAvg').textContent=s.time[currentLang];
  document.getElementById('serviceDetails').textContent=s.details[currentLang];
}

categorySelect.addEventListener('change',refreshServices);
serviceSearch.addEventListener('input',refreshServices);
serviceSelect.addEventListener('change',updateDetails);
quantity.addEventListener('input',updateDetails);

function renderServiceCards(){
  const box=document.getElementById('serviceCards');
  if(!box) return;
  box.innerHTML=services.map(s=>`<article class="service-card"><h3>${s.name[currentLang]}</h3><p>${s.details[currentLang].split('\n')[0]}</p><b>$${s.price.toFixed(2)}</b></article>`).join('');
}

function renderOrders(){
  const box=document.getElementById('ordersList');
  document.getElementById('orderCount').textContent=demoOrders.length;
  const total=demoOrders.reduce((sum,o)=>sum+o.total,0);
  document.getElementById('totalSpend').textContent=`$${total.toFixed(2)}`;
  if(!demoOrders.length){
    box.className='empty-state';
    box.textContent=copy[currentLang].noOrders;
    return;
  }
  box.className='';
  box.innerHTML=demoOrders.map((o,i)=>{
    const s=services.find(item=>item.id===o.serviceId);
    const name=s?s.name[currentLang]:o.name;
    return `<div class="order-item"><div><strong>#${String(i+1).padStart(4,'0')} · ${name}</strong><br><span>${o.link||copy[currentLang].noLink}</span></div><div>$${o.total.toFixed(2)}</div><div class="status-chip">${copy[currentLang].demoRequest}</div></div>`;
  }).join('');
}

document.getElementById('submitOrder').addEventListener('click',()=>{
  const s=currentService();
  if(!s){formNote.textContent=copy[currentLang].chooseService;return;}
  const qty=Math.max(1,Number(quantity.value)||1);
  demoOrders.unshift({serviceId:s.id,name:s.name[currentLang],total:s.price*qty,link:document.getElementById('projectLink').value.trim()});
  renderOrders();
  formNote.textContent=copy[currentLang].orderAdded;
});

applyLanguage(currentLang);
