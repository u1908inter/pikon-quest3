/* ---------- 走行中の状態 ---------- */
let R=null,last=0;
const stick={on:false,ox:0,oy:0,x:0,y:0,id:null};const keys={};
function stat(){const hl=SV.lv-1,E=R.E,F=R.F,hpR=R.hp/R.max,t=R.t;let dm=1,cd=1;
 if(F.lowHpDmg&&hpR<.5)dm*=1+F.lowHpDmg;if(F.rage)dm*=1+F.rage*(1-hpR);if(F.fullHpDmg&&hpR>=.999)dm*=1+F.fullHpDmg;
 if(F.packDmg)dm*=1+F.packDmg*R.allies.length;if(F.constel)dm*=1+F.constel*Object.keys(R.waza).length;if(F.nandemo)dm*=1+F.nandemo*Object.keys(R.weapons).length;
 if(F.wealthDmg)dm*=1+Math.min(.3,.02*Math.floor(SV.gold/10000));if(F.passion)dm*=1+F.passion*Math.min(1,R.streak/60);
 if(t<(R.berserkT||0))dm*=3;if(t<(R.braveT||0))dm*=F.legend?3:2;if(t<(R.novaT||0))dm*=2;if(F.stopDmg&&t<(R.stopT||0))dm*=F.stopDmg;
 if(t<(R.berserkT||0))cd*=.5;if(F.lowHpCd&&hpR<.5)cd*=1-F.lowHpCd;if(F.frenzy)cd*=1-.3*Math.min(1,R.streak/80);if(t<(R.zanT||0))cd*=.5;
 const dpL=R.mode==='endless'?Math.floor(Math.max(0,R.t)/60)+1:0;return{dmg:(1+.03*hl)*(1+.05*SV.up.atk)*(1+.1*(R.pass.might||0))*(1+E.dmg/100)*F.dmg*dm*(dpL?(1+(E.deep||0)/100*dpL)*(F.deep2?1.3:1):1),
 cd:Math.max(.2,(1-.08*(R.pass.cd||0))*(1-E.cd/100)*F.cdm*cd),area:(1+.1*(R.pass.area||0))*(1+E.area/100)*F.area,
 mag:36*(1+.3*(R.pass.mag||0))*(1+E.mag/100)*F.mag,spd:66*(1+.03*SV.up.spd)*(1+.1*(R.pass.spd||0))*(1+E.spd/100)*F.spd*(t<(R.fleeT||0)?1+F.flee:1)}}
function heal(v,quiet){const h=v*R.F.heal;if(h<=0||R.over)return 0;const b=R.hp;R.hp=Math.min(R.max,R.hp+h);if(!quiet&&R.hp-b>=1)R.pops.push({x:R.x,y:R.y-12,txt:'+'+Math.round(R.hp-b),c:'#6fe3b5',t:R.t});return R.hp-b}
const famLv=f=>{let m=0;for(const w in R.weapons)if(WEAP[w].fam===f)m=Math.max(m,R.weapons[w]);return m};
const inViewEn=()=>R.en.filter(e=>!e.dead&&inView(e));
const dayKey=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()},fmtT=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
const TRIAL_N={weapon:'武器しばり',nohira:'ひらめき 禁止',noally:'仲間 なし',hp:'最大HP 30%',fast:'敵が 速い',many:'敵が 2倍',noab:'アビリティ なし'};
function todayTrial(){const k=dayKey();let h=0;for(const c of k)h=(h*31+c.charCodeAt(0))>>>0;const r=()=>{h=(h*1103515245+12345)>>>0;return h/4294967296};
 const keys=Object.keys(TRIAL_N),a=keys[Math.floor(r()*keys.length)];let b=a;while(b===a)b=keys[Math.floor(r()*keys.length)];const ws=Object.keys(WEAP),w=ws[Math.floor(r()*ws.length)];
 const cond=[a,b].map(x=>x==='weapon'?w:x),rd=Math.max(1,maxRd()-2),cl=SV.clear.map((c,i)=>c>=1?i:-1).filter(i=>i>=0),st=rd>1?3:(cl.length?Math.max(0,Math.max(...cl)-1):0);return{cond,st,rd,day:k}}
const trialTxt=c=>WEAP[c]?WEAP[c].n+'だけ':TRIAL_N[c];
const throneOpen=()=>pOn('throne')||(SV.throneWin||0)>0;
function startRun(mode){initAudio();mode=mode||'stage';let st=SV.sel.st,rd=SV.sel.rd,cond=null;
 if(mode==='endless'){st=0;rd=1}if(mode==='trial'){const T=todayTrial();st=T.st;rd=T.rd;cond=T.cond}if(mode==='throne'){st=5;rd=Math.max(10,maxRd())}
 let sv0=null;if(cond&&cond.includes('noab')){sv0=SV.abil;SV.abil=[]}const F0=flags(),m0=maxHP();if(sv0)SV.abil=sv0;const max=cond&&cond.includes('hp')?Math.max(1,Math.round(m0*.3)):m0;
 R={st,rd,mode,cond,sm:mode==='endless'?abyBase():stMul(st,rd),sm0:mode==='endless'?abyBase():3,cardsGot:[],E:eqStats(),F:F0,jg:0,tq:[],renkei:{},vampB:6,boostT:-9,corpses:[],parts:[],vx:0,vy:0,hs:0,shk:0,waza:{},wazaUse:{},hiraLog:[],loot:[],streak:0,lastKill:-9,bulb:-9,stops:0,t:0,x:0,y:0,hp:max,max,face:1,fx:1,fy:0,inv:0,lv:1,xp:0,xpTot:0,need:4,kills:0,gold:0,weapons:{[(cond&&cond.find(c=>WEAP[c]))||curWeapon()]:1},wt:{},pass:{},evo:{},en:[],gems:[],shots:[],allies:[],pops:[],nums:[],newAllies:[],paused:false,over:false,acc:0,events:{},heartGiven:false,boss:null,queue:0,banner:null};
 if(!(cond&&cond.includes('noally')))SV.party.filter(k=>SV.allies[k]).slice(0,allySlots()).forEach(k=>addAlly(k));
 SV.bring.filter(k=>SV.waza[k]).slice(0,bringN()).forEach(k=>{R.waza[k]={t:1}});
 if(mode==='stage'){const n=Math.min(5,(SV.lose||{})[st+'-'+rd]||0);if(n>0){R.F.dmg*=1+.05*n;R.F.taken*=1-.05*n;R.tq.push({at:.3,f:()=>banner('粘りの 手応え +'+5*n+'%','倒されるたびに、この ステージで 少し 有利に なる')})}}
 if(R.F.kimagure){const o=pick([['ダメージ+15%',F=>F.dmg*=1.15],['移動速度+15%',F=>F.spd*=1.15],['攻撃範囲+15%',F=>F.area*=1.15],['会心率+10%',F=>F.crit+=.1],['ひらめき率+50%',F=>F.hira*=1.5]]);o[1](R.F);R.tq.push({at:.5,f:()=>banner('きまぐれ！',o[0])})}
 SV.runs++;save();hud.style.display='block';jb.style.display='block';closeModal();setMode('battle');last=performance.now()}
