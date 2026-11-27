/* ---------- セーブの まもり ---------- */
const BACKUP_AT=[['r1',()=>(SV.clear[5]||0)>=1,'1周目の 魔界を クリアした'],['r3',()=>(SV.clear[5]||0)>=3,'3周目の 魔界を クリアした'],['r5',()=>(SV.clear[5]||0)>=5,'5周目の 魔界を クリアした'],['th',()=>(SV.throneWin||0)>=1,'真・魔王ピコールを たおした'],['r10',()=>(SV.clear[5]||0)>=10,'10周目の 魔界を クリアした'],['r20',()=>(SV.clear[5]||0)>=20,'20周目の 魔界を クリアした']];
function backupTick(){if(R||!modalEl.hidden)return;SV.backupAsked=SV.backupAsked||{};const hit=BACKUP_AT.filter(b=>{try{return b[1]()&&!SV.backupAsked[b[0]]}catch(_){return false}});if(!hit.length)return;
 hit.forEach(b=>SV.backupAsked[b[0]]=1);save();const b=hit[hit.length-1];
 modal('<h2>セーブを まもろう</h2><p>'+b[2]+'！ この ぼうけんの 記録は、この ブラウザの 中だけに ある。ブラウザの データを 消したり、べつの 端末で 遊んだりすると 続きから 遊べない。</p><p>設定の「書き出す」で 文字に して とっておくと 安心。</p><div class="opts"><button class="btn" id="bkl">あとで</button><button class="btn primary" id="bkn">書き出す</button></div>',()=>{document.getElementById('bkl').onclick=closeModal;document.getElementById('bkn').onclick=()=>{closeModal();TAB='cfg';renderCamp();setTimeout(()=>{const t=document.getElementById('dataTxt');if(t){try{t.value=btoa(unescape(encodeURIComponent(JSON.stringify(SV))))}catch(_){}t.scrollIntoView({block:'center'})}},60)}})}
setInterval(()=>{if(!document.hidden&&!R)backupTick()},5000);

