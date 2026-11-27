/* ---------- 疑似3D：投影 ---------- */
let TILT=.0019;const TILTS=[[0,'なし'],[.001,'弱め'],[.0019,'ふつう'],[.0026,'強め']];function applyTilt(){TILT=SV.opt.tilt??.0019};applyTilt();let ANC=240,camX=0,camY=0;
const pz=dy=>1/(1-TILT*Math.min(dy,TILT>0?Math.min(400,.75/TILT):400));
function P(wx,wy){const dy=wy-camY,p=pz(dy);return[VW/2+(wx-camX)*p,ANC+dy*p,p]}
const dyTop=()=>{const s=-ANC;return s/(1+TILT*s)},dyBot=()=>{const s=VH-ANC;return s/(1+TILT*s)},halfW=dy=>(VW/2)*(1-TILT*dy);
function inView(o,m){const dy=o.y-R.y,dx=o.x-R.x;m=m||0;return dy>dyTop()-m&&dy<dyBot()+m&&Math.abs(dx)<halfW(dy)+m}
/* 地面のテクスチャ（512×512を横に2枚） */
const THEME={
 grass:{sh:['#55ad53','#5ab558','#5fba5c','#64c061','#50a64f'],path:['#b8955a','#d2b479','#9c7a45'],pebble:['#a08a6a','#c8b89a'],tuft:['#3f8f3f','#4a9c48'],fl:['#ffffff','#ffd34e','#ff9ac8','#bfe3ff'],nf:220,haze:'215,238,255',deco:[['tree',.06],['rock',.04],['bush',.06]]},
 forest:{sh:['#2f7a3a','#33823e','#3a8a44','#2a7034','#3f9147'],path:['#6e5232','#8a6a42','#4e3a24'],pebble:['#5a4632','#7a6448'],tuft:['#1f5527','#286a31'],fl:['#ffffff','#f4e2b8','#ff7a6a'],nf:90,haze:'190,225,190',deco:[['tree',.13],['pine',.05],['bush',.08]]},
 cave:{sh:['#4a4038','#52473e','#5a4e44','#443a33','#3d342e'],path:['#3a312b','#2f2823','#2a231f'],pebble:['#6b5e52','#857668'],tuft:['#3a312b','#61554a'],fl:['#7fe0ff','#b48aff'],nf:70,haze:'20,15,10',dark:1,deco:[['rock',.08],['crystal',.05],['stalag',.06]]},
 desert:{sh:['#e2c486','#e8cb8d','#dcbd7d','#efd398','#d6b574'],path:['#c8a76a','#b8955a','#a08048'],pebble:['#b89a68','#f4dfae'],tuft:['#c9a86a','#d8b878'],fl:['#ffffff','#c9a86a'],nf:60,haze:'255,236,200',deco:[['cactusD',.06],['rock',.05],['deadtree',.02]]},
 snow:{sh:['#eef4fa','#e6eef6','#f6f9fc','#dde7f1','#e9f0f7'],path:['#b9d4ea','#cfe2f2','#9cbcd6'],pebble:['#a9bccf','#ffffff'],tuft:['#c8d6e4','#d6e2ee'],fl:['#8fd0ff','#ffffff'],nf:80,haze:'240,248,255',deco:[['pine',.1],['rockS',.05]]},
 demon:{sh:['#3a1f3f','#43244a','#4b2852','#341b39','#522c59'],path:['#8a2a2a','#c0442c','#5a1a1a'],pebble:['#6a3a6a','#8a5a8a'],tuft:['#2a1530','#5a2a60'],fl:['#ff5a4e','#ffb04e'],nf:160,haze:'70,10,50',dark:1,deco:[['deadtree',.07],['crystalR',.05],['rockD',.05]]}
};
const GROUNDS={};
function groundFor(th){if(GROUNDS[th])return GROUNDS[th];const T=THEME[th],N=512,c=document.createElement('canvas');c.width=N*2;c.height=N;const x=c.getContext('2d');
 for(let i=0;i<N;i+=4)for(let j=0;j<N;j+=4){const lf=Math.sin(i/N*Math.PI*4)*Math.cos(j/N*Math.PI*2)+Math.sin((i+j)/N*Math.PI*6)*.6;let k=Math.floor((lf+1.6)/3.2*5+rnd()*1.3-.6);k=Math.max(0,Math.min(4,k));x.fillStyle=T.sh[k];x.fillRect(i,j,4,4)}
 const py=i=>Math.round(300+Math.sin(i/N*Math.PI*2)*40+Math.sin(i/N*Math.PI*6)*10);
 for(let i=0;i<N;i++){const y=py(i);x.fillStyle=T.path[0];x.fillRect(i,y-11,1,22);x.fillStyle=T.path[1];x.fillRect(i,y-9,1,18);x.fillStyle=T.path[2];x.fillRect(i,y+10,1,2)}
 for(let k=0;k<70;k++){const i=Math.floor(rnd()*N),y=py(i)+Math.floor(rnd()*14-7);x.fillStyle=T.pebble[0];x.fillRect(i,y,3,2);x.fillStyle=T.pebble[1];x.fillRect(i,y,2,1)}
 for(let k=0;k<1400;k++){const i=Math.floor(rnd()*N),j=Math.floor(rnd()*N);x.fillStyle=rnd()<.5?T.tuft[0]:T.tuft[1];x.fillRect(i,j,1,2);x.fillRect(i+2,j,1,2);x.fillRect(i+1,j+1,1,2)}
 for(let k=0;k<T.nf;k++){const i=Math.floor(rnd()*N),j=Math.floor(rnd()*N);x.fillStyle=pick(T.fl);x.fillRect(i,j,2,2)}
 x.drawImage(c,0,0,N,N,N,0,N,N);return GROUNDS[th]=c}
