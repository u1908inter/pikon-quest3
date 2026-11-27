/* ---------- 装備厳選：品質・輝き・深淵Lv・伝説の効果・セット ---------- */
const rollAfx=(k,r)=>{const q=rnd(),b=AFX[k].v(r),v=AFX[k].dec?Math.round(b*(.6+.8*q)*10)/10:Math.max(1,Math.round(b*(.6+.8*q)));return{k,v,q:Math.round(q*100)/100}};
const LEG={dual:['背中にも 攻撃が 出る',F=>{F.dual=1}],kboom:['たおした 敵が 15%で 爆発する',F=>{F.kboom=1}],boomN:['投げる 武器が 2本 ふえる',F=>{F.boomN+=2}],magicN:['魔法弾が 2発 ふえる',F=>{F.magicN+=2}],wdbl:['技が 30%で もう1回 出る',F=>{F.wazaDbl=(F.wazaDbl||0)+.3}],vamp:['あたえた ダメージで HPを 回復',F=>{F.vamp=(F.vamp||0)+.03}],counter:['ダメージを 受けると 衝撃波',F=>{F.counter=1}],crit:['会心率 +15%・会心ダメージ +50%',F=>{F.crit+=.15;F.critX+=.5}],jg:['必殺技ゲージが 60% たまりやすい',F=>{F.jg*=1.6}],rk:['連携の 威力 2倍',F=>{F.rk*=2}],ally:['仲間の 攻撃 +60%',F=>{F.ally*=1.6}],regen:['毎秒 最大HPの 1%を 回復',F=>{F.regenP+=.01}]};
const SETS={kensei:['剣聖','剣の ダメージ +25%',F=>{F.sword*=1.25},'会心率 +10%・攻撃範囲 +20%',F=>{F.crit+=.1;F.area*=1.2}],shippu:['疾風','投げる 武器の ダメージ +25%',F=>{for(const w in WEAP)if(WEAP[w].fam==='boom')F.wd[w]*=1.25},'投げる 武器が 2本 ふえる',F=>{F.boomN+=2}],kenja:['賢者','魔法の ダメージ +25%',F=>{F.magic*=1.25},'魔法弾が 2発 ふえる',F=>{F.magicN+=2}],shugo:['守護','最大HP +20%',F=>{F.hp*=1.2},'受ける ダメージ -20%',F=>{F.taken*=.8}],kizuna:['絆','仲間の 攻撃 +30%',F=>{F.ally*=1.3},'仲間の 攻撃 +40%・回復 +50%',F=>{F.ally*=1.4;F.allyHeal*=1.5}],shinen:['深淵','深淵で ダメージ +30%',F=>{F.deep2=1},'深淵で 受ける ダメージ -30%',F=>{F.deep3=1}]};
function gearExtras(it){const r=it.r,ab=R&&R.mode==='endless';if(ab)it.alv=Math.floor(Math.max(0,R.t)/60)+1;if(R&&rnd()<(pOn('shiny2')?1/125:1/250))it.shiny=1;
 if(it.u||it.a)return it;if((r===3&&rnd()<.3)||r===6)it.lg=pick(Object.keys(LEG));
 if(r>=1&&r<=3&&rnd()<.12)it.set=ab&&rnd()<.35?'shinen':pick(['kensei','shippu','kenja','shugo','kizuna']);
 if(ab&&it.afx&&rnd()<.25&&!it.afx.some(a=>a.k==='deep'))it.afx.push(rollAfx('deep',Math.min(r,3)));return it}
