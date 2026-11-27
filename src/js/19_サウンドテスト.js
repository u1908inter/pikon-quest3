/* ---------- サウンドテスト ---------- */
const SND_LIST=[['camp','拠点 ― たき火の そばで'],['grass','草原'],['forest','森'],['cave','洞窟'],['desert','砂漠'],['snow','雪山'],['hell','魔界']];
function soundTest(){SV.heard=SV.heard||{};const n=SND_LIST.filter(([k])=>SV.heard[k]).length;
 modal('<h2>サウンドテスト（'+n+'/'+SND_LIST.length+'）</h2><p class="hint">いちど 聞いた 曲を いつでも 聞ける。BGMが オフでも 鳴る。</p><div class="list" style="text-align:left">'+SND_LIST.map(([k,nm],i)=>{const h=SV.heard[k],on=BGM.test===k;return '<button class="li'+(on?' sel':'')+'" data-snd="'+k+'"'+(h?'':' disabled')+'><div class="body"><div class="t"><span>'+(on?'▶ ':'')+String(i+1).padStart(2,'0')+'　'+(h?nm:'？？？')+'</span><span class="d">'+(on?'再生中':h?'':'まだ 聞いていない')+'</span></div></div></button>'}).join('')+'</div>'+
 
 '<div class="opts"><button class="btn" id="sts"'+(BGM.test?'':' disabled')+'>とめる</button><button class="btn primary" id="stc">とじる</button></div>',()=>{
  mbox.querySelectorAll('[data-snd]').forEach(b=>b.onclick=()=>{initAudio();BGM.test=b.dataset.snd;soundTest()});
  document.getElementById('sts').onclick=()=>{BGM.test=null;soundTest()};document.getElementById('stc').onclick=()=>{BGM.test=null;closeModal()}})}

