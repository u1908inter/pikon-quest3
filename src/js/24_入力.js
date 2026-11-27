/* ---------- 入力 ---------- */
const rect=()=>cv.getBoundingClientRect();
cv.addEventListener('pointerdown',e=>{if(!R){const r0=rect();campTap((e.clientX-r0.left)/r0.width*VW,(e.clientY-r0.top)/r0.height*VH);return}if(stick.on)return;const r=rect();stick.on=true;stick.id=e.pointerId;stick.ox=e.clientX-r.left;stick.oy=e.clientY-r.top;stick.x=stick.y=0;try{cv.setPointerCapture(e.pointerId)}catch(_){}});
cv.addEventListener('pointermove',e=>{if(!stick.on||e.pointerId!==stick.id)return;const r=rect();let dx=e.clientX-r.left-stick.ox,dy=e.clientY-r.top-stick.oy;const l=Math.hypot(dx,dy),mx=36;if(l<4){stick.x=stick.y=0;return}const k=Math.min(l,mx)/mx/l;stick.x=dx*k;stick.y=dy*k});
const up=e=>{if(e.pointerId!==stick.id)return;stick.on=false;stick.x=stick.y=0};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
jb.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();jobSkill()});
addEventListener('keydown',e=>{keys[e.key]=true;if(e.key===' '&&R&&!R.over&&!R.paused){e.preventDefault();jobSkill()}if(e.key==='Escape')document.getElementById('pause').click()});addEventListener('keyup',e=>{keys[e.key]=false});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&R&&!R.paused&&!R.over)document.getElementById('pause').click()});
window.PQ3={get R(){return R},SV,ev:s=>eval(s)};
toCamp();requestAnimationFrame(t=>{last=t;loop(t)});
}
