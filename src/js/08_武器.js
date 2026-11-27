/* ---------- 武器 ---------- */
function nearest(x,y,skip){let b=null,bd=1e9;for(const e of R.en){if(e.dead||(skip&&skip.has(e)))continue;const d=(e.x-x)**2+(e.y-y)**2;if(d<bd){bd=d;b=e}}return b}
function fire(dt){const S=stat(),F=R.F;wazaTick(dt);tickJobs(dt);
 const tgt=(r,used)=>{const t=nearest(R.x,R.y,used);return t&&(!r||Math.hypot(t.x-R.x,t.y-R.y)<r)?t:null};
 const proj=(x,y,a,sp,o)=>R.shots.push(Object.assign({k:'proj',x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,t:0,hit:new Set(),pierce:0,life:1,r:4},o));
 const dir0=R.dir??(R.face>0?0:Math.PI);
 for(const w in R.weapons){R.wt[w]=(R.wt[w]||0)-dt;if(R.wt[w]>0)continue;const EVW=!!(R.evoW&&R.evoW[w]),lv=R.weapons[w],CD=S.cd*F.wcd[w]*(EVW?.6:1),RG=S.area*F.wr[w]*(EVW?1.3:1),N=F.wn[w]+(EVW?2:0);
  if(w==='sword'){const evo=R.evo.renken;R.wt[w]=(evo?.35:.7)*CD;const r=(evo?36:28+lv*1.5)*RG,dmg=evo?22:12+4*(lv-1);
   const a0=R.face>0?0:Math.PI,dirs=[a0];if(evo||lv>=3||F.dual)dirs.push(a0+Math.PI);if(F.cross)dirs.push(a0+Math.PI/2,a0-Math.PI/2);if(F.tri)dirs.push(a0+2.1,a0-2.1);
   const ds=[...new Set(dirs.map(a=>(((a%6.283)+6.283)%6.283).toFixed(2)))].map(Number);
   const swing=(k2,mul)=>ds.forEach(a=>{R.shots.push({k:'swipe',a,r,t:0,life:.18});for(const e of R.en){if(e.dead)continue;const dx=e.x-R.x,dy=e.y-R.y,dd=Math.hypot(dx,dy);if(dd>r+e.T.r)continue;let da=Math.abs(Math.atan2(dy,dx)-a);if(da>Math.PI)da=6.283-da;if(dd<6||da<1.15)hurtEnemy(e,dmg*mul,'sw'+k2+a,.15,null,'sword')}});
   swing('',1);if(F.dblHit)R.tq.push({at:R.t+.12,f:()=>swing('b',F.dblHit)})}
  if(w==='katana'){R.wt[w]=.55*CD;const r=(30+lv*1.5)*RG,dmg=10+4*(lv-1);const cut=k2=>[0,Math.PI].forEach(a=>{R.shots.push({k:'swipe',a,r,t:0,life:.12,c:'200,235,255',thin:1});for(const e of R.en){if(e.dead)continue;const dx=e.x-R.x,dy=e.y-R.y;if((a?dx<4:dx>-4)&&Math.hypot(dx,dy)<r+e.T.r&&Math.abs(dy)<r*.5)hurtEnemy(e,dmg,'kt'+k2+a,.12,null,'katana')}});cut('');if(F.katanaDbl)R.tq.push({at:R.t+.1,f:()=>cut('b')})}
  if(w==='axe'){R.wt[w]=1.2*CD;const n=1+Math.floor((lv-1)/2)+N,dmg=22+7*(lv-1),used=new Set();for(let i=0;i<n;i++){const t=tgt(130,used);if(t)used.add(t);const tx=t?t.x:R.x+R.face*50+(rnd()-.5)*30,ty=t?t.y:R.y+(rnd()-.5)*30;R.shots.push({k:'axe',x0:R.x,y0:R.y,x1:tx,y1:ty,x:R.x,y:R.y,z:0,t:0,life:.55,dmg,r:18*RG*F.blastR})}}
  if(w==='spear'){R.wt[w]=.8*CD;const len=(48+6*lv)*RG,dmg=14+5*(lv-1),t=tgt(len*1.4),a0=t?Math.atan2(t.y-R.y,t.x-R.x):dir0;for(let i=0;i<=N;i++){const a=a0+(i?(i%2?.3:-.3)*Math.ceil(i/2):0),cx=Math.cos(a),sy=Math.sin(a);R.shots.push({k:'thrust',a,len,t:0,life:.15});for(const e of R.en){if(e.dead)continue;const dx=e.x-R.x,dy=e.y-R.y,al=dx*cx+dy*sy,pp=Math.abs(-dx*sy+dy*cx);if(al>-4&&al<len+e.T.r&&pp<7+e.T.r)hurtEnemy(e,dmg,'sp'+i,.15,null,'spear')}}}
  if(w==='dagger'){R.wt[w]=.35*CD;const n=1+Math.floor(lv/2)+N,dmg=6+2*(lv-1);for(let i=0;i<n;i++)proj(R.x,R.y,dir0+(i-(n-1)/2)*.12,320,{dk:'knife',dmg,w,pierce:1,life:.7,r:4*RG})}
  if(w==='whip'){R.wt[w]=1.0*CD;const len=(55+6*lv)*RG,dmg=13+4*(lv-1);[1,-1].forEach(f=>{R.shots.push({k:'whip',f,len,t:0,life:.2});for(const e of R.en){if(e.dead)continue;const dx=e.x-R.x,dy=e.y-R.y;if(dx*f>-4&&Math.abs(dx)<len+e.T.r&&Math.abs(dy)<10+e.T.r)hurtEnemy(e,dmg,'wh'+f,.15,null,'whip')}})}
  if(w==='boom'){R.wt[w]=1.2*CD;const n=1+Math.floor(lv/2)+N,dmg=8+3*(lv-1);const used=new Set();
   for(let i=0;i<n;i++){const tg=nearest(R.x,R.y,used);if(tg)used.add(tg);let a=tg?Math.atan2(tg.y-R.y,tg.x-R.x):(R.face>0?0:Math.PI);a+=(i?(i%2?.4:-.4):0);R.shots.push({k:'boom',x:R.x,y:R.y,vx:Math.cos(a)*220,vy:Math.sin(a)*220,t:0,dmg,id:'bm'+rnd(),back:false,rot:0,w:'boom',rg:RG})}}
  if(w==='bow'){R.wt[w]=.55*CD;const n=1+Math.floor((lv-1)/2)+N,dmg=9+3*(lv-1),used=new Set();for(let i=0;i<n;i++){const t=tgt(0,used);if(t)used.add(t);const a=t?Math.atan2(t.y-R.y,t.x-R.x):dir0+(i-(n-1)/2)*.15;proj(R.x,R.y,a,380,{dk:'arrow',dmg,w,life:1,r:4*RG})}}
  if(w==='shuriken'){R.wt[w]=1.0*CD;const n=4+lv+N,dmg=6+2*(lv-1),o=R.t*2;for(let i=0;i<n;i++)proj(R.x,R.y,o+i/n*6.283,200,{dk:'shur',dmg,w,pierce:EVW?99:2,life:EVW?1.2:.8,r:5*RG})}
  if(w==='fan'){R.wt[w]=1.4*CD;const n=1+Math.floor(lv/2)+N,dmg=8+3*(lv-1);for(let i=0;i<n;i++)R.shots.push({k:'fan',a0:R.t*3+i/n*6.283,t:0,life:1.6,dmg,rg:RG,id:'fn'+rnd(),x:R.x,y:R.y})}
  if(w==='magic'){if(R.evo.inazuma){R.wt[w]=.75*CD;const n=3+lv+N,list=shuffle(inViewEn()).slice(0,n);list.forEach(e=>{R.shots.push({k:'bolt',x:e.x,y:e.y,t:0,life:.2});hurtEnemy(e,40*S.area,null,0,null,'magic')});if(list.length)tone('square',90,.1,.05)}
   else{R.wt[w]=.65*CD;const n=1+Math.floor((lv-1)/2)+N,dmg=10+3*(lv-1),used=new Set();for(let i=0;i<n;i++){const tg=nearest(R.x,R.y,used);if(!tg)break;used.add(tg);R.shots.push({k:'mag',x:R.x,y:R.y,tg,t:0,dmg,vx:0,vy:0,pierce:F.magPierce?1:0})}}}
  if(w==='staff'){R.wt[w]=.9*CD;const n=1+Math.floor((lv-1)/2)+N,dmg=14+4*(lv-1),used=new Set();for(let i=0;i<n;i++){const t=tgt(0,used);if(t)used.add(t);const a=t?Math.atan2(t.y-R.y,t.x-R.x):dir0+i*.5;proj(R.x,R.y,a,170,{dk:'orb',dmg,w,life:1.4,r:5*RG,burst:16*RG*F.blastR})}}
  if(w==='harp'){R.wt[w]=1.3*CD;R.shots.push({k:'wave',x:R.x,y:R.y,r:0,R:(50+5*lv)*RG,t:0,life:.5,dmg:7+2*(lv-1),hit:new Set()})}}}
