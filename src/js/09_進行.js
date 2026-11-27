/* ---------- 進行 ---------- */
/* 深淵の 敵の 数：層ごとに 10段階で ふえる（重くなったら 自動で おさえる） */
const ABYSS_CAP=[60,90,120,150,190,230,270,310,350,400];
function abyssCap(m){const base=ABYSS_CAP[Math.min(ABYSS_CAP.length-1,m)];if(R.capLim==null)R.capLim=9999;return Math.max(60,Math.min(base,R.capLim))}
function perfGuard(dt){if(!R||R.mode!=='endless')return;R.pfT=(R.pfT||0)+dt;R.pfN=(R.pfN||0)+1;if(R.pfT<2)return;const fps=R.pfN/R.pfT;R.pfT=0;R.pfN=0;const want=(SV.opt.fps30||QL()==='low')?26:44;
 if(fps<want&&R.en.length>60){R.capLim=Math.max(60,Math.round(Math.min(R.capLim||9999,R.en.length)*.88))}else if(fps>want+8&&R.capLim<9999){R.capLim=Math.round(R.capLim*1.05)+2;if(R.capLim>420)R.capLim=9999}}
const abyBase=()=>Math.max(3,ABY.base*stMul(5,10));
function abyssStarts(){const o=[];for(let m=5;m*60<=(SV.endBest||0);m+=5)o.push(m);return o}
function startAbyss(m){startRun('endless');if(m>0){R.t=R.t0=m*60;R.dbgAuto=true;const q=Math.round(m*3.5);R.queue+=q;R.lv+=q;R.need=Math.round(4+R.lv*3+R.lv*R.lv*.12);banner('深淵 '+(m+1)+'層から','ここまでの 成長を 取りもどす')}}
function endlessDir(dt){const t=Math.max(0,R.t),m=Math.floor(t/60),st=m%6;if(st!==R.st){R.st=st;banner('深淵 '+(m+1)+'層',STAGES[st].n+'の 魔物が あふれだす')}
 R.sm=R.sm0*Math.pow(ABY.hp,t/60);R.smD=R.sm0*Math.pow(ABY.dmg,t/60);const ST=STAGES[st];const cap=abyssCap(m);R.acc+=dt*DIF.dens*Math.max(Math.min(16,3+t/12),cap/9)*(R.F.lure?1.25:1);while(R.acc>=1&&R.en.length<cap){R.acc--;spawn(rnd()<.4?ST.foes[1]:ST.foes[0])}
 if(t-m*60>25&&!R.events['e'+m]){R.events['e'+m]=1;spawn(ST.elite);if(m>=3)spawn(ST.elite)}
 if(t-m*60>50&&!R.events['b'+m]&&!R.boss){R.events['b'+m]=1;R.boss=spawn(ST.boss,R.x,R.y+dyTop()+10);R.bossAt=R.t;banner(ETYPE[ST.boss].n+'が あらわれた！','深淵の ボス');sfx.boss()}
 if(R.boss&&rnd()<dt*.5)for(let i=0;i<4;i++)spawn(ST.foes[0],R.boss.x+(rnd()-.5)*30,R.boss.y+(rnd()-.5)*30)}
function throneDir(dt){const t=R.t,ST=STAGES[5];R.acc+=dt*DIF.dens*Math.min(14,3+t/10);while(R.acc>=1&&R.en.length<200){R.acc--;spawn(rnd()<.5?ST.foes[1]:ST.foes[0])}
 if(t>3&&!R.events.boss){R.events.boss=1;R.boss=spawn('tmaou',R.x,R.y+dyTop()+10);R.boss.hp*=3;R.boss.max*=3;R.bossAt=R.t;banner('真・魔王ピコールが あらわれた！','たおせば 神器が 手に入る');sfx.boss()}
 if(t>30&&rnd()<dt*.05&&R.en.filter(e=>e.T.elite).length<3)spawn(ST.elite);
 if(R.boss&&rnd()<dt*.8)for(let i=0;i<5;i++)spawn(ST.foes[1],R.boss.x+(rnd()-.5)*40,R.boss.y+(rnd()-.5)*40)}