function addAlly(k,until){const A=SV.allies[k],lv=A?A.lv:1,i=R.allies.length,a0=i*1.3+.6;R.allies.push({k,lv,plus:A?A.plus||0:0,evo:A?!!A.evo:false,until,x:R.x-10,y:R.y+6,a:rnd()*6,t:rnd()*2,et:rnd()*3,cd:{},ox:Math.cos(a0)*16,oy:Math.sin(a0)*10})}
function banner(t,s){R.banner={t,s,at:R.t}}
function spawn(k,x,y){const T=ETYPE[k],mul=(T.boss?DIF.boss:1+(R.mode==='endless'?R.t%60:R.t)*TF/60*1.2*DIF.ramp)*R.sm*DIF.hp;if(x==null){const t=dyTop()-16,b=dyBot()+16,r=rnd();let dx,dy;if(r<.35){dy=t-rnd()*30;dx=(rnd()*2-1)*halfW(dy)}else if(r<.85){dy=t+rnd()*(b-t);dx=(rnd()<.5?-1:1)*(halfW(dy)+14)}else{dy=b+rnd()*10;dx=(rnd()*2-1)*halfW(dy)}x=R.x+dx;y=R.y+dy}
 const e={k,T,x,y,hp:T.hp*mul,max:T.hp*mul,spd:T.spd*(.9+rnd()*.2)*Math.min(DIF.spdMax,1+DIF.spdSt*R.st+DIF.spdRd*(R.rd-1)+(R.mode==='endless'?R.t/600:0))*(R.cond&&R.cond.includes('fast')?1.6:1),hitT:-1,cd:{},ph:rnd()*6,dmg:T.dmg*(1+(R.mode==='endless'?R.t%60:R.t)*TF/180*.6*DIF.ramp)*(1+((R.mode==='endless'&&R.smD?R.smD:R.sm)-1)*DIF.dmgK)*DIF.dmg,vx:0,vy:0};R.en.push(e);return e}
function hurtEnemy(e,d,src,cdTime,from,w){if(e.dead)return false;if(src){if(e.cd[src]&&R.t<e.cd[src])return false;e.cd[src]=R.t+(cdTime||.3)}
 const F=R.F,T=e.T,dot=src==='psn'||src==='burn'||src==='aura';let m=1;
 if(T.elite)m*=F.eliteDmg;if(T.boss)m*=F.bossDmg;if(e.stun>0||e.sleep>0||R.t<(R.stopT||0))m*=F.stunDmg;if(e.air&&R.t-e.air<1.5)m*=F.airDmg;
 if(F.backDmg>1&&(e.x-R.x)*R.face<0)m*=F.backDmg;if(e.curse>R.t)m*=1+Math.max(F.curse||0,e.cmul||0);
 if(w){m*=F.wd[w];if(R.evoW&&R.evoW[w]){m*=1.8;if(w==='whip')e.psn=3;if(w==='harp')stun(e,.5);if(w==='staff')heal(.6,true)}if(F.resonance&&WEAP[w].fam==='magic')m*=1+F.resonance*R.allies.length;if(w==='sword'&&F.mken)m*=F.wd.magic;if(w==='katana'&&F.iai&&!e.iai){e.iai=1;m*=F.iai3?3:F.iai}if(w==='sword'&&F.mkenAfter&&R.t-(R.lastWzT||-9)<.6)m*=3}
 if(!dot){if(F.gamble)m*=.5+rnd()*1.5;if(F.jackpot&&rnd()<F.jackpot){m*=10;R.pops.push({x:e.x,y:e.y-14,txt:'大当たり！',c:'#ffe14a',t:R.t})}}
 if(e.sleep>0&&!T.boss)e.sleep=0;const still=Math.hypot(R.vx,R.vy)<8,crit=src!=='bump'&&src!=='wall'&&!dot&&rnd()<F.crit+(w==='katana'?.15:0)+(still?F.stillCrit:0)+(F.karei&&R.streak>=50?.15:0);
 d=Math.round(d*m*stat().dmg*(crit?F.critX+(w?F.wcx[w]:0):1));if(F.gravity&&w&&WEAP[w].fam==='magic'&&!T.boss)d+=Math.round(e.hp*F.gravity);if(F.poison&&!dot)e.psn=3;
 e.byAlly=!!(from&&from.lv!=null&&from.k);
 if(w){if(F.curse)e.curse=R.t+3;if(F.charm&&rnd()<F.charm)e.stun=Math.max(e.stun||0,.6);if(F.play&&rnd()<F.play&&!T.boss){e.stun=Math.max(e.stun||0,1.5);R.pops.push({x:e.x,y:e.y-10,txt:'わはは',c:'#ff8ac0',t:R.t})}
  if(w==='shuriken'){if(F.psnShur)e.psn=3;if(F.pin)e.stun=Math.max(e.stun||0,F.pin)}
  if(w==='sword'){if(F.burn)e.burnT=R.t+3;if(F.thunder&&rnd()<F.thunder)R.tq.push({at:R.t+.05,f:()=>{if(!e.dead){R.shots.push({k:'bolt',x:e.x,y:e.y,t:0,life:.2});hurtEnemy(e,20,null,0)}}});if(F.freeze&&rnd()<F.freeze)stun(e,1);if(F.prayHeal)heal(.4,true)}
  if(F.drain)heal(d*F.drain,true);if(F.magicGauge&&WEAP[w].fam==='magic')R.jg=Math.min(1,R.jg+.002*F.jg);
  if(w==='staff'&&F.comet&&rnd()<F.comet)R.tq.push({at:R.t+.3,f:()=>meteor(e.x,e.y,28,45)})}e.hp-=d;e.hitT=R.t;if(R.nums.length<(QL()==='high'?50:QL()==='mid'?22:10)&&(QL()!=='low'||crit))R.nums.push({x:e.x+(rnd()-.5)*6,y:e.y-6,v:d,t:R.t,crit});
 const fx=from?from.x:R.x,fy=from?from.y:R.y,dx=e.x-fx,dy=e.y-fy,l=Math.hypot(dx,dy)||1,imp=Math.min(460,90+d*7)*R.F.knock/(e.T.m||1);if(R.F.vamp&&R.vampB>0){const h=Math.min(R.vampB,d*.02);R.hp=Math.min(R.max,R.hp+h);R.vampB-=h}
 e.vx+=dx/l*imp;e.vy+=dy/l*imp;e.sq=R.t;spark(e.x,e.y,d>=30?'#ffd34e':'#ffffff',d>=30?6:3);if(d>=40){hitStop(.04);shake(2)}
 if(e.hp<=0){e.kx=dx/l;e.ky=dy/l;e.kimp=imp;kill(e)}return true}
