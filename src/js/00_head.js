
{
const jb=document.getElementById('jb'),cv=document.getElementById('cv'),g=cv.getContext('2d'),tx=document.getElementById('tx'),tg=tx.getContext('2d'),hud=document.getElementById('hud');
const VW=180;let VH=400,K=2;
function resize(){const r=cv.getBoundingClientRect();VH=Math.round(VW*r.height/Math.max(1,r.width));cv.width=VW;cv.height=VH;g.imageSmoothingEnabled=false;const dpr=Math.min(QL()==='high'?3:QL()==='mid'?2:1.5,window.devicePixelRatio||1);tx.width=Math.round(r.width*dpr);tx.height=Math.round(r.height*dpr);K=tx.width/VW}
addEventListener('resize',resize);resize();
const rnd=Math.random,pick=a=>a[Math.floor(rnd()*a.length)],shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const STAGE_LEN=120,TF=180/STAGE_LEN;