function moveShots(dt){for(const s of R.shots){s.t+=dt;
  if(s.k==='boom'){s.rot+=dt*20;if(!s.back&&s.t>.35){s.back=true}if(s.back){const dx=R.x-s.x,dy=R.y-s.y,l=Math.hypot(dx,dy)||1;s.vx+=(dx/l*400-s.vx)*dt*4;s.vy+=(dy/l*400-s.vy)*dt*4;if(l<8||s.t>3)s.dead=true}else{s.vx*=1-dt*1.5;s.vy*=1-dt*1.5}
   s.x+=s.vx*dt;s.y+=s.vy*dt;const r=6*(s.rg||stat().area);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-s.x,e.y-s.y)<r+e.T.r)hurtEnemy(e,s.dmg,s.id,.3,s,s.w)}
  else if(s.k==='mag'){if(!s.tg||s.tg.dead)s.tg=nearest(s.x,s.y);if(!s.tg||s.t>2){s.dead=true;continue}const dx=s.tg.x-s.x,dy=s.tg.y-s.y,l=Math.hypot(dx,dy)||1;const spd=s.pierce!=null&&R.F.magPierce?340:260;s.vx=dx/l*spd;s.vy=dy/l*spd;s.x+=s.vx*dt;s.y+=s.vy*dt;if(l<s.tg.T.r+3){hurtEnemy(s.tg,s.dmg,null,0,{x:s.x-s.vx*.05,y:s.y-s.vy*.05},'magic');if(s.pierce>0){s.pierce--;const sk=new Set([s.tg]);s.tg=nearest(s.x,s.y,sk);continue}s.dead=true;if(R.F.fireBolt){R.shots.push({k:'ring',x:s.x,y:s.y,r:16,c:'255,120,40',t:0,life:.2});for(const e2 of R.en)if(!e2.dead&&Math.hypot(e2.x-s.x,e2.y-s.y)<16+e2.T.r)hurtEnemy(e2,s.dmg*.5,'fb',.1,s)}}}
  else if(s.k==='fire'){s.x+=s.vx*dt;s.y+=s.vy*dt;let boom=s.t>1.2;for(const e of R.en)if(!e.dead&&Math.hypot(e.x-s.x,e.y-s.y)<e.T.r+3){boom=true;break}
   if(boom){s.dead=true;R.shots.push({k:'ring',x:s.x,y:s.y,r:s.r,c:'255,120,40',t:0,life:.25});for(const e of R.en)if(!e.dead&&Math.hypot(e.x-s.x,e.y-s.y)<s.r+e.T.r)hurtEnemy(e,s.dmg,null,0,s);shake(2)}}
  else if(s.k==='proj'){s.x+=s.vx*dt;s.y+=s.vy*dt;if(s.t>s.life)s.dead=true;else for(const e of R.en){if(e.dead||s.hit.has(e))continue;if(Math.hypot(e.x-s.x,e.y-s.y)<s.r+e.T.r){s.hit.add(e);hurtEnemy(e,s.dmg,null,0,s.ally?{x:s.x-s.vx*.05,y:s.y-s.vy*.05,lv:1,k:'ally'}:{x:s.x-s.vx*.05,y:s.y-s.vy*.05},s.w);if(s.stun)stun(e,s.stun);if(s.pierce--<=0){s.dead=true;break}}}
   if(s.dead&&s.burst&&s.hit.size){const b=s.burst;R.shots.push({k:'ring',x:s.x,y:s.y,r:b,c:'255,240,150',t:0,life:.25});for(const e of R.en)if(!e.dead&&!s.hit.has(e)&&Math.hypot(e.x-s.x,e.y-s.y)<b+e.T.r)hurtEnemy(e,s.dmg*.5,null,0,s,s.w);heal(.5,true)}}
  else if(s.k==='axe'){const q=Math.min(1,s.t/s.life);s.x=s.x0+(s.x1-s.x0)*q;s.y=s.y0+(s.y1-s.y0)*q;s.z=Math.sin(q*Math.PI)*40;if(q>=1){s.dead=true;R.shots.push({k:'ring',x:s.x,y:s.y,r:s.r,c:'255,200,120',t:0,life:.25});shake(2);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-s.x,e.y-s.y)<s.r+e.T.r)hurtEnemy(e,s.dmg,null,0,{x:s.x,y:s.y-6},'axe')}}
  else if(s.k==='fan'){const a=s.a0+s.t*5,rr=(10+s.t*55)*s.rg;s.x=R.x+Math.cos(a)*rr;s.y=R.y+Math.sin(a)*rr*.85;s.rot=a;if(s.t>s.life)s.dead=true;else for(const e of R.en)if(!e.dead&&Math.hypot(e.x-s.x,e.y-s.y)<6*s.rg+e.T.r)hurtEnemy(e,s.dmg,s.id,.3,s,'fan')}
  else if(s.k==='wave'){s.r=s.R*Math.min(1,s.t/s.life*1.3);if(s.t>s.life)s.dead=true;else for(const e of R.en){if(e.dead||s.hit.has(e))continue;const d=Math.hypot(e.x-s.x,e.y-s.y);if(d<s.r+e.T.r){s.hit.add(e);hurtEnemy(e,s.dmg,null,0,s,'harp');const l=d||1;e.vx+=(e.x-s.x)/l*150/(e.T.m||1);e.vy+=(e.y-s.y)/l*150/(e.T.m||1)}}}
  else if(s.t>s.life)s.dead=true}
 R.shots=R.shots.filter(s=>!s.dead)}