function QL(){try{return SV.opt.q||'high'}catch(_){return 'high'}}
function spark(x,y,c,n){const q=QL();if(q==='low')return;if(q==='mid')n=Math.ceil(n/2);const cap=q==='mid'?110:260;for(let i=0;i<n&&R.parts.length<cap;i++){const a=rnd()*6.28,v=40+rnd()*90;R.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:.25+rnd()*.2,c})}}
const HS_MUL={on:1,weak:.35,off:0};
function hitStop(t){t*=HS_MUL[SV.opt.hs||'on'];if(t<=0||!R)return;
 /* 止まる時間の 予算：1秒あたり 最大 約12%まで。大きな 演出（ボス撃破など）は 予算に かかわらず 止める */
 const n=performance.now()/1000;R.hsB=Math.max(0,(R.hsB||0)-(n-(R.hsBT||n))*.12);R.hsBT=n;
 const big=t>=.15*HS_MUL[SV.opt.hs||'on'];if(!big&&(R.hsB>.12||(R.en.length>120&&t<.07))){R.hsSkip=(R.hsSkip||0)+1;return}
 R.hsB+=t;R.hs=Math.max(R.hs||0,t)}
function shake(a){if(SV.opt.shake===false)return;R.shk=Math.max(R.shk||0,a)}
function kill(e){e.dead=true;R.kills++;const T=e.T;if(R.F.killHeal)heal(R.F.killHeal,true);if(R.F.zanshin)R.zanT=R.t+.5;
 if(R.F.killExplode&&!T.boss&&rnd()<R.F.killExplode){const ex=e.x,ey=e.y;R.tq.push({at:R.t+.08,f:()=>{R.shots.push({k:'ring',x:ex,y:ey,r:30,c:'181,53,158',t:0,life:.25});for(const o of R.en)if(!o.dead&&Math.hypot(o.x-ex,o.y-ey)<30+o.T.r)hurtEnemy(o,30,'kx',.2,{x:ex,y:ey})}})}R.jg=Math.min(1,R.jg+(T.elite?.2:T.boss?0:1/40)*R.F.jg);if(R.F.kboom&&!T.boss&&rnd()<.15){const ex=e.x,ey=e.y;R.tq.push({at:R.t+.05,f:()=>{R.shots.push({k:'ring',x:ex,y:ey,r:26,c:'255,211,78',t:0,life:.25});for(const o of R.en)if(!o.dead&&Math.hypot(o.x-ex,o.y-ey)<26+o.T.r)hurtEnemy(o,25,'kb',.2,{x:ex,y:ey})}})}
 const kx=e.kx||0,ky=e.ky||-1,sp=Math.max(240,Math.min(560,(e.kimp||150)*1.8))*(T.boss?.3:T.elite?.6:1);
 R.corpses.push({sp:T.sp,pal:T.pal,sc:T.sc||1,x:e.x,y:e.y,vx:kx*sp+(rnd()-.5)*60,vy:ky*sp+(rnd()-.5)*60,z:0,vz:150+rnd()*150,rot:0,hit:new Set(),vr:(rnd()<.5?-1:1)*(10+rnd()*15),t:0,flip:e.x>R.x});
 if(R.corpses.length>(QL()==='high'?90:QL()==='mid'?36:12))R.corpses.shift();spark(e.x,e.y,'#ffffff',5);spark(e.x,e.y,PAL[T.pal].g||PAL[T.pal].p||'#fff',6);if(T.elite||T.boss)R.shots.push({k:'ring',x:e.x,y:e.y,r:T.boss?120:60,c:'255,255,255',t:0,life:.35});if(T.elite){hitStop(.08);shake(4)}if(T.boss){hitStop(.3);shake(10)}
 const ga=rnd()*6.28;R.gems.push({x:e.x,y:e.y,v:T.xp*1.3*(1+.25*R.st)*(1+.3*(R.rd-1))*(e.byAlly?R.F.allyKillXp:1),k:'gem',vx:Math.cos(ga)*70+kx*40,vy:Math.sin(ga)*70+ky*40});
 R.streak=R.t-R.lastKill<1.2?R.streak+1:1;R.maxStreak=Math.max(R.maxStreak||0,R.streak);R.lastKill=R.t;if([50,100,200,300,500].includes(R.streak)){R.big={t:R.streak+'連撃！',at:R.t};R.flash=R.t;shake(5);sfx.lv()}
 {const pool=hiraPool(),firstEver=!Object.keys(SV.waza).length&&!R.hiraLog.length;let p=.0012*(1+Math.min(R.streak,60)/20)*(1+R.E.hira/100)*(1+.1*R.st);if(T.elite)p=.6;if(T.boss)p=0;if(firstEver&&R.t>40)p=1;
  p*=R.F.hira;if(e.byAlly&&R.F.beastHira)p*=3;const shower=R.t<(R.starT||0);if(shower)p=Math.max(p,.25);if(!hiraOK()||(!shower&&R.t-(R.lastHira||-99)<25))p=firstEver?p:0;
  if(pool.length&&rnd()<p){const fav={sword:'kabuto',boom:'uchiage',magic:'honoo'}[WEAP[JOBS[SV.job].w].fam];hirameki(firstEver&&pool.includes(fav)?fav:pick(pool),null)}}
 {const cr=ALLCARDS.includes(e.k)?(T.boss||T.elite?.01:.002)*R.F.cardMul:0;if(rnd()<cr)R.gems.push({x:e.x,y:e.y-4,k:'card',card:e.k,vx:(rnd()-.5)*60,vy:-40})}
 if(T.elite&&ALLY[e.k]&&rnd()<Math.min(.4,.08*R.F.heart)){if(!SV.allies[e.k]&&!R.newAllies.includes(e.k))R.gems.push({x:e.x-6,y:e.y,k:'heart',ally:e.k});else if(SV.allies[e.k])R.gems.push({x:e.x-6,y:e.y,k:'soul',ally:e.k})}
 if(T.elite)R.gems.push({x:e.x+6,y:e.y,k:'item',item:rnd()<.3*R.F.uniqMul?makeUnique():makeItem((R.st>=3?2:1)+(R.F.rareUp&&rnd()<.3?1:0))});
 else if(!T.boss&&rnd()<.0015*R.F.eqDrop)R.gems.push({x:e.x,y:e.y,k:'item',item:makeItem(0)});
 if(T.boss){R.gems.push({x:e.x-8,y:e.y,k:'item',item:rnd()<.6*R.F.uniqMul?makeUnique():makeItem(R.st>=3||R.rd>1?3:2)},{x:e.x+8,y:e.y,k:'item',item:makeItem(R.st>=2?2:1)})}
 if(rnd()<.05)R.gems.push({x:e.x+4,y:e.y,v:1,k:'coin'});
 if(rnd()<.008)R.gems.push({x:e.x-4,y:e.y,v:30,k:'meat'});
 if(T.elite)R.gems.push({x:e.x,y:e.y+6,k:'chest'});
 if(!T.elite&&!T.boss){const kind=e.k;const want=!SV.allies[kind]&&!R.newAllies.includes(kind);const guar=!R.heartGiven&&R.t>50&&want&&!STAGES[R.st].foes.some(f=>SV.allies[f]||R.newAllies.includes(f));
  if(ALLY[kind]&&(guar||(want&&rnd()<.006*R.F.heart))){R.heartGiven=true;R.gems.push({x:e.x,y:e.y,k:'heart',ally:kind})}
  else if(ALLY[kind]&&SV.allies[kind]&&rnd()<.004*R.F.heart)R.gems.push({x:e.x,y:e.y,k:'soul',ally:kind})}
 if(T.boss){R.boss=null;R.gold+=50;R.bossDt=R.t-(R.bossAt||R.t);if(ALLY[e.k]&&rnd()<Math.min(.5,.1*R.F.heart)){if(!SV.allies[e.k]&&!R.newAllies.includes(e.k))R.gems.push({x:e.x,y:e.y,k:'heart',ally:e.k});else if(SV.allies[e.k])R.gems.push({x:e.x,y:e.y,k:'soul',ally:e.k})}for(const g2 of R.gems)if(g2.k==='item'||g2.k==='card'||g2.k==='heart'||g2.k==='soul')collect(g2),g2.dead=true;if(R.mode==='endless'){R.abB=(R.abB||0)+1;R.abyssGot=(R.abyssGot||0)+2;R.pops.push({x:R.x,y:R.y-20,txt:'深淵のかけら +2',c:'#c8a0ff',t:R.t});if(R.t>=300&&rnd()<(pOn('arti')?.15:.08)){R.loot.push(makeArti());R.pops.push({x:R.x,y:R.y-28,txt:'神器！',c:'#ffe14a',t:R.t})}}else{if(R.mode==='throne'){R.loot.push(makeArti())}else if(R.rd>=5&&rnd()<.02)R.loot.push(makeArti());const RR=R;setTimeout(()=>{if(R===RR)endRun(true)},1800)}banner(T.n+'を たおした！',R.newAllies.includes(e.k)?T.n+'が なかまに なった！':'')}}

