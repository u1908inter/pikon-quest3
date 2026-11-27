/* ---------- 音 ---------- */
let AC=null,master=null;
function initAudio(){try{if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=seVol();master.connect(AC.destination)}AC.resume()}catch(e){}}
function tone(type,f,d,v,f2,delay){if(!AC)return;const t=AC.currentTime+(delay||0),o=AC.createOscillator(),gn=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);gn.gain.setValueAtTime(v,t);gn.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(gn).connect(master);o.start(t);o.stop(t+d+.02)}
let lastGem=0;