const curTheme=()=>R&&STAGES[R.st]?STAGES[R.st].th:'grass';
/* 飾り（木・岩・草むら） */
function mk(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');f(x);return c}
const DECO={
 tent:mk(32,22,x=>{for(let r=0;r<20;r++){const w=Math.round(r*1.5)+2;x.fillStyle=r%6<3?'#ff6b57':'#f7fcfa';x.fillRect(16-w/2,r+1,w,1)}x.fillStyle='#163c45';x.fillRect(14,9,4,12);x.fillStyle='#d9483a';x.fillRect(15,0,2,2)}),
 tree:mk(18,26,x=>{x.fillStyle='#6a4424';x.fillRect(7,16,4,10);x.fillStyle='#8a5a30';x.fillRect(8,16,1,10);
  const blob=(cx,cy,r,col)=>{x.fillStyle=col;for(let i=-r;i<=r;i++)for(let j=-r;j<=r;j++)if(i*i+j*j<=r*r)x.fillRect(cx+i,cy+j,1,1)};
  blob(9,10,8,'#2e7a34');blob(8,9,7,'#3a9142');blob(7,7,4,'#4fae55');blob(6,6,2,'#7fd17f')}),
 pine:mk(16,26,x=>{x.fillStyle='#5a3a22';x.fillRect(7,20,2,6);for(let r=0;r<20;r++){const w=Math.round(2+(r%7)*1.6+r*.25);x.fillStyle=r%7<2?'#ffffff':'#2a6b3a';x.fillRect(8-w/2,r,w,1)}}),
 crystal:mk(12,16,x=>{x.fillStyle='#3a8ab8';x.fillRect(4,3,4,13);x.fillRect(1,8,3,8);x.fillRect(8,6,3,10);x.fillStyle='#7fe0ff';x.fillRect(5,4,1,10);x.fillRect(9,7,1,7);x.fillStyle='#ffffff';x.fillRect(5,4,1,2)}),
 crystalR:mk(12,16,x=>{x.fillStyle='#8a1a3a';x.fillRect(4,3,4,13);x.fillRect(1,8,3,8);x.fillRect(8,6,3,10);x.fillStyle='#ff5a7a';x.fillRect(5,4,1,10);x.fillRect(9,7,1,7);x.fillStyle='#ffd0d8';x.fillRect(5,4,1,2)}),
 stalag:mk(10,18,x=>{for(let r=0;r<18;r++){const w=Math.max(1,Math.round(r/2.2));x.fillStyle=r<4?'#8a7a6a':'#6b5e52';x.fillRect(5-w/2,r,w,1)}x.fillStyle='#a89888';x.fillRect(4,6,1,8)}),
 deadtree:mk(16,24,x=>{x.fillStyle='#3a2a2a';x.fillRect(7,8,3,16);x.fillRect(3,6,1,6);x.fillRect(3,11,4,1);x.fillRect(12,4,1,7);x.fillRect(10,10,3,1);x.fillRect(5,2,1,6);x.fillRect(10,1,1,5);x.fillStyle='#5a4040';x.fillRect(8,8,1,16)}),
 cactusD:mk(14,20,x=>{x.fillStyle='#3f8f45';x.fillRect(5,2,4,18);x.fillRect(1,7,2,7);x.fillRect(1,12,4,2);x.fillRect(11,5,2,7);x.fillRect(9,10,4,2);x.fillStyle='#62bf66';x.fillRect(6,3,1,16);x.fillStyle='#ff7ab8';x.fillRect(6,1,2,1)}),
 rockS:mk(12,9,x=>{x.fillStyle='#7a8aa0';x.fillRect(1,3,10,6);x.fillRect(2,1,8,8);x.fillStyle='#ffffff';x.fillRect(2,1,8,3);x.fillStyle='#55657a';x.fillRect(1,8,10,1)}),
 rockD:mk(12,9,x=>{x.fillStyle='#3a2a40';x.fillRect(1,3,10,6);x.fillRect(2,1,8,8);x.fillStyle='#6a4a7a';x.fillRect(3,2,5,3);x.fillStyle='#ff5a4e';x.fillRect(6,6,2,1);x.fillStyle='#1a1020';x.fillRect(1,8,10,1)}),
 rock:mk(12,9,x=>{x.fillStyle='#6b7280';x.fillRect(1,3,10,6);x.fillRect(2,1,8,8);x.fillStyle='#9aa1ad';x.fillRect(3,2,5,3);x.fillStyle='#c5cbd4';x.fillRect(3,2,2,1);x.fillStyle='#4b505a';x.fillRect(1,8,10,1)}),
 bush:mk(14,9,x=>{const b=(cx,cy,r,c)=>{x.fillStyle=c;for(let i=-r;i<=r;i++)for(let j=-r;j<=r;j++)if(i*i+j*j<=r*r)x.fillRect(cx+i,cy+j,1,1)};b(4,5,4,'#2f7d35');b(9,5,4,'#2f7d35');b(7,4,4,'#3f9a45');b(6,3,2,'#62bf66');x.fillStyle='#ff5a6a';x.fillRect(3,5,1,1);x.fillRect(10,4,1,1)})
};
function decoAt(cx,cy){const h=hash(cx*7+3,cy*13+1),D=THEME[curTheme()].deco;let acc=0,k=null;for(const[n,f]of D){acc+=f;if(h<acc){k=n;break}}if(!k)return null;const h2=hash(cx+91,cy+17);return{k,x:cx*44+8+h2*28,y:cy*44+8+hash(cx+5,cy+77)*28}}
function drawAura(x,y,p,t){const lv=auraLv();if(!lv||SV.opt.aura===false)return;const cy=y-6*p,pl=.5+.5*Math.sin(t*3),r=(lv>2?16:lv>1?13:10)*p*(1+.08*pl);
 g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,cy,1,x,cy,r);const hu=Math.floor(t*90)%360;gr.addColorStop(0,lv>2?'hsla('+hu+',100%,75%,.6)':lv>1?'rgba(255,220,120,.55)':'rgba(190,140,255,.45)');gr.addColorStop(.6,lv>2?'hsla('+((hu+120)%360)+',100%,65%,.3)':lv>1?'rgba(200,120,255,.28)':'rgba(140,90,255,.2)');gr.addColorStop(1,'rgba(120,60,255,0)');g.fillStyle=gr;g.beginPath();g.arc(x,cy,r,0,7);g.fill();
 const n=lv>1?10:6;for(let i=0;i<n;i++){const ph=(t*.9+i/n)%1,a=i*2.4+t*.7,rr=(5+3*Math.sin(i*1.7))*p;g.fillStyle=lv>2?'hsla('+((hu+i*36)%360)+',100%,75%,'+(1-ph)+')':lv>1&&i%2?'rgba(255,230,140,'+(1-ph)+')':'rgba(210,170,255,'+(1-ph)+')';g.fillRect(Math.round(x+Math.cos(a)*rr),Math.round(cy+6*p-ph*16*p),1,lv>1?2:1)}
 g.restore()}
function shadow(x,y,w,p){if(QL()==='low')return;g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(x,y,w*p/2,w*p/5,0,0,7);g.fill()}
const ringCache={};function ringSpr(rx,ry,i){rx=Math.round(rx*2)/2;ry=Math.round(ry*2)/2;const k=rx+'|'+ry+'|'+i;if(ringCache[k])return ringCache[k];const ex=i?3:0,W=Math.ceil((rx+ex)*2+4),H=Math.ceil((ry+ex)*2+4),c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d'),cx=W/2,cy=H/2;
 if(i===0){x.lineWidth=1.2;x.strokeStyle='rgba(240,60,60,.75)';x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.stroke()}else{x.lineWidth=i===2?2:1.6;x.strokeStyle=i===2?'rgba(255,60,50,.95)':'rgba(255,140,40,.9)';if(i===1)x.setLineDash([3,2]);x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.stroke();x.beginPath();x.ellipse(cx,cy,rx+2.5,ry+1.2,0,0,7);x.stroke()}
 return ringCache[k]=c}
