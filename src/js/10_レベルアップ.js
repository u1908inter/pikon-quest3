/* ---------- レベルアップ ---------- */
const LVPRI_DEF=['evo','weapon','might','cd','area','mag','spd'];
const LVPRI_N={evo:'武器の 進化',weapon:'武器の レベル',might:'ちから（ダメージ）',cd:'れんしゃ（攻撃の 間隔）',area:'ひろさ（攻撃範囲）',spd:'はやさ（移動速度）',mag:'じしゃく（引き寄せ）'};
const lvPri=()=>{const a=(SV.opt.lvPri||[]).filter(k=>LVPRI_N[k]);LVPRI_DEF.forEach(k=>{if(!a.includes(k))a.push(k)});return a};
function lvApply(o){if(o.evo){R.evo[o.evo]=1;const fw=EVO[o.evo].from;if(fw!=='sword'&&fw!=='magic'){R.evoW=R.evoW||{};R.evoW[fw]=1}R.weapons[EVO[o.evo].from]=5;if(!SV.book[o.evo]){SV.book[o.evo]=1;save()}sfx.hira();banner('しんか！',WEAP[EVO[o.evo].from].n+'が'+EVO[o.evo].n+'になった')}
 else if(o.w)R.weapons[o.w]=(R.weapons[o.w]||0)+1;else if(o.p)R.pass[o.p]=(R.pass[o.p]||0)+1;else R.hp=Math.min(R.max,R.hp+30)}
function evoNeed(p){for(const k in EVO){const E=EVO[k];if(!R.evo[k]&&R.weapons[E.from]&&E.need===p)return k}return null}
function levelUp(){R.queue--;const auto=!!SV.opt.autoLv||!!R.dbgAuto;if(!auto)R.paused=true;sfx.lv();const opts=[];
 for(const k in EVO){const E=EVO[k];if(!R.evo[k]&&R.weapons[E.from]>=5&&R.pass[E.need])opts.push({evo:k})}
 const pool=[];for(const w in R.weapons)if(R.weapons[w]<5)pool.push({w},{w});
 for(const p in PASS){const l=R.pass[p]||0;if(l<5&&(l||Object.keys(R.pass).length<4||evoNeed(p)))pool.push({p});if(!l&&evoNeed(p))pool.push({p})}
 shuffle(pool);const seen=new Set();while(opts.length<3&&pool.length){const o=pool.pop(),key=o.w||o.p;if(seen.has(key))continue;seen.add(key);opts.push(o)}
 if(!opts.length)opts.push({heal:1});
 if(auto){const pr=lvPri(),rk=o=>{if(o.p&&!R.pass[o.p]&&evoNeed(o.p))return pr.indexOf('evo')+.5;const i=pr.indexOf(o.evo?'evo':o.w?'weapon':o.p||'');return i<0?99:i};const o=opts.slice().sort((a,b)=>rk(a)-rk(b))[0];lvApply(o);
  R.pops.push({x:R.x,y:R.y-22,txt:'Lv'+R.lv+' '+(o.evo?EVO[o.evo].n:o.w?WEAP[o.w].n+' Lv'+R.weapons[o.w]:o.p?PASS[o.p].n+' Lv'+R.pass[o.p]:'HP回復'),c:'#9ae6ff',t:R.t});return}
 modal('<h2>レベル '+R.lv+'！</h2><p class="hint">ひとつ えらぶ</p><div id="lvc"></div>',()=>{const box=document.getElementById('lvc');
 opts.forEach(o=>{const b=document.createElement('button');b.className='btn choice'+(o.evo?' evo':'');let h;
  if(o.evo){const E=EVO[o.evo];h='しんか！ '+E.n+'<span class="r">進化</span><small>'+WEAP[E.from].n+'が 進化する。'+E.d+'</small>'}
  else if(o.w){const l=R.weapons[o.w]||0;h=WEAP[o.w].n+'<span class="cat any">'+WTN[WEAP[o.w].fam]+'</span><span class="r">'+(l?'Lv'+(l+1):'NEW')+'</span><small>'+WEAP[o.w].d+(l?'':'（'+WTN[WEAP[o.w].fam]+'の 技が 使える）')+'</small>'}
  else if(o.p){const l=R.pass[o.p]||0,en=!l&&evoNeed(o.p);h=PASS[o.p].n+(en?'<span class="cat any">進化に 必要</span>':'')+'<span class="r">'+(l?'Lv'+(l+1):'NEW')+'</span><small>'+PASS[o.p].d+(en?'（'+WEAP[EVO[en].from].n+'の 進化に 必要）':'')+'</small>'}
  else h='ひとやすみ<small>HPを 30 回復</small>';
  b.innerHTML=h;b.onclick=()=>{lvApply(o);
   closeModal();R.paused=false;last=performance.now()};box.appendChild(b)})})}