const itQ=it=>{const a=(it.afx||[]).filter(x=>x.q!=null);return a.length?Math.round(a.reduce((t,x)=>t+x.q,0)/a.length*100):null};
const itPerfect=it=>{const a=(it.afx||[]);return a.length>=2&&a.every(x=>x.q!=null&&x.q>=.95)};
const itWant=it=>(it.afx||[]).some(a=>SV.want&&SV.want[a.k]);
const itSpecial=it=>!!(it.shiny||it.lg||it.set||itPerfect(it)||itWant(it));
function setCount(){const c={};for(const sl in SV.eq){const it=SV.inv.find(i=>i.id===SV.eq[sl]);if(it&&it.set)c[it.set]=(c[it.set]||0)+1}return c}
function makeItem(minR,fix){const x=rnd();let r=x<.03?3:x<.15?2:x<.45?1:0;r=Math.max(r,minR||0);if(pOn('myth')&&rnd()<.02)r=6;let slot=pick(['w','s','c']);if(fix&&fix.r!=null){r=fix.r;slot=fix.slot||slot}const ks=shuffle(AFX_POOL.slice()).slice(0,Math.min(AFX_POOL.length,r+1));const wt=slot==='w'?(fix&&fix.wt||(rnd()<.75?JOBS[SV.job].w:pick(Object.keys(WEAP)))):undefined;
 return gearExtras({id:Date.now().toString(36)+rnd().toString(36).slice(2,7),slot,r,wt,name:(r===6?'神話の ':'')+(slot==='w'?WNAMES[wt][Math.min(r,3)]:BASES[slot][Math.min(r,3)]),ref:0,cards:[],lock:false,isNew:true,base:slot==='w'?{dmg:5+5*r}:slot==='s'?{hp:10+10*r}:{},afx:ks.map(k=>rollAfx(k,r))})}
function itemStats(it){const o={},m=(1+.1*it.ref)*(1+.05*(it.alv||0))*(it.shiny?1.5:1);for(const k in it.base)o[k]=(o[k]||0)+it.base[k]*m;for(const a of it.afx)o[a.k]=(o[a.k]||0)+a.v*m;for(const c of it.cards||[])if(c&&CARDFX[c]){const[a,v]=CARDFX[c];o[a]=(o[a]||0)+v}return o}
function eqStats(){const o={dmg:0,hp:0,spd:0,cd:0,area:0,mag:0,xp:0,hira:0,gold:0,deep:0};for(const sl in SV.eq){const it=SV.inv.find(i=>i.id===SV.eq[sl]);if(it){const st=itemStats(it);for(const k in st)o[k]+=st[k]}}if(abOn('suppin5'))for(const k in o)o[k]*=1.1;o.cd=Math.min(o.cd,40);return o}
const fmtSt=(k,v)=>AFX[k].n+(AFX[k].neg?'-':'+')+(AFX[k].dec?(Math.round(v*10)/10):Math.round(v))+AFX[k].u;
function itemLines(it){const st=itemStats(it),wk=new Set((it.afx||[]).filter(a=>SV.want&&SV.want[a.k]).map(a=>a.k));return Object.keys(st).map(k=>wk.has(k)?'<b style="color:#d49a00">★'+fmtSt(k,st[k])+'</b>':fmtSt(k,st[k])).join('　')}
const itemName=it=>(it.shiny?'✨':'')+(it.set?SETS[it.set][0]+'の ':'')+it.name+(it.ref?' +'+it.ref:'');
const maxHP=()=>Math.round((100+10*SV.up.hp+5*(SV.lv-1)+eqStats().hp)*flags().hp);
const ALLY_EVO={
 slime:['ヒールスライム','heal'],bat:['ヴァンパイアバット','drain'],mush:['ねむりダケ','sleep'],wolf:['シルバーウルフ','thunder'],skull:['ガイコツ剣士','nova'],ghost:['ファントム','frost'],
 cactus:['ニードルキング','nova'],scorpion:['デスストーカー','poison'],snowman:['スノーキング','frost'],icebat:['ブリザードバット','frost'],imp:['アークデーモン','fire'],darkskull:['リッチ','drain'],
 slimeR:['ルビースライム','heal'],trent:['エルダートレント','sleep'],golemS:['ストーンガーディアン','nova'],scorpionB:['キングスコーピオン','poison'],yeti:['ビッグフット','frost'],maknight:['暗黒騎士','thunder'],
 king:['スライムエンペラー','heal'],forestlord:['世界樹の守り手','sleep'],golem:['アダマンゴーレム','nova'],giant:['砂漠の王','nova'],fenrir:['天狼','thunder'],demon:['大魔王ピコール','fire']};