const ringFx=(x,y,r,c,life)=>R.shots.push({k:'ring',x,y,r,c,t:0,life:life||.3});
const nearR=r=>R.en.filter(e=>!e.dead&&Math.hypot(e.x-R.x,e.y-R.y)<r+e.T.r);
const SK={
 kenshi:X=>{[0,.25,.5].forEach(d=>R.tq.push({at:R.t+d,f:()=>{const r=75*stat().area;ringFx(R.x,R.y,r,'255,255,255');shake(5);nearR(r).forEach(e=>hurtEnemy(e,50*X,null,0))}}))},
 mahou:X=>{for(let i=0;i<10;i++)R.tq.push({at:R.t+i*.1,f:()=>{const c=inViewEn();const tg=c.length?pick(c):{x:R.x+(rnd()-.5)*120,y:R.y-rnd()*150};meteor(tg.x,tg.y,30,70*X)}})},
 souryo:X=>{inViewEn().forEach(e=>{ringFx(e.x,e.y,14,'255,255,200',.4);hurtEnemy(e,60*X,null,0)});heal(R.max*.3)},
 kariudo:X=>{const d=3+R.F.spDur,n=Math.round(d*12);for(let i=0;i<n;i++)R.tq.push({at:R.t+i*d/n,f:()=>{const c=inViewEn();if(!c.length)return;const e=pick(c);R.shots.push({k:'proj',x:e.x,y:e.y-60,vx:0,vy:600,t:0,hit:new Set(),pierce:0,life:.11,r:5,dk:'arrow',dmg:25*X})}})},
 touzoku:X=>{const d=2+R.F.spDur;R.inv=Math.max(R.inv,d);R.ghostT=R.t+d;ringFx(R.x,R.y,90,'255,225,90');nearR(90).forEach(e=>{hurtEnemy(e,30*X,null,0);R.gems.push({x:e.x,y:e.y,v:1,k:'coin',vx:(rnd()-.5)*80,vy:(rnd()-.5)*80},{x:e.x,y:e.y,v:e.T.xp,k:'gem',vx:(rnd()-.5)*80,vy:(rnd()-.5)*80})})},
 mamono:X=>{const d=8+R.F.spDur;R.boostT=R.t+d;for(let i=0;i<4+R.F.spN;i++){const a=i/4*6.283;R.allies.push({k:'slime',lv:3,x:R.x,y:R.y,a:0,t:0,cd:{},until:R.t+d,ox:Math.cos(a)*18,oy:Math.sin(a)*14})}},
 suppin:X=>{R.inv=Math.max(R.inv,2.5);R.sinvT=R.t+2.5;const n=3+R.F.spN;for(let i=0;i<n;i++)R.tq.push({at:R.t+i*.4,f:()=>{for(const k in R.waza)R.waza[k].t=0}})},
 mahouken:X=>{[-25,0,25].forEach((oy,i)=>R.tq.push({at:R.t+i*.15,f:()=>{const y=R.y+oy;R.shots.push({k:'slash',y,t:0,life:.3,c:['255,120,40','255,240,90','150,220,255'][i]});shake(5);for(const e of R.en)if(!e.dead&&inView(e)&&Math.abs(e.y-y)<14+e.T.r){hurtEnemy(e,80*X,null,0,{x:e.x-R.face*10,y:e.y});if(i===2)stun(e,1)}}}))},
 seikishi:X=>{const d=5+R.F.spDur;R.inv=Math.max(R.inv,d);R.sinvT=R.t+d;R.holyT=R.t+d;ringFx(R.x,R.y,90,'255,240,150',.5);nearR(90).forEach(e=>{const dx=e.x-R.x,dy=e.y-R.y,l=Math.hypot(dx,dy)||1;e.vx+=dx/l*400/(e.T.m||1);e.vy+=dy/l*400/(e.T.m||1);hurtEnemy(e,20*X,null,0)})},
 ryukishi:X=>{const c=inViewEn();let best=null,bn=-1;for(const e of c.slice(0,60)){let n=0;for(const o of c)if(Math.hypot(o.x-e.x,o.y-e.y)<50)n++;if(n>bn){bn=n;best=e}}R.inv=Math.max(R.inv,.8);R.jumpAt=R.t;const tx=best?best.x:R.x,ty=best?best.y:R.y;R.tq.push({at:R.t+.4,f:()=>{R.x=tx;R.y=ty;shake(10);hitStop(.1);ringFx(tx,ty,70,'200,230,255',.4);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-tx,e.y-ty)<70+e.T.r){e.air=R.t;stun(e,1.2);hurtEnemy(e,90*X,null,0,{x:tx,y:ty})}}})},
 samurai:X=>{R.shots.push({k:'slash',y:R.y,t:0,life:.35,c:'255,255,255'});hitStop(.2);for(const e of R.en)if(!e.dead&&inView(e)&&Math.abs(e.y-R.y)<22+e.T.r)hurtEnemy(e,150*X,null,0,{x:e.x-R.face*10,y:e.y})},
 kyosenshi:X=>{R.berserkT=R.t+10+R.F.spDur},
 kenja:X=>{heal(R.max);for(const k in R.waza)R.waza[k].t=0},
 fusui:X=>{const st=R.st,c=inViewEn();banner(['かまいたち','つる','落石','流砂','吹雪','溶岩'][st]+'！','');
  if(st===0)for(let i=0;i<14;i++)R.tq.push({at:R.t+i*.07,f:()=>{const e=pick(inViewEn());if(e){R.shots.push({k:'swipe',a:rnd()*6.28,r:14,t:0,life:.15,ox:e.x,oy:e.y});hurtEnemy(e,40*X,null,0)}}});
  if(st===1)c.forEach(e=>{stun(e,3);hurtEnemy(e,15*X,null,0)});
  if(st===2)for(let i=0;i<12;i++)R.tq.push({at:R.t+i*.08,f:()=>{const e=pick(inViewEn());if(e)meteor(e.x,e.y,24,50*X)}});
  if(st===3){const cx=R.x+R.face*40,cy=R.y;ringFx(cx,cy,60,'210,180,110',.6);c.forEach(e=>{const dx=cx-e.x,dy=cy-e.y,l=Math.hypot(dx,dy)||1;e.vx=dx/l*260/(e.T.m||1);e.vy=dy/l*260/(e.T.m||1)});R.tq.push({at:R.t+.5,f:()=>{for(const e of R.en)if(!e.dead&&Math.hypot(e.x-cx,e.y-cy)<70)hurtEnemy(e,60*X,null,0,{x:cx,y:cy})}})}
  if(st===4){R.flash=R.t;c.forEach(e=>{stun(e,2);hurtEnemy(e,35*X,null,0)})}
  if(st===5)for(let i=0;i<6;i++)R.tq.push({at:R.t+i*.12,f:()=>{const e=pick(inViewEn());if(e){ringFx(e.x,e.y,40,'255,90,30',.35);shake(4);for(const o of R.en)if(!o.dead&&Math.hypot(o.x-e.x,o.y-e.y)<40+o.T.r)hurtEnemy(o,80*X,null,0,e)}}})},
 jimadou:X=>{R.stopT=R.t+5+R.F.spDur},
 shokan:X=>{R.dragonT=R.t+1.6;const a0=R.face>0?0:Math.PI;for(let i=0;i<12;i++)R.tq.push({at:R.t+.3+i*.08,f:()=>{const d=20+i*14,x=R.x+Math.cos(a0)*d,y=R.y+(rnd()-.5)*30;ringFx(x,y,26,'255,120,40');for(const e of R.en)if(!e.dead&&Math.hypot(e.x-x,e.y-y)<26+e.T.r)hurtEnemy(e,60*X,'dr'+i,.1,{x:R.x,y})}})},
 ginyu:X=>{R.braveT=R.t+10+R.F.spDur},
 asobinin:X=>{const strong=['shinen','daimadou','hoshiyomi','samurai','mahouken','shokan','kyosenshi','ryukishi'];let ks=Object.keys(SK).filter(k=>k!=='asobinin');if(R.F.satori&&rnd()<.7)ks=strong;const k=pick(ks);R.tq.push({at:R.t+.5,f:()=>{banner('ゆびをふる → '+JOBS[k].sp+'！','');SK[k](X)}})},
 odoriko:X=>{R.bladeT=R.t+8+R.F.spDur},
 ninja:X=>{R.cloneT=R.t+10+R.F.spDur},
 juou:X=>{R.giantT=R.t+10+R.F.spDur;if(R.F.roar){ringFx(R.x,R.y,150,'255,200,120',.5);inViewEn().forEach(e=>stun(e,3))}},
 shonin:X=>{const d=(30+Math.sqrt(SV.gold)*2)*X*(R.F.zeni2?2:1);for(let i=0;i<20;i++)spark(R.x,R.y-8,'#ffe14a',2);inViewEn().forEach(e=>hurtEnemy(e,d,null,0))},
 shinen:X=>{R.hp=Math.max(1,R.hp-R.max*(R.F.abyssKing?.1:.2));R.shots.push({k:'slash',y:R.y,t:0,life:.45,c:'181,53,158'});inViewEn().forEach(e=>hurtEnemy(e,200*X,null,0))},
 daimadou:X=>{const go=()=>{R.flash=R.t;R.ultT=R.t;shake(12);hitStop(.2);inViewEn().forEach(e=>hurtEnemy(e,250*X,null,0))};go();if(R.F.ultima2)R.tq.push({at:R.t+.8,f:()=>{banner('アルテマ！','');go()}})},
 hoshiyomi:X=>{const d=10+R.F.spDur;R.starT=R.t+d;for(let i=0;i<d*4;i++)R.tq.push({at:R.t+i*.25,f:()=>{const c=inViewEn();if(c.length){const e=pick(c);meteor(e.x,e.y,22,40*X)}}})}
};
function jobSkill(){if(!R||R.over||R.paused||R.jg<1)return;R.jg=0;doSkill(1)}
function doSkill(n){const J=JOBS[SV.job];banner(J.sp+'！','');R.flash=R.t;hitStop(.15);shake(8);sfx.hira();SK[SV.job](R.F.spX);
 if(n<=R.F.spCount)R.tq.push({at:R.t+1.2,f:()=>doSkill(n+1)});else if(R.F.encore)R.jg=Math.max(R.jg,R.F.encore)}
