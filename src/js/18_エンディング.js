/* ---------- エンディング ---------- */
function playEnding(done){SV.endingPend=0;SV.endingSeen=1;save();R=null;hud.style.display='none';jb.style.display='none';
 const al=Object.keys(SV.allies),pt=SV.party.filter(k=>SV.allies[k]).slice(0,6);
 const L=[['big','ピコーン・クエスト3'],['',''],['','魔王ピコールは たおれ、'],['','10周に わたる 旅は おわった。'],['',''],
  ['h','ぼうけんの きろく'],['','勇者ランク '+SV.lv],['','出撃 '+SV.runs+'回'],['','たおした 敵 '+fmtG((SV.stats||{}).kills||0)+'体'],['','ひらめいた 技 '+Object.keys(SV.waza).length+'種'],['','仲間 '+al.length+'種'],['','マスターした ジョブ '+mastered().length+'こ'],['','見つけた 連携 '+Object.keys(SV.rkBook).length+'種'],['',''],
  ['h','いっしょに たたかった 仲間'],['sp',pt.length?pt.map(k=>sprImg(ALLY[k].sp,allyPal(k),40)).join(' '):'―'],['',pt.map(k=>allyName(k)).join('・')],['',''],
  ['h','つくった ひと'],['','u1908inter'],['',''],['h','あそんでくれた あなた'],['','ありがとう！'],['',''],['',''],
  ['','…しかし、'],['','魔界の 奥底に、はてしない 闇が ひろがっている。'],['',''],['big','つづきは 無限の深淵で'],['',''],['','（無限の深淵と 祭壇が ひらいた）']];
 const ov=document.createElement('div');ov.id='ending';ov.style.cssText='position:fixed;inset:0;z-index:60;background:#0b0f1a;color:#fff;overflow:hidden;text-align:center;font-size:15px';
 ov.innerHTML='<div id="endRoll" style="position:absolute;left:0;right:0;top:100%;padding:0 16px;line-height:2">'+sprImg('hero',heroPal(),56)+'<br>'+L.map(([t,x])=>t==='big'?'<div style="font-size:22px;color:#ffd34e;margin:10px 0">'+x+'</div>':t==='h'?'<div style="color:#9fd8cb;margin-top:6px">― '+x+' ―</div>':t==='sp'?'<div>'+x+'</div>':'<div>'+(x||'&nbsp;')+'</div>').join('')+'</div><div style="position:absolute;right:10px;bottom:8px;font-size:11px;opacity:.6">タップで とばす</div>';
 document.body.appendChild(ov);const roll=ov.querySelector('#endRoll');let y0=null,fin=false;const H=()=>roll.offsetHeight+ov.offsetHeight;
 const end=()=>{if(fin)return;fin=true;ov.remove();done&&done()};
 const tick=t=>{if(fin)return;if(y0==null)y0=t;const dy=(t-y0)/1000*42;roll.style.transform='translateY('+(-dy)+'px)';if(dy>H()-ov.offsetHeight*.45){if(!ov.querySelector('#endBtn')){const b=document.createElement('button');b.id='endBtn';b.className='btn primary big';b.textContent='拠点へ もどる';b.style.cssText='position:absolute;left:50%;bottom:24px;transform:translateX(-50%);width:auto;padding:0 28px';b.onclick=e=>{e.stopPropagation();end()};ov.appendChild(b)}return}requestAnimationFrame(tick)};
 ov.addEventListener('click',e=>{if(e.target.id!=='endBtn')end()});requestAnimationFrame(tick)}

