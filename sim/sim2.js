window.SIM={
 camp(){
  if(SV.jobs[SV.job].lv>=JOB_MAX){const nx=Object.keys(JOBS).find(j=>jobOpen(j)&&SV.jobs[j].lv<JOB_MAX&&j!=='suppin');if(nx){SV.prevJob=SV.job;SV.job=nx}}
  const learned=Object.keys(ABIL).filter(abLearned).sort((a,b)=>(ABIL[b].c==='atk')-(ABIL[a].c==='atk')||ABIL[b].ap-ABIL[a].ap);
  SV.abil=[];for(const a of learned){if(SV.abil.length>=abMax())break;if(apUsed()+ABIL[a].ap<=apMax())SV.abil.push(a)}
  const st=shopStock();for(let i=st.length-1;i>=0;i--){const o=st[i],cur=eqOf(o.slot);if(statScore(o)>statScore(cur)*1.1+5&&SV.gold>=shopPrice(o)&&SV.inv.length<invCap()){SV.gold-=shopPrice(o);const it=Object.assign({},o,{id:'b'+Math.random()});delete it.price;SV.inv.push(it);st.splice(i,1)}}
  recommendEq();
  let ch=true;while(ch){ch=false;for(const k in UPS){if(SV.up[k]<UPS[k].max&&SV.gold>=upCost(k)){SV.gold-=upCost(k);SV.up[k]++;ch=true}}}
  for(const sl in SV.eq){const it=eqOf(sl);if(!it)continue;let g=0;while(it.ref<refMax()&&g++<60){const s=it.ref,rate=Math.min(100,RATE[s]+(SV.tego[s]||0)+flags().refine),cost=20*(s+1);if(SV.gold<cost)break;if(s>=5&&SV.gold<cost*10)break;SV.gold-=cost;
   if(Math.random()*100<rate){it.ref++;if(it.ref>=refMax())SV.tego={}}else{SV.tego[s]=(SV.tego[s]||0)+2;if(s>=5&&Math.random()<.3){SV.inv=SV.inv.filter(x=>x!==it);SV.eq[sl]=null;SIM.broke++;break}}}}
  recommendEq();
  for(const sl in SV.eq){const it=eqOf(sl);if(!it)continue;const n=cardSlots(it);it.cards=it.cards||[];for(let i=0;i<n;i++)if(!it.cards[i]){const c=Object.keys(SV.cards).filter(k=>SV.cards[k]>0).sort((a,b)=>!!CARDSP[b]-!!CARDSP[a])[0];if(c){it.cards[i]=c;SV.cards[c]--}}}
  for(const k of Object.keys(SV.allies))while(soulUse(k)>0&&fuseOne(k));
  SV.party=Object.keys(SV.allies).sort((a,b)=>(allyGrade(b)-allyGrade(a))||SV.allies[b].lv-SV.allies[a].lv).slice(0,allySlots());
  SV.inv=SV.inv.filter(it=>{if(it.u&&!SV.ext[it.u]&&!Object.values(SV.eq).includes(it.id)){SV.ext[it.u]=1;return false}return true});
  {const us=Object.keys(SV.ext);SV.pw=us.slice(0,pwN())}
  SV.inv=SV.inv.filter(it=>{if(isWeakBulk(it)){SV.gold+=sellPrice(it);return false}return true});
  if(abyssOpen()){SV.altar=SV.altar||{};let ch2=true;while(ch2){ch2=false;const ks=['cut','atk','hp','xp','ally'].sort((a,b)=>(SV.altar[a]||0)-(SV.altar[b]||0));const k=ks[0],c=altarCost(SV.altar[k]||0);if((SV.abyss||0)>=c){SV.abyss-=c;SV.altar[k]=(SV.altar[k]||0)+1;ch2=true}}}
  const fam=WEAP[curWeapon()].fam;SV.bring=Object.keys(SV.waza).filter(k=>WAZA[k].tag===fam).sort((a,b)=>SV.waza[b].star-SV.waza[a].star).slice(0,bringN());
 },
 mode:'good',sd:[0,0],sc:0,
 steer(){if(SIM.mode==='normal'){SIM.sc--;if(SIM.sc>0){stick.x=SIM.sd[0];stick.y=SIM.sd[1];return}SIM.sc=12;if(Math.random()<.25){const a=Math.random()*6.28;SIM.sd=[Math.cos(a),Math.sin(a)];stick.x=SIM.sd[0];stick.y=SIM.sd[1];return}}let nd=1e9,fx=0,fy=0;for(const e of R.en){if(e.dead)continue;const dx=R.x-e.x,dy=R.y-e.y,d=Math.hypot(dx,dy)||1;if(d<nd)nd=d;if(d<100){const w=(e.T.boss?5:e.T.elite?2:1)/(d*d);fx+=dx*w;fy+=dy*w}}
  let mx=0,my=0;const l=Math.hypot(fx,fy);if(l>0){mx=fx/l;my=fy/l;mx+=-my*.6;my+=mx*.6}
  let best=null,bd=1e9;for(const g of R.gems){const d=Math.hypot(g.x-R.x,g.y-R.y);if(d<bd&&d<110){bd=d;best=g}}
  if(best&&nd>40){mx=mx*.3+(best.x-R.x)/bd;my=my*.3+(best.y-R.y)/bd}
  if(R.y>140)my-=.5;if(R.y<-140)my+=.5;if(R.x>180)mx-=.5;if(R.x<-180)mx+=.5;
  const ml=Math.hypot(mx,my);stick.x=ml?mx/ml:0;stick.y=ml?my/ml:0;SIM.sd=[stick.x,stick.y]},
 run(st,rd,mode,sm){window.NOFREEZE=1;SV.sel={st,rd};SV.opt.autoLv=true;SV.opt.hs='off';closeModal();setMode('camp');if(mode==='endless')startAbyss(sm||0);else startRun(mode);const dt=1/40;let n=0,minHp=1;const t0=R.t;
  while(!R.over&&R.t-t0<(mode==='endless'?6000:400)&&n<40*7000){n++;SIM.steer();
   if(R.hs>0)R.hs-=dt;else if(R.slow>0){R.slow-=dt;step(dt*.18)}else step(dt);
   while(R.queue>0&&!R.over)levelUp();if(R.jg>=1&&!R.over)jobSkill();
   minHp=Math.min(minHp,R.hp/R.max);
   if(R.mode!=='endless'&&R.events.boss&&!R.boss&&!R.over)endRun(true)}
  if(!R.over)endRun(false);const res={t0,played:Math.round(R.t-t0),dead:R.hp<=0,st,rd,win:!!(R.events.boss&&!R.boss&&R.hp>0),t:Math.round(R.t),lv:R.lv,minHp:Math.round(minHp*100),kills:R.kills,hero:SV.lv,job:SV.job+SV.jobs[SV.job].lv,gold:SV.gold};
  toCamp();return res},
 broke:0,lose:0,last:null,
 next(){const rd=maxRd();let st=STAGES.findIndex((S,i)=>stOpen(i,rd)&&(SV.clear[i]||0)<rd);if(st<0)st=0;
  if(SIM.lose>=2&&st>0){SIM.lose=0;return [st-1,rd]}return [st,rd]},
 cycle(){SIM.camp();const[st,rd]=SIM.next();const r=SIM.run(st,rd);if(r.win)SIM.lose=0;else SIM.lose++;return r}
};