const flipCache={};function sprF(key,pal){const k=key+pal;if(flipCache[k])return flipCache[k];const c0=spr(key,pal),c=document.createElement('canvas');c.width=c0.width;c.height=c0.height;const x=c.getContext('2d');x.translate(c.width,0);x.scale(-1,1);x.drawImage(c0,0,0);return flipCache[k]=c}
function drawSpr(key,pal,x,y,sc,flip,sx,sy){const w=12*sc*(sx||1),h=12*sc*(sy||1),X=Math.round(x),a=Math.round(-w/2),W=Math.round(w),H=Math.round(h);if(flip)g.drawImage(sprF(key,pal),X-a-W,Math.round(y)+Math.round(-h),W,H);else g.drawImage(spr(key,pal),X+a,Math.round(y)+Math.round(-h),W,H)}
const CAMP={hero:0,fire:0,tent:0,al:{},bub:[],parts:[],last:0};
const CAMP_POS=[[28,12],[-6,18],[14,22],[-36,14],[52,8],[-16,28],[4,32],[38,26],[-48,26],[66,20]];
const campAllies=()=>SV.party.filter(k=>SV.allies[k]&&ALLY[k]).slice(0,allySlots());
const ALLY_SAY={slime:['ぷるるん！','なでて〜'],bat:['キキッ！','夜は まかせて'],mush:['ふわぁ…','胞子 とんでる？'],wolf:['ワオーン！','においで わかるぞ'],skull:['カタカタ','ホネが うずく…'],ghost:['ひゅ〜','こわく ないよ〜'],cactus:['チクッ','水… ほしい'],scorpion:['シャキーン','しっぽ 自慢！'],snowman:['ひんやり〜','火は 苦手…'],icebat:['キーン！','涼しい でしょ'],imp:['ケケッ','いたずら したい'],darkskull:['…カタ','闇は 落ちつく'],
 slimeR:['ぷるっ！','赤い のが 強いの'],trent:['ザワザワ','根っこ 休め中'],golemS:['ゴゴゴ','守る… 守る…'],scorpionB:['シャーッ','毒は 控えめに する'],yeti:['ウホッ！','雪が 恋しい'],maknight:['御意','剣を 磨いて おこう'],
 king:['ぷるぷる〜ん！','余は 王で あるぞ'],forestlord:['森は 静かだ…','火の 粉に 気を つけよ'],golem:['ゴォン','この 身は 盾'],giant:['ズシン！','砂の 音が する'],fenrir:['ウォォン！','月が 見たい'],demon:['フハハハ！','たまには 休息も よい']};
const HERO_SAY=['よし、行くぞ！','ピコーン！','今日も がんばろう','次は どこへ 行こう','強く なったかな？','ふぁ〜…'];
function campBub(x,y,t,c){CAMP.bub.push({x,y,t,c:c||'#fff',at:performance.now()/1000});if(CAMP.bub.length>6)CAMP.bub.shift()}
function campSpark(x,y,c,n,up){for(let i=0;i<n;i++){const a=rnd()*6.28,v=20+rnd()*50;CAMP.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.5-(up||0)*(30+rnd()*40),t:0,life:.6+rnd()*.5,c})}}
function campTap(cx,cy){const T=performance.now()/1000;initAudio();const hit=(wx,wy,w,h)=>{const[x,y,p]=P(wx,wy);return Math.abs(cx-x)<w*p&&cy<y+4*p&&cy>y-h*p};
 const al=campAllies();for(let i=0;i<al.length;i++){const[wx,wy]=CAMP_POS[i],k=al[i],sc=ALLY[k].sc||1;if(hit(wx,wy,8*sc,14*sc+(ALLY[k].fly?10:0))){CAMP.al[k]=T;const sy=ALLY_SAY[k]||['♪','♪'];CAMP.n=CAMP.n||{};CAMP.n[k]=(CAMP.n[k]||0)+1;campBub(wx,wy-16*sc,sy[(CAMP.n[k]+(rnd()<.3?1:0))%2],'#ffe14a');campSpark(wx,wy-10,'#ff8ac0',6,1);tone('square',660+rnd()*300,.08,.07);tone('square',990,.1,.06,0,.1);return}}
 if(SV.cos)for(const k in SV.cos.deco){if(!SV.cos.deco[k]||!DECO_SHOP[k])continue;const[wx,wy]=DECO_SHOP[k][2];if(hit(wx,wy,9,k==='statue'?24:20)){CAMP.dec=CAMP.dec||{};CAMP.dec[k]=T;campBub(wx,wy-26,DECO_SHOP[k][3],'#c8f0ff');campSpark(wx,wy-12,k==='chest'?'#ffd34e':k==='statue'?'#ffe14a':'#ffffff',k==='statue'?16:6,1);if(k==='statue')sfx.hira();else tone('square',520+rnd()*400,.08,.06);return}}
 if(hit(-18,4,8,16)){CAMP.hero=T;campBub(-18,-14,pick(HERO_SAY));sfx.lv();return}
 if(hit(8,4,10,18)){CAMP.fire=T;campSpark(8,0,'#ffd34e',18,1);campSpark(8,0,'#ff7a2a',12,1);campBub(8,-20,'パチパチッ','#ffd34e');for(let i=0;i<4;i++)tone('square',200+rnd()*500,.04,.05,0,i*.06);return}
 if(hit(40,-14,22,34)){CAMP.tent=T;campBub(40,-50,pick(['Zzz…','ひと休み 中','テントは あったかい']),'#9ae6ff');tone('triangle',330,.25,.08,220);return}}