function tickJobs(dt){const F=R.F,S=stat();
 if(F.regenP)heal(R.max*F.regenP*dt,true);if(F.stillRegen&&Math.hypot(R.vx,R.vy)<8)heal(R.max*F.stillRegen*dt,true);
 R.hpT=(R.hpT||0)+dt;if(R.hpT>=1){R.hpT=0;(R.hpHist=R.hpHist||[]).push(R.hp);if(R.hpHist.length>12)R.hpHist.shift()}
 const every=(key,iv,f)=>{R[key]=(R[key]||0)+dt;if(R[key]>=iv){R[key]=0;f()}};
 if(F.aura)every('auT',.5,()=>{const r=32*S.area;ringFx(R.x,R.y,r,'181,53,158',.2);nearR(r).forEach(e=>hurtEnemy(e,6,'aura',.4))});
 if(F.jump)every('jpT',F.jumpFast?2.5:5,()=>{const t=nearest(R.x,R.y);if(!t||Math.hypot(t.x-R.x,t.y-R.y)>140)return;const tx=t.x,ty=t.y;R.inv=Math.max(R.inv,.45);R.jumpAt=R.t;R.tq.push({at:R.t+.35,f:()=>{R.x=tx;R.y=ty;shake(6);const r=40*S.area;ringFx(tx,ty,r,'200,230,255');for(const e of R.en)if(!e.dead&&Math.hypot(e.x-tx,e.y-ty)<r+e.T.r){e.air=R.t;stun(e,.6);hurtEnemy(e,35,null,0,{x:tx,y:ty})}
   if(F.jumpTor){const r2=75*S.area;ringFx(tx,ty,r2,'160,220,255',.4);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-tx,e.y-ty)<r2+e.T.r){const dx=tx-e.x,dy=ty-e.y,l=Math.hypot(dx,dy)||1;e.vx=dx/l*200/(e.T.m||1);e.vy=dy/l*200/(e.T.m||1);e.air=R.t}}}})});
 if(F.breath)every('brT',10,()=>{const a=R.dir??(R.face>0?0:Math.PI);for(let i=0;i<8;i++)R.tq.push({at:R.t+i*.06,f:()=>{const d=18+i*12,x=R.x+Math.cos(a)*d,y=R.y+Math.sin(a)*d;ringFx(x,y,16,'255,120,40',.25);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-x,e.y-y)<16+e.T.r)hurtEnemy(e,25,'br',.3,{x:R.x,y:R.y})}})});
 const spi=F.spiritFast?5:10;
 if(F.spFire)every('sfT',spi,()=>{const r=55*S.area;ringFx(R.x,R.y,r,'255,120,40',.35);nearR(r).forEach(e=>hurtEnemy(e,30,null,0))});
 if(F.spIce)every('siT',spi,()=>{const r=60*S.area;ringFx(R.x,R.y,r,'160,220,255',.35);nearR(r).forEach(e=>stun(e,1.2))});
 if(F.spBolt)every('sbT',spi,()=>{shuffle(inViewEn()).slice(0,4).forEach(e=>{R.shots.push({k:'bolt',x:e.x,y:e.y,t:0,life:.2});hurtEnemy(e,30,null,0)})});
 if(F.star)every('stT',10,()=>{const c=inViewEn();if(c.length){const e=pick(c);meteor(e.x,e.y,30,50)}});
 if(F.howl)every('hwT',10,()=>{ringFx(R.x,R.y,60,'255,200,120',.4);nearR(60).forEach(e=>stun(e,.8))});
 if(R.t<(R.bladeT||0)){const n=4+F.spN,r=30*S.area;R.blades=[];for(let i=0;i<n;i++){const a=R.t*6+i/n*6.283,x=R.x+Math.cos(a)*r,y=R.y+Math.sin(a)*r*.8;R.blades.push([x,y,a]);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-x,e.y-y)<8+e.T.r)hurtEnemy(e,14*F.spX,'bd'+i,.25,{x:R.x,y:R.y})}}else R.blades=null;
 if(R.t<(R.cloneT||0)){const n=2+F.spN;R.clones=[];for(let i=0;i<n;i++){const a=i/n*6.283+R.t*.8;R.clones.push([R.x+Math.cos(a)*26,R.y+Math.sin(a)*20])}
  every('clT',.6,()=>{const lv=R.weapons.shuriken||1,dmg=(6+2*(lv-1))*F.spX;R.clones.forEach(([x,y])=>{for(let k=0;k<6;k++){const a=k/6*6.283+R.t;R.shots.push({k:'proj',x,y,vx:Math.cos(a)*200,vy:Math.sin(a)*200,t:0,hit:new Set(),pierce:1,life:.7,r:5,dk:'shur',dmg,w:'shuriken'})}})})}else R.clones=null}
