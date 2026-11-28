/* ---------- 保存 ---------- */
const KEY='pq3-vs';
const DEF=()=>({comboBook:{},lv:1,exp:0,gold:0,up:{atk:0,hp:0,spd:0,slot:0},allies:{},party:[],book:{},runs:0,best:0,clears:0,waza:{},bring:[],inv:[],eq:{w:null,s:null,c:null},tego:{},job:'kenshi',jobs:{kenshi:{lv:1,exp:0},mahou:{lv:1,exp:0},mamono:{lv:1,exp:0},suppin:{lv:1,exp:0}},abil:[],ext:{},pw:[null,null,null],clear:[0,0,0,0,0,0],sel:{st:0,rd:1},cards:{},album:{},rkBook:{},opt:{sound:true,zoom:true}});
const SV=Object.assign(DEF(),(()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}})());
const SAVE_V=3,GAME_VER='0.9.12';
function migrateSave(){const v=SV.v||0;
 if(v<3){SV.comboBook=SV.comboBook||{};SV.want=SV.want||{};SV.eqSets=SV.eqSets||{};SV.altar=SV.altar||{};SV.stats=SV.stats||{};SV.seen=SV.seen||{};SV.lgBook=SV.lgBook||{};SV.setBook=SV.setBook||{};SV.goals=SV.goals||{};SV.hist=SV.hist||[];SV.lose=SV.lose||{};
  (SV.inv||[]).forEach(it=>{it.afx=it.afx||[];it.cards=it.cards||[]});if(!Array.isArray(SV.pw))SV.pw=[null,null,null]}
 SV.v=SAVE_V}
migrateSave();
let lastSave=0,_saveWarned=false,_saveErr='';
function saveNow(){if(window._noSave)return true;try{_saveErr='';localStorage.setItem(KEY,JSON.stringify(SV));lastSave=Date.now();return true}catch(e){_saveErr=(e&&e.name)||'err';saveFailed();return false}}
const save=()=>{saveNow()};
/* アクセス解析（GitHub Pages の 公開版だけ。セーブごとに 1回ずつ 送る） */
function track(k,title){try{const gc=window.goatcounter;if(!gc||typeof gc.count!=='function'||SV.debug)return;SV.trk=SV.trk||{};if(SV.trk[k])return;SV.trk[k]=1;const h=location.hostname,site=h.includes('github.io')?'':h.includes('plicy')?'plicy-':'x-';gc.count({path:'pq3-'+site+k,title:'PQ3 '+title,event:true})}catch(_){}}
function saveFailed(){try{track('savefail-'+(_saveErr||'x'),'セーブ失敗 v'+GAME_VER+' '+(_saveErr||''))}catch(_){}if(_saveWarned)return;_saveWarned=true;try{toast('セーブに 失敗した。設定の「書き出す」で バックアップしてね')}catch(_){}}
function manualSave(){let ok=true;try{ok=saveNow()&&localStorage.getItem(KEY)===JSON.stringify(SV)}catch(e){ok=false}
 if(ok)toast('セーブした（'+new Date().toLocaleTimeString('ja-JP')+'）');
 else toast('セーブできなかった（'+(/quota/i.test(_saveErr)?'ブラウザの 保存場所が いっぱい':'この 画面では 保存が つかえない')+'）。設定の「書き出す」で バックアップしてね');
 if(!R)renderCamp()}
const lastSaveText=()=>lastSave?new Date(lastSave).toLocaleTimeString('ja-JP'):'―';
addEventListener('pagehide',()=>saveNow());document.addEventListener('visibilitychange',()=>{if(document.hidden)saveNow()});
const metaNeed=lv=>(60+lv*40)*DIF.lvx,allyNeed=lv=>30*lv;

