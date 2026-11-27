/* ---------- BGM（ピコーン・クエスト2と 同じ: 前に 流した 曲は その つづきから、聞いたことの ある 曲は ランダムな 位置から、はじめての 曲は 頭から） ---------- */
const BGM_META={grass:{ls:53.5917,le:159.0149},cave:{ls:11.5635,le:80.1516},forest:{ls:64.6676,le:180.8384},desert:{ls:10.8437,le:116.9021},snow:{ls:74.0252,le:180.8355},hell:{ls:19.8066,le:132.3015},camp:{ls:44.5359,le:178.9017}};
const BGM_NAME={camp:'拠点',grass:'草原',forest:'森',cave:'洞窟',desert:'砂漠',snow:'雪山',hell:'魔界'};
const STAGE_BGM=['grass','forest','cave','desert','snow','hell'];
const seVol=()=>SV.opt.sound?[.15,.35,.6][SV.opt.seVol??1]:0;
const BGM={test:null,key:null,src:null,g:null,buf:{},pos:{},t0:0,off:0,load:{},busy:0};
const bgmVol=()=>SV.opt.bgm===false?0:[0,.25,.45,.7][SV.opt.bgmVol??2];
function bgmGain(){if(!BGM.g){BGM.g=AC.createGain();BGM.g.gain.value=0;BGM.g.connect(AC.destination)}return BGM.g}
function bgmLoad(k){if(BGM.buf[k])return Promise.resolve(BGM.buf[k]);if(BGM.load[k])return BGM.load[k];
 return BGM.load[k]=fetch('bgm/'+k+'.mp3').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(a=>new Promise((res,rej)=>AC.decodeAudioData(a,res,rej))).then(b=>{for(const x in BGM.buf)if(x!==k&&x!=='camp'&&x!==BGM.key)delete BGM.buf[x];BGM.buf[k]=b;delete BGM.load[k];return b}).catch(e=>{delete BGM.load[k];throw e})}
function bgmLoopOf(k,b){const M=BGM_META[k];const le=Math.min(b.duration,M.le);return[Math.min(M.ls,le-1),le]}
function bgmNowPos(){if(!BGM.src||!BGM.key||!BGM.buf[BGM.key])return null;const[ls,le]=bgmLoopOf(BGM.key,BGM.buf[BGM.key]);let p=BGM.off+(AC.currentTime-BGM.t0);if(p>=le)p=ls+((p-ls)%(le-ls));return p}
function bgmStop(){if(BGM.src){const p=bgmNowPos();if(p!=null)BGM.pos[BGM.key]=p;try{BGM.src.stop()}catch(_){}try{BGM.src.disconnect()}catch(_){}BGM.src=null}BGM.key=null}
function bgmStart(k,b){const[ls,le]=bgmLoopOf(k,b),s=AC.createBufferSource();s.buffer=b;s.loop=true;s.loopStart=ls;s.loopEnd=le;s.connect(bgmGain());
 SV.heard=SV.heard||{};let off=BGM.pos[k];if(off==null)off=SV.heard[k]?rnd()*(le-8):0;off=Math.max(0,Math.min(le-.1,off));
 s.start(0,off);BGM.src=s;BGM.key=k;BGM.t0=AC.currentTime;BGM.off=off;if(!SV.heard[k]){SV.heard[k]=1;save()}}
function bgmWant(){if(!AC||document.hidden)return null;if(BGM.test)return BGM.test;if(bgmVol()<=0)return null;if(R)return R.mode==='throne'?'hell':STAGE_BGM[R.st]||'grass';return 'camp'}
function bgmTick(){if(!AC||AC.state!=='running')return;const w=bgmWant(),g=bgmGain();
 if(BGM.key&&BGM.key!==w){g.gain.value*=.72;if(g.gain.value<.02){g.gain.value=0;bgmStop()}return}
 if(w&&!BGM.key){if(!BGM.busy){BGM.busy=1;bgmLoad(w).then(b=>{BGM.busy=0;if(bgmWant()===w&&!BGM.key){g.gain.value=0;bgmStart(w,b)}}).catch(()=>{BGM.busy=0})}return}
 if(BGM.key){const v=g.gain.value,t=BGM.test?(bgmVol()||.45):bgmVol();g.gain.value=Math.abs(t-v)<.01?t:v+(t-v)*.2}}
setInterval(bgmTick,150);
addEventListener('pointerdown',()=>initAudio(),true);
document.addEventListener('visibilitychange',()=>{if(!AC)return;if(document.hidden){bgmStop();AC.suspend()}else AC.resume()});
const sfx={gem(){const n=performance.now();if(n-lastGem<40)return;lastGem=n;tone('square',1400,.04,.04)},hurt(){tone('sawtooth',180,.18,.12,60)},lv(){[523,659,784,1047].forEach((f,i)=>tone('square',f,.12,.08,0,i*.07))},hira(){[72,76,79,84,88].forEach((m,i)=>tone('square',440*Math.pow(2,(m-69)/12),.18,.1,0,i*.06))},hit(){tone('square',300,.03,.02)},boss(){tone('sawtooth',110,.6,.15,55)}};