function director(dt){if(R.mode==='endless'){endlessDir(dt);return}if(R.mode==='throne'){throneDir(dt);return}const t=R.t,ST=STAGES[R.st];
 if(t<STAGE_LEN||!R.events.boss){R.acc+=dt*DIF.dens*(R.cond&&R.cond.includes('many')?2:1)*Math.min(14+2*R.st,(1.6+t*TF/14)*(1+.12*R.st))*(R.F.lure?1.25:1);while(R.acc>=1&&R.en.length<240){R.acc--;spawn(t>25/TF&&rnd()<Math.min(.5,.15+t*TF/360)?ST.foes[1]:ST.foes[0])}}
 if(t>30&&!R.events.e1){R.events.e1=1;spawn(ST.elite);banner(ETYPE[ST.elite].n+'が あらわれた','倒すと 宝箱を 落とす')}
 if(t>60&&!R.events.ring){R.events.ring=1;for(let i=0;i<26;i++){const a=i/26*Math.PI*2;spawn(ST.foes[1],R.x+Math.cos(a)*120,R.y+Math.sin(a)*150)}banner(ETYPE[ST.foes[1]].n+'の むれ！','')}
 if(t>87&&!R.events.e2){R.events.e2=1;spawn(ST.elite);spawn(ST.elite)}
 if(t>=STAGE_LEN&&!R.events.boss){R.events.boss=1;R.boss=spawn(ST.boss,R.x,R.y+dyTop()+10);R.bossAt=R.t;banner(ETYPE[ST.boss].n+'が あらわれた！','倒せば クリア');sfx.boss()}
 if(R.boss&&rnd()<dt*.5)for(let i=0;i<4;i++)spawn(ST.foes[0],R.boss.x+(rnd()-.5)*30,R.boss.y+(rnd()-.5)*30)}