function allyAI(a,dt){const A=ALLY[a.k],gm=R.t<(R.giantT||0)?3:1,M=R.F.ally*allyMul(a)*(R.t<R.boostT?3:1)*(gm>1?2:1),lv=a.lv,sp=R.F.allySpd;
 const follow=()=>{const dx=R.x-14*R.face-a.x+(a.ox||0),dy=R.y+6-a.y+(a.oy||0),l=Math.hypot(dx,dy);if(l>4){const v=Math.min(l*3,70)*sp;a.x+=dx/l*v*dt;a.y+=dy/l*v*dt;a.fl=dx<0}};
 const touch=(r,d,src,cd,f)=>{for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<e.T.r+r*gm){if(hurtEnemy(e,d*M,src,cd,a)&&f)f(e)}};
 const tgt=r=>{const t=nearest(a.x,a.y);return t&&Math.hypot(t.x-a.x,t.y-a.y)<r?t:null};
 if(A.ai==='orbit'){a.a+=dt*2.2*sp;const r=34+lv;a.x=R.x+Math.cos(a.a)*r;a.y=R.y+Math.sin(a.a)*r*.8;touch(5,5+2*lv,'ao',.4,A.frz?e=>{if(rnd()<.25)stun(e,.8)}:null)}
 else if(A.ai==='guard'){a.a+=dt*1.6*sp;const r=16;a.x=R.x+Math.cos(a.a)*r;a.y=R.y+Math.sin(a.a)*r*.8;touch(7,6+2*lv,'ag',.35)}
 else if(A.ai==='chase'){if(a.rest>0){a.rest-=dt;follow();return}if(!a.tg||a.tg.dead||Math.hypot(a.tg.x-R.x,a.tg.y-R.y)>130)a.tg=tgt(100);if(!a.tg){follow();return}
  const dx=a.tg.x-a.x,dy=a.tg.y-a.y,l=Math.hypot(dx,dy)||1,v=130*sp;a.x+=dx/l*v*dt;a.y+=dy/l*v*dt;a.fl=dx<0;if(l<a.tg.T.r+6*gm){if(hurtEnemy(a.tg,(8+3*lv)*M,'ac',.3,a)&&A.psn)a.tg.psn=3;a.rest=.45;a.tg=null}}
 else if(A.ai==='eguard'){a.a+=dt*1.5*sp;a.x=R.x+Math.cos(a.a)*17;a.y=R.y+Math.sin(a.a)*13;for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<e.T.r+8*gm&&hurtEnemy(e,(10+3*lv)*M,'eg',.45,a)&&!e.T.boss){const dx=e.x-a.x,dy=e.y-a.y,l=Math.hypot(dx,dy)||1;e.vx+=dx/l*280/(e.T.m||1);e.vy+=dy/l*280/(e.T.m||1)}}
 else if(A.ai==='echase'||A.ai==='eknight'){if(a.rest>0){a.rest-=dt;follow();return}if(!a.tg||a.tg.dead||Math.hypot(a.tg.x-R.x,a.tg.y-R.y)>140)a.tg=tgt(115);if(!a.tg){follow();return}
  const dx=a.tg.x-a.x,dy=a.tg.y-a.y,l=Math.hypot(dx,dy)||1,v=165*sp;a.x+=dx/l*v*dt;a.y+=dy/l*v*dt;a.fl=dx<0;
  if(l<a.tg.T.r+7*gm){if(A.ai==='eknight'){const r=24*gm;ringFx(a.x,a.y,r,'181,53,158',.25);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r)hurtEnemy(e,(14+4*lv)*M,'ek',.3,a);a.rest=.4}else{const t2=a.tg;if(hurtEnemy(t2,(12+4*lv)*M,'ec',.3,a)){t2.psn=5}a.rest=.35}a.tg=null}}
 else if(A.ai==='bguard'){a.a+=dt*1.2*sp;a.x=R.x+Math.cos(a.a)*18;a.y=R.y+Math.sin(a.a)*14;for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<e.T.r+10*gm&&hurtEnemy(e,(15+5*lv)*M,'bg',.5,a)&&!e.T.boss){const dx=e.x-a.x,dy=e.y-a.y,l=Math.hypot(dx,dy)||1;e.vx+=dx/l*350/(e.T.m||1);e.vy+=dy/l*350/(e.T.m||1)}}
 else if(A.ai==='bchase'){if(a.rest>0){a.rest-=dt;follow();return}if(!a.tg||a.tg.dead||Math.hypot(a.tg.x-R.x,a.tg.y-R.y)>150)a.tg=tgt(130);if(!a.tg){follow();return}
  const dx=a.tg.x-a.x,dy=a.tg.y-a.y,l=Math.hypot(dx,dy)||1,v=210*sp;a.x+=dx/l*v*dt;a.y+=dy/l*v*dt;a.fl=dx<0;if(l<a.tg.T.r+8*gm){const t2=a.tg;if(hurtEnemy(t2,(18+6*lv)*M,'bc',.25,a))stun(t2,1);ringFx(t2.x,t2.y,16,'160,220,255',.25);a.rest=.25;a.tg=null}}
 else{follow();
  if(A.ai==='bking'){if(a.t>5){a.t=0;heal((8+3*lv)*R.F.slimeHeal*R.F.allyHeal)}a.t2=(a.t2||0)+dt;if(a.t2>7){a.t2=0;const r=50*gm;ringFx(a.x,a.y,r,'127,224,255',.4);shake(3);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){hurtEnemy(e,(20+6*lv)*M,'bk',.3,a);if(!e.T.boss){const dx=e.x-a.x,dy=e.y-a.y,l=Math.hypot(dx,dy)||1;e.vx+=dx/l*380;e.vy+=dy/l*380}}}}
  if(A.ai==='eslime'){if(a.t>5){a.t=0;heal((6+2*lv)*R.F.slimeHeal*R.F.allyHeal)}for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<e.T.r+8*gm&&hurtEnemy(e,(6+2*lv)*M,'es',.4,a)&&!e.T.boss){const dx=e.x-a.x,dy=e.y-a.y,l=Math.hypot(dx,dy)||1;e.vx+=dx/l*300/(e.T.m||1);e.vy+=dy/l*300/(e.T.m||1)}}
  if(A.ai==='eroot'&&a.t>4){a.t=0;const r=45*gm;ringFx(a.x,a.y,r,'110,190,90',.4);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){stun(e,.8);hurtEnemy(e,(5+2*lv)*M,'er',.5,a)}}
  if(A.ai==='eice'&&a.t>3){a.t=0;const r=45*gm;ringFx(a.x,a.y,r,'160,220,255',.4);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){stun(e,1);hurtEnemy(e,(8+3*lv)*M,'ei',.5,a)}}
  if(A.ai==='broot'&&a.t>3){a.t=0;const r=60*gm;ringFx(a.x,a.y,r,'110,190,90',.45);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){stun(e,1.2);hurtEnemy(e,(8+3*lv)*M,'br',.5,a)}}
  if(A.ai==='bquake'&&a.t>4){a.t=0;const r=70*gm;ringFx(a.x,a.y,r,'210,180,110',.5);shake(5);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){hurtEnemy(e,(25+8*lv)*M,'bq',.3,a);e.air=R.t}}
  if(A.ai==='bmeteor'&&a.t>3){a.t=0;const c=inViewEn();if(c.length){const e=pick(c);meteor(e.x,e.y,30*gm,(40+12*lv)*M)}}
  if(A.ai==='spore'&&a.t>4){a.t=0;const r=30*gm;ringFx(a.x,a.y,r,'190,140,255',.4);for(const e of R.en)if(!e.dead&&!e.T.boss&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){e.sleep=Math.max(e.sleep||0,1.5);hurtEnemy(e,(2+lv)*M,'asp',.5,a)}}
  if(A.ai==='needle'&&a.t>2){a.t=0;for(let i=0;i<8;i++){const an=i/8*6.283+R.t;R.shots.push({k:'proj',x:a.x,y:a.y,vx:Math.cos(an)*200,vy:Math.sin(an)*200,t:0,hit:new Set(),pierce:0,life:.5,r:4,dk:'knife',dmg:(4+2*lv)*M,ally:1})}}
  if(A.ai==='shoot'&&a.t>1.5){const t=tgt(130);if(t){a.t=0;const an=Math.atan2(t.y-a.y,t.x-a.x);R.shots.push({k:'proj',x:a.x,y:a.y,vx:Math.cos(an)*220,vy:Math.sin(an)*220,t:0,hit:new Set(),pierce:0,life:.9,r:5,dk:'orb',col:'#e8f6ff',dmg:(6+2*lv)*M,ally:1,stun:.6})}}
  if(A.ai==='fire'&&a.t>1.2){const t=tgt(140);if(t){a.t=0;const an=Math.atan2(t.y-a.y,t.x-a.x);R.shots.push({k:'fire',x:a.x,y:a.y,vx:Math.cos(an)*200,vy:Math.sin(an)*200,t:0,dmg:(8+3*lv)*M,r:16*gm})}}
  if(A.ai==='aura'&&a.t>1){a.t=0;const r=26*gm;ringFx(a.x,a.y,r,'120,60,160',.25);let n=0;for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r){if(hurtEnemy(e,(4+2*lv)*M,'aau',.5,a))n++}if(n)heal(Math.min(3,n)*R.F.allyHeal,true)}}}
