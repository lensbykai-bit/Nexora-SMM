const services = [
  {id:'content-calendar',name:'Monthly Content Calendar',category:'content',platform:'all',price:12,time:'1–2 days',start:'Within 1 business day',speed:'Monthly deliverable',scope:'30-day plan',details:'Includes a structured 30-day content calendar, posting ideas, themes, and suggested publishing cadence.\n\nImportant: This is a planning service and does not guarantee reach, followers, likes, or other engagement.'},
  {id:'short-video',name:'Short-form Video Content Plan',category:'content',platform:'tiktok',price:9,time:'1–2 days',start:'Within 1 business day',speed:'10-video plan',scope:'Defined deliverables',details:'A planning package for short-form video concepts, hooks, captions, and posting structure for TikTok or Reels.'},
  {id:'meta-ads',name:'Meta Ads Campaign Setup Review',category:'ads',platform:'facebook',price:18,time:'2–3 days',start:'Within 1 business day',speed:'Per campaign',scope:'Setup review',details:'Review of campaign structure, targeting setup, creative organization, and measurement plan for Meta advertising.'},
  {id:'youtube-seo',name:'YouTube Channel SEO Audit',category:'analytics',platform:'youtube',price:15,time:'2 days',start:'Within 1 business day',speed:'Per channel',scope:'Audit report',details:'Channel audit covering titles, descriptions, structure, thumbnails, discoverability, and content organization.'},
  {id:'community',name:'Community Management Plan',category:'community',platform:'all',price:14,time:'1–2 days',start:'Within 1 business day',speed:'Weekly plan',scope:'Response framework',details:'A practical response and moderation framework for legitimate community management, including FAQs, comment handling, and escalation rules.'},
  {id:'ig-content',name:'Instagram Content & Caption Pack',category:'content',platform:'instagram',price:10,time:'1–2 days',start:'Within 1 business day',speed:'10-post pack',scope:'10 captions',details:'Ten caption drafts with content angles and publishing suggestions for an Instagram page or brand.'},
  {id:'telegram-plan',name:'Telegram Channel Growth Plan',category:'analytics',platform:'telegram',price:11,time:'2 days',start:'Within 1 business day',speed:'Strategy report',scope:'Organic plan',details:'A channel strategy focused on content, retention, cross-promotion, and legitimate audience development.'},
  {id:'site-traffic',name:'Website Social Traffic Audit',category:'analytics',platform:'website',price:16,time:'2–3 days',start:'Within 1 business day',speed:'Audit report',scope:'Traffic analysis',details:'Audit your social-to-website funnel, tracking setup, landing page alignment, and content-to-click strategy.'}
];

let selectedPlatform = 'all';
let demoOrders = [];

const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const categorySelect = document.getElementById('categorySelect');
const serviceSelect = document.getElementById('serviceSelect');
const serviceSearch = document.getElementById('serviceSearch');
const quantity = document.getElementById('quantity');
const avgTime = document.getElementById('avgTime');
const charge = document.getElementById('charge');
const formNote = document.getElementById('formNote');

menuToggle?.addEventListener('click',()=>sidebar.classList.toggle('closed'));

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
  return services.filter(s=>(selectedPlatform==='all'||s.platform==='all'||s.platform===selectedPlatform)&&(cat==='all'||s.category===cat)&&(!q||s.name.toLowerCase().includes(q)));
}

function refreshServices(){
  const list=filteredServices();
  serviceSelect.innerHTML=list.length?list.map(s=>`<option value="${s.id}">${s.name} — $${s.price.toFixed(2)}</option>`).join(''):'<option value="">No matching services</option>';
  updateDetails();
}

function currentService(){return services.find(s=>s.id===serviceSelect.value)}

function updateDetails(){
  const s=currentService();
  if(!s){
    avgTime.value='';charge.value='$0.00';
    document.getElementById('serviceDetails').textContent='No service selected.';
    return;
  }
  const qty=Math.max(1,Number(quantity.value)||1);
  avgTime.value=s.time;
  charge.value=`$${(s.price*qty).toFixed(2)}`;
  document.getElementById('startTime').textContent=s.start;
  document.getElementById('speed').textContent=s.speed;
  document.getElementById('guarantee').textContent=s.scope;
  document.getElementById('detailAvg').textContent=s.time;
  document.getElementById('serviceDetails').textContent=s.details;
}

categorySelect.addEventListener('change',refreshServices);
serviceSearch.addEventListener('input',refreshServices);
serviceSelect.addEventListener('change',updateDetails);
quantity.addEventListener('input',updateDetails);

function renderServiceCards(){
  document.getElementById('serviceCards').innerHTML=services.map(s=>`<article class="service-card"><h3>${s.name}</h3><p>${s.details.split('\n')[0]}</p><b>$${s.price.toFixed(2)}</b></article>`).join('');
}

function renderOrders(){
  const box=document.getElementById('ordersList');
  document.getElementById('orderCount').textContent=demoOrders.length;
  const total=demoOrders.reduce((sum,o)=>sum+o.total,0);
  document.getElementById('totalSpend').textContent=`$${total.toFixed(2)}`;
  if(!demoOrders.length){box.className='empty-state';box.textContent='No demo orders yet.';return;}
  box.className='';
  box.innerHTML=demoOrders.map((o,i)=>`<div class="order-item"><div><strong>#${String(i+1).padStart(4,'0')} · ${o.name}</strong><br><span>${o.link||'No link supplied'}</span></div><div>$${o.total.toFixed(2)}</div><div class="status-chip">Demo request</div></div>`).join('');
}

document.getElementById('submitOrder').addEventListener('click',()=>{
  const s=currentService();
  if(!s){formNote.textContent='Please choose a service.';return;}
  const qty=Math.max(1,Number(quantity.value)||1);
  demoOrders.unshift({name:s.name,total:s.price*qty,link:document.getElementById('projectLink').value.trim()});
  renderOrders();
  formNote.textContent='Demo request added. No payment or real order was sent.';
});

renderServiceCards();
renderOrders();
refreshServices();
