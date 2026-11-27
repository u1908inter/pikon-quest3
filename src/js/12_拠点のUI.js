/* ---------- 拠点のUI（前作と同じ形） ---------- */
const app=document.getElementById('app'),panel=document.getElementById('panel'),modalEl=document.getElementById('modal'),mbox=document.getElementById('mbox');
let TAB='go',GEARV='eq',GEARF='all';
function setMode(m){app.classList.toggle('battle',m==='battle');app.classList.toggle('camp',m!=='battle');resize()}
function modal(h,bind){mbox.innerHTML=h;modalEl.hidden=false;mbox.scrollTop=0;bind&&bind()}
function closeModal(){modalEl.hidden=true;mbox.innerHTML=''}
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;app.appendChild(d);setTimeout(()=>d.remove(),2200)}
const sprImg=(key,pal,w)=>'<img class="px" src="'+spr(key,pal).toDataURL()+'" width="'+w+'" height="'+w+'" alt="">';
const HERO_COL={'':['ジョブの 色',0,null],abyss:['深淵の 黒金',0,'#20142e'],rainbow:['虹',0,'#ff6bd0'],red:['赤',800,'#d0393b'],green:['緑',800,'#3f9a45'],black:['黒',800,'#2a2a33'],white:['白',800,'#e8eef5'],pink:['桃',800,'#ff8ac0'],gold:['金',3000,'#e0b020']};
const heroPal=j=>{const base='hero_'+(j||SV.job),c=SV.cos&&SV.cos.col;if(!c||!HERO_COL[c]||!PAL[base])return base;if(c==='rainbow'){const b=Math.floor(performance.now()/120)%12,key=base+'_rb'+b;if(!PAL[key])PAL[key]=Object.assign({},PAL[base],{b:'hsl('+b*30+',85%,60%)'});return key}const key=base+'_'+c;if(!PAL[key])PAL[key]=Object.assign({},PAL[base],{b:HERO_COL[c][2]});return key};
const DECO_SHOP={flag:['旗',300,[-58,-6],'風に はためいている'],chest:['宝箱',500,[-52,26],'からっぽ… でも ワクワク'],scare:['かかし',400,[68,-24],'カァ〜'],flower:['花だん',300,[-30,34],'いい かおり'],lantern:['ランタン',600,[22,-20],'ぽかぽか あったかい'],sign:['看板',200,[2,-28],'ピコーン・クエスト3へ ようこそ'],statue:['ピコーン像',5000,[-66,-22],'ピコーン！']};
const FIRE_COL={'':['ふつうの 炎',0,['#ffd34e','#ff7a2a']],abyss:['深淵の 紫炎',0,['#f0b8ff','#5a1a9a']],blue:['青い 炎',1000,['#9ae6ff','#3a7bd5']],green:['緑の 炎',1000,['#b8ff6a','#3f9a45']],purple:['紫の 炎',2000,['#ffb3ff','#8a4fd1']]};
const cosOwn=k=>!!(SV.cos&&SV.cos.own[k]),fireCols=()=>(FIRE_COL[(SV.cos&&SV.cos.fire)||'']||FIRE_COL[''])[2];
const ACH=[
 ['clear1','はじめての クリア','ステージを 1回 クリアする',()=>SV.clears>=1],['streak100','100連撃','1回の 冒険で 100連撃',c=>c&&c.maxStreak>=100],['streak500','500連撃','1回の 冒険で 500連撃',c=>c&&c.maxStreak>=500],
 ['nodmg','無傷の 勇者','ダメージを 受けずに ステージを クリア',c=>c&&c.win&&c.mode==='stage'&&!c.hurtN],['boss10','瞬殺','ボスを 出てから 10秒以内に たおす',c=>c&&c.bossDt!=null&&c.bossDt<=10],
 ['rd5','5周目の 覇者','魔界の 5周目を クリア',()=>(SV.clear[5]||0)>=5],['rd10','魔王討伐','魔界の 10周目を クリアして エンディングを 見る',()=>(SV.clear[5]||0)>=10],
 ['job10','ジョブ 10こ マスター','ジョブを 10こ マスター',()=>mastered().length>=10],['jobAll','全ジョブ マスター','25の ジョブを すべて マスター',()=>mastered().length>=25],
 ['ally24','魔物博士','仲間を 24種 そろえる',()=>Object.keys(SV.allies).length>=24],['ally99','最高の 相棒','仲間を Lv99に する',()=>Object.values(SV.allies).some(a=>a.lv>=99)],
 ['combo12','合体技 マスター','合体技を 12種 すべて 出す',()=>Object.keys(SV.comboBook||{}).length>=12],['rk20','連携の 達人','連携を 20種 出す',()=>Object.keys(SV.rkBook).length>=20],
 ['waza14','ひらめきの 天才','技を 14種 すべて ひらめく',()=>Object.keys(SV.waza).length>=14],['kiwami','極み','技を 極に する',()=>Object.values(SV.waza).some(w=>w.star>=6)],
 ['evo13','武器の 匠','武器を 13種 すべて 進化させる',()=>Object.keys(EVO).every(k=>SV.book[k])],['cardAll','カード 収集家','カード図鑑を うめる',()=>ALLCARDS.every(k=>SV.album[k])],
 ['ref10','鍛冶の 鬼','装備を +10に する',()=>SV.inv.some(i=>i.ref>=10)],['abyss5','深淵の 旅人','無限の深淵で 5分 生きのびる',()=>(SV.endBest||0)>=300],['abyss10','深淵の 主','無限の深淵で 10分 生きのびる',()=>(SV.endBest||0)>=600],
 ['trial10','試練の 求道者','試練を 10回 達成',()=>((SV.stats||{}).trials||0)>=10],['tmaou','真の 勇者','真・魔王ピコールを たおす',()=>(SV.throneWin||0)>=1],
 ['artMax','神器 使い','神器を ✦10に する',()=>Object.values(SV.artLv||{}).some(v=>v>=10)],['gold1m','大富豪','ゴールドを 100万 持つ',()=>SV.gold>=1e6],
 ['run10','かけだし 冒険者','10回 出撃する',()=>SV.runs>=10],['run100','歴戦の 勇者','100回 出撃する',()=>SV.runs>=100],
 ['kill1k','千体 斬り','敵を 合計 1000体 たおす',()=>((SV.stats||{}).kills||0)>=1000],['kill10k','万体 斬り','敵を 合計 10000体 たおす',()=>((SV.stats||{}).kills||0)>=10000],['kill100k','伝説の 狩人','敵を 合計 100000体 たおす',()=>((SV.stats||{}).kills||0)>=100000],
 ['lv30','一人前','勇者ランクを 30に 上げる',()=>SV.lv>=30],['lv60','英雄','勇者ランクを 60に 上げる',()=>SV.lv>=60],
 ['allSt','全土 制覇','6つの ステージを すべて クリア',()=>STAGES.every((_,i)=>(SV.clear[i]||0)>=1)],['master1','はじめての マスター','ジョブを 1つ マスター',()=>mastered().length>=1],
 ['party5','大所帯','仲間を 5体 連れて行く',()=>SV.party.length>=5],['fuse10','合体 マニア','仲間を 合計 10回 合体させる',()=>Object.values(SV.allies).reduce((a,b)=>a+(b.plus||0),0)>=10],
 ['allyEvo','？？？の 目覚め','仲間を 進化させる',()=>Object.values(SV.allies).some(a=>a.evo),1],
 ['hira3','ひらめき 連発','1回の 冒険で 技を 3つ ひらめく',c=>c&&c.hira>=3],['streak1k','1000連撃','1回の 冒険で 1000連撃',c=>c&&c.maxStreak>=1000],
 ['trial30','試練の 覇者','試練を 30回 達成',()=>((SV.stats||{}).trials||0)>=30],['abyss20','深淵の 底','無限の深淵で 20分 生きのびる',()=>(SV.endBest||0)>=1200],
 ['throne10','玉座の 常連','真・魔王ピコールを 10回 たおす',()=>(SV.throneWin||0)>=10],['deco5','拠点の 匠','雑貨屋の 品を 5つ 集める',()=>Object.keys((SV.cos||{}).own||{}).length>=5],
 ['gold100k','小金持ち','ゴールドを 10万 持つ',()=>SV.gold>=1e5],['goalAll','目標 達成者','目標を すべて たっせい',()=>goalsDone()>=GOALS.length],
 ['rank100','限界を こえし者','勇者ランクを 100に 上げる',()=>SV.lv>=100],['rank200','伝説の 勇者','勇者ランクを 200に 上げる',()=>SV.lv>=200],
 ['abyss30','深淵の 王','無限の深淵で 30分 生きのびる',()=>(SV.endBest||0)>=1800],['abyss60','深淵の 果て','無限の深淵で 60分 生きのびる',()=>(SV.endBest||0)>=3600],['abyss100','深淵を 制した者','無限の深淵で 100分 生きのびる',()=>(SV.endBest||0)>=6000],
 ['party10','大軍団','仲間を 10体 連れて行く',()=>SV.party.length>=10],['ally150','限界突破の 相棒','進化した 仲間を Lv150に する',()=>Object.values(SV.allies).some(a=>a.evo&&a.lv>=150)],
 ['shiny','きらめき','輝く 装備を 手に入れる',()=>!!(SV.stats||{}).shiny],['perfect','完璧主義','完璧な 装備を 手に入れる',()=>!!(SV.stats||{}).perfect],['lgGet','伝説との 出会い','伝説の 効果の 装備を 手に入れる',()=>nk(SV.lgBook)>=1],
 ['set3','そろい踏み','セット装備を 3つ そろえる',()=>nk(SV.setBook)>=1],['alv30','深淵の 遺物','深淵Lv30の 装備を 手に入れる',()=>((SV.stats||{}).alvMax||0)>=30],['rr50','こだわりの 職人','効果の 付け直しを 50回',()=>(SV.rrN||0)>=50],
 ['altar50','深淵の 信徒','祭壇を 合計 50段 強化',()=>altarSum()>=50],['allPerk','すべてを 手に','特典を すべて ひらく',()=>perkKeysOn().length>=PERKS.length],
 ['retry','再挑戦','深淵を 途中から 始めて、そこから 10分 生きのびる',()=>!!(SV.stats||{}).retry],['fast','疾風迅雷','ヒットストップなし・4倍速で 魔界を クリア',c=>c&&c.fast]];
