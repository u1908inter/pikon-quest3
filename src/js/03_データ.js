/* ---------- データ ---------- */
const WEAP={sword:{n:'剣',fam:'sword',d:'向いている方向をなぎはらう'},katana:{n:'刀',fam:'sword',d:'左右をすばやく一閃。会心が出やすい'},axe:{n:'斧',fam:'sword',d:'山なりに投げ上げて落とす。重い一撃'},spear:{n:'槍',fam:'sword',d:'前へ長く突く。一直線につらぬく'},dagger:{n:'短剣',fam:'sword',d:'向いている方向へナイフを連続で投げる'},whip:{n:'鞭',fam:'sword',d:'左右へ長く打つ'},boom:{n:'ブーメラン',fam:'boom',d:'近くの敵へ飛び、つらぬいて戻ってくる'},bow:{n:'弓',fam:'boom',d:'近くの敵へ矢をすばやく射る'},shuriken:{n:'手裏剣',fam:'boom',d:'まわりへ手裏剣をばらまく'},fan:{n:'扇',fam:'boom',d:'うずを描いて広がる扇を投げる'},magic:{n:'魔法弾',fam:'magic',d:'近くの敵を追いかける弾をうつ'},staff:{n:'杖',fam:'magic',d:'光の玉を放ち、当たるとはじけて少し回復'},harp:{n:'竪琴',fam:'magic',d:'音の波がまわりへ広がり、敵を押し返す'}};
const PASS={
 might:{n:'ちから',d:'ダメージ+10%'},cd:{n:'れんしゃ',d:'攻撃の間隔-8%'},area:{n:'ひろさ',d:'攻撃範囲+10%'},spd:{n:'はやさ',d:'移動速度+10%'},mag:{n:'じしゃく',d:'玉を引き寄せる範囲+30%'}
};
const EVO={
 renken:{n:'れんげき剣',from:'sword',need:'cd',d:'左右を高速でなぎはらう剣',hint:'剣を最大まで鍛え、攻撃の間隔を縮めると…'},
 inazuma:{n:'いなずま',from:'magic',need:'area',d:'画面中の敵に雷を落とす',hint:'魔法弾を最大まで鍛え、攻撃範囲を広げると…'},
 zantetsu:{n:'斬鉄剣',from:'katana',need:'might',d:'鋭さが増し、すばやく 何度も 斬る',hint:'刀を最大まで鍛え、ちからを 高めると…'},
 daisenpu:{n:'大旋斧',from:'axe',need:'area',d:'斧が 増えて 大きく 爆ぜる',hint:'斧を最大まで鍛え、攻撃範囲を広げると…'},
 gungnir:{n:'グングニル',from:'spear',need:'cd',d:'3方向を 長く つらぬく',hint:'槍を最大まで鍛え、攻撃の間隔を縮めると…'},
 senbon:{n:'千本ナイフ',from:'dagger',need:'cd',d:'ナイフの 雨が 止まらない',hint:'短剣を最大まで鍛え、攻撃の間隔を縮めると…'},
 ibara:{n:'いばらの鞭',from:'whip',need:'might',d:'長く 打ち、敵を 毒に する',hint:'鞭を最大まで鍛え、ちからを 高めると…'},
 boomstorm:{n:'ブーメランの嵐',from:'boom',need:'spd',d:'ブーメランが 嵐の ように 飛びかう',hint:'ブーメランを最大まで鍛え、はやさを 高めると…'},
 tenkyu:{n:'天弓',from:'bow',need:'cd',d:'矢が 雨の ように 降りそそぐ',hint:'弓を最大まで鍛え、攻撃の間隔を縮めると…'},
 fuma:{n:'風魔大手裏剣',from:'shuriken',need:'area',d:'手裏剣が どこまでも つらぬく',hint:'手裏剣を最大まで鍛え、攻撃範囲を広げると…'},
 tennyo:{n:'天女の舞',from:'fan',need:'spd',d:'扇が 舞い、大きく 渦を まく',hint:'扇を最大まで鍛え、はやさを 高めると…'},
 hoshi:{n:'星の杖',from:'staff',need:'might',d:'光の 玉が 星に なり、大きく 回復する',hint:'杖を最大まで鍛え、ちからを 高めると…'},
 tenjo:{n:'天上の調べ',from:'harp',need:'area',d:'音の 波が 敵を 止める',hint:'竪琴を最大まで鍛え、攻撃範囲を広げると…'}
};
const ALLY={
 slime:{n:'スライム',pal:'aslime',sp:'slime',d:'ついて来て、ときどきHPを回復してくれる'},
 bat:{n:'コウモリン',pal:'abat',sp:'bat',d:'まわりを飛びまわり、ふれた敵にかみつく',fly:1},
 mush:{n:'おばけキノコ',pal:'amush',sp:'mush',ai:'spore',d:'ついて来て、ときどき 胞子で まわりの敵を 眠らせる'},
 wolf:{n:'もりオオカミ',pal:'awolf',sp:'wolf',ai:'chase',d:'近くの敵に 飛びかかって かみつく'},
 skull:{n:'ガイコツ兵',pal:'askull',sp:'skull',ai:'guard',d:'すぐそばを まわって 守り、ふれた敵を 斬る'},
 ghost:{n:'さまようゴースト',pal:'aghost',sp:'ghost',ai:'orbit',d:'大きく まわりを 飛び、敵を すり抜けながら 攻撃',fly:1},
 cactus:{n:'サボテンダ',pal:'acactus',sp:'cactus',ai:'needle',d:'ついて来て、まわりへ 針を とばす'},
 scorpion:{n:'サソリン',pal:'ascorpion',sp:'scorpion',ai:'chase',psn:1,d:'近くの敵に 飛びかかって 毒を あたえる'},
 snowman:{n:'ゆきだるま',pal:'asnowman',sp:'snowman',ai:'shoot',d:'ついて来て、雪玉を 投げて 敵を 止める'},
 icebat:{n:'こおりコウモリ',pal:'aicebat',sp:'bat',ai:'orbit',frz:1,d:'まわりを 飛び、ふれた敵を 凍らせて 止める',fly:1},
 imp:{n:'インプ',pal:'aimp',sp:'demon',ai:'fire',d:'ついて来て、火の玉を 撃つ'},
 darkskull:{n:'やみの骸骨',pal:'adarkskull',sp:'skull',ai:'aura',d:'ついて来て、まわりの敵の 命を 吸って HPを 回復'},
 slimeR:{n:'ベニスライム',pal:'aslimeR',sp:'slime',ai:'eslime',elite:1,sc:1.25,d:'【強敵】ついて来て HPを 回復し、ふれた敵を はね飛ばす'},
 trent:{n:'トレント',pal:'atrent',sp:'trent',ai:'eroot',elite:1,sc:1.25,d:'【強敵】つるを のばして まわりの敵を 止める'},
 golemS:{n:'いわゴーレム',pal:'agolemS',sp:'golem',ai:'eguard',elite:1,sc:1.25,d:'【強敵】すぐそばを まわって 守り、ふれた敵を 殴り飛ばす'},
 scorpionB:{n:'ドクサソリ',pal:'ascorpionB',sp:'scorpion',ai:'echase',psn:1,elite:1,sc:1.25,d:'【強敵】すばやく 飛びかかり、強い 毒を あたえる'},
 yeti:{n:'イエティ',pal:'ayeti',sp:'golem',ai:'eice',elite:1,sc:1.25,d:'【強敵】冷たい 息で まわりの敵を 凍らせる'},
 maknight:{n:'魔騎士',pal:'amaknight',sp:'skull',ai:'eknight',elite:1,sc:1.25,d:'【強敵】敵に 斬りこみ、まわりを まとめて 斬る'},
 king:{n:'キングスライム',pal:'aking',sp:'slime',ai:'bking',boss:1,sc:1.6,d:'【ボス】HPを 大きく 回復し、ときどき 押しつぶして まわりを 吹き飛ばす'},
 forestlord:{n:'森の主',pal:'aforestlord',sp:'trent',ai:'broot',boss:1,sc:1.5,d:'【ボス】根を のばして まわりの敵を まとめて 止める'},
 golem:{n:'ゴーレム',pal:'agolem',sp:'golem',ai:'bguard',boss:1,sc:1.5,d:'【ボス】すぐそばで 盾に なり、受ける ダメージ-15%。ふれた敵を 殴り飛ばす'},
 giant:{n:'砂の巨人',pal:'agiant',sp:'golem',ai:'bquake',boss:1,sc:1.6,d:'【ボス】地面を ゆらして まわりの敵に 大ダメージ'},
 fenrir:{n:'フェンリル',pal:'afenrir',sp:'wolf',ai:'bchase',boss:1,sc:1.5,d:'【ボス】すごい 速さで 敵に 飛びかかり、凍らせる'},
 demon:{n:'魔王ピコール',pal:'ademon',sp:'demon',ai:'bmeteor',boss:1,sc:1.5,d:'【ボス】画面の 敵に 隕石を 降らせる'}
};
{const lt=c=>{if(!/^#[0-9a-f]{6}$/i.test(c))return c;const n=parseInt(c.slice(1),16),f=v=>Math.round(v+(255-v)*.35);return '#'+[n>>16,(n>>8)&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')};
 for(const k in ALLY){const A=ALLY[k],src=PAL[k]?k:{forestlord:'lord'}[k];if(!PAL[A.pal]&&src&&PAL[src]){const o={};for(const c in PAL[src])o[c]=c==='e'?PAL[src][c]:lt(PAL[src][c]);PAL[A.pal]=o}}
 const gd=c=>{if(!/^#[0-9a-f]{6}$/i.test(c))return c;const n=parseInt(c.slice(1),16),t=[255,211,78];return '#'+[n>>16,(n>>8)&255,n&255].map((v,i)=>Math.round(v*.55+t[i]*.45)).map(v=>v.toString(16).padStart(2,'0')).join('')};
 for(const k in ALLY){const p=PAL[ALLY[k].pal];if(p){const o={};for(const c in p)o[c]=c==='e'?p[c]:gd(p[c]);PAL['e'+ALLY[k].pal]=o}}}
const ETYPE={
 slime:{n:'スライム',sp:'slime',pal:'slime',hp:10,spd:26,dmg:4,r:5,xp:1,m:1},
 bat:{n:'コウモリン',sp:'bat',pal:'bat',hp:6,spd:46,dmg:3,r:5,xp:1,m:.7,fly:1},
 slimeR:{n:'ベニスライム',sp:'slime',pal:'slimeR',hp:220,spd:30,dmg:12,r:8,xp:10,sc:2,elite:1,m:5},
 king:{n:'キングスライム',sp:'slime',pal:'king',hp:2000,spd:24,dmg:20,r:16,xp:50,sc:3,boss:1,m:40},
 mush:{n:'おばけキノコ',sp:'mush',pal:'mush',hp:12,spd:24,dmg:5,r:5,xp:1,m:1},
 wolf:{n:'もりオオカミ',sp:'wolf',pal:'wolf',hp:8,spd:52,dmg:4,r:5,xp:1,m:.8},
 trent:{n:'トレント',sp:'trent',pal:'trent',hp:260,spd:24,dmg:13,r:9,xp:10,sc:2,elite:1,m:6},
 forestlord:{n:'森の主',sp:'trent',pal:'lord',hp:2200,spd:20,dmg:22,r:17,xp:50,sc:3,boss:1,m:40},
 skull:{n:'ガイコツ兵',sp:'skull',pal:'skull',hp:13,spd:28,dmg:5,r:5,xp:1,m:1},
 ghost:{n:'さまようゴースト',sp:'ghost',pal:'ghost',hp:8,spd:44,dmg:4,r:5,xp:1,m:.6,fly:1},
 golemS:{n:'いわゴーレム',sp:'golem',pal:'golemS',hp:300,spd:22,dmg:14,r:9,xp:10,sc:2,elite:1,m:8},
 golem:{n:'ゴーレム',sp:'golem',pal:'golem',hp:2400,spd:18,dmg:24,r:17,xp:50,sc:3,boss:1,m:50},
 cactus:{n:'サボテンダ',sp:'cactus',pal:'cactus',hp:13,spd:24,dmg:5,r:5,xp:1,m:1},
 scorpion:{n:'サソリン',sp:'scorpion',pal:'scorpion',hp:9,spd:48,dmg:5,r:5,xp:1,m:.8},
 scorpionB:{n:'ドクサソリ',sp:'scorpion',pal:'scorpionB',hp:280,spd:32,dmg:14,r:8,xp:10,sc:2,elite:1,m:6},
 giant:{n:'砂の巨人',sp:'golem',pal:'giant',hp:2500,spd:20,dmg:24,r:17,xp:50,sc:3,boss:1,m:50},
 snowman:{n:'ゆきだるま',sp:'snowman',pal:'snowman',hp:15,spd:22,dmg:5,r:5,xp:1,m:1.2},
 icebat:{n:'こおりコウモリ',sp:'bat',pal:'icebat',hp:9,spd:50,dmg:5,r:5,xp:1,m:.7,fly:1},
 yeti:{n:'イエティ',sp:'golem',pal:'yeti',hp:320,spd:30,dmg:15,r:9,xp:10,sc:2,elite:1,m:7},
 fenrir:{n:'フェンリル',sp:'wolf',pal:'fenrir',hp:2600,spd:30,dmg:26,r:17,xp:50,sc:3,boss:1,m:40},
 imp:{n:'インプ',sp:'demon',pal:'imp',hp:12,spd:40,dmg:6,r:5,xp:1,m:.8},
 darkskull:{n:'やみの骸骨',sp:'skull',pal:'darkskull',hp:16,spd:30,dmg:6,r:5,xp:1,m:1},
 maknight:{n:'魔騎士',sp:'skull',pal:'maknight',hp:340,spd:32,dmg:16,r:9,xp:10,sc:2,elite:1,m:8},
 demon:{n:'魔王ピコール',sp:'demon',pal:'demon',hp:3000,spd:22,dmg:28,r:17,xp:50,sc:3,boss:1,m:50}
};
const STAGES=[
 {n:'草原',th:'grass',foes:['slime','bat'],elite:'slimeR',boss:'king'},
 {n:'森',th:'forest',foes:['mush','wolf'],elite:'trent',boss:'forestlord'},
 {n:'洞窟',th:'cave',foes:['skull','ghost'],elite:'golemS',boss:'golem'},
 {n:'砂漠',th:'desert',foes:['cactus','scorpion'],elite:'scorpionB',boss:'giant'},
 {n:'雪山',th:'snow',foes:['snowman','icebat'],elite:'yeti',boss:'fenrir'},
 {n:'魔界',th:'demon',foes:['imp','darkskull'],elite:'maknight',boss:'demon'}
];
const ABY={base:.8,hp:1.14,dmg:1.075,lb:1.006,alb:1.01,xp:.5};
const DIF={jp:4.5,lvx:1.7,st:[1,2,3.6,5.8,8.4,11.2],rdLin:1.4,rdExp:1.15,hp:1.25,dmg:1.3,dmgK:.85,boss:1.6,spdSt:.05,spdRd:.05,spdMax:1.6,dens:1.25,ramp:1};
/* 特典：魔界の 周回（rd）と、深淵で 生きのびた 時間（ab：分）で ひらく */
const PERKS=[
 ['spd2','rd',1,'2倍速が つかえる'],['inv60','rd',1,'装備を 60こまで 持てる',60],
 ['bring3','rd',2,'持って行ける 技が 3つに'],
 ['trial2','rd',3,'試練の祠の ごほうび 2倍'],['inv80','rd',3,'装備を 80こまで 持てる',80],
 ['ab9','rd',4,'アビリティを 9こまで はめられる'],
 ['ref11','rd',5,'精錬が +11まで できる'],['inv100','rd',5,'装備を 100こまで 持てる',100],
 ['ally6','rd',6,'仲間を 6体まで 連れて行ける'],
 ['spd3','rd',7,'3倍速が つかえる'],['inv150','rd',7,'装備を 150こまで 持てる',150],
 ['pw4','rd',8,'力の枠が 4つに'],
 ['myth','rd',9,'「神話」の 装備が 落ちる'],['inv200','rd',9,'装備を 200こまで 持てる',200],
 ['abyss','rd',10,'エンディング・無限の深淵と 祭壇が ひらく'],
 ['arti','ab',5,'深淵の ボスが 神器を 落としやすく なる'],['inv250','ab',5,'装備を 250こまで 持てる',250],
 ['spd4','ab',10,'4倍速が つかえる'],['pw5','ab',10,'力の枠が 5つに'],
 ['ally7','ab',15,'仲間を 7体まで 連れて行ける'],['inv300','ab',15,'装備を 300こまで 持てる',300],
 ['throne','ab',20,'魔王の玉座が ひらく'],['ab10','ab',20,'アビリティを 10こまで はめられる'],
 ['pw6','ab',25,'力の枠が 6つに'],['bring4','ab',25,'持って行ける 技が 4つに'],
 ['ally8','ab',30,'仲間を 8体まで 連れて行ける'],['inv400','ab',30,'装備を 400こまで 持てる',400],
 ['pw7','ab',35,'力の枠が 7つに'],['aura1','ab',35,'ゆうしゃが オーラを まとう'],
 ['ally9','ab',40,'仲間を 9体まで 連れて行ける'],['inv500','ab',40,'装備を 500こまで 持てる',500],
 ['pw8','ab',45,'力の枠が 8つに'],['bring5','ab',45,'持って行ける 技が 5つに'],
 ['ally10','ab',50,'仲間を 10体まで 連れて行ける'],['inv700','ab',50,'装備を 700こまで 持てる',700],
 ['pw9','ab',55,'力の枠が 9つに'],['aura2','ab',55,'オーラが 強く かがやく'],
 ['pw10','ab',60,'力の枠が 10こに'],['inv999','ab',60,'装備を 999こまで 持てる',999],['cos','ab',60,'深淵の 服と 炎の 色（雑貨屋）'],
 ['shiny2','ab',70,'輝く 装備が 出やすく なる（2倍）'],['rrHalf','ab',80,'効果の 付け直しが 半額'],['aura3','ab',90,'オーラが 虹色に かがやく'],['crown','ab',100,'称号「深淵を 制した者」・勇者の 服「虹」']];
const PK={};PERKS.forEach(x=>PK[x[0]]=x);
const pOn=k=>{const x=PK[k];if(!x)return false;return x[1]==='rd'?(SV.clear[5]||0)>=x[2]:(SV.endBest||0)>=x[2]*60};
const pCnt=ks=>ks.filter(pOn).length;
const perkKeysOn=()=>PERKS.filter(x=>pOn(x[0])).map(x=>x[0]);
const abyssOpen=()=>pOn('abyss')||(SV.endBest||0)>0;
const invCap=()=>Math.max(40,...PERKS.filter(x=>x[4]&&pOn(x[0])).map(x=>x[4]));
const bringN=()=>2+pCnt(['bring3','bring4','bring5']);
const pwN=()=>3+pCnt(['pw4','pw5','pw6','pw7','pw8','pw9','pw10']);
const spdMax=()=>1+pCnt(['spd2','spd3','spd4']);
const spdRow=act=>'<div class="row">'+[1,2,3,4].map(v=>{const ok=SV.opt.spdFree||v<=spdMax();return '<button class="btn '+(effSpd()===v?'primary':'')+'" data-act="'+act+'" data-v="'+v+'"'+(ok?'':' disabled')+'>×'+v+(ok?'':'🔒')+'</button>'}).join('')+'</div>';
const hsRow=()=>'<div class="row">'+[['on','ふつう'],['weak','弱め'],['off','なし']].map(([v,t])=>'<button class="btn '+((SV.opt.hs||'on')===v?'primary':'')+'" data-v="'+v+'">'+t+'</button>').join('')+'</div>';
const shkRow=()=>'<div class="row"><button class="btn '+(SV.opt.shake!==false?'primary':'')+'" data-v="1">あり</button><button class="btn '+(SV.opt.shake!==false?'':'primary')+'" data-v="0">なし</button></div>';
const effSpd=()=>SV.opt.spdFree?(SV.opt.spd||1):Math.min(SV.opt.spd||1,spdMax());
const auraLv=()=>pCnt(['aura1','aura2','aura3']);
const refMax=()=>pOn('ref11')?11:10,abMax=()=>8+pCnt(['ab9','ab10']);
const MAX_RD=9999,ST_MUL=DIF.st,stMul=(si,rd)=>DIF.st[si]*(1+DIF.rdLin*(rd-1))*Math.pow(DIF.rdExp,rd-1);
const stOpen=(si,rd)=>si===0?(rd===1||(SV.clear[5]||0)>=rd-1):(SV.clear[si-1]||0)>=rd;
const maxRd=()=>Math.min(MAX_RD,(SV.clear[5]||0)+1);
/* カード（すべての敵がまれに落とす） */
const CARDFX={slime:['hp',8],bat:['spd',3],mush:['xp',5],wolf:['spd',4],skull:['dmg',3],ghost:['cd',2],cactus:['dmg',3],scorpion:['cd',2],snowman:['hp',10],icebat:['mag',15],imp:['gold',10],darkskull:['dmg',4]};
/* 強敵・ボスのカードは 唯一無二の 効果（同じ効果は 重ならない） */
const CARDSP={
 slimeR:{d:'最大HP+25%・毎秒 最大HPの1%回復',f:F=>{F.hp*=1.25;F.regen=1}},
 king:{d:'倒した敵の 15%が 爆発して まわりを 巻きこむ',f:F=>{F.kboom=1}},
 trent:{d:'攻撃範囲+30%',f:F=>{F.area*=1.3}},
 forestlord:{d:'ひらめき率2倍・1回に ひらめける数+2',f:F=>{F.hira*=2;F.hiraCap+=2}},
 golemS:{d:'受けるダメージ-30%',f:F=>{F.taken*=.7}},
 golem:{d:'吹っ飛ばす力2倍・ぶつかったときの ダメージ2倍',f:F=>{F.knock*=2;F.bump*=2}},
 scorpionB:{d:'攻撃した敵を 毒にする（毎秒 最大HPの3%）',f:F=>{F.poison=1}},
 giant:{d:'職業技の ゲージが 2倍の 速さで たまる',f:F=>{F.jg*=2}},
 yeti:{d:'倒れても 1回だけ HP50%で 立ち上がる',f:F=>{F.revive=1}},
 fenrir:{d:'移動速度+25%・攻撃間隔-15%',f:F=>{F.spd*=1.25;F.cdm*=.85}},
 maknight:{d:'会心率30%・会心ダメージ3倍',f:F=>{F.crit=.3;F.critX=3}},
 demon:{d:'すべての ダメージ+40%・連携の 威力2倍',f:F=>{F.dmg*=1.4;F.rk*=2}}
};
const ALLCARDS=Object.keys(ETYPE);
ETYPE.tmaou={n:'真・魔王ピコール',sp:'demon',pal:'tmaou',hp:4000,spd:26,dmg:34,r:20,xp:200,sc:4,boss:1,m:80};PAL.tmaou={y:'#ffe14a',m:'#1a0a2a',r:'#ff2020',k:'#000',c:'#5a0f8a'};
const cardName=k=>ETYPE[k].n+'の カード';
const cardRank=k=>ETYPE[k].boss?'激レア':ETYPE[k].elite?'レア':'';
const cardTag=k=>cardRank(k)?'<span class="tag'+(ETYPE[k].boss?' gr':' rr')+'">'+cardRank(k)+'</span>':'';
const cardTxt=k=>{if(CARDSP[k])return '★'+CARDSP[k].d;const[a,v]=CARDFX[k];return AFX[a].n+(AFX[a].neg?'-':'+')+v+AFX[a].u};
const CARD_SLOTS=[0,1,1,2,1,2,3],cardSlots=it=>CARD_SLOTS[it.r]||0;
const stageOf=k=>STAGES.findIndex(S=>S.foes.includes(k)||S.elite===k||S.boss===k);
const upCost=k=>Math.round(UPS[k].cost(SV.up[k])*(1-(flags().shopDisc||0)));
const UPS={
 atk:{n:'村の鍛冶屋',d:'ダメージ+5%',max:5,cost:l=>[1000,2500,5000,9000,15000][l]},
 hp:{n:'村の食堂',d:'最大HP+10',max:5,cost:l=>[1000,2500,5000,9000,15000][l]},
 spd:{n:'村の靴屋',d:'移動速度+3%',max:5,cost:l=>[1500,3500,7000,12000,20000][l]},
 slot:{n:'なかまの宿',d:'連れて行ける仲間+1（最大5体）',max:4,cost:l=>[2000,6000,13000,25000][l]}
};

const WAZA={
 kabuto:{n:'かぶと割り',tag:'sword',cd:4,d:'近くの敵に 重い一撃。気絶させる',pre:'剛',post:'兜割'},
 kabuto2:{n:'兜砕き',tag:'sword',cd:4.5,par:'kabuto',d:'3体に 重い一撃。長く 気絶させる',pre:'砕',post:'兜砕'},
 kabuto3:{n:'無双三段',tag:'sword',cd:6,par:'kabuto2',d:'同じ敵に 3連続の 大斬撃',pre:'無双',post:'三段'},
 kaiten:{n:'回転斬り',tag:'sword',cd:3,d:'まわりを ぐるりと 斬る',pre:'旋',post:'風車'},
 kaiten2:{n:'大車輪',tag:'sword',cd:4,par:'kaiten',d:'大きな 回転斬りを 2回',pre:'大',post:'車輪'},
 uchiage:{n:'打ち上げ',tag:'boom',cd:5,d:'まわりの敵を 打ち上げて 止める',pre:'天翔',post:'昇'},
 uchiage2:{n:'竜巻',tag:'boom',cd:6,par:'uchiage',d:'敵を 吸いよせてから 空へ はね上げる',pre:'竜',post:'巻'},
 midare:{n:'乱れ投げ',tag:'boom',cd:3.5,d:'ブーメランを 6方向へ 投げる',pre:'乱',post:'舞'},
 midare2:{n:'千手投げ',tag:'boom',cd:5,par:'midare',d:'12方向へ 2回 投げる',pre:'千手',post:'投'},
 honoo:{n:'ほのお',tag:'magic',cd:2.5,d:'火の玉を 飛ばして 爆発させる',pre:'炎',post:'焔'},
 honoo2:{n:'火炎陣',tag:'magic',cd:4,par:'honoo',d:'まわりに 火柱を 6本 立てる',pre:'火炎',post:'陣'},
 honoo3:{n:'爆炎',tag:'magic',cd:6,par:'honoo2',d:'敵の群れに 大爆発を 3つ',pre:'爆',post:'炎'},
 nemuri:{n:'眠りの歌',tag:'magic',cd:8,d:'まわりの敵を 眠らせる',pre:'夢',post:'幻'},
 hikari:{n:'いやしの光',tag:'magic',cd:10,d:'HPを 少し 回復する',pre:'光',post:'輪'}
};
const STOPPER=['kabuto','kabuto2','kabuto3','uchiage','uchiage2','nemuri'];
const KIDS=k=>Object.keys(WAZA).filter(c=>WAZA[c].par===k);
const isBase=k=>!WAZA[k].par;
const starTxt=s=>s>=6?'極':'★'.repeat(s),wazaNeed=s=>15*s,wm=s=>s>=6?2.2:1+.2*(s-1),wc=s=>s>=6?.65:1-.06*(s-1);
const RAR=[{n:'ふつう',c:'#4a5b58',f:'#dddddd'},{n:'いいもの',c:'#1f8a7d',f:'#6fe3b5'},{n:'レア',c:'#3366d6',f:'#7fb0ff'},{n:'伝説',c:'#b5359e',f:'#ff8ae6'}];
const SLOTN={w:'武器',s:'盾',c:'お守り'};
const WNAMES={sword:['きのぼう','てつのけん','はがねのやいば','ほしくだきの剣'],katana:['なまくら刀','うちがたな','名刀・村雨','妖刀・月影'],axe:['いしのおの','てつのおの','はがねの大斧','巨人殺しの斧'],spear:['たけやり','てつのやり','ほこやり','竜騎の槍'],dagger:['さびたナイフ','どうのたんけん','アサシンダガー','影ぬいの短剣'],whip:['かわのむち','いばらのむち','ほのおのむち','獣王の鞭'],boom:['きのブーメラン','てつのブーメラン','やいばのブーメラン','流星のブーメラン'],bow:['たんきゅう','かりうどの弓','ぎんの長弓','天翔の弓'],shuriken:['てつの手裏剣','十字手裏剣','風魔手裏剣','影の手裏剣'],fan:['かみのおうぎ','はがねの扇','舞姫の扇','天女の扇'],magic:['見習いの魔導書','ほのおの魔導書','いかずちの魔導書','星の魔導書'],staff:['きのつえ','いのりの杖','賢者の杖','星詠みの杖'],harp:['きのたてごと','ぎんのたてごと','妖精の竪琴','天使の竪琴']};
const UNIQ_WT={futamata:'boom',kyuketsu:'sword'};
const eqWeapon=()=>SV.inv.find(i=>i.id===SV.eq.w);
const curWeapon=()=>{const it=eqWeapon();return it&&it.wt&&WEAP[it.wt]?it.wt:JOBS[SV.job].w};
const wtTxt=it=>it.slot==='w'&&it.wt?WEAP[it.wt].n+'・'+WTN[WEAP[it.wt].fam]:SLOTN[it.slot];
const BASES={w:['きのぼう','てつのけん','はがねのやいば','ほしくだきの剣'],s:['かわのたて','てつのたて','ぎんのたて','りゅうのたて'],c:['ガラス玉のお守り','銀のお守り','月のお守り','ピコーンのお守り']};
const AFX={dmg:{n:'ダメージ',u:'%',v:r=>3+2*r},hp:{n:'最大HP',u:'',v:r=>5+5*r},spd:{n:'移動速度',u:'%',v:r=>2+r},cd:{n:'攻撃間隔',u:'%',neg:1,v:r=>2+r},area:{n:'攻撃範囲',u:'%',v:r=>3+2*r},mag:{n:'引き寄せ',u:'%',v:r=>10+5*r},xp:{n:'経験値',u:'%',v:r=>4+3*r},hira:{n:'ひらめき率',u:'%',v:r=>10+10*r},gold:{n:'ゴールド',u:'%',v:r=>5+5*r},deep:{n:'深淵の 層ごとに ダメージ',u:'%',v:r=>.5+.25*r,dec:1}};
const AFX_POOL=Object.keys(AFX).filter(k=>k!=='deep');
const RATE=[100,95,90,80,70,60,50,40,30,20,10];
RAR.push({n:'ユニーク',c:'#e8590c',f:'#ff9a4a'},{n:'神器',c:'#b8860b',f:'#ffe14a'},{n:'神話',c:'#7a3cff',f:'#c8a0ff'});
const JOBS={
 kenshi:{n:'剣士',tier:'基本',w:'sword',base:'ダメージ+10%・最大HP+10%',B:[['dmg', 0.1], ['hp', 0.1]],sp:'旋風斬',spd:'まわりを3回なぎはらう',ab:['kenshi0','kenshi1','kenshi2','kenshi3','kenshi4','kenshi5','kenshi6','kenshi7','kenshi8','kenshi9']},
 mahou:{n:'魔法使い',tier:'基本',w:'magic',base:'攻撃範囲+15%・ひらめき率+20%',B:[['area', 0.15], ['hira', 0.2]],sp:'メテオ',spd:'見えている敵に隕石を降らせる',ab:['mahou0','mahou1','mahou2','mahou3','mahou4','mahou5','mahou6','mahou7','mahou8','mahou9']},
 souryo:{n:'僧侶',tier:'基本',w:'staff',base:'最大HP+15%・回復量+30%',B:[['hp', 0.15], ['heal', 0.3]],sp:'ホーリー',spd:'画面の敵に聖なる光、HP30%回復',ab:['souryo0','souryo1','souryo2','souryo3','souryo4','souryo5','souryo6','souryo7','souryo8','souryo9']},
 kariudo:{n:'狩人',tier:'基本',w:'bow',base:'移動速度+10%・会心率+5%',B:[['spd', 0.1], ['crit', 0.05]],sp:'アローレイン',spd:'3秒間、画面じゅうに矢が降る',ab:['kariudo0','kariudo1','kariudo2','kariudo3','kariudo4','kariudo5','kariudo6','kariudo7','kariudo8','kariudo9']},
 touzoku:{n:'盗賊',tier:'基本',w:'dagger',base:'移動速度+15%・ゴールド+30%',B:[['spd', 0.15], ['gold', 0.3]],sp:'ぶんどる',spd:'まわりの敵からゴールドと経験値を奪い、2秒間姿を消す',ab:['touzoku0','touzoku1','touzoku2','touzoku3','touzoku4','touzoku5','touzoku6','touzoku7','touzoku8','touzoku9']},
 mamono:{n:'魔物使い',tier:'基本',w:'whip',base:'仲間の攻撃+30%・仲間の枠+1',B:[['ally', 0.3], ['slot', 1]],sp:'いっせい攻撃',spd:'8秒間、仲間が3倍の力で暴れる',ab:['mamono0','mamono1','mamono2','mamono3','mamono4','mamono5','mamono6','mamono7','mamono8','mamono9'],unlock:()=>Object.keys(SV.allies).length>0,hint:'仲間を1体つくると選べる'},
 mahouken:{n:'魔法剣士',tier:'上級',w:'sword',base:'ダメージ+5%・魔法弾ダメージ+15%',B:[['dmg', 0.05], ['wd.magic', 0.15]],sp:'魔法剣・フレア',spd:'炎・雷・氷の大斬撃が画面を走る',ab:['mahouken0','mahouken1','mahouken2','mahouken3','mahouken4','mahouken5','mahouken6','mahouken7','mahouken8','mahouken9'],unlock:()=>SV.jobs.kenshi.lv>=JOB_MAX&&SV.jobs.mahou.lv>=JOB_MAX,hint:'剣士と 魔法使いを マスターすると 選べる'},
 seikishi:{n:'聖騎士',tier:'上級',w:'sword',base:'最大HP+20%・受けるダメージ-10%',B:[['hp', 0.2], ['taken', -0.1]],sp:'聖なる盾',spd:'5秒間無敵、まわりの敵を光で押し返す',ab:['seikishi0','seikishi1','seikishi2','seikishi3','seikishi4','seikishi5','seikishi6','seikishi7','seikishi8','seikishi9'],unlock:()=>SV.jobs.kenshi.lv>=JOB_MAX&&SV.jobs.souryo.lv>=JOB_MAX,hint:'剣士と 僧侶を マスターすると 選べる'},
 ryukishi:{n:'竜騎士',tier:'上級',w:'spear',base:'最大HP+10%・打ち上げた敵へのダメージ+30%',B:[['hp', 0.1], ['airDmg', 0.3]],sp:'ハイジャンプ',spd:'群れの真ん中に落下し、全員を打ち上げる',ab:['ryukishi0','ryukishi1','ryukishi2','ryukishi3','ryukishi4','ryukishi5','ryukishi6','ryukishi7','ryukishi8','ryukishi9'],unlock:()=>SV.jobs.kenshi.lv>=JOB_MAX&&SV.jobs.kariudo.lv>=JOB_MAX,hint:'剣士と 狩人を マスターすると 選べる'},
 samurai:{n:'侍',tier:'上級',w:'katana',base:'ダメージ+15%・会心率+5%',B:[['dmg', 0.15], ['crit', 0.05]],sp:'居合・一閃',spd:'画面を横一文字に斬る',ab:['samurai0','samurai1','samurai2','samurai3','samurai4','samurai5','samurai6','samurai7','samurai8','samurai9'],unlock:()=>SV.jobs.kenshi.lv>=JOB_MAX&&SV.jobs.touzoku.lv>=JOB_MAX,hint:'剣士と 盗賊を マスターすると 選べる'},
 kyosenshi:{n:'狂戦士',tier:'上級',w:'axe',base:'ダメージ+20%・受けるダメージ+10%',B:[['dmg', 0.2], ['taken', 0.1]],sp:'バーサク',spd:'10秒間ダメージ3倍・攻撃間隔半分',ab:['kyosenshi0','kyosenshi1','kyosenshi2','kyosenshi3','kyosenshi4','kyosenshi5','kyosenshi6','kyosenshi7','kyosenshi8','kyosenshi9'],unlock:()=>SV.jobs.kenshi.lv>=JOB_MAX&&SV.jobs.mamono.lv>=JOB_MAX,hint:'剣士と 魔物使いを マスターすると 選べる'},
 kenja:{n:'賢者',tier:'上級',w:'staff',base:'回復量+20%・杖のダメージ+15%',B:[['heal', 0.2], ['wd.staff', 0.15]],sp:'ほうじゅん',spd:'HP全回復し、持っている技を全部その場で出す',ab:['kenja0','kenja1','kenja2','kenja3','kenja4','kenja5','kenja6','kenja7','kenja8','kenja9'],unlock:()=>SV.jobs.mahou.lv>=JOB_MAX&&SV.jobs.souryo.lv>=JOB_MAX,hint:'魔法使いと 僧侶を マスターすると 選べる'},
 fusui:{n:'風水士',tier:'上級',w:'boom',base:'攻撃範囲+15%・移動速度+5%',B:[['area', 0.15], ['spd', 0.05]],sp:'地形効果',spd:'ステージで変わる（草原=かまいたち、森=つるで足止め、洞窟=落石、砂漠=流砂、雪山=吹雪、魔界=溶岩）',ab:['fusui0','fusui1','fusui2','fusui3','fusui4','fusui5','fusui6','fusui7','fusui8','fusui9'],unlock:()=>SV.jobs.mahou.lv>=JOB_MAX&&SV.jobs.kariudo.lv>=JOB_MAX,hint:'魔法使いと 狩人を マスターすると 選べる'},
 jimadou:{n:'時魔道士',tier:'上級',w:'magic',base:'攻撃間隔-10%・技の間隔-10%',B:[['cdm', -0.1], ['wazaCd', -0.1]],sp:'ストップ',spd:'5秒間、画面の敵がすべて止まる',ab:['jimadou0','jimadou1','jimadou2','jimadou3','jimadou4','jimadou5','jimadou6','jimadou7','jimadou8','jimadou9'],unlock:()=>SV.jobs.mahou.lv>=JOB_MAX&&SV.jobs.touzoku.lv>=JOB_MAX,hint:'魔法使いと 盗賊を マスターすると 選べる'},
 shokan:{n:'召喚士',tier:'上級',w:'magic',base:'仲間の攻撃+20%・職業技のゲージ+20%',B:[['ally', 0.2], ['jg', 0.2]],sp:'召喚・竜王',spd:'巨大な竜が現れて炎を吐く',ab:['shokan0','shokan1','shokan2','shokan3','shokan4','shokan5','shokan6','shokan7','shokan8','shokan9'],unlock:()=>SV.jobs.mahou.lv>=JOB_MAX&&SV.jobs.mamono.lv>=JOB_MAX,hint:'魔法使いと 魔物使いを マスターすると 選べる'},
 ginyu:{n:'吟遊詩人',tier:'上級',w:'harp',base:'仲間の攻撃+20%・回復量+20%',B:[['ally', 0.2], ['heal', 0.2]],sp:'勇気の歌',spd:'10秒間、すべてのダメージ2倍',ab:['ginyu0','ginyu1','ginyu2','ginyu3','ginyu4','ginyu5','ginyu6','ginyu7','ginyu8','ginyu9'],unlock:()=>SV.jobs.souryo.lv>=JOB_MAX&&SV.jobs.mamono.lv>=JOB_MAX,hint:'僧侶と 魔物使いを マスターすると 選べる'},
 asobinin:{n:'遊び人',tier:'上級',w:'boom',base:'ひらめき率+30%・会心率+5%',B:[['hira', 0.3], ['crit', 0.05]],sp:'ゆびをふる',spd:'ほかのジョブの職業技がランダムで出る',ab:['asobinin0','asobinin1','asobinin2','asobinin3','asobinin4','asobinin5','asobinin6','asobinin7','asobinin8','asobinin9'],unlock:()=>SV.jobs.souryo.lv>=JOB_MAX&&SV.jobs.touzoku.lv>=JOB_MAX,hint:'僧侶と 盗賊を マスターすると 選べる'},
 odoriko:{n:'踊り子',tier:'上級',w:'fan',base:'移動速度+15%・回避10%',B:[['spd', 0.15], ['evade', 0.1]],sp:'剣の舞',spd:'8秒間、まわりを刃が回る',ab:['odoriko0','odoriko1','odoriko2','odoriko3','odoriko4','odoriko5','odoriko6','odoriko7','odoriko8','odoriko9'],unlock:()=>SV.jobs.souryo.lv>=JOB_MAX&&SV.jobs.kariudo.lv>=JOB_MAX,hint:'僧侶と 狩人を マスターすると 選べる'},
 ninja:{n:'忍者',tier:'上級',w:'shuriken',base:'移動速度+20%・回避10%',B:[['spd', 0.2], ['evade', 0.1]],sp:'影分身',spd:'10秒間、分身2体が同じ攻撃をする',ab:['ninja0','ninja1','ninja2','ninja3','ninja4','ninja5','ninja6','ninja7','ninja8','ninja9'],unlock:()=>SV.jobs.kariudo.lv>=JOB_MAX&&SV.jobs.touzoku.lv>=JOB_MAX,hint:'狩人と 盗賊を マスターすると 選べる'},
 juou:{n:'獣王',tier:'上級',w:'whip',base:'仲間の攻撃+40%・仲間の枠+1',B:[['ally', 0.4], ['slot', 1]],sp:'巨大化',spd:'10秒間、仲間が巨大化して攻撃範囲3倍',ab:['juou0','juou1','juou2','juou3','juou4','juou5','juou6','juou7','juou8','juou9'],unlock:()=>SV.jobs.kariudo.lv>=JOB_MAX&&SV.jobs.mamono.lv>=JOB_MAX,hint:'狩人と 魔物使いを マスターすると 選べる'},
 shonin:{n:'商人',tier:'上級',w:'dagger',base:'ゴールド+50%・経験値+10%',B:[['gold', 0.5], ['xp', 0.1]],sp:'ぜになげ',spd:'持っているゴールドに応じた大ダメージ（ゴールドは減らない）',ab:['shonin0','shonin1','shonin2','shonin3','shonin4','shonin5','shonin6','shonin7','shonin8','shonin9'],unlock:()=>SV.jobs.touzoku.lv>=JOB_MAX&&SV.jobs.mamono.lv>=JOB_MAX,hint:'盗賊と 魔物使いを マスターすると 選べる'},
 shinen:{n:'深淵の騎士',tier:'深淵',w:'sword',base:'ダメージ+25%・最大HP-10%',B:[['dmg', 0.25], ['hp', -0.1]],sp:'深淵斬',spd:'HPを20%削って、画面の敵に超大ダメージ',ab:['shinen0','shinen1','shinen2','shinen3','shinen4','shinen5','shinen6','shinen7','shinen8','shinen9'],unlock:()=>(SV.clear[5]||0)>=2,hint:'2周目の 魔界を クリアすると 選べる'},
 daimadou:{n:'大魔導師',tier:'深淵',w:'magic',base:'魔法弾ダメージ+30%・攻撃範囲+20%',B:[['wd.magic', 0.3], ['area', 0.2]],sp:'アルテマ',spd:'画面全体を光が飲み込む',ab:['daimadou0','daimadou1','daimadou2','daimadou3','daimadou4','daimadou5','daimadou6','daimadou7','daimadou8','daimadou9'],unlock:()=>(SV.clear[5]||0)>=3,hint:'3周目の 魔界を クリアすると 選べる'},
 hoshiyomi:{n:'星詠み',tier:'深淵',w:'staff',base:'会心率+10%・ひらめき率+50%',B:[['crit', 0.1], ['hira', 0.5]],sp:'流星群',spd:'10秒間星が降りそそぎ、その間はひらめきが必ず起きる',ab:['hoshiyomi0','hoshiyomi1','hoshiyomi2','hoshiyomi3','hoshiyomi4','hoshiyomi5','hoshiyomi6','hoshiyomi7','hoshiyomi8','hoshiyomi9'],unlock:()=>(SV.clear[5]||0)>=5,hint:'5周目の 魔界を クリアすると 選べる'},
 suppin:{n:'すっぴん',tier:'すっぴん',w:'magic',base:'アビリティAP上限+5',B:[['ap', 5]],sp:'ピコーン',spd:'持っている技を一気に3連発し、2.5秒間無敵',ab:['suppin0','suppin1','suppin2','suppin3','suppin4','suppin5','suppin6','suppin7','suppin8','suppin9'],unlock:()=>Object.values(SV.jobs).some(x=>x.lv>=4),hint:'どれかのジョブをLv4にすると選べる'}
};
const ABIL={
 kenshi0:{n:'剣の心得',c:'atk',ap:3,d:'剣のダメージ+30%',f:F=>{F.wd.sword*=1.3}},
 kenshi1:{n:'かえし斬り',c:'def',ap:3,d:'攻撃を受けると、まわりに反撃',f:F=>{F.counter=1}},
 kenshi2:{n:'HPアップ',c:'def',ap:3,d:'最大HP+20%',f:F=>{F.hp*=1.2}},
 kenshi3:{n:'二刀流',c:'atk',ap:5,d:'剣が最初から左右を斬る',f:F=>{F.dual=1}},
 kenshi4:{n:'踏みこみ',c:'atk',ap:2,d:'剣の届く距離+25%',f:F=>{F.wr.sword*=1.25}},
 kenshi5:{n:'鉄壁',c:'def',ap:2,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 kenshi6:{n:'闘志',c:'atk',ap:3,d:'HPが半分以下のときダメージ+30%',f:F=>{F.lowHpDmg+=.3}},
 kenshi7:{n:'不屈',c:'def',ap:5,d:'1回の冒険で1度だけ、HP1で耐える',f:F=>{F.guts+=1}},
 kenshi8:{n:'剣の舞',c:'atk',ap:4,d:'剣の攻撃間隔-20%',f:F=>{F.wcd.sword*=.8}},
 kenshi9:{n:'剣聖',c:'atk',ap:6,d:'剣の会心ダメージ+50%',f:F=>{F.wcx.sword+=.5}},
 mahou0:{n:'魔力アップ',c:'atk',ap:3,d:'魔法弾のダメージ+30%',f:F=>{F.wd.magic*=1.3}},
 mahou1:{n:'れんしょう',c:'atk',ap:5,d:'魔法弾の数+1',f:F=>{F.wn.magic+=1}},
 mahou2:{n:'ひろさの極意',c:'spc',ap:3,d:'攻撃範囲+15%',f:F=>{F.area*=1.15}},
 mahou3:{n:'ひらめきの泉',c:'spc',ap:5,d:'ひらめき率+50%・1回にひらめける数+1',f:F=>{F.hira*=1.5;F.hiraCap+=1}},
 mahou4:{n:'魔力の盾',c:'def',ap:2,d:'魔の系統の武器を持っていると、受けるダメージ-10%',f:F=>{F.mshield=1}},
 mahou5:{n:'追尾強化',c:'atk',ap:3,d:'魔法弾が速くなり、敵を1体つらぬく',f:F=>{F.magPierce=1}},
 mahou6:{n:'精神統一',c:'spc',ap:3,d:'職業技のゲージが20%速くたまる',f:F=>{F.jg*=1.2}},
 mahou7:{n:'炎の心',c:'atk',ap:4,d:'ほのお系の技のダメージ+40%',f:F=>{F.fireWz*=1.4}},
 mahou8:{n:'詠唱短縮',c:'spc',ap:4,d:'技の間隔-10%',f:F=>{F.wazaCd*=.9}},
 mahou9:{n:'大魔力',c:'atk',ap:6,d:'魔法弾が当たると小さく爆発する',f:F=>{F.fireBolt=1}},
 souryo0:{n:'いのり',c:'def',ap:2,d:'毎秒最大HPの0.5%回復',f:F=>{F.regenP+=.005}},
 souryo1:{n:'ヒールアップ',c:'def',ap:2,d:'回復量+30%',f:F=>{F.heal*=1.3}},
 souryo2:{n:'聖なる守り',c:'def',ap:2,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 souryo3:{n:'浄化',c:'atk',ap:3,d:'気絶・眠りの敵へのダメージ+30%',f:F=>{F.stunDmg*=1.3}},
 souryo4:{n:'光の加護',c:'def',ap:4,d:'HPが3割以下のとき、受けるダメージ-30%',f:F=>{F.lowHpTaken=Math.max(F.lowHpTaken,.3)}},
 souryo5:{n:'祝福',c:'spc',ap:2,d:'肉の回復量2倍・ハートが出やすい',f:F=>{F.meat*=2;F.heart*=2}},
 souryo6:{n:'ホーリー強化',c:'atk',ap:4,d:'職業技の威力+50%',f:F=>{F.spX*=1.5}},
 souryo7:{n:'よみがえり',c:'def',ap:6,d:'1回の冒険で1度だけ、HP30%で立ち上がる',f:F=>{F.revive30=1}},
 souryo8:{n:'慈愛',c:'spc',ap:3,d:'仲間の攻撃・回復+30%',f:F=>{F.ally*=1.3;F.allyHeal*=1.3}},
 souryo9:{n:'聖者',c:'def',ap:5,d:'いやし系の技の回復量2倍',f:F=>{F.healWz*=2}},
 kariudo0:{n:'狙いうち',c:'atk',ap:2,d:'会心率+5%',f:F=>{F.crit+=.05}},
 kariudo1:{n:'はやて',c:'spc',ap:2,d:'移動速度+10%',f:F=>{F.spd*=1.1}},
 kariudo2:{n:'弓の名手',c:'atk',ap:3,d:'弓のダメージ+30%',f:F=>{F.wd.bow*=1.3}},
 kariudo3:{n:'鷹の目',c:'spc',ap:2,d:'玉を引き寄せる範囲+30%',f:F=>{F.mag*=1.3}},
 kariudo4:{n:'急所うち',c:'atk',ap:4,d:'会心ダメージ+40%',f:F=>{F.critX+=.4}},
 kariudo5:{n:'回避',c:'def',ap:5,d:'15%の確率で攻撃をかわす',f:F=>{F.evade+=.15}},
 kariudo6:{n:'獲物狩り',c:'atk',ap:3,d:'強敵へのダメージ+30%',f:F=>{F.eliteDmg*=1.3}},
 kariudo7:{n:'獲物の印',c:'spc',ap:3,d:'経験値+15%',f:F=>{F.xp*=1.15}},
 kariudo8:{n:'連射',c:'atk',ap:4,d:'弓の間隔-20%',f:F=>{F.wcd.bow*=.8}},
 kariudo9:{n:'狩りの名人',c:'atk',ap:6,d:'弓の矢の数+1',f:F=>{F.wn.bow+=1}},
 touzoku0:{n:'ぬすむ',c:'spc',ap:2,d:'ゴールド+30%',f:F=>{F.gold*=1.3}},
 touzoku1:{n:'しのびあし',c:'spc',ap:2,d:'移動速度+10%',f:F=>{F.spd*=1.1}},
 touzoku2:{n:'早業',c:'atk',ap:3,d:'短剣の攻撃間隔-15%',f:F=>{F.wcd.dagger*=.85}},
 touzoku3:{n:'目利き',c:'spc',ap:3,d:'装備が落ちやすい',f:F=>{F.eqDrop*=1.5}},
 touzoku4:{n:'逃げ足',c:'def',ap:2,d:'攻撃を受けた直後の2秒間、移動速度+30%',f:F=>{F.flee=.3}},
 touzoku5:{n:'急所',c:'atk',ap:3,d:'会心率+8%',f:F=>{F.crit+=.08}},
 touzoku6:{n:'宝さがし',c:'spc',ap:4,d:'宝箱でもらえるレベルアップ+1',f:F=>{F.chestLv+=1}},
 touzoku7:{n:'カード運',c:'spc',ap:4,d:'カードが落ちやすい',f:F=>{F.cardMul*=1.5}},
 touzoku8:{n:'影うち',c:'atk',ap:4,d:'後ろにいる敵へのダメージ+50%',f:F=>{F.backDmg*=1.5}},
 touzoku9:{n:'大盗賊',c:'spc',ap:6,d:'ゴールド2倍・ユニークが出やすい',f:F=>{F.gold*=2;F.uniqMul*=2}},
 mamono0:{n:'なつかれ上手',c:'spc',ap:3,d:'ハートがとても出やすい',f:F=>{F.heart*=3}},
 mamono1:{n:'仲間の力',c:'atk',ap:4,d:'仲間の攻撃+50%',f:F=>{F.ally*=1.5}},
 mamono2:{n:'鞭の名人',c:'atk',ap:3,d:'鞭の長さ+30%',f:F=>{F.wr.whip*=1.3}},
 mamono3:{n:'大部屋',c:'spc',ap:5,d:'連れて行ける仲間+1',f:F=>{F.slot+=1}},
 mamono4:{n:'しつけ',c:'spc',ap:2,d:'仲間の経験値+50%',f:F=>{F.allyXp*=1.5}},
 mamono5:{n:'守りの陣',c:'def',ap:3,d:'仲間のそばにいると、受けるダメージ-15%',f:F=>{F.nearAllyTaken=Math.max(F.nearAllyTaken,.15)}},
 mamono6:{n:'えさやり',c:'def',ap:2,d:'スライムの回復量2倍',f:F=>{F.slimeHeal*=2}},
 mamono7:{n:'群れの長',c:'atk',ap:4,d:'仲間1体ごとにダメージ+5%',f:F=>{F.packDmg+=.05}},
 mamono8:{n:'いっせい強化',c:'atk',ap:3,d:'職業技の時間+4秒',f:F=>{F.spDur+=4}},
 mamono9:{n:'魔物の王',c:'spc',ap:6,d:'仲間が倒した敵からも技をひらめく',f:F=>{F.beastHira=1}},
 mahouken0:{n:'魔法剣',c:'atk',ap:4,d:'剣にも魔法弾ダメージの上乗せが効く',f:F=>{F.mken=1}},
 mahouken1:{n:'ファイア剣',c:'atk',ap:3,d:'剣が敵を燃やす（毎秒小ダメージ）',f:F=>{F.burn=1}},
 mahouken2:{n:'サンダー剣',c:'atk',ap:3,d:'剣の攻撃の10%で落雷',f:F=>{F.thunder=.1}},
 mahouken3:{n:'ブリザド剣',c:'atk',ap:3,d:'剣の攻撃の10%で敵を1秒足止め',f:F=>{F.freeze=.1}},
 mahouken4:{n:'魔法の盾',c:'def',ap:3,d:'受けるダメージ-10%・魔法弾ダメージ+10%',f:F=>{F.taken*=.9;F.wd.magic*=1.1}},
 mahouken5:{n:'二刀流魔法',c:'atk',ap:6,d:'剣が2回攻撃（2回目は70%）',f:F=>{F.dblHit=.7}},
 mahouken6:{n:'ドレイン剣',c:'def',ap:4,d:'与えたダメージの2%でHP回復',f:F=>{F.drain+=.02}},
 mahouken7:{n:'魔力剣',c:'atk',ap:5,d:'技を出した直後の剣が3倍',f:F=>{F.mkenAfter=1}},
 mahouken8:{n:'ホーリー剣',c:'atk',ap:4,d:'ボスへのダメージ+30%',f:F=>{F.bossDmg*=1.3}},
 mahouken9:{n:'フレア剣',c:'atk',ap:5,d:'剣の届く幅+50%',f:F=>{F.wr.sword*=1.5}},
 seikishi0:{n:'聖剣',c:'atk',ap:3,d:'剣のダメージ+25%',f:F=>{F.wd.sword*=1.25}},
 seikishi1:{n:'かばう',c:'def',ap:3,d:'仲間のそばにいると、受けるダメージ-20%',f:F=>{F.nearAllyTaken=Math.max(F.nearAllyTaken,.2)}},
 seikishi2:{n:'祈りの剣',c:'def',ap:3,d:'剣が当たるとHPが少し回復',f:F=>{F.prayHeal=1}},
 seikishi3:{n:'鉄の意志',c:'def',ap:4,d:'ボスの大技のダメージ-50%',f:F=>{F.blastTaken*=.5}},
 seikishi4:{n:'十字斬り',c:'atk',ap:5,d:'剣が上下左右の4方向を斬る',f:F=>{F.cross=1}},
 seikishi5:{n:'聖域',c:'def',ap:3,d:'立ち止まると毎秒最大HPの2%回復',f:F=>{F.stillRegen+=.02}},
 seikishi6:{n:'守護者',c:'atk',ap:3,d:'HPが満タンのときダメージ+20%',f:F=>{F.fullHpDmg+=.2}},
 seikishi7:{n:'光の鎧',c:'def',ap:5,d:'10秒に1回、攻撃を無効にする',f:F=>{F.block=Math.min(F.block,10)}},
 seikishi8:{n:'裁き',c:'atk',ap:4,d:'ボスへのダメージ+25%',f:F=>{F.bossDmg*=1.25}},
 seikishi9:{n:'聖騎士の誓い',c:'def',ap:6,d:'最大HP+30%',f:F=>{F.hp*=1.3}},
 ryukishi0:{n:'ジャンプ',c:'atk',ap:5,d:'5秒ごとに跳び上がって落下攻撃',f:F=>{F.jump=1}},
 ryukishi1:{n:'竜の鱗',c:'def',ap:2,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 ryukishi2:{n:'槍術',c:'atk',ap:3,d:'槍の届く距離+30%',f:F=>{F.wr.spear*=1.3}},
 ryukishi3:{n:'竜の息',c:'atk',ap:4,d:'10秒ごとに前へ炎を吐く',f:F=>{F.breath=1}},
 ryukishi4:{n:'空中殺法',c:'atk',ap:4,d:'打ち上げた敵へのダメージ+40%',f:F=>{F.airDmg*=1.4}},
 ryukishi5:{n:'竜の血',c:'def',ap:3,d:'最大HP+20%',f:F=>{F.hp*=1.2}},
 ryukishi6:{n:'竜巻落とし',c:'atk',ap:5,d:'ジャンプの着地で竜巻が起きる',f:F=>{F.jumpTor=1}},
 ryukishi7:{n:'竜の目',c:'atk',ap:3,d:'会心率+10%',f:F=>{F.crit+=.1}},
 ryukishi8:{n:'竜の怒り',c:'atk',ap:4,d:'HPが半分以下のとき攻撃間隔-25%',f:F=>{F.lowHpCd=.25}},
 ryukishi9:{n:'竜騎士の極意',c:'spc',ap:6,d:'ジャンプの間隔が半分',f:F=>{F.jumpFast=1}},
 samurai0:{n:'居合',c:'atk',ap:4,d:'刀の1撃目が2倍',f:F=>{F.iai=Math.max(F.iai,2)}},
 samurai1:{n:'刀の手入れ',c:'atk',ap:3,d:'刀のダメージ+20%',f:F=>{F.wd.katana*=1.2}},
 samurai2:{n:'明鏡止水',c:'spc',ap:3,d:'立ち止まると会心率+20%',f:F=>{F.stillCrit+=.2}},
 samurai3:{n:'白刃取り',c:'def',ap:5,d:'10%で攻撃を無効にして反撃',f:F=>{F.parry=.1}},
 samurai4:{n:'心眼',c:'atk',ap:5,d:'会心ダメージ+50%',f:F=>{F.critX+=.5}},
 samurai5:{n:'武士の誇り',c:'atk',ap:4,d:'強敵・ボスへのダメージ+25%',f:F=>{F.eliteDmg*=1.25;F.bossDmg*=1.25}},
 samurai6:{n:'残心',c:'atk',ap:3,d:'敵を倒すと0.5秒間、攻撃間隔-50%',f:F=>{F.zanshin=1}},
 samurai7:{n:'燕返し',c:'atk',ap:6,d:'刀が2回攻撃',f:F=>{F.katanaDbl=1}},
 samurai8:{n:'不動心',c:'spc',ap:3,d:'気絶させる技の効果時間+50%',f:F=>{F.stunDur*=1.5}},
 samurai9:{n:'剣豪',c:'atk',ap:7,d:'居合の倍率が3倍',f:F=>{F.iai3=1}},
 kyosenshi0:{n:'怒り',c:'atk',ap:4,d:'HPが減るほどダメージ上昇（最大+50%）',f:F=>{F.rage=.5}},
 kyosenshi1:{n:'捨て身',c:'atk',ap:3,d:'ダメージ+30%・受けるダメージ+20%',f:F=>{F.dmg*=1.3;F.taken*=1.2}},
 kyosenshi2:{n:'血の渇き',c:'def',ap:3,d:'敵を倒すとHP1回復',f:F=>{F.killHeal+=1}},
 kyosenshi3:{n:'猛攻',c:'atk',ap:4,d:'攻撃間隔-15%',f:F=>{F.cdm*=.85}},
 kyosenshi4:{n:'狂乱',c:'atk',ap:4,d:'連撃が続くほど攻撃間隔が短くなる',f:F=>{F.frenzy=1}},
 kyosenshi5:{n:'不死身',c:'def',ap:5,d:'1回の冒険で1度だけ、HP1で耐える',f:F=>{F.guts+=1}},
 kyosenshi6:{n:'破壊',c:'atk',ap:3,d:'壁・死体にぶつかったときのダメージ+50%',f:F=>{F.bump*=1.5}},
 kyosenshi7:{n:'暴走',c:'atk',ap:3,d:'吹っ飛ばす力+50%',f:F=>{F.knock*=1.5}},
 kyosenshi8:{n:'狂気の目',c:'atk',ap:3,d:'会心率+10%',f:F=>{F.crit+=.1}},
 kyosenshi9:{n:'鬼神',c:'atk',ap:6,d:'バーサクの時間+5秒',f:F=>{F.spDur+=5}},
 kenja0:{n:'白魔法',c:'def',ap:3,d:'回復量+30%',f:F=>{F.heal*=1.3}},
 kenja1:{n:'黒魔法',c:'atk',ap:4,d:'杖のダメージ+30%',f:F=>{F.wd.staff*=1.3}},
 kenja2:{n:'魔力の泉',c:'spc',ap:4,d:'技の間隔-15%',f:F=>{F.wazaCd*=.85}},
 kenja3:{n:'知恵',c:'spc',ap:3,d:'経験値+20%',f:F=>{F.xp*=1.2}},
 kenja4:{n:'連続魔',c:'atk',ap:6,d:'技が10%で2回出る',f:F=>{F.wazaDbl=.1}},
 kenja5:{n:'魔法障壁',c:'def',ap:4,d:'受けるダメージ-15%',f:F=>{F.taken*=.85}},
 kenja6:{n:'理の目',c:'spc',ap:4,d:'ひらめき率+50%',f:F=>{F.hira*=1.5}},
 kenja7:{n:'二重詠唱',c:'atk',ap:5,d:'杖の光の玉+1',f:F=>{F.wn.staff+=1}},
 kenja8:{n:'聖と闇',c:'atk',ap:5,d:'技のダメージ+25%',f:F=>{F.wazaDmg*=1.25}},
 kenja9:{n:'大賢者',c:'atk',ap:7,d:'連携の威力+50%',f:F=>{F.rk*=1.5}},
 fusui0:{n:'地の利',c:'atk',ap:3,d:'そのステージの敵へのダメージ+15%',f:F=>{F.dmg*=1.15}},
 fusui1:{n:'風の加護',c:'spc',ap:2,d:'移動速度+10%',f:F=>{F.spd*=1.1}},
 fusui2:{n:'大地の守り',c:'def',ap:2,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 fusui3:{n:'自然の恵み',c:'def',ap:2,d:'毎秒最大HPの0.5%回復',f:F=>{F.regenP+=.005}},
 fusui4:{n:'地脈',c:'atk',ap:4,d:'技の範囲+20%',f:F=>{F.wazaArea*=1.2}},
 fusui5:{n:'天候読み',c:'spc',ap:3,d:'ひらめき率+30%',f:F=>{F.hira*=1.3}},
 fusui6:{n:'地形効果強化',c:'atk',ap:4,d:'職業技の威力+50%',f:F=>{F.spX*=1.5}},
 fusui7:{n:'精霊の声',c:'spc',ap:3,d:'経験値+15%',f:F=>{F.xp*=1.15}},
 fusui8:{n:'山の守り',c:'def',ap:4,d:'強敵から受けるダメージ-25%',f:F=>{F.eliteTaken*=.75}},
 fusui9:{n:'風水の極意',c:'spc',ap:5,d:'職業技のゲージが30%速くたまる',f:F=>{F.jg*=1.3}},
 jimadou0:{n:'ヘイスト',c:'spc',ap:3,d:'移動速度+15%',f:F=>{F.spd*=1.15}},
 jimadou1:{n:'スロウ',c:'def',ap:3,d:'近くの敵の動きが遅くなる',f:F=>{F.slowAura=1}},
 jimadou2:{n:'クイック',c:'atk',ap:3,d:'攻撃間隔-10%',f:F=>{F.cdm*=.9}},
 jimadou3:{n:'時の砂',c:'spc',ap:4,d:'職業技のゲージが30%速くたまる',f:F=>{F.jg*=1.3}},
 jimadou4:{n:'リジェネ',c:'def',ap:2,d:'毎秒最大HPの0.5%回復',f:F=>{F.regenP+=.005}},
 jimadou5:{n:'グラビデ',c:'atk',ap:5,d:'魔法弾が当たると、敵の残りHPの5%を削る',f:F=>{F.gravity=.05}},
 jimadou6:{n:'テレポ',c:'def',ap:3,d:'攻撃を受けると少し瞬間移動する',f:F=>{F.teleport=1}},
 jimadou7:{n:'時の加護',c:'atk',ap:4,d:'ストップ中のダメージ2倍',f:F=>{F.stopDmg=2}},
 jimadou8:{n:'時間逆行',c:'def',ap:6,d:'1回の冒険で1度だけ、HPを10秒前に戻す',f:F=>{F.rewind=1}},
 jimadou9:{n:'時の支配者',c:'spc',ap:6,d:'ストップの時間+3秒',f:F=>{F.spDur+=3}},
 shokan0:{n:'召喚の心得',c:'spc',ap:3,d:'職業技のゲージが20%速くたまる',f:F=>{F.jg*=1.2}},
 shokan1:{n:'精霊の友',c:'atk',ap:3,d:'仲間の攻撃+30%',f:F=>{F.ally*=1.3}},
 shokan2:{n:'火の精霊',c:'atk',ap:4,d:'10秒ごとに火の精霊がまわりで爆発',f:F=>{F.spFire=1}},
 shokan3:{n:'氷の精霊',c:'def',ap:4,d:'10秒ごとに氷の精霊がまわりの敵を足止め',f:F=>{F.spIce=1}},
 shokan4:{n:'雷の精霊',c:'atk',ap:4,d:'10秒ごとに雷の精霊が落雷',f:F=>{F.spBolt=1}},
 shokan5:{n:'魔力共鳴',c:'atk',ap:3,d:'仲間1体ごとに魔法弾ダメージ+8%',f:F=>{F.resonance+=.08}},
 shokan6:{n:'召喚強化',c:'atk',ap:4,d:'職業技の威力+50%',f:F=>{F.spX*=1.5}},
 shokan7:{n:'守護精霊',c:'def',ap:3,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 shokan8:{n:'二重召喚',c:'atk',ap:7,d:'職業技が2回出る',f:F=>{F.spCount+=1}},
 shokan9:{n:'精霊王',c:'spc',ap:6,d:'精霊の間隔が半分',f:F=>{F.spiritFast=1}},
 ginyu0:{n:'行進曲',c:'spc',ap:3,d:'移動速度+15%',f:F=>{F.spd*=1.15}},
 ginyu1:{n:'子守唄',c:'spc',ap:3,d:'眠らせる技の効果時間+50%',f:F=>{F.sleepDur*=1.5}},
 ginyu2:{n:'癒しの調べ',c:'def',ap:2,d:'毎秒最大HPの0.5%回復',f:F=>{F.regenP+=.005}},
 ginyu3:{n:'英雄の歌',c:'atk',ap:4,d:'仲間の攻撃+40%',f:F=>{F.ally*=1.4}},
 ginyu4:{n:'魔法の歌',c:'atk',ap:4,d:'技のダメージ+20%',f:F=>{F.wazaDmg*=1.2}},
 ginyu5:{n:'狂想曲',c:'atk',ap:3,d:'会心率+8%',f:F=>{F.crit+=.08}},
 ginyu6:{n:'守りの歌',c:'def',ap:2,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 ginyu7:{n:'鎮魂歌',c:'atk',ap:4,d:'ボスへのダメージ+20%',f:F=>{F.bossDmg*=1.2}},
 ginyu8:{n:'アンコール',c:'spc',ap:5,d:'職業技のあと、ゲージが30%たまった状態になる',f:F=>{F.encore=.3}},
 ginyu9:{n:'伝説の詩',c:'atk',ap:7,d:'勇気の歌の倍率が3倍',f:F=>{F.legend=1}},
 asobinin0:{n:'きまぐれ',c:'spc',ap:2,d:'冒険のはじめに、ランダムな能力が1つ上がる',f:F=>{F.kimagure=1}},
 asobinin1:{n:'ラッキー',c:'atk',ap:3,d:'会心率+10%',f:F=>{F.crit+=.1}},
 asobinin2:{n:'あそぶ',c:'def',ap:3,d:'5%で敵が笑って止まる',f:F=>{F.play=.05}},
 asobinin3:{n:'口笛',c:'spc',ap:3,d:'敵が集まりやすくなり、経験値+15%',f:F=>{F.lure=1;F.xp*=1.15}},
 asobinin4:{n:'ひらめき天才',c:'spc',ap:6,d:'ひらめき率2倍',f:F=>{F.hira*=2}},
 asobinin5:{n:'おどける',c:'def',ap:4,d:'攻撃を受けると10%で無効',f:F=>{F.nullify=Math.max(F.nullify,.1)}},
 asobinin6:{n:'いたずら',c:'atk',ap:3,d:'敵どうしがぶつかったときのダメージ2倍',f:F=>{F.bump*=2}},
 asobinin7:{n:'ギャンブル',c:'atk',ap:3,d:'ダメージが0.5〜2倍でぶれる',f:F=>{F.gamble=1}},
 asobinin8:{n:'大当たり',c:'atk',ap:5,d:'1%でダメージ10倍',f:F=>{F.jackpot=.01}},
 asobinin9:{n:'悟り',c:'spc',ap:5,d:'ゆびをふるで強い職業技が出やすい',f:F=>{F.satori=1}},
 odoriko0:{n:'ステップ',c:'def',ap:3,d:'回避+10%',f:F=>{F.evade+=.1}},
 odoriko1:{n:'ターン',c:'spc',ap:2,d:'移動速度+10%',f:F=>{F.spd*=1.1}},
 odoriko2:{n:'魅了',c:'def',ap:3,d:'攻撃が当たった敵の10%が少し止まる',f:F=>{F.charm=.1}},
 odoriko3:{n:'情熱',c:'atk',ap:4,d:'連撃が続くほどダメージ上昇（最大+40%）',f:F=>{F.passion=.4}},
 odoriko4:{n:'剣の舞強化',c:'atk',ap:4,d:'職業技の刃+2',f:F=>{F.spN+=2}},
 odoriko5:{n:'乱舞',c:'atk',ap:5,d:'扇の数+1',f:F=>{F.wn.fan+=1}},
 odoriko6:{n:'投げキッス',c:'def',ap:3,d:'近づいた敵を一瞬止める',f:F=>{F.kiss=1}},
 odoriko7:{n:'華麗',c:'atk',ap:4,d:'連撃50以上で会心率+15%',f:F=>{F.karei=1}},
 odoriko8:{n:'喝采',c:'spc',ap:3,d:'経験値+20%',f:F=>{F.xp*=1.2}},
 odoriko9:{n:'舞姫',c:'atk',ap:5,d:'剣の舞の時間+4秒',f:F=>{F.spDur+=4}},
 ninja0:{n:'手裏剣術',c:'atk',ap:3,d:'手裏剣のダメージ+20%',f:F=>{F.wd.shuriken*=1.2}},
 ninja1:{n:'身代わり',c:'def',ap:5,d:'15秒に1回、攻撃を無効にする',f:F=>{F.block=Math.min(F.block,15)}},
 ninja2:{n:'速攻',c:'spc',ap:3,d:'移動速度+15%',f:F=>{F.spd*=1.15}},
 ninja3:{n:'毒手裏剣',c:'atk',ap:4,d:'手裏剣が敵を毒にする',f:F=>{F.psnShur=1}},
 ninja4:{n:'煙玉',c:'def',ap:4,d:'攻撃を受けると、まわりの敵を眠らせる',f:F=>{F.smoke=1}},
 ninja5:{n:'二刀流',c:'atk',ap:5,d:'手裏剣の数+2',f:F=>{F.wn.shuriken+=2}},
 ninja6:{n:'隠れ身',c:'def',ap:3,d:'立ち止まっていると、受けるダメージ-20%',f:F=>{F.stillTaken+=.2}},
 ninja7:{n:'忍の足',c:'def',ap:4,d:'回避+10%',f:F=>{F.evade+=.1}},
 ninja8:{n:'影縫い',c:'atk',ap:3,d:'手裏剣が敵を0.5秒足止め',f:F=>{F.pin=.5}},
 ninja9:{n:'忍術奥義',c:'spc',ap:7,d:'影分身の分身+1',f:F=>{F.spN+=1}},
 juou0:{n:'牙',c:'atk',ap:3,d:'仲間の攻撃+30%',f:F=>{F.ally*=1.3}},
 juou1:{n:'野生の勘',c:'def',ap:2,d:'回避+5%',f:F=>{F.evade+=.05}},
 juou2:{n:'群れ',c:'spc',ap:5,d:'連れて行ける仲間+1',f:F=>{F.slot+=1}},
 juou3:{n:'吠える',c:'def',ap:3,d:'10秒ごとに、まわりの敵がひるむ',f:F=>{F.howl=1}},
 juou4:{n:'獣の皮',c:'def',ap:2,d:'受けるダメージ-10%',f:F=>{F.taken*=.9}},
 juou5:{n:'野性解放',c:'atk',ap:4,d:'仲間の動きが30%速くなる',f:F=>{F.allySpd*=1.3}},
 juou6:{n:'狩りの本能',c:'spc',ap:3,d:'仲間が倒した敵の経験値+50%',f:F=>{F.allyKillXp*=1.5}},
 juou7:{n:'王の威厳',c:'def',ap:4,d:'仲間1体ごとに受けるダメージ-4%',f:F=>{F.kingTaken+=.04}},
 juou8:{n:'巨獣化',c:'atk',ap:4,d:'巨大化の時間+5秒',f:F=>{F.spDur+=5}},
 juou9:{n:'獣王の咆哮',c:'atk',ap:6,d:'巨大化のときに画面の敵を3秒止める',f:F=>{F.roar=1}},
 shonin0:{n:'値切り',c:'spc',ap:2,d:'町の施設の強化費用-20%',f:F=>{F.shopDisc=.2}},
 shonin1:{n:'商売繁盛',c:'spc',ap:3,d:'コインが2倍出る',f:F=>{F.coinMul*=2}},
 shonin2:{n:'投資',c:'spc',ap:3,d:'冒険の終わりにゴールド+20%',f:F=>{F.invest=.2}},
 shonin3:{n:'精錬上手',c:'spc',ap:3,d:'精錬の成功率+10%',f:F=>{F.refine+=10}},
 shonin4:{n:'札束の盾',c:'def',ap:4,d:'ゴールド1万ごとに受けるダメージ-2%（最大-20%）',f:F=>{F.wealthTaken=1}},
 shonin5:{n:'鑑定',c:'spc',ap:4,d:'ユニークが出やすい',f:F=>{F.uniqMul*=2}},
 shonin6:{n:'売り上手',c:'spc',ap:2,d:'装備の売値1.5倍',f:F=>{F.sellMul*=1.5}},
 shonin7:{n:'目利きの極み',c:'spc',ap:4,d:'装備のレアリティが上がりやすい',f:F=>{F.rareUp=1}},
 shonin8:{n:'黄金の刃',c:'atk',ap:5,d:'ゴールド1万ごとにダメージ+2%（最大+30%）',f:F=>{F.wealthDmg=1}},
 shonin9:{n:'大富豪',c:'atk',ap:6,d:'ぜになげの威力2倍',f:F=>{F.zeni2=1}},
 shinen0:{n:'闇の剣',c:'atk',ap:4,d:'剣のダメージ+40%',f:F=>{F.wd.sword*=1.4}},
 shinen1:{n:'深淵の盾',c:'def',ap:4,d:'受けるダメージ-15%',f:F=>{F.taken*=.85}},
 shinen2:{n:'吸魂',c:'def',ap:3,d:'敵を倒すとHP2回復',f:F=>{F.killHeal+=2}},
 shinen3:{n:'闇のオーラ',c:'atk',ap:5,d:'近くの敵に毎秒ダメージ',f:F=>{F.aura=1}},
 shinen4:{n:'生命の代償',c:'atk',ap:5,d:'技を出すたびにHPを1%使い、技の威力+50%',f:F=>{F.costLife=1;F.wazaDmg*=1.5}},
 shinen5:{n:'呪い',c:'atk',ap:4,d:'攻撃した敵が受けるダメージ+20%',f:F=>{F.curse=.2}},
 shinen6:{n:'闇の衣',c:'def',ap:4,d:'HPが半分以下のとき回避+20%',f:F=>{F.lowHpEvade+=.2}},
 shinen7:{n:'冥府の門',c:'atk',ap:6,d:'倒した敵が20%で爆発する',f:F=>{F.killExplode=Math.max(F.killExplode,.2)}},
 shinen8:{n:'魔剣解放',c:'atk',ap:7,d:'剣が3方向を斬る',f:F=>{F.tri=1}},
 shinen9:{n:'深淵の王',c:'spc',ap:8,d:'深淵斬で削るHPが10%になる',f:F=>{F.abyssKing=1}},
 daimadou0:{n:'極大魔力',c:'atk',ap:4,d:'魔法弾のダメージ+40%',f:F=>{F.wd.magic*=1.4}},
 daimadou1:{n:'結界',c:'def',ap:5,d:'受けるダメージ-20%',f:F=>{F.taken*=.8}},
 daimadou2:{n:'多重詠唱',c:'atk',ap:7,d:'魔法弾の数+2',f:F=>{F.wn.magic+=2}},
 daimadou3:{n:'元素の支配',c:'atk',ap:5,d:'ほのお系・眠り系の技の威力と範囲+30%',f:F=>{F.elem*=1.3}},
 daimadou4:{n:'魔力爆発',c:'atk',ap:4,d:'爆発の範囲+50%',f:F=>{F.blastR*=1.5}},
 daimadou5:{n:'魔力吸収',c:'spc',ap:4,d:'魔法弾が当たると職業技のゲージがたまる',f:F=>{F.magicGauge=1}},
 daimadou6:{n:'叡智',c:'spc',ap:6,d:'ひらめき率2倍',f:F=>{F.hira*=2}},
 daimadou7:{n:'永久詠唱',c:'spc',ap:6,d:'技の間隔-25%',f:F=>{F.wazaCd*=.75}},
 daimadou8:{n:'禁呪',c:'atk',ap:7,d:'連携の威力2倍',f:F=>{F.rk*=2}},
 daimadou9:{n:'魔導の極み',c:'atk',ap:8,d:'アルテマが2回出る',f:F=>{F.ultima2=1}},
 hoshiyomi0:{n:'星の導き',c:'spc',ap:4,d:'ひらめき率+50%',f:F=>{F.hira*=1.5}},
 hoshiyomi1:{n:'流れ星',c:'atk',ap:4,d:'10秒ごとに星が落ちてくる',f:F=>{F.star=1}},
 hoshiyomi2:{n:'星の加護',c:'def',ap:4,d:'受けるダメージ-15%',f:F=>{F.taken*=.85}},
 hoshiyomi3:{n:'星座',c:'atk',ap:5,d:'持っている技の種類ごとにダメージ+5%',f:F=>{F.constel+=.05}},
 hoshiyomi4:{n:'天球',c:'atk',ap:5,d:'杖の光の玉+1・大きくなる',f:F=>{F.wn.staff+=1;F.wr.staff*=1.3}},
 hoshiyomi5:{n:'星読み',c:'spc',ap:4,d:'経験値+25%',f:F=>{F.xp*=1.25}},
 hoshiyomi6:{n:'彗星',c:'atk',ap:5,d:'杖の攻撃が当たると5%で隕石が落ちる',f:F=>{F.comet=.05}},
 hoshiyomi7:{n:'新星',c:'atk',ap:6,d:'ひらめいたあと10秒間、ダメージ2倍',f:F=>{F.nova=1}},
 hoshiyomi8:{n:'宇宙の理',c:'spc',ap:6,d:'連携が起きる間隔が1秒から2秒に広がる',f:F=>{F.rkWin=2}},
 hoshiyomi9:{n:'星の申し子',c:'spc',ap:8,d:'1回の冒険でひらめける数+3',f:F=>{F.hiraCap+=3}},
 suppin0:{n:'経験値アップ',c:'spc',ap:2,d:'経験値+15%',f:F=>{F.xp*=1.15}},
 suppin1:{n:'じしゃく体質',c:'spc',ap:2,d:'玉を引き寄せる範囲+40%',f:F=>{F.mag*=1.4}},
 suppin2:{n:'はやあし',c:'spc',ap:2,d:'移動速度+10%',f:F=>{F.spd*=1.1}},
 suppin3:{n:'技の達人',c:'spc',ap:4,d:'技の間隔-15%',f:F=>{F.wazaCd*=.85}},
 suppin4:{n:'見習い',c:'spc',ap:3,d:'ジョブの経験値+30%',f:F=>{F.jobXp*=1.3}},
 suppin5:{n:'器用',c:'def',ap:4,d:'装備の能力+10%',f:F=>{F.eqMul*=1.1}},
 suppin6:{n:'ものまね',c:'spc',ap:5,d:'前についていたジョブの基本能力の半分を得る',f:F=>{F.mimic=1}},
 suppin7:{n:'なんでも屋',c:'atk',ap:5,d:'持っている武器の種類ごとにダメージ+8%',f:F=>{F.nandemo+=.08}},
 suppin8:{n:'ひらめき連鎖',c:'atk',ap:4,d:'ピコーンの技連発+1回',f:F=>{F.spN+=1}},
 suppin9:{n:'マスターの証',c:'atk',ap:6,d:'マスターしたジョブ1つにつきダメージ+3%',f:F=>{F.masterDmg+=.03}}
};
const JOBPAL={kenshi:['#7a4a2a','#3a7bd5','#e8eef5','#3b2a20'],mahou:['#2b2340','#8a4fd1','#c98a3a','#4a2a78'],souryo:['#d9b25a','#f4f1e6','#c98a3a','#7a8ca8'],kariudo:['#5a3a22','#4f8a3a','#a87a45','#3b2a20'],touzoku:['#3a3a3a','#5b5b6e','#cfd6dd','#2a2a33'],mamono:['#a0522d','#3f9a45','#8d6e63','#3b2a20'],mahouken:['#8a2a2a','#2a4fb0','#ff9a4a','#3a2a6a'],seikishi:['#e8d9a0','#dfe6ee','#ffe14a','#7a8ca8'],ryukishi:['#3a4a6a','#2f5f7f','#cfd6dd','#1f2f3f'],samurai:['#1f1f1f','#b03a3a','#e8eef5','#3a2a2a'],kyosenshi:['#c0392b','#6b3a2a','#9aa5ad','#3b2a20'],kenja:['#e8e8e8','#2f8a7a','#ffd34e','#1f5f55'],fusui:['#3a6a3a','#c9a85a','#8d6e63','#5a4a2a'],jimadou:['#6a4aa0','#2b3a6a','#ffd34e','#1f2a4a'],shokan:['#2a7a6a','#3a8a5a','#ff7a2a','#1f4a3a'],ginyu:['#d97a2a','#c0507a','#ffd34e','#5a2a3a'],asobinin:['#ff8ac0','#ffb000','#ff6b57','#7a3aa0'],odoriko:['#c0392b','#ff8ae6','#ffd34e','#c0507a'],ninja:['#1f1f2a','#2a2a40','#cfd6dd','#1f1f2a'],juou:['#8a5a2a','#7a5a3a','#c98a3a','#4a3a2a'],shonin:['#5a3a22','#d9a03a','#ffe14a','#5a3a22'],shinen:['#1a1a1a','#2a1a3a','#b5359e','#1a0f22'],daimadou:['#f0f0f0','#4a1f7a','#9ae6ff','#2a0f4a'],hoshiyomi:['#3a2a7a','#1f2f6a','#ffe14a','#14204a'],suppin:['#5a3a22','#e6e6e6','#c98a3a','#3b2a20']};

for(const k in JOBPAL){const[h,b,w,l]=JOBPAL[k];PAL['hero_'+k]={h,s:'#ffd2a8',e:'#222',b,w,l}}
const JOB_MAX=10,jobNeed=lv=>(50+lv*40)*DIF.jp,AB_MAX=8,AP0=15,AP_PER=3;
const abOwner=a=>a.replace(/\d+$/,''),abIdx=a=>+a.match(/\d+$/)[0];
const abLearned=a=>{if(!ABIL[a])return false;const j=abOwner(a),J=SV.jobs[j];return !!J&&J.lv>=abIdx(a)+1&&(J.lv>1||J.exp>0||SV.job===j)};
const mastered=()=>Object.keys(JOBS).filter(j=>SV.jobs[j]&&SV.jobs[j].lv>=JOB_MAX);
const apMax=()=>{const m=mastered();return AP0+AP_PER*m.length+(SV.job==='suppin'?5:m.includes('suppin')?2:0)};
const abActive=()=>{let ap=apMax(),n=0;const o=[];for(const a of SV.abil){if(!a||!abLearned(a)||o.includes(a))continue;if(n>=abMax()||ap<ABIL[a].ap)continue;ap-=ABIL[a].ap;n++;o.push(a)}return o};
const apUsed=()=>abActive().reduce((t,a)=>t+ABIL[a].ap,0);
const abOn=a=>abActive().includes(a);
const jobOpen=j=>!JOBS[j].unlock||JOBS[j].unlock();
const TIERS=['基本','上級','深淵','すっぴん'];
function migrateJobs(){if(!SV.jobs)SV.jobs={};for(const k in JOBS)if(!SV.jobs[k])SV.jobs[k]={lv:1,exp:0};
 const mp={k:'kenshi',m:'mahou',b:'mamono',s:'suppin'},o=[];for(const a of SV.abil||[]){if(!a)continue;const m=/^([kmbs])([1-4])$/.exec(a),v=m?mp[m[1]]+(+m[2]-1):a;if(ABIL[v]&&!o.includes(v))o.push(v)}SV.abil=o.slice(0,9);
 if(!JOBS[SV.job])SV.job='kenshi';if(!SV.souls)SV.souls={};if(!SV.comboBook)SV.comboBook={};(SV.inv||[]).forEach(it=>{if(it.slot==='w'&&!it.wt)it.wt=UNIQ_WT[it.u]||'sword'})}
migrateJobs();
const WTAG=new Proxy({},{get:(_,k)=>WAZA[k]&&WAZA[k].tag});
const WTN={sword:'斬',boom:'投',magic:'魔'};
const FAMW=f=>Object.keys(WEAP).filter(w=>WEAP[w].fam===f).map(w=>WEAP[w].n).join('・');
const rkName=(a,b)=>WAZA[a].pre+WAZA[b].post;
const UNIQ={
 futamata:{n:'ふたまたブーメラン',slot:'w',p:'ブーメランの数+1',f:F=>{F.boomN+=1}},
 enjin:{n:'炎の指輪',slot:'c',p:'魔法弾が当たると小さく爆発する',f:F=>{F.fireBolt=1}},
 kyuketsu:{n:'吸血の剣',slot:'w',p:'与えたダメージの一部でHPが回復する',f:F=>{F.vamp=1}},
 koun:{n:'幸運のメダル',slot:'c',p:'ひらめき率+30%・ハートが出やすい',f:F=>{F.hira*=1.3;F.heart*=2}},
 kyojin:{n:'巨人のたて',slot:'s',p:'敵を1.5倍吹き飛ばす',f:F=>{F.knock*=1.5}}
};
const ARTI={
 katana_a:{n:'天叢雲',slot:'w',wt:'katana',p:L=>'会心率+'+(15+L)+'%・会心ダメージ+'+(60+10*L)+'%',f:(F,L)=>{F.crit+=.15+.01*L;F.critX+=.6+.1*L}},
 axe_a:{n:'ミョルニル',slot:'w',wt:'axe',p:L=>'ダメージ+'+(25+5*L)+'%・吹き飛ばす 力+50%・攻撃範囲+'+(20+2*L)+'%',f:(F,L)=>{F.dmg*=1.25+.05*L;F.knock*=1.5;F.area*=1.2+.02*L}},
 spear_a:{n:'ロンギヌス',slot:'w',wt:'spear',p:L=>'強敵・ボスへの ダメージ+'+(50+10*L)+'%・槍の 届く 距離+30%',f:(F,L)=>{F.eliteDmg*=1.5+.1*L;F.bossDmg*=1.5+.1*L;F.wr.spear*=1.3}},
 dagger_a:{n:'影の刃',slot:'w',wt:'dagger',p:L=>'攻撃間隔-'+(25+2*L)+'%・移動速度+'+(15+L)+'%',f:(F,L)=>{F.cdm*=1-(.25+.02*L);F.spd*=1.15+.01*L}},
 whip_a:{n:'蛇神の鞭',slot:'w',wt:'whip',p:L=>'攻撃した 敵を 毒に する・ダメージ+'+(20+5*L)+'%・鞭の 長さ+30%',f:(F,L)=>{F.poison=1;F.dmg*=1.2+.05*L;F.wr.whip*=1.3}},
 boom_a:{n:'円月輪',slot:'w',wt:'boom',p:L=>'ブーメランの 数+2・ダメージ+'+(20+5*L)+'%',f:(F,L)=>{F.wn.boom+=2;F.dmg*=1.2+.05*L}},
 bow_a:{n:'天穹の弓',slot:'w',wt:'bow',p:L=>'矢の 数+2・会心率+'+(10+L)+'%',f:(F,L)=>{F.wn.bow+=2;F.crit+=.1+.01*L}},
 shuriken_a:{n:'八咫手裏剣',slot:'w',wt:'shuriken',p:L=>'手裏剣の 数+4・ダメージ+'+(20+5*L)+'%',f:(F,L)=>{F.wn.shuriken+=4;F.dmg*=1.2+.05*L}},
 fan_a:{n:'天女の羽衣扇',slot:'w',wt:'fan',p:L=>'回避+'+(20+L)+'%・扇の 数+1',f:(F,L)=>{F.evade+=.2+.01*L;F.wn.fan+=1}},
 magic_a:{n:'賢者の魔導書',slot:'w',wt:'magic',p:L=>'魔法弾の 数+2・ひらめき率+'+(50+10*L)+'%',f:(F,L)=>{F.wn.magic+=2;F.hira*=1.5+.1*L}},
 staff_a:{n:'世界樹の杖',slot:'w',wt:'staff',p:L=>'回復量+'+(100+10*L)+'%・毎秒 最大HPの '+(1+.1*L).toFixed(1)+'%回復',f:(F,L)=>{F.heal*=2+.1*L;F.regenP+=.01+.001*L}},
 harp_a:{n:'天上の竪琴',slot:'w',wt:'harp',p:L=>'仲間の 攻撃+'+(60+10*L)+'%・技の 威力+'+(30+5*L)+'%',f:(F,L)=>{F.ally*=1.6+.1*L;F.wazaDmg*=1.3+.05*L}},
 pikon:{n:'ピコーンの剣',slot:'w',wt:'sword',p:L=>'ダメージ+'+(30+6*L)+'%・ひらめき技の 威力+'+(50+10*L)+'%',f:(F,L)=>{F.dmg*=1.3+.06*L;F.wazaDmg*=1.5+.1*L}},
 abyss:{n:'深淵の盾',slot:'s',p:L=>'受ける ダメージ-'+(25+2*L)+'%',f:(F,L)=>{F.taken*=1-(.25+.02*L)}},
 star:{n:'星のお守り',slot:'c',p:L=>'ひらめける 数+2・ひらめき率+'+(100+20*L)+'%',f:(F,L)=>{F.hiraCap+=2;F.hira*=2+.2*L}},
 crown:{n:'王の冠',slot:'c',p:L=>'仲間の 攻撃+'+(100+20*L)+'%',f:(F,L)=>{F.ally*=2+.2*L}},
 time:{n:'時の指輪',slot:'c',p:L=>'攻撃間隔-'+(20+2*L)+'%・技の 間隔-'+(20+2*L)+'%',f:(F,L)=>{const v=1-(.2+.02*L);F.cdm*=v;F.wazaCd*=v}},
 phoenix:{n:'不死鳥の羽',slot:'s',p:L=>'1回の 冒険で '+(2+Math.floor(L/5))+'回まで HP50%で よみがえる',f:(F,L)=>{F.phoenix=2+Math.floor(L/5)}}};
(SV.inv||[]).forEach(it=>{if(it.a&&ARTI[it.a]&&ARTI[it.a].wt)it.wt=ARTI[it.a].wt});
const artLv=k=>(SV.artLv&&SV.artLv[k])||0,ARTI_MAX=10,artCost=k=>5*(artLv(k)+1);
function makeArti(k){if(!k){const own=new Set(SV.inv.filter(i=>i.a).map(i=>i.a)),ks=Object.keys(ARTI),fr=ks.filter(x=>!own.has(x)),jw=ks.find(x=>ARTI[x].wt===JOBS[SV.job].w);k=jw&&!own.has(jw)&&rnd()<.35?jw:pick(fr.length?fr:ks)}const A=ARTI[k];
 return{id:Date.now().toString(36)+rnd().toString(36).slice(2,7),slot:A.slot,r:5,a:k,wt:A.slot==='w'?(A.wt||JOBS[SV.job].w):undefined,name:A.n,ref:0,cards:[],lock:true,isNew:true,base:A.slot==='w'?{dmg:40}:A.slot==='s'?{hp:80}:{},afx:shuffle(AFX_POOL.slice()).slice(0,3).map(x=>({k:x,v:Math.max(1,Math.round(AFX[x].v(4)))}))}}
function makeUnique(){const ks=Object.keys(UNIQ),fresh=ks.filter(k=>!SV.ext[k]&&!SV.inv.some(i=>i.u===k));const u=pick(fresh.length?fresh:ks),U=UNIQ[u];
 return gearExtras({id:Date.now().toString(36)+rnd().toString(36).slice(2,7),slot:U.slot,r:4,u,wt:UNIQ_WT[u],name:U.n,ref:0,cards:[],lock:false,isNew:true,base:U.slot==='w'?{dmg:15}:U.slot==='s'?{hp:30}:{},afx:shuffle(AFX_POOL.slice()).slice(0,2).map(k=>rollAfx(k,2))})}
const F_ONE='heal gold meat allyHeal stunDmg eliteDmg bossDmg airDmg backDmg eqDrop cardMul uniqMul allyXp slimeHeal fireWz healWz wazaDmg wazaArea spX blastTaken eliteTaken sleepDur stunDur allySpd allyKillXp coinMul sellMul elem blastR jobXp eqMul'.split(' ');
const F_ZERO='regenP lowHpDmg guts evade chestLv packDmg drain stillRegen fullHpDmg stillCrit killHeal spDur spCount spN resonance kingTaken constel nandemo masterDmg refine stillTaken lowHpEvade lowHpTaken nearAllyTaken nullify killExplode iai ap'.split(' ');
const F_ADD={crit:1,critX:1,slot:1,evade:1,ap:1,hiraCap:1,regenP:1};
function applyB(F,B,sc){for(const[k,v]of B){if(k.startsWith('wd.'))F.wd[k.slice(3)]*=1+v*sc;else if(F_ADD[k])F[k]+=k==='slot'||k==='ap'?Math.floor(v*sc):v*sc;else F[k]*=1+v*sc}}
function flags(){const F={dmg:1,hp:1,area:1,hira:1,ally:1,slot:0,sword:1,magic:1,magicN:0,boomN:0,heart:1,xp:1,mag:1,spd:1,wazaCd:1,hiraCap:0,counter:0,dual:0,fireBolt:0,vamp:0,knock:1,taken:1,bump:1,jg:1,cdm:1,crit:.12,critX:2,rk:1,regen:0,kboom:0,poison:0,revive:0,block:99,rkWin:1,wd:{},wcd:{},wr:{},wn:{},wcx:{}};
 F_ONE.forEach(k=>F[k]=1);F_ZERO.forEach(k=>F[k]=0);for(const w in WEAP){F.wd[w]=1;F.wcd[w]=1;F.wr[w]=1;F.wn[w]=0;F.wcx[w]=0}
 applyB(F,JOBS[SV.job].B,1);mastered().forEach(j=>{if(j!==SV.job)applyB(F,JOBS[j].B,.5)});
 abActive().forEach(a=>ABIL[a].f(F));if(curWeapon()===JOBS[SV.job].w)F.dmg*=1.1;
 if(F.mimic&&SV.prevJob&&JOBS[SV.prevJob]&&SV.prevJob!==SV.job)applyB(F,JOBS[SV.prevJob].B,.5);
 if(F.masterDmg)F.dmg*=1+F.masterDmg*mastered().length;F.dmg*=1+.01*achN();
 for(const sl in SV.eq){const it=SV.inv.find(i=>i.id===SV.eq[sl]);if(it&&it.a&&ARTI[it.a])ARTI[it.a].f(F,artLv(it.a))}
 const eqU=new Set(Object.values(SV.eq).map(id=>{const it=SV.inv.find(i=>i.id===id);return it&&it.u}).filter(Boolean));
 eqU.forEach(u=>UNIQ[u].f(F));{const done=new Set();for(const sl in SV.eq){const it=SV.inv.find(i=>i.id===SV.eq[sl]);if(it)for(const c of it.cards||[])if(c&&CARDSP[c]&&!done.has(c)){done.add(c);CARDSP[c].f(F)}}}SV.pw.slice(0,pwN()).forEach(u=>{if(u&&SV.ext[u]&&!eqU.has(u))UNIQ[u].f(F)});{const lgs=new Set();for(const sl in SV.eq){const it=SV.inv.find(i=>i.id===SV.eq[sl]);if(it&&it.lg&&LEG[it.lg]&&!lgs.has(it.lg)){lgs.add(it.lg);LEG[it.lg][1](F)}}const sc=setCount();for(const k in sc){if(sc[k]>=2)SETS[k][2](F);if(sc[k]>=3)SETS[k][4](F)}}F.wd.sword*=F.sword;F.wd.magic*=F.magic;F.wn.magic+=F.magicN;F.wn.boom+=F.boomN;if(F.regen)F.regenP+=.01;{const lb=heroLB();F.dmg*=lb;F.hp*=lb;const A=SV.altar||{};F.dmg*=1+.03*(A.atk||0);F.hp*=1+.03*(A.hp||0);F.ally*=1+.04*(A.ally||0);F.taken/=1+.02*(A.cut||0);F.xp*=1+.03*(A.xp||0)}return F}