function step(dt){R.t+=dt;R.inv-=dt;R.vampB=Math.min(6,R.vampB+dt*6);for(const q of R.tq)if(R.t>=q.at){q.done=1;q.f()}R.tq=R.tq.filter(q=>!q.done);const S=stat();
 let mx=stick.x,my=stick.y;if(keys.ArrowLeft||keys.a)mx=-1;if(keys.ArrowRight||keys.d)mx=1;if(keys.ArrowUp||keys.w)my=-1;if(keys.ArrowDown||keys.s)my=1;
 const ml=Math.hypot(mx,my),k0=Math.min(1,ml),tx=ml>0?mx/ml*S.spd*k0:0,ty=ml>0?my/ml*S.spd*k0:0,acc=Math.min(1,dt*(ml>0?14:10));
 R.vx+=(tx-R.vx)*acc;R.vy+=(ty-R.vy)*acc;if(ml>0)R.dir=Math.atan2(my,mx);R.x+=R.vx*dt;R.y+=R.vy*dt;if(ml>0&&Math.abs(mx)>.2)R.face=mx>0?1:-1
 director(dt);fire(dt);moveShots(dt);allyTick(dt);
 for(const e of R.en){if(e.dead)continue;
  if(e.stun>0)e.stun-=dt;if(e.sleep>0)e.sleep-=dt;
  if(e.burnT>R.t){e.brT=(e.brT||0)+dt;if(e.brT>=.5){e.brT=0;spark(e.x,e.y,'#ff7a2a',2);hurtEnemy(e,4+e.max*.01,'burn',.4);if(e.dead)continue}}
  if(e.psn>0){e.psn-=dt;e.psT=(e.psT||0)+dt;if(e.psT>=.5){e.psT=0;spark(e.x,e.y,'#9be36f',2);hurtEnemy(e,e.max*.015+1,'psn',.4);if(e.dead)continue}}
  const stopped=R.t<(R.stopT||0);if(e.T.boss&&!stopped&&!(e.stun>0)&&!(e.sleep>0)){if(e.ct==null)e.ct=5;if(e.charging>0){e.charging-=dt;if(e.charging<=0){e.ct=6;bossBlast(e)}}else{e.ct-=dt;if(e.ct<=0){e.charging=1.8;banner(e.T.n+'が 力を ためている！','気絶・打ち上げ・眠りで 止められる');tone('sawtooth',80,.5,.12,160)}}}
  let dx=R.x-e.x,dy=R.y-e.y;const l=Math.hypot(dx,dy)||1,still=stopped||e.stun>0||e.sleep>0||e.charging>0;if(R.F.kiss&&l<22&&!e.kissed&&!e.T.boss){e.kissed=1;e.stun=Math.max(e.stun||0,.8);R.pops.push({x:e.x,y:e.y-10,txt:'♥',c:'#ff8ae6',t:R.t})}
  if(e.k==='bat'){e.ph+=dt*6;dx+=Math.cos(e.ph)*l*.4;dy+=Math.sin(e.ph)*l*.4}
  const l2=Math.hypot(dx,dy)||1,slw=R.F.slowAura&&l<55?.55:1,tvx=still?0:dx/l2*e.spd*slw,tvy=still?0:dy/l2*e.spd*slw,fast=e.vx*e.vx+e.vy*e.vy>e.spd*e.spd*4;
  const a2=Math.min(1,dt*(fast?3.5:6));e.vx+=(tvx-e.vx)*a2;e.vy+=(tvy-e.vy)*a2;
  if(fast){e.flyT=R.t;if(l<60&&!e.T.boss){const pu=(60-l)/60*900*dt;e.vx-=dx/l*pu;e.vy-=dy/l*pu}}else if(R.t-(e.flyT||-9)<.45&&l<34&&!e.T.boss){e.x-=dx/l*40*dt;e.y-=dy/l*40*dt}
  e.x+=e.vx*dt;e.y+=e.vy*dt;
  if(still)continue;
  if(l<e.T.r+5&&R.inv<=0&&!fast&&R.t-(e.flyT||-9)>=.35){hurtHero(e.dmg,e);const kb=180/(e.T.m||1);e.vx-=dx/l*kb;e.vy-=dy/l*kb}
  if(l>700&&!e.T.boss&&!e.T.elite)e.dead=true}
 R.en=R.en.filter(e=>!e.dead);collide();
 for(const e of R.en){if(e.T.boss)continue;const v2=e.vx*e.vx+e.vy*e.vy;if(v2<120*120)continue;wallBounce(e,.8,Math.sqrt(v2))}
 for(const c of R.corpses){c.t+=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.vx*=1-dt*.6;c.vy*=1-dt*.6;c.vz-=700*dt;c.z+=c.vz*dt;c.rot+=c.vr*dt;if(c.z<0){c.z=0;c.vz=-c.vz*.5;c.vr*=.7;c.vx*=.85;c.vy*=.85}
  const v=Math.hypot(c.vx,c.vy);wallBounce(c,.85,v);
  if(v>130)for(const o of R.en){if(o.dead||c.hit.has(o))continue;const dx=o.x-c.x,dy=o.y-c.y,d=Math.hypot(dx,dy)||1;if(d<o.T.r+6*c.sc){c.hit.add(o);hurtEnemy(o,Math.max(4,v/35)*R.F.bump,null,0,c);o.vx+=c.vx*.5/(o.T.m||1);o.vy+=c.vy*.5/(o.T.m||1);c.vx*=.8;c.vy*=.8}}}
 R.corpses=R.corpses.filter(c=>c.t<1.6);
 for(const q of R.parts){q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=1-dt*5;q.vy*=1-dt*5}R.parts=R.parts.filter(q=>q.t<q.life);
 const mg=S.mag;for(const p of R.gems){const dx=R.x-p.x,dy=R.y-p.y,l=Math.hypot(dx,dy);
  if(p.vx){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=1-dt*6;p.vy*=1-dt*6;if(Math.abs(p.vx)+Math.abs(p.vy)<5)p.vx=p.vy=0}
  if(l<mg||p.pull){p.pull=1;p.vx=0;p.vy=0;p.x+=dx/l*Math.max(200,l*8)*dt;p.y+=dy/l*Math.max(200,l*8)*dt}
  if(l<7){p.dead=true;collect(p)}}
 R.gems=R.gems.filter(p=>!p.dead);if(R.gems.length>400)R.gems.splice(0,R.gems.length-400);
 if(R.hp<=0)checkDeath()}