function evoFx(a){const fx=ALLY_EVO[a.k][1],lv=a.lv,M=R.F.ally*allyMul(a),near=r=>R.en.filter(e=>!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<r+e.T.r);
 if(fx==='heal'){heal((5+lv)*R.F.allyHeal);ringFx(R.x,R.y,20,'111,227,181',.4)}
 if(fx==='drain'){ringFx(a.x,a.y,35,'120,60,160',.3);let n=0;near(35).forEach(e=>{if(hurtEnemy(e,(8+2*lv)*M,'evd',.5,a))n++});heal(Math.min(8,n*2)*R.F.allyHeal,true)}
 if(fx==='sleep'){ringFx(a.x,a.y,50,'190,140,255',.4);near(50).forEach(e=>{if(!e.T.boss)e.sleep=Math.max(e.sleep||0,2)})}
 if(fx==='thunder')shuffle(inViewEn()).slice(0,4).forEach(e=>{R.shots.push({k:'bolt',x:e.x,y:e.y,t:0,life:.2});hurtEnemy(e,(12+3*lv)*M,null,0,a)});
 if(fx==='nova'){ringFx(a.x,a.y,45,'255,200,120',.35);near(45).forEach(e=>hurtEnemy(e,(10+3*lv)*M,'evn',.3,a))}
 if(fx==='frost'){ringFx(a.x,a.y,50,'160,220,255',.4);near(50).forEach(e=>stun(e,1))}
 if(fx==='poison'){ringFx(a.x,a.y,50,'155,227,111',.4);near(50).forEach(e=>e.psn=4)}
 if(fx==='fire')for(let i=0;i<3;i++)R.tq.push({at:R.t+i*.15,f:()=>{const c=inViewEn();if(c.length){const e=pick(c);meteor(e.x,e.y,24,(15+4*lv)*M)}}})}