const EVOFX={heal:'6秒ごとに ゆうしゃの HPを 回復',drain:'6秒ごとに まわりの敵の 命を 吸って 回復',sleep:'6秒ごとに まわりの敵を 眠らせる',thunder:'6秒ごとに 雷を 4本 落とす',nova:'6秒ごとに まわりを 爆発させる',frost:'6秒ごとに まわりの敵を 凍らせる',poison:'6秒ごとに まわりの敵を 毒に する',fire:'6秒ごとに 隕石を 3つ 降らせる'};
const ALLY_COMBO=[
 ['slime','king','スライムタワー','まわりを 大きく 押しつぶし、HPを 20% 回復'],['bat','icebat','コウモリの嵐','3秒間 まわりに 嵐が 吹きあれる'],
 ['mush','trent','森の怒り','画面の 敵を 3秒 止める'],['wolf','fenrir','群狼の牙','画面の 敵 12体に 牙の 一撃'],
 ['skull','maknight','死霊騎士団','ガイコツ兵が 4体 10秒間 助けに 来る'],['ghost','darkskull','冥界の門','画面の 敵に 大ダメージ、6秒間 受ける ダメージ+50%'],
 ['cactus','scorpion','砂嵐','まわりの 敵を 吸いこんで 切りきざむ'],['golemS','golem','大地割り','まわりの 敵に 特大ダメージ'],
 ['snowman','yeti','大吹雪','画面の 敵を 凍らせて ダメージ'],['imp','demon','地獄の業火','炎の 柱を 8本 立てる'],
 ['scorpionB','giant','砂漠の死神','画面の 敵を 猛毒に する'],['king','demon','魔王スライム','巨大な 隕石を 落とす']];
const comboKey=c=>c[0]+'+'+c[1];
const allyGrade=k=>ETYPE[k]&&ETYPE[k].boss?2:ETYPE[k]&&ETYPE[k].elite?1:0;
const upperOf=k=>{const st=stageOf(k),g=allyGrade(k);return st<0||g>=2?null:g===1?STAGES[st].boss:STAGES[st].elite};
const evoMat=k=>{const st=stageOf(k),S=STAGES[st],g=allyGrade(k);return g===0?S.foes.find(f=>f!==k):g===1?S.foes[0]:S.elite};
const ALLY_MAX=99,EVO_LV=99,allyCap=A=>A&&A.evo?1e9:ALLY_MAX,evoCost=k=>300*(allyGrade(k)+1),fuseCost=k=>{const A=SV.allies[k];return Math.round(15*(A.lv+1)*(1+.1*(A.plus||0)))*(SV.fmode==='wild'?2:1)};
const allyName=k=>{const A=SV.allies[k];return (A&&A.evo?ALLY_EVO[k][0]:ALLY[k].n)+(A&&A.plus?'+'+A.plus:'')};
const allyPal=k=>{const A=SV.allies[k];return A&&A.evo?'e'+ALLY[k].pal:ALLY[k].pal};
const allyMul=a=>(1+.03*(a.plus||0))*(a.evo?1.5:1)*Math.pow(ABY.alb,Math.max(0,(a.lv||0)-ALLY_MAX));
const soulUse=k=>SV.souls[k]||0;
const fuseModeOpen=()=>SV.jobs.mamono&&SV.jobs.mamono.lv>=JOB_MAX;
const allySlots=()=>Math.min(5,1+SV.up.slot+flags().slot)+pCnt(['ally6','ally7','ally8','ally9','ally10']);