function wallBounce(o,res,v){let b=false;const T0=R.y+dyTop()+30,B0=R.y+dyBot()-6;if(o.y<T0&&o.vy<0&&o.y>T0-40){o.y=T0;o.vy=-o.vy*res;b=true}else if(o.y>B0&&o.vy>0&&o.y<B0+40){o.y=B0;o.vy=-o.vy*res;b=true}
 const hw=halfW(o.y-R.y)-5,L=R.x-hw,Rr=R.x+hw;if(o.x<L&&o.vx<0&&o.x>L-40){o.x=L;o.vx=-o.vx*res;b=true}else if(o.x>Rr&&o.vx>0&&o.x<Rr+40){o.x=Rr;o.vx=-o.vx*res;b=true}
 if(b){spark(o.x,o.y,'#ffd34e',5);R.shots.push({k:'ring',x:o.x,y:o.y,r:10,c:'255,211,78',t:0,life:.18});shake(Math.min(4,v/120));if(o.hp!=null&&!o.dead)hurtEnemy(o,Math.max(3,v/30)*R.F.bump,'wall',.2,{x:o.x-o.vx,y:o.y-o.vy});if(performance.now()-(R.lastWall||0)>60){R.lastWall=performance.now();tone('square',180+rnd()*60,.05,.05)}}}
function collide(){const G=new Map(),C=16;for(const e of R.en){const k=(Math.floor(e.x/C))+','+(Math.floor(e.y/C));let a=G.get(k);if(!a)G.set(k,a=[]);a.push(e)}
 for(const e of R.en){const cx=Math.floor(e.x/C),cy=Math.floor(e.y/C),sp2=e.vx*e.vx+e.vy*e.vy,fly=sp2>140*140;
  for(let ix=-1;ix<=1;ix++)for(let iy=-1;iy<=1;iy++){const a=G.get((cx+ix)+','+(cy+iy));if(!a)continue;
   for(const o of a){if(o===e||o.dead||e.dead)continue;const dx=o.x-e.x,dy=o.y-e.y,d=Math.hypot(dx,dy)||.01,rr=e.T.r+o.T.r-1;if(d>=rr)continue;
    const mE=e.T.m||1,mO=o.T.m||1,push=(rr-d)/2;e.x-=dx/d*push*mO/(mE+mO)*2;e.y-=dy/d*push*mO/(mE+mO)*2;o.x+=dx/d*push*mE/(mE+mO)*2;o.y+=dy/d*push*mE/(mE+mO)*2;
    if(fly&&!o.T.boss&&!(o.cd['bump']>R.t)){const v=Math.sqrt(sp2),tr=v*.6*mE/mO;o.vx+=dx/d*tr;o.vy+=dy/d*tr;e.vx*=.75;e.vy*=.75;hurtEnemy(o,Math.max(3,v/40)*R.F.bump,'bump',.25,e)}}}}}