function comboFire(c,A,B){SV.comboBook=SV.comboBook||{};const key=comboKey(c),isNew=!SV.comboBook[key];SV.comboBook[key]=1;if(isNew)save();R.comboN=(R.comboN||0)+1;
 banner(c[2]+'！',allyName(c[0])+' ＋ '+allyName(c[1])+(isNew?'　新しい 合体技！':''));R.flash=R.t;hitStop(.12);shake(8);sfx.hira();
 const X=(1+.1*(A.lv+B.lv))*R.F.ally*Math.sqrt(allyMul(A)*allyMul(B)),v=inViewEn(),cx=(A.x+B.x)/2,cy=(A.y+B.y)/2,area=(x,y,r,d,f)=>{ringFx(x,y,r,'255,107,87',.4);for(const e of R.en)if(!e.dead&&Math.hypot(e.x-x,e.y-y)<r+e.T.r){hurtEnemy(e,d,null,0,{x,y,lv:1,k:'ally'});f&&f(e)}};
 const n=c[2];
 if(n==='スライムタワー'){area(R.x,R.y,90,40*X,e=>{e.air=R.t});heal(R.max*.2)}
 if(n==='コウモリの嵐')for(let i=0;i<6;i++)R.tq.push({at:R.t+i*.5,f:()=>area(R.x,R.y,60,12*X)});
 if(n==='森の怒り')v.forEach(e=>{stun(e,3);hurtEnemy(e,20*X,null,0)});
 if(n==='群狼の牙')shuffle(v).slice(0,12).forEach((e,i)=>R.tq.push({at:R.t+i*.05,f:()=>{if(!e.dead){R.shots.push({k:'swipe',a:rnd()*6.28,r:14,t:0,life:.15,ox:e.x,oy:e.y});hurtEnemy(e,50*X,null,0)}}}));
 if(n==='死霊騎士団')for(let i=0;i<4;i++){addAlly('skull',R.t+10);const s2=R.allies[R.allies.length-1];s2.lv=Math.max(A.lv,B.lv);s2.a=i/4*6.283}
 if(n==='冥界の門')v.forEach(e=>{hurtEnemy(e,60*X,null,0);e.curse=R.t+6;e.cmul=.5});
 if(n==='砂嵐'){v.forEach(e=>{const dx=cx-e.x,dy=cy-e.y,l=Math.hypot(dx,dy)||1;e.vx=dx/l*260/(e.T.m||1);e.vy=dy/l*260/(e.T.m||1)});R.tq.push({at:R.t+.5,f:()=>area(cx,cy,70,40*X)})}
 if(n==='大地割り'){shake(14);area(R.x,R.y,120,80*X,e=>{e.air=R.t})}
 if(n==='大吹雪')v.forEach(e=>{stun(e,2.5);hurtEnemy(e,30*X,null,0)});
 if(n==='地獄の業火')for(let i=0;i<8;i++)R.tq.push({at:R.t+i*.1,f:()=>{const e=pick(inViewEn());if(e)area(e.x,e.y,40,70*X)}});
 if(n==='砂漠の死神')v.forEach(e=>{e.psn=8;hurtEnemy(e,40*X,null,0)});
 if(n==='魔王スライム'){const e=pick(v)||{x:R.x,y:R.y-40};R.tq.push({at:R.t+.4,f:()=>{meteor(e.x,e.y,100,150*X);shake(14)}})}}