function hiraPool(){return Object.keys(WAZA).filter(k=>isBase(k)&&!R.waza[k]&&famLv(WAZA[k].tag))}
function hiraOK(){return !(R.cond&&R.cond.includes('nohira'))&&R.hiraLog.length<3+R.F.hiraCap}
function hirameki(k,from){if(!k||R.waza[k])return;const known=!!SV.waza[k];if(!known){SV.waza[k]={star:1,exp:0};if(SV.bring.length<bringN())SV.bring.push(k)}
 R.waza[k]={t:0,first:true};R.hiraLog.push(k);if(R.F.nova)R.novaT=R.t+10;R.lastHira=R.t;R.bulb=R.t;sfx.hira();
 R.cut={k,known,from,at:performance.now()};R.slow=.9;R.flash=R.t;shake(6);save()}
function wazaTick(dt){const S=stat();
 for(const k in R.waza){const W=R.waza[k],Wz=WAZA[k],st=SV.waza[k].star,tag=Wz.tag;if(!famLv(tag)){W.t=.2;continue}
  W.t-=dt;if(W.t>0)continue;W.t=Wz.cd*wc(st)*S.cd*R.F.wazaCd;let used=true;
  const first=W.first;let m=wm(st)*(1+.1*(famLv(tag)-1))*(first?3:1)*R.F.wazaDmg,A=S.area*(first?1.5:1)*R.F.wazaArea;if(k.startsWith('honoo')){m*=R.F.fireWz*R.F.elem;A*=R.F.elem*R.F.blastR}if(k==='nemuri')A*=R.F.elem;
  const near=r=>R.en.filter(e=>!e.dead&&Math.hypot(e.x-R.x,e.y-R.y)<r+e.T.r);
  const tgt=(r)=>{let t=R.boss&&R.boss.charging>0&&Math.hypot(R.boss.x-R.x,R.boss.y-R.y)<r+20?R.boss:nearest(R.x,R.y);return t&&Math.hypot(t.x-R.x,t.y-R.y)<r?t:null};
  const slam=(t2,d,sn)=>{R.shots.push({k:'slam',x:t2.x,y:t2.y,t:0,life:.25});stun(t2,sn);hurtEnemy(t2,d)};
  const ring=(x,y,r,c,life)=>R.shots.push({k:'ring',x,y,r,c,t:0,life:life||.3});
  const boomer=(n,d)=>{for(let i=0;i<n;i++){const a=i/n*6.283+R.t;R.shots.push({k:'boom',x:R.x,y:R.y,vx:Math.cos(a)*210,vy:Math.sin(a)*210,t:0,dmg:d,id:'wz'+rnd(),back:false,rot:0})}};
  const blast=(x,y,r,d)=>{ring(x,y,r,'255,120,40',.3);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-x,e.y-y)<r+e.T.r)hurtEnemy(e,d,null,0,{x,y})};
  if(k==='kabuto'){const t=tgt(110);if(!t){W.t=.3;used=false}else slam(t,40*m,1.5)}
  if(k==='kabuto2'){const t=tgt(120);if(!t){W.t=.3;used=false}else{const ts=[t],sk=new Set(ts);for(let i=0;i<2;i++){const n=nearest(R.x,R.y,sk);if(n&&Math.hypot(n.x-R.x,n.y-R.y)<140){sk.add(n);ts.push(n)}}ts.forEach(t2=>slam(t2,55*m,2))}}
  if(k==='kabuto3'){const t=tgt(120);if(!t){W.t=.3;used=false}else[0,.15,.3].forEach((d,i)=>R.tq.push({at:R.t+d,f:()=>{if(!t.dead){slam(t,60*m,1.2);shake(3)}}}))}
  if(k==='kaiten'){const r=32*A;ring(R.x,R.y,r,'255,255,255',.2);near(r).forEach(e=>hurtEnemy(e,22*m))}
  if(k==='kaiten2'){[0,.2].forEach(d=>R.tq.push({at:R.t+d,f:()=>{const r=48*A;ring(R.x,R.y,r,'255,255,255',.25);near(r).forEach(e=>hurtEnemy(e,30*m,'kt'+d,.1))}}))}
  if(k==='uchiage'){const r=42*A;ring(R.x,R.y,r,'255,211,78');near(r).forEach(e=>{stun(e,1);e.air=R.t;hurtEnemy(e,15*m)})}
  if(k==='uchiage2'){const r=85*A;ring(R.x,R.y,r,'160,220,255',.4);near(r).forEach(e=>{const dx=R.x-e.x,dy=R.y-e.y,l=Math.hypot(dx,dy)||1;e.vx=dx/l*240/(e.T.m||1);e.vy=dy/l*240/(e.T.m||1)});
   R.tq.push({at:R.t+.35,f:()=>{ring(R.x,R.y,40*A,'160,220,255');near(45*A).forEach(e=>{stun(e,1.5);e.air=R.t;hurtEnemy(e,28*m)})}})}
  if(k==='midare')boomer(6,10*m);
  if(k==='midare2'){boomer(12,12*m);R.tq.push({at:R.t+.3,f:()=>boomer(12,12*m)})}
  if(k==='honoo'){const t=nearest(R.x,R.y);if(!t){W.t=.3;used=false}else{const a=Math.atan2(t.y-R.y,t.x-R.x);R.shots.push({k:'fire',x:R.x,y:R.y,vx:Math.cos(a)*200,vy:Math.sin(a)*200,t:0,dmg:28*m,r:22*A})}}
  if(k==='honoo2'){for(let i=0;i<6;i++){const a=i/6*6.283;R.tq.push({at:R.t+i*.05,f:()=>blast(R.x+Math.cos(a)*42*A,R.y+Math.sin(a)*34*A,18*A,30*m)})}}
  if(k==='honoo3'){const c=R.en.filter(e=>!e.dead&&inView(e));if(!c.length){W.t=.3;used=false}else for(let i=0;i<3;i++){const t=pick(c);R.tq.push({at:R.t+i*.15,f:()=>{blast(t.x,t.y,40*A,70*m);shake(4)}})}}
  if(k==='nemuri'){const r=65*A;ring(R.x,R.y,r,'200,150,255',.5);near(r).forEach(e=>{e.sleep=Math.max(e.sleep||0,(e.T.boss?1.5:3*Math.min(2,m))*R.F.sleepDur);cancelCharge(e)})}
  if(k==='hikari'){heal(8*m*R.F.healWz);ring(R.x,R.y,24,'111,227,181',.4)}
  if(!used)continue;W.first=false;R.lastWzT=R.t;if(R.F.costLife)R.hp=Math.max(1,R.hp-R.max*.01);if(R.F.wazaDbl&&rnd()<R.F.wazaDbl)W.t=.15;if(first){shake(6);hitStop(.06)}
  R.wazaUse[k]=(R.wazaUse[k]||0)+1;
  // 派生：使っている技から 上位の技を ひらめく（強い敵が近いほど ひらめきやすい）
  const kids=KIDS(k).filter(c=>!R.waza[c]);
  if(kids.length&&hiraOK()&&R.t-(R.lastHira||-99)>12){let str=1;if(R.boss&&Math.hypot(R.boss.x-R.x,R.boss.y-R.y)<160)str=8;else if(R.en.some(e=>e.T.elite&&Math.hypot(e.x-R.x,e.y-R.y)<160))str=4;
   const pr=.018*str*(1+.15*R.st)*(1+.1*(R.rd-1))*R.F.hira*(1+R.E.hira/100)*(SV.waza[k].star>=2?1.5:1);if(rnd()<pr)hirameki(pick(kids),k)}
  // 連携：別の技が 1秒以内に 続くと 合体する
  const L=R.lastWz;if(L&&L.k!==k&&R.t-L.t<R.F.rkWin&&R.t>(R.rkT||0)){renkei(L.k,k,m);R.lastWz=null}else R.lastWz={k,t:R.t}}}