function hurtHero(raw,e,kind){const F=R.F;if(R.inv>0||R.over||SV.opt.dbgGod)return;if(F.deep3&&R.mode==='endless')raw*=.7;const pop=(t,c)=>R.pops.push({x:R.x,y:R.y-14,txt:t,c,t:R.t});
 if(rnd()<F.evade+(R.hp/R.max<.5?F.lowHpEvade:0)){R.inv=.3;pop('かわした','#9ae6ff');return}
 if(F.nullify&&rnd()<F.nullify){R.inv=.4;pop('ノーダメージ','#ff8ac0');return}
 if(F.parry&&rnd()<F.parry){R.inv=.4;pop('白刃取り','#fff');ringFx(R.x,R.y,40,'255,255,255',.25);nearR(40).forEach(o=>hurtEnemy(o,40,'pry',.3));return}
 if(F.block<99&&R.t>=(R.blockT||0)){R.blockT=R.t+F.block;R.inv=.5;pop('ガード','#ffe14a');ringFx(R.x,R.y,24,'255,225,90',.3);return}
 let m=F.taken;if(F.mshield&&Object.keys(R.weapons).some(w=>WEAP[w].fam==='magic'))m*=.9;if(F.lowHpTaken&&R.hp/R.max<.3)m*=1-F.lowHpTaken;
 if(F.stillTaken&&Math.hypot(R.vx,R.vy)<8)m*=1-F.stillTaken;if(F.nearAllyTaken&&R.allies.some(a=>Math.hypot(a.x-R.x,a.y-R.y)<30))m*=1-F.nearAllyTaken;
 if(F.kingTaken)m*=Math.max(.5,1-F.kingTaken*R.allies.length);if(R.allies.some(a=>a.k==='golem'))m*=.85;if(F.wealthTaken)m*=1-Math.min(.2,.02*Math.floor(SV.gold/10000));if(e&&e.T.elite)m*=F.eliteTaken;
 const d=Math.max(1,Math.round(raw*m));R.hp-=d;R.hurtN=(R.hurtN||0)+1;R.hurtT=R.t;{const src=e&&e.T?(e.T.n+(e.T.boss?'（ボス）':e.T.elite?'（強敵）':'')):'なにか';(R.dmgLog=R.dmgLog||[]).push({t:R.t,d,src,k:kind||'touch'});if(R.dmgLog.length>80)R.dmgLog.shift();R.dmgBy=R.dmgBy||{};const b=R.dmgBy[src]=R.dmgBy[src]||[0,0];b[0]+=d;b[1]++;R.lastHit={src,d,k:kind||'touch',e,hp0:R.hp+d};if(e)ringFx(e.x,e.y,(e.T.r||6)+7,'255,50,50',.4)}R.inv=.6;sfx.hurt();shake(3);pop('-'+d,'#ff5a4e');
 if(F.counter){ringFx(R.x,R.y,40,'255,255,255',.25);nearR(40).forEach(o=>hurtEnemy(o,20,'cnt',.3))}
 if(F.smoke){ringFx(R.x,R.y,50,'200,200,200',.4);nearR(50).forEach(o=>{if(!o.T.boss)o.sleep=Math.max(o.sleep||0,2.5)})}
 if(F.flee)R.fleeT=R.t+2;
 if(F.teleport&&e){const dx=R.x-e.x,dy=R.y-e.y,l=Math.hypot(dx,dy)||1;R.x+=dx/l*30;R.y+=dy/l*30;spark(R.x,R.y,'#c8a0ff',6)}
 if(R.hp<=0)checkDeath()}
function checkDeath(){if(R.over||R.hp>0)return;const F=R.F,save2=(t,s2,hp)=>{R.hp=Math.max(1,Math.round(hp));R.inv=2;R.sinvT=R.t+2;R.flash=R.t;shake(8);banner(t,s2);sfx.lv();ringFx(R.x,R.y,70,'255,255,255',.4)};
 if((R.gutsN||0)<F.guts){R.gutsN=(R.gutsN||0)+1;save2('ふんばった！','HP1で 耐えた',1);return}
 if(F.rewind&&!R.rewound&&R.hpHist&&R.hpHist.length){R.rewound=1;save2('時間逆行！','HPが 10秒前に もどった',Math.max(R.max*.2,R.hpHist[0]));return}
 if(F.phoenix&&(R.phN||0)<F.phoenix){R.phN=(R.phN||0)+1;save2('不死鳥の羽！','HP50%で よみがえった（のこり '+(F.phoenix-R.phN)+'回）',R.max*.5);return}
 if(F.revive30&&!R.rev30){R.rev30=1;save2('よみがえり！','HP30%で 立ち上がった',R.max*.3);return}if(R.F.revive&&!R.revived){R.revived=1;R.hp=Math.round(R.max*.5);R.inv=2;R.flash=R.t;shake(8);banner('イエティの カード！','HP50%で 立ち上がった');sfx.lv();R.shots.push({k:'ring',x:R.x,y:R.y,r:90,c:'200,230,255',t:0,life:.5});for(const o of R.en){const dx=o.x-R.x,dy=o.y-R.y,d=Math.hypot(dx,dy)||1;if(d<90&&!o.T.boss){o.vx+=dx/d*400;o.vy+=dy/d*400}}return}R.hp=0;endRun(false)}