const altarSum=()=>Object.values(SV.altar||{}).reduce((a,b)=>a+b,0);
function noteItem(it){if(!it)return;SV.stats=SV.stats||{};if(it.shiny)SV.stats.shiny=1;if(itPerfect(it))SV.stats.perfect=1;if(it.lg){SV.lgBook=SV.lgBook||{};SV.lgBook[it.lg]=1}if(it.alv)SV.stats.alvMax=Math.max(SV.stats.alvMax||0,it.alv)}
const achN=()=>Object.keys(SV.ach||{}).length;
function achCheck(lines,ctx){SV.ach=SV.ach||{};SV.stats=SV.stats||{};try{const sc=setCount();for(const k in sc){if(sc[k]>=2)SV.stats.set2=1;if(sc[k]>=3){SV.setBook=SV.setBook||{};SV.setBook[k]=1}}SV.inv.forEach(noteItem)}catch(_){}const got=[];for(const[k,n,,f]of ACH){if(SV.ach[k])continue;let ok=false;try{ok=!!f(ctx)}catch(_){}if(ok){SV.ach[k]=1;got.push(n)}}
 if(got.length){save();if(lines)got.forEach(n=>lines.push('<span style="color:#b8860b">★ 実績「'+n+'」を 達成！</span>'));else toast('★ 実績「'+got.join('」「')+'」を 達成！')}}
