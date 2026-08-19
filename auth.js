const AUTH_VERSION='1.2.0';
let authLang=localStorage.getItem('nexora_lang')||'km';
const backend=window.NexoraBackend;
const realMode=Boolean(backend?.isConfigured);

function setAuthLanguage(next){
  authLang=next;
  document.documentElement.lang=authLang;
  document.querySelectorAll('[data-km][data-en]').forEach(el=>el.textContent=el.dataset[authLang]);
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===authLang));
  localStorage.setItem('nexora_lang',authLang);
}
function msg(km,en){return authLang==='km'?km:en}
function statusText(text){const status=document.getElementById('authStatus');if(status)status.textContent=text}
function lockForm(form,locked){form?.querySelectorAll('input,button').forEach(el=>{if(!el.classList.contains('lang-btn'))el.disabled=locked})}

async function redirectIfSignedIn(){
  if(!realMode)return;
  try{
    const identity=await backend.getIdentity();
    if(identity)location.replace('index.html');
  }catch{}
}

document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>setAuthLanguage(btn.dataset.lang)));
document.querySelectorAll('.toggle-pass').forEach(btn=>btn.addEventListener('click',()=>{
  const input=document.getElementById(btn.dataset.target);if(!input)return;
  input.type=input.type==='password'?'text':'password';
  btn.textContent=input.type==='password'?'◉':'◎';
}));

const loginForm=document.getElementById('loginForm');
loginForm?.addEventListener('submit',async e=>{
  e.preventDefault();
  const email=document.getElementById('loginEmail').value.trim();
  const password=document.getElementById('loginPassword').value;
  if(!email||password.length<6){statusText(msg('សូមបញ្ចូល Email និង Password យ៉ាងតិច 6 តួអក្សរ។','Enter an email and a password with at least 6 characters.'));return}
  lockForm(loginForm,true);
  statusText(realMode?msg('កំពុងចូលគណនី Supabase...','Signing in with Supabase...'):msg('កំពុងចូល Demo...','Signing in to demo mode...'));
  try{
    const result=await backend.signIn({email,password});
    if(result.mode==='demo')localStorage.setItem('nexora_demo_user',JSON.stringify({email,displayName:email.split('@')[0]}));
    statusText(realMode?msg('បានចូលគណនីពិត។ កំពុងបើក Dashboard...','Signed in. Opening dashboard...'):msg('បានចូល Demo។ កំពុងបើក Dashboard...','Demo sign-in successful. Opening dashboard...'));
    setTimeout(()=>location.href='index.html',350);
  }catch(error){
    statusText(error?.message||msg('មិនអាចចូលគណនីបាន។','Unable to sign in.'));
    lockForm(loginForm,false);
  }
});

const registerForm=document.getElementById('registerForm');
registerForm?.addEventListener('submit',async e=>{
  e.preventDefault();
  const name=document.getElementById('registerName').value.trim();
  const email=document.getElementById('registerEmail').value.trim();
  const password=document.getElementById('registerPassword').value;
  const confirm=document.getElementById('confirmPassword').value;
  if(name.length<2||!email){statusText(msg('សូមបញ្ចូលឈ្មោះ និង Email ឱ្យបានត្រឹមត្រូវ។','Enter a valid name and email.'));return}
  if(password.length<6){statusText(msg('Password ត្រូវមានយ៉ាងតិច 6 តួអក្សរ។','Password must be at least 6 characters.'));return}
  if(password!==confirm){statusText(msg('Password ទាំងពីរមិនដូចគ្នា។','Passwords do not match.'));return}
  lockForm(registerForm,true);
  statusText(realMode?msg('កំពុងបង្កើត Supabase Account...','Creating Supabase account...'):msg('កំពុងបង្កើត Demo Account...','Creating demo account...'));
  try{
    const result=await backend.signUp({name,email,password});
    if(result.mode==='demo'){
      localStorage.setItem('nexora_demo_user',JSON.stringify({email,displayName:name}));
      statusText(msg('បានបង្កើត Demo Account។ កំពុងបើក Dashboard...','Demo account created. Opening dashboard...'));
      setTimeout(()=>location.href='index.html',350);
      return;
    }
    if(result.session){
      statusText(msg('បានបង្កើតគណនី។ កំពុងបើក Dashboard...','Account created. Opening dashboard...'));
      setTimeout(()=>location.href='index.html',350);
    }else{
      statusText(msg('បានបង្កើតគណនី។ សូមពិនិត្យ Email ដើម្បីបញ្ជាក់គណនី រួច Login។','Account created. Check your email to confirm it, then sign in.'));
      lockForm(registerForm,false);
    }
  }catch(error){
    statusText(error?.message||msg('មិនអាចបង្កើតគណនីបាន។','Unable to create account.'));
    lockForm(registerForm,false);
  }
});

setAuthLanguage(authLang);
redirectIfSignedIn();
