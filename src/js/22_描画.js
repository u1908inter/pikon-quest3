/* ---------- 描画 ---------- */
const hash=(x,y)=>{let h=(x*374761393+y*668265263)^0x5bd1e995;h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967296};
const fontSeen=new Set();function fontLoad(s){s=String(s);if(fontSeen.has(s))return;fontSeen.add(s);try{document.fonts.load("16px 'DotGothic16'",s).catch(()=>fontSeen.delete(s))}catch(e){}}
function txt(s,x,y,c,sz,sc){const z=(sz||8)*K*(sc||1);tg.font=Math.round(z)+"px 'DotGothic16','MS Gothic','Osaka-Mono',ui-monospace,monospace";fontLoad(s);tg.textAlign='center';tg.textBaseline='middle';tg.lineJoin='round';tg.lineWidth=Math.max(2,z*.22);tg.strokeStyle='#000';tg.strokeText(s,x*K,y*K);tg.fillStyle=c;tg.fillText(s,x*K,y*K)}
function txtFit(t,x,y,c,sz){tg.font=Math.round(sz*K)+"px 'DotGothic16','MS Gothic','Osaka-Mono',ui-monospace,monospace";fontLoad(t);const w=tg.measureText(t).width/K;txt(t,x,y,c,Math.max(6,Math.min(sz,sz*(VW-10)/w)))}
