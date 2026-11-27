/* ---------- デバッグ：エンドコンテンツから 試す（いまの セーブは 退避して あとで もどせる） ---------- */
const DEBUG_MENU=false,DBG_BAK=KEY+'-bak';
const lsGet=k=>{try{return localStorage.getItem(k)}catch(_){return null}};
const debugOn=()=>DEBUG_MENU||!!SV.opt.dbgMenu||/debug/.test(location.search+location.hash)||!!SV.debug||!!lsGet(DBG_BAK);
function debugBuild(rd){const keepOpt=Object.assign({},SV.opt),keepSeen=Object.assign({},SV.seen||{}),keepHeard=Object.assign({},SV.heard||{});
 for(const k in SV)delete SV[k];Object.assign(SV,DEF());
 SV.debug=rd;SV.opt=keepOpt;SV.seen=keepSeen;SV.heard=keepHeard;
 SV.lv=Math.min(200,30+6*rd);SV.gold=1e7;SV.abyss=999;SV.shards=999;SV.runs=rd*8;SV.clears=rd*6;SV.best=120;
 SV.clear=[rd,rd,rd,rd,rd,rd];SV.sel={st:0,rd:rd+1};SV.stats={kills:50000,trials:0};
 for(const k in UPS)SV.up[k]=UPS[k].max;
 for(const j in JOBS)SV.jobs[j]={lv:JOB_MAX,exp:0};SV.job='kenshi';
 for(const k in WAZA)SV.waza[k]={star:6,exp:0};
 SV.bring=Object.keys(WAZA).filter(k=>WAZA[k].tag===WEAP[JOBS[SV.job].w].fam).slice(-bringN());
 SV.souls={};for(const k in ALLY){SV.allies[k]={lv:99,exp:0,plus:10};SV.souls[k]=5}
 ALLCARDS.forEach(k=>{SV.cards[k]=3;SV.album[k]=1});
 for(const u in UNIQ)SV.ext[u]=1;SV.pw=Object.keys(UNIQ).slice(0,pwN());
 const R0=rd>=10?6:3,mk=f=>{const it=makeItem(0,f);it.ref=7;it.isNew=false;return it};
 for(const wt in WEAP)SV.inv.push(mk({r:R0,slot:'w',wt}));
 for(const sl of ['s','c']){let best=null;for(let n=0;n<8;n++){const it=mk({r:R0,slot:sl});if(!best||itemScore(it,SV.job)>itemScore(best,SV.job))best=it}SV.inv.push(best)}
 SV.artLv={};for(const a in ARTI){const it=makeArti(a);it.isNew=false;SV.inv.push(it);SV.artLv[a]=5}
 for(const sl of Object.keys(SLOTN)){const c=SV.inv.filter(i=>i.slot===sl);if(c.length)SV.eq[sl]=c.reduce((a,b)=>itemScore(b,SV.job)>itemScore(a,SV.job)?b:a).id}
 SV.party=Object.keys(ALLY).slice(-allySlots());
 SV.abil=[];let ap=apMax();for(const a of Object.keys(ABIL).filter(abLearned).sort((x,y)=>ABIL[y].ap-ABIL[x].ap)){if(SV.abil.length>=abMax())break;if(ABIL[a].ap<=ap){SV.abil.push(a);ap-=ABIL[a].ap}}
 SV.goals={};GOALS.forEach(g=>SV.goals[g[0]]=1);SV.goalSeen={};SV.backupAsked={r1:1,r3:1,r5:1,th:1,r10:1,r20:1}}
function debugStart(rd){try{if(!SV.debug)localStorage.setItem(DBG_BAK,JSON.stringify(SV));debugBuild(rd);localStorage.setItem(KEY,JSON.stringify(SV))}catch(e){closeModal();toast('デバッグ用の データを 作れなかった：'+(e&&e.message));return}
 window._noSave=true;location.reload()}
function debugRestore(){const raw=lsGet(DBG_BAK);if(!raw)return;try{localStorage.setItem(KEY,raw);localStorage.removeItem(DBG_BAK)}catch(_){return}window._noSave=true;location.reload()}
function panelDebug(){const bak=!!lsGet(DBG_BAK);
 return '<h3>エンドコンテンツから 試す</h3>'+(SV.debug?'<p class="hint" style="color:var(--pri-d)">いまは デバッグ用の セーブ（'+SV.debug+'周目クリア済み）で 遊んでいる。</p>':'')+
 '<p class="hint">全ステージ クリア済み・全ジョブ マスター・全技 極・全仲間 Lv99（魂つき）・施設 最大・+7の 装備と 全神器（✦5）つき。いまの セーブは 退避され、あとで もどせる。</p>'+
 '<div class="row" style="flex-wrap:wrap;gap:6px">'+[5,10,15,20,30].map(r=>'<button class="btn sm" style="white-space:nowrap" data-act="dbgGo" data-v="'+r+'">'+r+'周目から</button>').join('')+'</div>'+
 (bak?'<div class="row" style="margin-top:8px"><button class="btn primary" data-act="dbgRestore" style="flex:1">元の セーブに もどす</button></div>':'')+
 '<h3>すぐ 試す</h3><p class="hint">いまの データの まま 始める。深淵は その 時間までに 上がる ぶんの レベルアップ（自動で 選ぶ）を してから 始まる。</p><div class="row" style="flex-wrap:wrap;gap:6px">'+
 [5,10,20,30].map(m=>'<button class="btn sm" style="white-space:nowrap" data-act="dbgAbyss" data-v="'+m+'">深淵 '+m+'分〜</button>').join('')+
 '<button class="btn sm" style="white-space:nowrap" data-act="dbgBoss">ボス戦から</button><button class="btn sm danger" style="white-space:nowrap" data-act="dbgThrone">玉座へ</button></div>'+
 '<h3>倍速の 制限を 外す</h3><div class="row"><button class="btn '+(SV.opt.spdFree?'primary':'')+'" data-act="tgl" data-k="spdFree" data-v="1">外す</button><button class="btn '+(SV.opt.spdFree?'':'primary')+'" data-act="tgl" data-k="spdFree" data-v="0">特典どおり</button></div><p class="hint">外すと、特典で ひらいていない 倍速も えらべる。</p>'+'<h3>冒険中の 無敵</h3><div class="row"><button class="btn '+(SV.opt.dbgGod?'primary':'')+'" data-act="tgl" data-k="dbgGod" data-v="1">オン</button><button class="btn '+(SV.opt.dbgGod?'':'primary')+'" data-act="tgl" data-k="dbgGod" data-v="0">オフ</button></div><p class="hint">ゆうしゃが ダメージを 受けない。</p>'+
 '<h3>おまけ</h3><div class="row" style="flex-wrap:wrap;gap:6px"><button class="btn sm" style="white-space:nowrap" data-act="dbgGold">+100万G</button><button class="btn sm" style="white-space:nowrap" data-act="dbgAbyssP">深淵のかけら +100</button><button class="btn sm" style="white-space:nowrap" data-act="dbgDay">試練を もう一度</button><button class="btn sm" style="white-space:nowrap" data-act="dbgEnd" data-v="300">深淵の 記録 +5分</button><button class="btn sm" style="white-space:nowrap" data-act="dbgEnd" data-v="0">深淵の 記録を 0に</button></div>'}