function renkei(a,b,m){R.rkT=R.t+5;const nm=rkName(a,b),key=[a,b].sort().join('+');const isNew=!SV.rkBook[key];SV.rkBook[key]=nm;R.rkN=(R.rkN||0)+1;
 R.rkCut={nm,a,b,at:performance.now(),isNew};R.flash=R.t;hitStop(.12);shake(9);sfx.hira();
 const r=75*stat().area;R.shots.push({k:'ring',x:R.x,y:R.y,r,c:'255,107,87',t:0,life:.45},{k:'ring',x:R.x,y:R.y,r:r*.6,c:'255,255,255',t:0,life:.35});
 for(const e of R.en)if(!e.dead&&Math.hypot(e.x-R.x,e.y-R.y)<r+e.T.r)hurtEnemy(e,45*m*R.F.rk,null,0);if(isNew)save()}
function stun(e,t){t*=R.F.stunDur;e.stun=Math.max(e.stun||0,e.T.boss?t*.7:t);cancelCharge(e)}
function meteor(x,y,r,d){R.shots.push({k:'bolt',x,y,t:0,life:.15},{k:'ring',x,y,r,c:'255,225,90',t:0,life:.3});shake(2);for(const o of R.en)if(!o.dead&&Math.hypot(o.x-x,o.y-y)<r+o.T.r)hurtEnemy(o,d,null,0,{x,y})}
function cancelCharge(e){if(e.T.boss&&e.charging>0){e.charging=0;e.ct=6;R.stops++;hitStop(.12);shake(5);banner('大技を止めた！','');tone('square',1200,.15,.1)}}