function draw(){tg.clearRect(0,0,tx.width,tx.height);ANC=Math.round(VH*.6);const TH=THEME[curTheme()],GRD=groundFor(curTheme());
 const sk=R&&R.shk?R.shk:0;camX=(R?R.x:0)+(sk?(rnd()-.5)*sk*2:0);camY=(R?R.y:0)+(sk?(rnd()-.5)*sk*2:0);
 // 地面
 for(let y=0;y<VH;y++){const s=y-ANC+.5,dy=s/(1+TILT*s),p=pz(dy),wy=camY+dy,hw=(VW/2)/p,ty=((Math.floor(wy)%512)+512)%512,tx0=(((camX-hw)%512)+512)%512;g.drawImage(GRD,tx0,ty,hw*2,1,0,y,VW,1)}
 // 奥のかすみ
 const fg=g.createLinearGradient(0,0,0,ANC*.75);fg.addColorStop(0,'rgba('+TH.haze+','+(TH.dark?.9:.75)+')');fg.addColorStop(.35,'rgba('+TH.haze+',.3)');fg.addColorStop(1,'rgba('+TH.haze+',0)');g.fillStyle=fg;g.fillRect(0,0,VW,ANC*.75);
 const L=[];const t0=dyTop()-40,b0=dyBot()+30;
 for(let cy=Math.floor((camY+t0)/44);cy<=Math.floor((camY+b0)/44);cy++){const hw=halfW(cy*44-camY)+30;for(let cx=Math.floor((camX-hw)/44);cx<=Math.floor((camX+hw)/44);cx++){const d=decoAt(cx,cy);if(d&&(R||Math.hypot(d.x,d.y)>70))L.push({y:d.y,d})}}
 if(!R){const T=performance.now()/1000,cdt=Math.min(.05,T-(CAMP.last||T));CAMP.last=T;L.push({y:-14,tent:1},{y:4,fire:1},{y:4,hero:1});campAllies().forEach((k,i)=>L.push({y:CAMP_POS[i][1],cal:k,i}));if(SV.cos)for(const k in SV.cos.deco)if(SV.cos.deco[k]&&DECO_SHOP[k])L.push({y:DECO_SHOP[k][2][1],dec:k});
  for(const o of L.sort((a,b)=>a.y-b.y)){
   if(o.d){const[x,y,p]=P(o.d.x,o.d.y);const im=DECO[o.d.k];shadow(x,y,im.width*.8,p);g.drawImage(im,Math.round(x-im.width*p/2),Math.round(y-im.height*p),Math.round(im.width*p),Math.round(im.height*p))}
   else if(o.dec){const k=o.dec,[wx,wy]=DECO_SHOP[k][2],[x,y,p]=P(wx,wy),da=T-((CAMP.dec||{})[k]||-9),j=da<.5?Math.sin(da*30)*1.5*(1-da/.5):0,R2=(dx,dy,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x+(dx+j)*p),Math.round(y+dy*p),Math.max(1,Math.round(w*p)),Math.max(1,Math.round(h*p)))};shadow(x,y,10,p);
    if(k==='flag'){R2(-.5,-22,1.5,22,'#6a4424');const wv=Math.sin(T*4)*1.5;R2(1,-22,8,2,'#ff6b57');R2(1,-20,7+wv*.5,2,'#ff6b57');R2(1,-18,5+wv*.5,2,'#ff6b57')}
    if(k==='chest'){R2(-6,-7,12,7,'#8d5a2b');R2(-6,-8,12,2,'#a87a45');R2(-6,-5,12,1,'#ffd34e');R2(-1,-6,2,2,'#ffe14a')}
    if(k==='scare'){R2(-.5,-20,1.5,20,'#8d6e63');R2(-6,-15,12,1.5,'#8d6e63');R2(-3,-23,6,4,'#ffd2a8');R2(-4,-25,8,2,'#d9b25a');R2(-3,-15,6,7,'#4f8a3a')}
    if(k==='flower'){for(let i=0;i<6;i++){const fx=-7+i*2.6,fy=-2-(i%2)*2;R2(fx,fy,1,2,'#3f9a45');R2(fx-.5,fy-1.5,2,2,['#ff8ac0','#ffe14a','#ff6b57','#9ae6ff'][i%4])}}
    if(k==='lantern'){R2(-.5,-18,1.5,18,'#3a3a3a');R2(-2.5,-21,5,5,'#3a3a3a');const gl=.6+.4*Math.sin(T*3);g.globalAlpha=gl;R2(-1.5,-20,3,3,'#ffe14a');g.globalAlpha=.15*gl;g.fillStyle='#ffe14a';g.beginPath();g.ellipse(x,y-18*p,10*p,8*p,0,0,7);g.fill();g.globalAlpha=1}
    if(k==='sign'){R2(-.5,-10,1.5,10,'#6a4424');R2(-7,-16,14,7,'#a87a45');R2(-5,-14,10,1,'#6a4424');R2(-5,-12,7,1,'#6a4424')}
    if(k==='statue'){R2(-6,-5,12,5,'#9aa5ad');R2(-4,-16,8,11,'#cfd6dd');R2(-3,-22,6,6,'#ffe14a');R2(-1,-21,2,3,'#fff');R2(-1,-17,2,1,'#fff')}}
   else if(o.tent){const[x0,y,p]=P(40,-14),im=DECO.tent,ta=T-CAMP.tent,x=x0+(ta<.6?Math.sin(ta*40)*2*(1-ta/.6):0);shadow(x0,y,30,p);g.drawImage(im,Math.round(x-im.width*p/2),Math.round(y-im.height*p),Math.round(im.width*p),Math.round(im.height*p))}
   else if(o.fire){const[x,y,p]=P(8,4);g.fillStyle='rgba(255,180,80,.18)';g.beginPath();g.ellipse(x,y,26*p,12*p,0,0,7);g.fill();g.fillStyle='#6a4424';g.fillRect(x-6*p,y-2*p,12*p,3*p);const fa=T-CAMP.fire,fl=fa<1.4?1+1.4*(1-fa/1.4):1;if(Math.floor(T*20)%3===0)campSpark(8,1,'#ffd34e',1,1);for(let i=0;i<5;i++){const h=(6+Math.sin(T*9+i*1.7)*3)*p*fl,fx=x+(i-2)*2*p;g.fillStyle=i%2?fireCols()[0]:fireCols()[1];g.fillRect(Math.round(fx-p),Math.round(y-2*p-h),Math.max(2,Math.round(2*p)),Math.round(h))}}
   else if(o.hero){const[x,y,p]=P(-18,4),ha=T-CAMP.hero,jz=ha<.5?Math.sin(ha/.5*Math.PI)*12*p:0;shadow(x,y+5*p,10,p);drawAura(x,y+6*p-jz,p,T);drawSpr('hero',heroPal(),x,y+6*p-jz+(Math.sin(T*3)>.6?-1:0),p,false)}
   else if(o.cal){const k=o.cal,[wx,wy]=CAMP_POS[o.i],[x,y,p]=P(wx,wy),A=ALLY[k],sc=(A.sc||1)*(SV.allies[k].evo?1.15:1),aa=T-(CAMP.al[k]||-9),hop=aa<.7?Math.abs(Math.sin(aa/.35*Math.PI))*8*p:0,fly=A.fly?(8+Math.sin(T*4+o.i)*2)*p:0,bob=A.fly?0:Math.sin(T*2.5+o.i*1.7)>.8?-1:0;
    shadow(x,y+5*p,9*sc,p);drawSpr(A.sp,allyPal(k),x,y+6*p-hop-fly+bob,p*sc,wx>8)}}
  for(const q of CAMP.parts){q.t+=cdt;q.x+=q.vx*cdt;q.y+=q.vy*cdt;q.vy+=40*cdt}CAMP.parts=CAMP.parts.filter(q=>q.t<q.life);if(CAMP.parts.length>120)CAMP.parts.splice(0,CAMP.parts.length-120);
  for(const q of CAMP.parts){const[x,y]=P(q.x,q.y);g.globalAlpha=1-q.t/q.life;g.fillStyle=q.c;g.fillRect(Math.round(x),Math.round(y-6),2,2)}g.globalAlpha=1;
  CAMP.bub=CAMP.bub.filter(b=>T-b.at<1.6);for(const b of CAMP.bub){const a=T-b.at,[x,y]=P(b.x,b.y);txt(b.t,x,y-a*6,b.c,8,a<.12?1+(1-a/.12)*.6:1)}
  return}
 // 地面に落ちているもの
 for(const q of R.gems){if(!inView(q,10))continue;const[x,y,p]=P(q.x,q.y),s=Math.max(1,Math.round(p));
  if(q.k==='gem'){const big=q.v>=40?2:q.v>=10?1:0,c=['#5fd8ff','#ff7ad9','#fff36a'][big],z=Math.max(2,Math.round((3+big)*p)),bo=Math.round(Math.sin(R.t*6+q.x*.7)*1.5*p),cx=Math.round(x),cy=Math.round(y-z-3*p)+bo;
   g.fillStyle='rgba(0,0,0,.25)';g.fillRect(cx-z+1,Math.round(y)-1,2*z-2,2);
   g.fillStyle='#163c45';g.beginPath();g.moveTo(cx,cy-z-1);g.lineTo(cx+z+1,cy);g.lineTo(cx,cy+z+1);g.lineTo(cx-z-1,cy);g.fill();
   g.fillStyle=c;g.beginPath();g.moveTo(cx,cy-z);g.lineTo(cx+z,cy);g.lineTo(cx,cy+z);g.lineTo(cx-z,cy);g.fill();
   g.fillStyle='#fff';g.fillRect(cx-Math.ceil(z/2),cy-Math.ceil(z/2),Math.max(1,Math.round(z/2)),Math.max(1,Math.round(z/2)));
   if(big&&Math.floor(R.t*5+q.x)%3===0){g.fillRect(cx+z,cy-z-1,1,3);g.fillRect(cx+z-1,cy-z,3,1)}}
  else if(q.k==='coin'){g.fillStyle='#ffd34e';g.fillRect(x-2*s,y-4*s,4*s,4*s)}
  else if(q.k==='meat'){g.fillStyle='#c0603a';g.fillRect(x-3*s,y-4*s,6*s,4*s);g.fillStyle='#fff';g.fillRect(x+3*s,y-3*s,2*s,2*s)}
  else if(q.k==='item'||q.k==='card'||q.k==='chest'){if(q.k==='item'&&q.item._b==null)q.item._b=!q.item.a&&statScore(q.item)>statScore(eqOf(q.item.slot))?1:0;const col=q.k==='item'?(q.item.shiny?'hsl('+Math.floor(R.t*240%360)+',100%,75%)':RAR[q.item.r].f):q.k==='card'?(ETYPE[q.card].boss?'#ff8ae6':ETYPE[q.card].elite?'#7fb0ff':'#ffe14a'):'#ffd34e',hi=q.k==='item'?q.item.r+(q.item.shiny?3:0)+(q.item.lg?1:0):q.k==='card'?3:1,pu=.5+.5*Math.sin(R.t*5+q.x),bh=(26+hi*10)*p,b=Math.sin(R.t*5)*2*s;
   g.globalAlpha=.18+.14*pu;g.fillStyle=col;g.fillRect(Math.round(x-3*s),Math.round(y-bh),Math.round(6*s),Math.round(bh));g.globalAlpha=.35+.2*pu;g.fillRect(Math.round(x-s),Math.round(y-bh),Math.round(2*s),Math.round(bh));
   g.strokeStyle=col;g.lineWidth=1;g.globalAlpha=.6*pu;g.beginPath();g.ellipse(x,y,(8+3*pu)*p,(3+pu)*p,0,0,7);g.stroke();g.globalAlpha=1;shadow(x,y,9,p);
   if(q.k==='item'){const z=5*s;if(q.item._b||itWant(q.item))txt((q.item._b?'▲':'')+(itWant(q.item)?'★':''),x,y-17*s+b,q.item._b?'#6fe3b5':'#ffd34e',8);g.fillStyle='#163c45';g.fillRect(x-z-1,y-11*s+b-1,z*2+2,z*2+2);g.fillStyle=col;g.fillRect(x-z,y-11*s+b,z*2,z*2);g.fillStyle='#fff';g.fillRect(x-z+s,y-11*s+b+s,2*s,2*s);g.fillStyle='#163c45';g.fillRect(x-s,y-8*s+b,2*s,2*s)}
   else if(q.k==='card'){g.fillStyle='#163c45';g.fillRect(x-4*s-1,y-14*s+b-1,8*s+2,10*s+2);g.fillStyle=col;g.fillRect(x-4*s,y-14*s+b,8*s,10*s);g.fillStyle='#ff6b57';g.fillRect(x-s,y-11*s+b,2*s,3*s)}
   else drawSpr('chest','chest',x,y+2*p,p*1.3);
   if(Math.floor(R.t*4+q.x)%2){g.fillStyle='#fff';g.fillRect(x+5*s,y-15*s+b,2*s,2*s);g.fillRect(x-7*s,y-6*s+b,s,s)}}
  else if(q.k==='heart'){shadow(x,y,8,p);drawSpr('heart','heart',x,y-3*p+Math.sin(R.t*6)*2,p*1.3)}
  else if(q.k==='soul'){const b=Math.sin(R.t*5+q.x)*2*s,z=4*s;shadow(x,y,7,p);g.globalAlpha=.3;g.fillStyle='#c8a0ff';g.fillRect(Math.round(x-2*s),Math.round(y-36*p),Math.round(4*s),Math.round(36*p));g.globalAlpha=1;g.fillStyle='#163c45';g.fillRect(x-z-1,y-12*s+b-1,2*z+2,2*z+2);g.fillStyle='#c8a0ff';g.fillRect(x-z,y-12*s+b,2*z,2*z);g.fillStyle='#fff';g.fillRect(x-s,y-10*s+b,2*s,2*s);g.fillStyle='#8a5cc8';g.fillRect(x-z,y-12*s+b+2*z-2*s,2*z,2*s)}}
 for(const q of R.gems){if(!(q.k==='item'||q.k==='card'||q.k==='chest'||q.k==='heart'||q.k==='soul')||inView(q,-4))continue;const a=Math.atan2(q.y-R.y,q.x-R.x),ax=VW/2+Math.cos(a)*(VW/2-8),ay=Math.max(14,Math.min(VH-14,ANC-8+Math.sin(a)*VH*.42));
  const col=q.k==='item'?RAR[q.item.r].f:q.k==='heart'?'#ff6b8a':q.k==='soul'?'#c8a0ff':'#ffe14a',pu=Math.floor(R.t*4)%2;g.save();g.translate(ax,ay);g.rotate(a);g.fillStyle='#163c45';g.beginPath();g.moveTo(7,0);g.lineTo(-5,-6);g.lineTo(-5,6);g.fill();g.fillStyle=pu?'#fff':col;g.beginPath();g.moveTo(5,0);g.lineTo(-4,-4);g.lineTo(-4,4);g.fill();g.restore()}
 // 影
 for(const e of R.en)if(inView(e,20)){const[x,y,p]=P(e.x,e.y);shadow(x,y+5*p*(e.T.sc||1),10*(e.T.sc||1),p)}
 for(const e of R.en){if(e.charging>0){const[x,y,p]=P(e.x,e.y);g.fillStyle='rgba(255,60,60,'+(.22+.18*Math.sin(R.t*20))+')';g.beginPath();g.ellipse(x,y,80*p,80*p*.7,0,0,7);g.fill()}}
 for(const s of R.shots)if(s.k==='ring'){const[x,y,p]=P(s.x,s.y),a=1-s.t/s.life,r=s.r*(.6+.4*s.t/s.life)*p;g.strokeStyle='rgba('+s.c+','+a+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y,r,r*.7,0,0,7);g.stroke()}
 // 奥から順に描く
 if(SV.opt.foeRing!==false)for(const e of R.en){if(e.dead||!inView(e,24))continue;const[x,y,p]=P(e.x,e.y),s=12*(e.T.sc||1)*p,i=e.T.boss?2:e.T.elite?1:0,rx=Math.max(4,e.T.r*p*.9),ry=Math.max(1.6,e.T.r*p*.36),c=ringSpr(rx,ry,i);g.drawImage(c,Math.round(x)-c.width/2,Math.round(y+s/2-1)-c.height/2)}
 for(const e of R.en)if(inView(e,24))L.push({y:e.y,e});
 for(const c of R.corpses)if(inView(c,40))L.push({y:c.y,c});
 for(const a of R.allies)L.push({y:a.y,a});
 L.push({y:R.y,hero:1});
 L.sort((a,b)=>a.y-b.y);
 for(const o of L){
  if(o.d){const[x,y,p]=P(o.d.x,o.d.y),im=DECO[o.d.k],w=im.width*p,h=im.height*p;const near=o.d.k==='tree'&&o.d.y>R.y&&o.d.y-R.y<30&&Math.abs(o.d.x-R.x)<14;shadow(x,y,im.width*.8,p);if(near)g.globalAlpha=.45;g.drawImage(im,Math.round(x-w/2),Math.round(y-h),Math.round(w),Math.round(h));g.globalAlpha=1}
  else if(o.e){const e=o.e,[x,y,p]=P(e.x,e.y),sc=(e.T.sc||1)*p,s=12*sc;const wh=R.t-e.hitT<.07,air=e.air&&R.t-e.air<.5?Math.sin((R.t-e.air)/.5*Math.PI)*10*p:0,sq=R.t-(e.sq||-9),k2=sq<.12?Math.sin(sq/.12*Math.PI):0,bo=e.T.sp==='slime'?Math.sin(R.t*12+e.ph)*.08:0,fly=e.T.fly?8*p:0,zv=SV.opt.zoom!==false&&!e.T.boss?Math.min(.9,Math.max(0,Math.hypot(e.vx,e.vy)-e.spd*1.5)/420):0;
   drawSpr(e.T.sp,wh?'WHITE':e.T.pal,x,y+s/2-air-fly-zv*8*p,sc*(1+zv),e.x>R.x,1+k2*.35-bo,1-k2*.3+bo);
   const top=y-s/2-air-fly;
   if(e.stun>0)txt('★',x,top-3,'#ffd34e',7);else if(e.sleep>0)txt('z',x+4,top-3,'#c8a0ff',8);
   if(e.charging>0)txt('ためている！',x,top-12,'#ff5a4e',9);
   if(e.T.elite||e.T.boss){g.fillStyle='#000';g.fillRect(x-s/2,top-5,s,3);g.fillStyle=e.T.boss?'#ff5a4e':'#ffd34e';g.fillRect(x-s/2,top-5,s*Math.max(0,e.hp/e.max),3)}}
  else if(o.c){const c=o.c,[x,y,p]=P(c.x,c.y),a=Math.max(0,1-Math.max(0,c.t-1.1)/.5),v=Math.hypot(c.vx,c.vy),zy=y-c.z*p;g.globalAlpha=a;shadow(x,y+4*p,8*c.sc,p);
   if(v>150){const[x2,y2]=P(c.x-c.vx*.05,c.y-c.vy*.05);g.strokeStyle='rgba(255,255,255,'+Math.min(.6,v/700)+')';g.lineWidth=3*p;g.beginPath();g.moveTo(x,zy);g.lineTo(x2,y2-c.z*p);g.stroke()}
   g.save();g.translate(Math.round(x),Math.round(zy));g.rotate(c.rot);if(c.flip)g.scale(-1,1);const s2=12*c.sc*p*(SV.opt.zoom!==false?1+Math.min(1.2,c.z/90+v/900):1);g.globalAlpha=a*.72;g.drawImage(spr(c.sp,'DEAD:'+c.pal),-s2/2,-s2/2,s2,s2);g.restore();g.globalAlpha=1}
  else if(o.a){const a=o.a,[x,y,p]=P(a.x,a.y),fly=ALLY[a.k].fly?10*p:0;g.strokeStyle='rgba(111,227,181,.95)';g.lineWidth=2;g.beginPath();g.ellipse(x,y+5*p,8*p,3.2*p,0,0,7);g.stroke();shadow(x,y+5*p,9,p);drawSpr(ALLY[a.k].sp,a.evo?'e'+ALLY[a.k].pal:ALLY[a.k].pal,x,y+6*p-fly,p*(ALLY[a.k].sc||1)*(a.evo?1.15:1)*(R.t<(R.giantT||0)?1.6:1),a.fl!=null?a.fl:a.k==='slime'&&R.face<0);const ty=y-8*p*(ALLY[a.k].sc||1)-fly-2+Math.sin(R.t*5+a.a)*1.5;g.fillStyle='#163c45';g.fillRect(Math.round(x)-3,Math.round(ty)-3,7,5);g.fillStyle='#6fe3b5';g.fillRect(Math.round(x)-2,Math.round(ty)-2,5,3);g.fillRect(Math.round(x)-1,Math.round(ty)+1,3,1);g.fillRect(Math.round(x),Math.round(ty)+2,1,1)}
  else if(o.hero){const[x,y,p]=P(R.x,R.y);shadow(x,y+5*p,10,p);const jz=R.t-(R.jumpAt||-9)<.4?Math.sin((R.t-R.jumpAt)/.4*Math.PI)*30*p:0;if(R.t<(R.ghostT||0))g.globalAlpha=.4;drawAura(x,y+6*p-jz,p,R.t);if(!(R.inv>0&&R.t>=(R.sinvT||0)&&Math.floor(R.t*20)%2))drawSpr('hero',heroPal(),x,y+6*p-jz,p,R.face<0);g.globalAlpha=1;if(R.clones){g.globalAlpha=.45;for(const[cx,cy]of R.clones){const[a1,b1,p1]=P(cx,cy);drawSpr('hero',heroPal(),a1,b1+6*p1,p1,R.face<0)}g.globalAlpha=1}if(R.blades)for(const[bx,by,ba]of R.blades){const[a1,b1,p1]=P(bx,by);g.save();g.translate(Math.round(a1),Math.round(b1-8*p1));g.rotate(ba);g.fillStyle='#ffd34e';g.fillRect(-5*p1,-1,10*p1,2);g.restore()}
   if(R.t-R.bulb<1.6){const bx=x,by=y-14-Math.min(4,(R.t-R.bulb)*12);g.fillStyle='#ffef5a';g.fillRect(bx-3,by-4,6,6);g.fillStyle='#fff';g.fillRect(bx-1,by-3,2,2);g.fillStyle='#aaa';g.fillRect(bx-2,by+2,4,2)}
   g.fillStyle='#000';g.fillRect(x-7,y+8,14,3);g.fillStyle=R.hp/R.max<.3?'#ff5a4e':'#6fe3b5';g.fillRect(x-7,y+8,14*R.hp/R.max,3)}}
 // 攻撃の表示
 for(const s of R.shots){
  if(s.k==='swipe'){const[x,y,p]=P(s.ox??R.x,s.oy??R.y),a=1-s.t/s.life,w2=s.thin?.45:1;g.save();g.translate(x,y);g.scale(p,p*.75);g.fillStyle='rgba('+(s.c||'255,255,255')+','+a*.75+')';g.beginPath();g.moveTo(0,0);g.arc(0,0,s.r,s.a-w2,s.a+w2);g.fill();g.restore()}
  if(s.k==='thrust'){const[x,y,p]=P(R.x,R.y),[x2,y2]=P(R.x+Math.cos(s.a)*s.len,R.y+Math.sin(s.a)*s.len),a=1-s.t/s.life;g.strokeStyle='rgba(230,240,255,'+a+')';g.lineWidth=3;g.beginPath();g.moveTo(x,y-6*p);g.lineTo(x2,y2-6*p);g.stroke();g.fillStyle='#fff';g.fillRect(x2-2,y2-6*p-2,4,4)}
  if(s.k==='whip'){const[x,y,p]=P(R.x,R.y),[x2,y2]=P(R.x+s.f*s.len,R.y),a=1-s.t/s.life;g.strokeStyle='rgba(200,140,90,'+a+')';g.lineWidth=2;g.beginPath();g.moveTo(x,y-6*p);g.quadraticCurveTo((x+x2)/2,y-6*p-10*Math.sin(s.t/s.life*Math.PI),x2,y2-6*p);g.stroke()}
  if(s.k==='proj'){const[x,y,p]=P(s.x,s.y),yy=y-7*p,an=Math.atan2(s.vy,s.vx);
   if(s.dk==='orb'){const z=Math.max(3,Math.round(6*p));g.fillStyle=s.col?'rgba(232,246,255,.45)':'rgba(255,240,150,.45)';g.fillRect(x-z,yy-z,z*2,z*2);g.fillStyle=s.col||'#fff6b0';g.fillRect(x-z/2,yy-z/2,z,z)}
   else if(s.dk==='shur'){g.save();g.translate(Math.round(x),Math.round(yy));g.rotate(s.t*25);g.fillStyle='#cfd6dd';g.fillRect(-4*p,-1,8*p,2);g.fillRect(-1,-4*p,2,8*p);g.restore()}
   else{g.save();g.translate(Math.round(x),Math.round(yy));g.rotate(an);g.fillStyle=s.dk==='arrow'?'#a87a45':'#e8eef5';g.fillRect(-5*p,-1,8*p,2);g.fillStyle='#fff';g.fillRect(3*p,-1,2*p,2);g.restore()}}
  if(s.k==='axe'){const[x,y,p]=P(s.x,s.y);shadow(x,y,7,p);g.save();g.translate(Math.round(x),Math.round(y-(8+s.z)*p));g.rotate(s.t*18);g.scale(p,p);g.fillStyle='#8d6e63';g.fillRect(-1,-5,2,10);g.fillStyle='#cfd6dd';g.fillRect(1,-5,4,5);g.restore()}
  if(s.k==='fan'){const[x,y,p]=P(s.x,s.y);g.save();g.translate(Math.round(x),Math.round(y-8*p));g.rotate(s.rot);g.scale(p,p);g.fillStyle='#ff8ae6';g.beginPath();g.moveTo(0,0);g.arc(0,0,6,-.7,.7);g.fill();g.restore()}
  if(s.k==='wave'){const[x,y,p]=P(s.x,s.y),a=1-s.t/s.life,r=s.r*p;g.strokeStyle='rgba(255,211,120,'+a+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y,r,r*.7,0,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,'+a*.6+')';g.beginPath();g.ellipse(x,y,r*.8,r*.56,0,0,7);g.stroke()}
  if(s.k==='slash'){const[,y]=P(R.x,s.y),a=1-s.t/s.life;g.fillStyle='rgba('+s.c+','+a+')';g.fillRect(0,y-10,VW,4);g.fillStyle='rgba(255,255,255,'+a+')';g.fillRect(0,y-9,VW,2)}
  if(s.k==='boom'){const[x,y,p]=P(s.x,s.y);shadow(x,y,6,p);g.save();g.translate(Math.round(x),Math.round(y-8*p));g.rotate(s.rot);g.scale(p,p);g.fillStyle='#c98a3a';g.fillRect(-4,-1,8,2);g.fillRect(-1,-4,2,8);g.restore()}
  if(s.k==='mag'){const[x,y,p]=P(s.x,s.y),[x2,y2]=P(s.x-s.vx*.04,s.y-s.vy*.04),z=Math.max(2,Math.round(4*p));g.fillStyle='rgba(154,230,255,.45)';g.fillRect(x2-z/2,y2-8*p-z/2,z,z);g.fillStyle='#9ae6ff';g.fillRect(x-z/2,y-8*p-z/2,z,z)}
  if(s.k==='slam'){const[x,y,p]=P(s.x,s.y),a=1-s.t/s.life;g.fillStyle='rgba(255,255,255,'+a+')';g.fillRect(x-1,y-24*p,3,24*p);g.fillRect(x-7*p,y-1,14*p,3)}
  if(s.k==='fire'){const[x,y,p]=P(s.x,s.y),z=Math.max(3,Math.round(5*p));shadow(x,y,5,p);g.fillStyle='#ff7a2a';g.fillRect(x-z/2,y-8*p-z/2,z,z);g.fillStyle='#ffd34e';g.fillRect(x-z/4,y-8*p-z/4,z/2,z/2)}
  if(s.k==='bolt'){const[tx2,ty2]=P(s.x,s.y);g.strokeStyle='#fff36a';g.lineWidth=2;g.beginPath();let x=tx2,y=0;g.moveTo(x,y);while(y<ty2){y+=10;x+=(rnd()-.5)*10;g.lineTo(x,Math.min(y,ty2))}g.stroke()}}
 for(const q of R.parts){const[x,y]=P(q.x,q.y);g.fillStyle=q.c;g.globalAlpha=1-q.t/q.life;g.fillRect(Math.round(x),Math.round(y-4),2,2)}g.globalAlpha=1;
 // 文字
 for(const n of R.nums){const a=R.t-n.t;if(a>.6)continue;const[x,y]=P(n.x,n.y),pop=a<.1?1+(1-a/.1)*.8:1;txt(n.crit?n.v+'!':String(n.v),x,y-6-a*18,n.crit?'#ffd34e':'#fff',n.crit?10:7,pop)}R.nums=R.nums.filter(n=>R.t-n.t<.6);
 {const tint=R.t<(R.stopT||0)?'rgba(120,140,255,.18)':R.t<(R.berserkT||0)?'rgba(255,40,40,.12)':R.t<(R.braveT||0)?'rgba(255,220,80,.1)':R.t<(R.starT||0)?'rgba(40,40,120,.18)':null;if(tint){g.fillStyle=tint;g.fillRect(0,0,VW,VH)}if(R.t-(R.ultT||-9)<.6){g.fillStyle='rgba(255,255,255,'+(.8*(1-(R.t-R.ultT)/.6))+')';g.fillRect(0,0,VW,VH)}if(R.t<(R.dragonT||0))txt('竜王',VW/2,VH*.3,'#ff7a2a',22,1)}
 if(R.flash!=null&&R.t-R.flash<.15){g.fillStyle='rgba(255,255,255,'+(.35*(1-(R.t-R.flash)/.15))+')';g.fillRect(0,0,VW,VH)}
 if(R.big&&R.t-R.big.at<1.2){const a=R.t-R.big.at;txt(R.big.t,VW/2,VH*.42,'#ffd34e',18,a<.15?1+(1-a/.15):1)}
 for(const q of R.pops){const a=R.t-q.t;if(a>.8)continue;const[x,y]=P(q.x,q.y);txt(q.txt,x,y-a*16,q.c,9)}R.pops=R.pops.filter(q=>R.t-q.t<.8);
 if(R.boss&&!inView(R.boss)){const[bx,by]=P(R.boss.x,R.boss.y),a=Math.atan2(by-ANC,bx-VW/2);txt('▲',Math.max(10,Math.min(VW-10,VW/2+Math.cos(a)*VW)),Math.max(40,Math.min(VH-10,ANC+Math.sin(a)*VH)),'#ff5a4e',10)}
 if(R.cut){const a=(performance.now()-R.cut.at)/1000;if(a>1.6)R.cut=null;else{const f=a<.15?a/.15:a>1.3?(1.6-a)/.3:1;g.fillStyle='rgba(8,20,24,'+(.6*f)+')';g.fillRect(0,0,VW,VH);
  const[hx,hy,hp]=P(R.x,R.y);drawSpr('hero',heroPal(),hx,hy+6*hp,hp,R.face<0);
  const bs=Math.round((a<.2?a/.2:1)*14),by=hy-18-bs;g.fillStyle='#ffef5a';g.fillRect(hx-bs/2,by-bs/2,bs,bs);g.fillStyle='#fff';g.fillRect(hx-bs/4,by-bs/3,bs/4,bs/4);g.fillStyle='#bbb';g.fillRect(hx-bs/3,by+bs/2,bs*2/3,bs/4);
  for(let i=0;i<8;i++){const an=i/8*6.283+a*2,r1=bs*.9,r2=bs*(1.3+.2*Math.sin(a*20));g.strokeStyle='rgba(255,239,90,'+f+')';g.lineWidth=2;g.beginPath();g.moveTo(hx+Math.cos(an)*r1,by+Math.sin(an)*r1);g.lineTo(hx+Math.cos(an)*r2,by+Math.sin(an)*r2);g.stroke()}
  const bx=Math.min(0,-VW+(a/.25)*VW);g.fillStyle='rgba(255,107,87,'+f+')';g.fillRect(bx,VH*.36,VW,40);g.fillStyle='rgba(22,60,69,'+f+')';g.fillRect(bx,VH*.36+40,VW,3);
  if(a>.15){txtFit('ピコーン！',VW/2,VH*.36+12,'#ffef5a',15);txtFit(WAZA[R.cut.k].n+(R.cut.known?' を 思い出した！':' を ひらめいた！'),VW/2,VH*.36+29,'#fff',10);if(R.cut.from)txtFit(WAZA[R.cut.from].n+'から 派生',VW/2,VH*.36+52,'#ffef5a',8)}}}
 if(R.rkCut){const a=(performance.now()-R.rkCut.at)/1000;if(a>1.4)R.rkCut=null;else{const f=a>1.1?(1.4-a)/.3:1,sc=a<.12?2.2-a/.12*1.2:1;g.fillStyle='rgba(255,255,255,'+(.15*f)+')';g.fillRect(0,VH*.2,VW,50);txtFit('連携！',VW/2,VH*.2+14,'#ff6b57',12);txt(R.rkCut.nm,VW/2,VH*.2+34,'#fff',18,sc);txtFit(WAZA[R.rkCut.a].n+' ＋ '+WAZA[R.rkCut.b].n+(R.rkCut.isNew?'（はじめて）':''),VW/2,VH*.2+52,'#ffef5a',8)}}
 if(R.banner&&R.t-R.banner.at<2.5){g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,VH*.3-14,VW,R.banner.s?34:24);txtFit(R.banner.t,VW/2,VH*.3-2,'#ffd34e',13);if(R.banner.s)txtFit(R.banner.s,VW/2,VH*.3+12,'#fff',8)}
 if(stick.on){const r=cv.getBoundingClientRect(),k=VW/r.width;g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1;g.beginPath();g.arc(stick.ox*k,stick.oy*k,14,0,7);g.stroke();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(stick.ox*k+stick.x*14,stick.oy*k+stick.y*14,5,0,7);g.fill()}}