const BOOKS=[
 ['card','カード図鑑',()=>ALLCARDS.filter(k=>SV.album[k]).length,()=>ALLCARDS.length,'深淵のかけら 20・5000G',()=>{SV.abyss=(SV.abyss||0)+20;SV.gold+=5000}],
 ['ally','仲間',()=>Object.keys(SV.allies).length,()=>24,'神器「王の冠」',()=>SV.inv.push(makeArti('crown'))],
 ['combo','合体技',()=>Object.keys(SV.comboBook||{}).length,()=>12,'深淵のかけら 30',()=>{SV.abyss=(SV.abyss||0)+30}],
 ['rk','連携',()=>Object.keys(SV.rkBook).length,()=>20,'神器「星のお守り」',()=>SV.inv.push(makeArti('star'))],
 ['waza','技',()=>Object.keys(SV.waza).length,()=>14,'深淵のかけら 20・10000G',()=>{SV.abyss=(SV.abyss||0)+20;SV.gold+=10000}],
 ['evo','武器の 進化',()=>Object.keys(EVO).filter(k=>SV.book[k]).length,()=>Object.keys(EVO).length,'神器「時の指輪」',()=>SV.inv.push(makeArti('time'))],
 ['job','ジョブ マスター',()=>mastered().length,()=>25,'深淵のかけら 50',()=>{SV.abyss=(SV.abyss||0)+50}],
 ['lg','伝説の 効果',()=>nk(SV.lgBook),()=>Object.keys(LEG).length,'深淵のかけら 50',()=>{SV.abyss=(SV.abyss||0)+50}],
 ['set','セット（3つ そろえた）',()=>nk(SV.setBook),()=>Object.keys(SETS).length,'神器 1つ',()=>SV.inv.push(makeArti())]];
