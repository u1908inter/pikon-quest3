/* ---------- 目標（前作と同じ形） ---------- */
const clrd=(st,rd=1)=>(SV.clear[st]||0)>=rd,jmax=()=>Math.max(...Object.values(SV.jobs).map(j=>j.lv||0)),refTop=()=>Math.max(0,...SV.inv.map(i=>i.ref||0)),nk=o=>Object.keys(o||{}).length;
const GOALS=[
 ['g_run','はじめて 出撃する',()=>SV.runs>=1],
 ['g_lv3','勇者ランクを 3に 上げる',()=>SV.lv>=3,()=>'ランク'+SV.lv+'/3'],
 ['g_c0','草原を クリアする',()=>clrd(0)],
 ['g_hira','技を ひらめく',()=>nk(SV.waza)>=1],
 ['g_ally','仲間を つくる（ハートを 拾う）',()=>nk(SV.allies)>=1],
 ['g_inv','装備を 3こ 持つ',()=>SV.inv.length>=3,()=>SV.inv.length+'/3'],
 ['g_c1','森を クリアする',()=>clrd(1)],
 ['g_up','町の 施設を 強化する',()=>Object.values(SV.up).reduce((a,b)=>a+b,0)>=1],
 ['g_abil','アビリティを はめる',()=>SV.abil.length>=1],
 ['g_jlv','ジョブLv5に する',()=>jmax()>=5,()=>'Lv'+jmax()+'/5'],
 ['g_c2','洞窟を クリアする',()=>clrd(2)],
 ['g_ref','装備を +3まで 精錬する',()=>refTop()>=3,()=>'+'+refTop()+'/+3'],
 ['g_chg','ほかの ジョブに 転職する',()=>SV.job!=='kenshi'||!!SV.prevJob],
 ['g_eqset','装備セットを 保存する（装備タブ）',()=>nk(SV.eqSets)>=1],
 ['g_card','カードを 5種 集める',()=>nk(SV.album)>=5,()=>nk(SV.album)+'/5'],
 ['g_party','仲間を 3体 連れて行く',()=>SV.party.length>=3,()=>SV.party.length+'/3'],
 ['g_c3','砂漠を クリアする',()=>clrd(3)],
 ['g_rk','連携を 出す',()=>nk(SV.rkBook)>=1],
 ['g_waza5','技を 5種 ひらめく',()=>nk(SV.waza)>=5,()=>nk(SV.waza)+'/5'],
 ['g_mast','ジョブを 1つ マスターする',()=>mastered().length>=1],
 ['g_c4','雪山を クリアする',()=>clrd(4)],
 ['g_fuse','仲間を 合体させる',()=>Object.values(SV.allies).some(a=>(a.plus||0)>=1)],
 ['g_evo','冒険中に 武器を 進化させる',()=>Object.keys(EVO).some(k=>SV.book[k])],
 ['g_c5','魔界を クリアする',()=>clrd(5)],
 ['g_trial','今日の 試練を 達成する',()=>((SV.stats||{}).trials||0)>=1],
 ['g_combo','仲間の 合体技を 出す',()=>nk(SV.comboBook)>=1],
 ['g_rd2','魔界の 2周目を クリアする',()=>clrd(5,2)],
 ['g_ach10','実績を 10こ 達成する',()=>achN()>=10,()=>achN()+'/10'],
 ['g_ref7','装備を +7まで 精錬する',()=>refTop()>=7,()=>'+'+refTop()+'/+7'],
 ['g_mast5','ジョブを 5つ マスターする',()=>mastered().length>=5,()=>mastered().length+'/5'],
 ['g_rd3','魔界の 3周目を クリアする',()=>clrd(5,3)],
 ['g_ally12','仲間を 12種 集める',()=>nk(SV.allies)>=12,()=>nk(SV.allies)+'/12'],
 ['g_rd5','魔界の 5周目を クリアする',()=>clrd(5,5)],
 ['g_arti','神器を 手に入れる',()=>SV.inv.some(i=>i.r>=5)||nk(SV.artLv)>0],
 ['g_rr','装備の 効果を 付け直す（装備を タップ）',()=>(SV.rrN||0)>=1],
 ['g_mast15','ジョブを 15こ マスターする',()=>mastered().length>=15,()=>mastered().length+'/15'],
 ['g_rd10','魔界の 10周目を クリアする',()=>clrd(5,10)],
 ['g_altar','深淵の祭壇で 強化する',()=>altarSum()>=1],
 ['g_ab10','無限の深淵で 10分 生きのびる',()=>(SV.endBest||0)>=600,()=>fmtT(SV.endBest||0)+'/10:00'],
 ['g_set2','セット装備を 2つ そろえる',()=>!!(SV.stats||{}).set2],
 ['g_ab15','無限の深淵で 15分 生きのびる',()=>(SV.endBest||0)>=900,()=>fmtT(SV.endBest||0)+'/15:00'],
 ['g_lg','伝説の 効果の 装備を 手に入れる',()=>nk(SV.lgBook)>=1],
 ['g_ab20','無限の深淵で 20分 生きのびる',()=>(SV.endBest||0)>=1200,()=>fmtT(SV.endBest||0)+'/20:00'],
 ['g_throne','真・魔王ピコールを たおす',()=>(SV.throneWin||0)>=1],
 ['g_rank100','勇者ランクを 100に 上げる',()=>SV.lv>=100,()=>'ランク'+SV.lv+'/100'],
 ['g_ab30','無限の深淵で 30分 生きのびる',()=>(SV.endBest||0)>=1800,()=>fmtT(SV.endBest||0)+'/30:00'],
 ['g_altar30','祭壇を 合計 30段 強化する',()=>altarSum()>=30,()=>altarSum()+'/30'],
 ['g_ab45','無限の深淵で 45分 生きのびる',()=>(SV.endBest||0)>=2700,()=>fmtT(SV.endBest||0)+'/45:00'],
 ['g_ab60','無限の深淵で 60分 生きのびる',()=>(SV.endBest||0)>=3600,()=>fmtT(SV.endBest||0)+'/60:00'],
 ['g_jall','25の ジョブを すべて マスターする',()=>mastered().length>=25,()=>mastered().length+'/25']];
