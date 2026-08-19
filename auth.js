let authLang='km';
const authText={
  loginTitle:{km:'ចូលគណនី',en:'Sign in'},
  loginSub:{km:'ចូលប្រើ Nexora SMM Dashboard របស់អ្នក។',en:'Access your Nexora SMM dashboard.'},
  registerTitle:{km:'បង្កើតគណនី',en:'Create account'},
  registerSub:{km:'បង្កើតគណនីសាកល្បងសម្រាប់ Nexora SMM។',en:'Create a demo account for Nexora SMM.'}
};

function setAuthLanguage(next){
  authLang=next;
  document.documentElement.lang=authLang;
  document.querySelectorAll('[data-km][data-en]').forEach(el=>el.textContent=el.dataset[authLang]);
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===authLang));
  localStorage.setItem('nexora_lang',authLang);
}

document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>setAuthLanguage(btn.dataset.lang)));

document.querySelectorAll('.toggle-pass').forEach(btn=>btn.addEventListener('click',()=>{
  const input=document.getElementById(btn.dataset.target);
  if(!input)return;
  input.type=input.type==='password'?'text':'password';
  btn.textContent=input.type==='password'?'◉':'◎';
}));

const loginForm=document.getElementById('loginForm');
loginForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const email=document.getElementById('loginEmail').value.trim();
  const password=document.getElementById('loginPassword').value;
  const status=document.getElementById('authStatus');
  if(!email||password.length<6){
    status.textContent=authLang==='km'?'សូមបញ្ចូល Email និង Password យ៉ាងតិច 6 តួអក្សរ។':'Enter an email and a password with at least 6 characters.';
    return;
  }
  localStorage.setItem('nexora_demo_user',JSON.stringify({email,displayName:email.split('@')[0]}));
  status.textContent=authLang==='km'?'បានចូល Demo។ កំពុងបើក Dashboard...':'Demo sign-in successful. Opening dashboard...';
  setTimeout(()=>location.href='index.html',450);
});

const registerForm=document.getElementById('registerForm');
registerForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('registerName').value.trim();
  const email=document.getElementById('registerEmail').value.trim();
  const password=document.getElementById('registerPassword').value;
  const confirm=document.getElementById('confirmPassword').value;
  const status=document.getElementById('authStatus');
  if(name.length<2||!email){
    status.textContent=authLang==='km'?'សូមបញ្ចូលឈ្មោះ និង Email ឱ្យបានត្រឹមត្រូវ។':'Enter a valid name and email.';
    return;
  }
  if(password.length<6){
    status.textContent=authLang==='km'?'Password ត្រូវមានយ៉ាងតិច 6 តួអក្សរ។':'Password must be at least 6 characters.';
    return;
  }
  if(password!==confirm){
    status.textContent=authLang==='km'?'Password ទាំងពីរមិនដូចគ្នា។':'Passwords do not match.';
    return;
  }
  localStorage.setItem('nexora_demo_user',JSON.stringify({email,displayName:name}));
  status.textContent=authLang==='km'?'បានបង្កើត Demo Account។ កំពុងបើក Dashboard...':'Demo account created. Opening dashboard...';
  setTimeout(()=>location.href='index.html',450);
});

setAuthLanguage(localStorage.getItem('nexora_lang')||'km');