function comboTick(){if(R.t<10)return;R.comboCD=R.comboCD||{};const own=R.allies.filter(a=>!a.until);
 for(const c of ALLY_COMBO){const A=own.find(a=>a.k===c[0]),B=own.find(a=>a.k===c[1]);if(!A||!B)continue;const key=comboKey(c);if(R.t<(R.comboCD[key]||0))continue;R.comboCD[key]=R.t+20;comboFire(c,A,B);break}}
function allyTick(dt){R.allies=R.allies.filter(a=>!a.until||R.t<a.until);comboTick();for(const a of R.allies){a.t+=dt;if(a.evo){a.et+=dt;if(a.et>=6){a.et=0;evoFx(a)}}if(ALLY[a.k]&&ALLY[a.k].ai){allyAI(a,dt);continue}
  if(a.k==='slime'){const dx=R.x-12*R.face-a.x+(a.ox||0),dy=R.y+6-a.y+(a.oy||0),l=Math.hypot(dx,dy);if(l>4){const v=Math.min(l*3,60)*R.F.allySpd;a.x+=dx/l*v*dt;a.y+=dy/l*v*dt}
   if(a.t>6){a.t=0;heal((4+2*a.lv)*R.F.slimeHeal*R.F.allyHeal*allyMul(a))}
   const gm=R.t<(R.giantT||0)?3:1;for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<e.T.r+5*gm)hurtEnemy(e,(3+a.lv)*R.F.ally*allyMul(a)*(R.t<R.boostT?3:1)*(gm>1?2:1),'as',.5,a)}
  if(a.k==='bat'){a.a+=dt*3.2*R.F.allySpd;const r=22+a.lv,gm=R.t<(R.giantT||0)?3:1;a.x=R.x+Math.cos(a.a)*r;a.y=R.y+Math.sin(a.a)*r*.8;for(const e of R.en)if(!e.dead&&Math.hypot(e.x-a.x,e.y-a.y)<e.T.r+5*gm)hurtEnemy(e,(6+3*a.lv)*R.F.ally*allyMul(a)*(R.t<R.boostT?3:1)*(gm>1?2:1),'ab',.4,a)}}}

