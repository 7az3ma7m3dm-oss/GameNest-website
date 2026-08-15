const ring=document.querySelector('.cursor-ring');
const dot=document.querySelector('.cursor-dot');
document.addEventListener('mousemove',e=>{
  if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}
  if(ring){ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px'}
});
document.querySelectorAll('a,button,summary').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});

const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menu){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',open);
  });
}
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const toast=document.querySelector('.toast');
function showToast(message){
  if(!toast)return;
  toast.textContent=message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1800);
}
document.querySelectorAll('.copy-contact').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(btn.dataset.copy);showToast('Copied: '+btn.dataset.copy)}
    catch{showToast(btn.dataset.copy)}
  });
});
document.querySelectorAll('.order-btn').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const text='I want to order: '+btn.dataset.product;
    try{await navigator.clipboard.writeText(text);showToast('Order details copied â€” message GameNest')}
    catch{showToast('Order: '+btn.dataset.product)}
    document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'});
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