const goalOk=g=>{try{return !!g[2]()}catch(_){return false}};
function goalReward(i){return {gold:Math.round(80*Math.pow(1+i,1.55)/10)*10,ab:i>=22?2+Math.floor((i-22)/3):0}}
const rewTxt=rw=>rw.gold+'G'+(rw.ab?'・深淵のかけら '+rw.ab+(abyssOpen()?'':'（神器の 強化に 使える）'):'');
const goalsDone=()=>GOALS.filter(g=>(SV.goals||{})[g[0]]).length;
function goalsShown(){SV.goals=SV.goals||{};return GOALS.map((g,i)=>({g,i})).filter(o=>!SV.goals[o.g[0]]).slice(0,3)}
const goalsReady=()=>goalsShown().filter(o=>goalOk(o.g)).length;
function panelGoals(){const list=goalsShown(),done=goalsDone();
 let h='<h3>目標（'+done+'／'+GOALS.length+'）</h3><div class="row" style="margin:-4px 0 6px"><button class="btn sm" data-act="goalList">目標の 一覧を 見る</button>'+(goalsReady()>=2?'<button class="btn sm primary" data-act="goalAll">まとめて 受け取る</button>':'')+'</div>';
 if(!list.length)return h+'<p class="hint">すべての 目標を たっせいした！</p>';
 return h+'<div class="list">'+list.map(({g,i})=>{const ok=goalOk(g),rw=goalReward(i),pg=!ok&&g[3]?'<span class="d">'+g[3]()+'</span>':'';
  return '<div class="li'+(ok?'':' locked')+'" style="cursor:default;align-items:center"><div class="body"><div class="t"><span>'+(ok?'<span style="color:#d49a00">★</span> ':'')+g[1]+'</span>'+pg+'</div><div class="d">ごほうび：'+rewTxt(rw)+'</div></div><button class="btn sm primary" data-act="goalClaim" data-k="'+g[0]+'"'+(ok?'':' disabled')+'>受け取る</button></div>'}).join('')+'</div>'}
function showGoalList(){SV.goals=SV.goals||{};const first=GOALS.findIndex(g=>!SV.goals[g[0]]),lim=first<0?GOALS.length:first+5;
 const rows=GOALS.map((g,i)=>{const got=SV.goals[g[0]],ok=!got&&goalOk(g),hide=!got&&!ok&&i>=lim,pg=!got&&!ok&&!hide&&g[3]?'　'+g[3]():'';
  const mark=got?'<span style="color:#2a8a4a">✓</span>':ok?'<span style="color:#d49a00">★</span>':'<span class="hint">・</span>';
  return '<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid var(--line)"><span style="flex:none;width:1.2em;text-align:center">'+mark+'</span><span style="flex:1;'+(got?'color:#888':'')+'">'+(hide?'？？？':g[1])+'<span class="hint">'+pg+'</span></span><span class="hint" style="flex:none;font-size:11px">'+(hide?'':rewTxt(goalReward(i)))+'</span></div>'}).join('');
 modal('<h2>目標の 一覧（'+goalsDone()+'／'+GOALS.length+'）</h2><p class="hint">✓ 受け取りずみ　★ たっせい（出撃タブで 受け取れる）　・ まだ</p><div style="max-height:56vh;overflow:auto;text-align:left">'+rows+'</div><div class="opts"><button class="btn primary big" id="glc">とじる</button></div>',()=>{document.getElementById('glc').onclick=closeModal})}
function claimGoal(k){const i=GOALS.findIndex(g=>g[0]===k);SV.goals=SV.goals||{};if(i<0||SV.goals[k]||!goalOk(GOALS[i]))return null;const rw=goalReward(i);SV.goals[k]=1;SV.gold+=rw.gold;if(rw.ab)SV.abyss=(SV.abyss||0)+rw.ab;try{sfx.hira()}catch(_){}save();return rw}
function goalNews(){SV.goalSeen=SV.goalSeen||{};const out=[];for(const{g}of goalsShown())if(!SV.goalSeen[g[0]]&&goalOk(g)){SV.goalSeen[g[0]]=1;out.push(g[1])}return out}