function hudUp(){const jbn=document.getElementById('jbn');jb.classList.toggle('ready',R.jg>=1);document.getElementById('jbg').style.width=(R.jg*100)+'%';jbn.textContent=R.jg>=1?JOBS[SV.job].sp+'！':JOBS[SV.job].sp+' '+Math.floor(R.jg*100)+'%';document.getElementById('xpi').style.width=(R.xp/R.need*100)+'%';document.getElementById('lvl').textContent='Lv'+R.lv;const t=Math.floor(R.t);document.getElementById('time').textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0')+((SV.opt.spd||1)>1?' ×'+SV.opt.spd:'');document.getElementById('kills').textContent=R.kills+'体';document.getElementById('streak').textContent=R.streak>=10&&R.t-R.lastKill<1.2?R.streak+'連撃':'';const wz=Object.keys(R.waza).map(k=>famLv(WAZA[k].tag)?'<b>'+WAZA[k].n+'</b>'+starTxt(SV.waza[k].star):'<span style="opacity:.55">'+WAZA[k].n+'（'+WTN[WAZA[k].tag]+'の 武器が ない）</span>').join('　');if(wz!==R._wz){R._wz=wz;document.getElementById('wz').innerHTML=wz}}
let lastF=0,fpsN=0,fpsT=0,fpsV=0;
window.ERRLOG=[];function logErr(where,e){const m=where+': '+((e&&e.message)||e)+(e&&e.stack?' | '+String(e.stack).split('\n').slice(1,3).join(' / ').replace(/https?:[^ )]*\//g,''):'');const ex=ERRLOG.find(x=>x.m===m);if(ex){ex.n=(ex.n||1)+1;return}ERRLOG.push({m,t:new Date().toLocaleTimeString('ja-JP'),v:GAME_VER,n:1});if(ERRLOG.length>20)ERRLOG.shift()}
addEventListener('error',e=>logErr('window',e.error||e.message));addEventListener('unhandledrejection',e=>logErr('promise',e.reason));
function loop(now){try{loopBody(now)}catch(e){logErr('loop',e);requestAnimationFrame(loop)}}
function loopBody(now){if((SV.opt.fps30||QL()==='low')&&now-lastF<30){requestAnimationFrame(loop);return}lastF=now;
 fpsN++;if(now-fpsT>=1000){fpsV=Math.round(fpsN*1000/(now-fpsT));fpsN=0;fpsT=now;const m=document.getElementById('fpsM');if(m){m.style.display=SV.opt.meter?'block':'none';m.textContent=fpsV+' fps'+(R?' / 敵 '+R.en.length+(R.mode==='endless'?'（上限 '+abyssCap(Math.floor(Math.max(0,R.t)/60))+'）':''):'')}}
 const dt=Math.max(0,Math.min(.05,(now-last)/1000));last=now;if(R&&!R.paused&&!R.over)perfGuard((now-(R.pfLast||now))/1000),R.pfLast=now;else if(R)R.pfLast=0;
 if(R&&!R.paused&&!R.over)try{if(R.shk>0)R.shk=Math.max(0,R.shk-dt*30);if(R.hs>0)R.hs-=dt;else if(R.slow>0){R.slow-=dt;step(dt*.18)}else{const sp=effSpd();for(let i=0;i<sp&&!R.over&&!R.paused;i++)step(dt)}if(R.queue>0&&!R.over)levelUp();hudUp();if(!R.paused&&!R.over&&(R.tipT=(R.tipT||0)+dt)>.3){R.tipT=0;tipCheck()}}catch(e){logErr('step',e)}
 try{draw()}catch(e){logErr('draw',e);try{g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over'}catch(_){}}requestAnimationFrame(loop)}