function bossBlast(e){R.shots.push({k:'ring',x:e.x,y:e.y,r:80,c:'255,60,60',t:0,life:.5});shake(8);hitStop(.08);for(const o of R.en)if(o!==e){const dx=o.x-e.x,dy=o.y-e.y,d=Math.hypot(dx,dy)||1;if(d<80){o.vx+=dx/d*200;o.vy+=dy/d*200}}tone('sawtooth',60,.5,.2,30);
 if(Math.hypot(R.x-e.x,R.y-e.y)<80&&R.t>=(R.sinvT||0)){R.inv=0;hurtHero(35*R.sm*R.F.blastTaken,e,'blast')}
 for(let i=0;i<6;i++)spawn('slime',e.x+(rnd()-.5)*40,e.y+(rnd()-.5)*40)}
function lvBlast(){R.shots.push({k:'ring',x:R.x,y:R.y,r:90,c:'110,200,255',t:0,life:.4});R.flash=R.t;shake(4);for(const e of R.en){const dx=e.x-R.x,dy=e.y-R.y,d=Math.hypot(dx,dy)||1;if(d<90&&!e.T.boss){const f=(1-d/90)*420/(e.T.m||1);e.vx+=dx/d*f;e.vy+=dy/d*f}}}
function collect(p){if(p.k==='card'){R.cardsGot.push(p.card);R.pops.push({x:R.x,y:R.y-16,txt:'カード！ '+cardName(p.card),c:'#ffe14a',t:R.t});tone('square',1568,.12,.08);tone('square',2093,.15,.08,0,.08);return}
 if(p.k==='item'){R.loot.push(p.item);const C=RAR[p.item.r],it=p.item,bt=!it.a&&statScore(it)>statScore(eqOf(it.slot));R.pops.push({x:R.x,y:R.y-16,txt:(bt?'▲':'')+(itWant(it)?'★':'')+(it.shiny?'✨輝く！':'')+C.n+'！'+itemName(it),c:it.shiny?'#ffffff':bt?'#6fe3b5':C.f,t:R.t});if(it.lg)R.pops.push({x:R.x,y:R.y-26,txt:'伝説の 効果！',c:'#ff8ae6',t:R.t});tone('square',880,.1,.08);tone('square',1320,.15,.08,0,.08);return}
 if(p.k==='gem'){const v=p.v*(1+R.E.xp/100)*R.F.xp;R.xp+=v;R.xpTot+=v;sfx.gem();while(R.xp>=R.need){R.xp-=R.need;R.lv++;lvBlast();R.need=Math.round(4+R.lv*3+R.lv*R.lv*.12);R.queue++}}
 if(p.k==='coin'){R.gold+=(1+R.E.gold/100)*(1+.3*R.st)*R.F.coinMul}
 if(p.k==='meat')heal(30*R.F.meat)
 if(p.k==='chest'){R.queue+=1+R.F.chestLv;R.gold+=10}
 if(p.k==='soul'){(R.souls=R.souls||[]).push(p.ally);R.pops.push({x:R.x,y:R.y-16,txt:ALLY[p.ally].n+'の 魂！',c:'#c8a0ff',t:R.t});tone('square',988,.12,.08);tone('square',1480,.15,.08,0,.08);return}
 if(p.k==='heart'){R.newAllies.push(p.ally);sfx.hira();banner(ALLY[p.ally].n+'がなかまになった！','この冒険から一緒に戦い、次の冒険にも連れて行ける');if(R.allies.length<allySlots())addAlly(p.ally)}}

