/* ---------- 終了と村 ---------- */
function deathReport(){const lh=R.lastHit,L=R.dmgLog||[],F5=L.filter(x=>x.t>=R.t-5),sum5=F5.reduce((a,x)=>a+x.d,0),big=L.reduce((a,x)=>Math.max(a,x.d),0);if(!lh)return '';
 const top=Object.entries(R.dmgBy||{}).sort((a,b)=>b[1][0]-a[1][0]).slice(0,3);const tips=[];
 if(lh.k==='blast')tips.push('ボスの 大技（「ためている！」の あとに 赤い 輪が ひろがる）に まきこまれた。ためている 間は はなれよう');
 if(big>=R.max*.4)tips.push('1回で 最大HPの '+Math.round(big/R.max*100)+'% を うけた。HPを ふやす（いのちの像・守護セット・HPの 効果）か、受ける ダメージを へらそう');
 if(F5.length>=5)tips.push('最後の 5秒で '+F5.length+'回 ぶつかった。かこまれる 前に、敵の すくない ほうへ 動こう');
 if(lh.src.includes('強敵'))tips.push('強敵は 足もとが オレンジの 点線の 輪。攻撃が 強いので 近づきすぎないように');
 return '<div style="text-align:left;background:#fff2f0;border:2px solid #e0302a;border-radius:8px;padding:6px 8px;margin:6px 0"><div style="color:#c0392b;font-weight:bold">倒された 原因</div><div>'+lh.src+(lh.k==='blast'?'の 大技':'に ぶつかった')+'　<b>-'+lh.d+'</b>（のこり HP '+Math.max(0,Math.ceil(lh.hp0))+' → 0）</div><div class="hint">最後の 5秒で 受けた ダメージ '+sum5+'（'+F5.length+'回）／ 最大HP '+Math.round(R.max)+'</div>'+(top.length?'<div class="hint">受けた ダメージ：'+top.map(([n,[d,c]])=>n+' '+d+'（'+c+'回）').join('・')+'</div>':'')+(tips.length?'<div style="color:#1f6fd0;margin-top:3px">'+tips.slice(0,2).map(t=>'💡 '+t).join('<br>')+'</div>':'')+'</div>'}
function stuckHints(){const o=[];try{
 if(SV.inv.some(it=>!it.a&&statScore(it)>statScore(eqOf(it.slot))))o.push('もっと 強い 装備を 持っている。装備タブの「おすすめ装備」を ためそう');
 if(Object.keys(UPS).some(k=>SV.up[k]<UPS[k].max&&SV.gold>=upCost(k)))o.push('町の「施設」を 強化できる');
 const lrn=Object.keys(ABIL).filter(abLearned);if(SV.abil.length<abMax()&&lrn.length>SV.abil.length)o.push('アビリティの 枠が あいている（ジョブ → アビリティ）');
 if(SV.jobs[SV.job]&&SV.jobs[SV.job].lv>=JOB_MAX)o.push('いまの ジョブは マスターずみ。ほかの ジョブに 転職すると 力が 積み上がる');
 if(Object.values(SV.eq).some(id=>{const it=SV.inv.find(i=>i.id===id);return it&&(it.ref||0)<5&&SV.gold>=refCost(it)*3}))o.push('精錬所で 装備を 鍛えられる');
 if(SV.party.length<allySlots()&&Object.keys(SV.allies).length>SV.party.length)o.push('仲間の 枠が あいている（仲間タブ）');
 o.push('ひとつ前の ステージで 経験値と 装備を ためるのも 手')}catch(_){}return o.slice(0,3)}
function endRun(win){if(R.over)return;const pk0=perkKeysOn();R.over=true;R.paused=true;hud.style.display='none';jb.style.display='none';
 if(R.mode==='endless')R.xpTot*=ABY.xp;
 const before=SV.lv;SV.exp+=Math.round(R.xpTot);while(SV.exp>=metaNeed(SV.lv)){SV.exp-=metaNeed(SV.lv);SV.lv++}
 const gold=Math.round((R.gold+R.kills/10*(1+.3*R.st)+(win?40*(1+R.st)*R.rd:0))*R.F.gold*(1+(R.F.invest||0)));SV.gold+=gold;
 const lines=[];R.newAllies.forEach(k=>{if(!SV.allies[k]){SV.allies[k]={lv:1,exp:0};if(SV.party.length<allySlots())SV.party.push(k);lines.push(ALLY[k].n+'が仲間に加わった')}});
 R.allies.forEach(a=>{const A=SV.allies[a.k];if(!A||a.until)return;A.exp+=Math.round(R.xpTot*.5*R.F.allyXp);const b0=A.lv;while(A.lv<allyCap(A)&&A.exp>=allyNeed(A.lv)){A.exp-=allyNeed(A.lv);A.lv++}if(A.lv>=allyCap(A))A.exp=0;if(A.lv>b0)lines.push(allyName(a.k)+'がLv'+A.lv+'になった'+(A.lv>=allyCap(A)?'（最大）':A.evo&&A.lv>ALLY_MAX?'（限界突破）':''))});
 {const J=SV.jobs[SV.job],JD=JOBS[SV.job],l0=J.lv,open0=Object.keys(JOBS).filter(jobOpen);J.exp+=Math.round(R.xpTot*R.F.jobXp);while(J.lv<JOB_MAX&&J.exp>=jobNeed(J.lv)){J.exp-=jobNeed(J.lv);J.lv++}
  if(J.lv>l0){lines.push(JD.n+'がジョブLv'+J.lv+'になった');JD.ab.forEach((a,i)=>{if(i+1>l0&&i+1<=J.lv)lines.push('アビリティ「'+ABIL[a].n+'」を覚えた（AP'+ABIL[a].ap+'）')});if(J.lv>=JOB_MAX&&l0<JOB_MAX)lines.push(JD.n+'を マスター！ AP上限+'+AP_PER+'・マスターボーナス（'+JD.base+'の 半分）')}
  Object.keys(JOBS).filter(j=>jobOpen(j)&&!open0.includes(j)).forEach(j=>lines.push('新しいジョブ「'+JOBS[j].n+'」が選べるようになった'))}
 if(!SV.souls)SV.souls={};(R.souls||[]).forEach(k=>{SV.souls[k]=(SV.souls[k]||0)+1;lines.push('<span style="color:#8a5cc8">'+ALLY[k].n+'の 魂</span>を 手に入れた（仲間タブで 合体に 使える）')});
 if(R.comboN)lines.push('仲間の 合体技を '+R.comboN+'回 出した');
 if(R.mode==='endless'){const ab=Math.floor(Math.max(0,R.t-(R.t0||0))/30)+(R.abyssGot||0),best=SV.endBest||0;SV.abyss=(SV.abyss||0)+ab;SV.endBest=Math.max(best,Math.floor(R.t));lines.unshift('深淵で '+fmtT(R.t)+' 生きのびた（'+(Math.floor(R.t/60)+1)+'層）'+(R.t0?'　'+Math.round(R.t0/60)+'分から もぐって '+fmtT(R.t-R.t0):'')+(R.t>best?'　最高記録！':''));lines.push('<span style="color:#8a5cc8">深淵のかけら</span>を '+ab+'こ 手に入れた')}
 if(R.mode==='trial'&&win){const today=dayKey();if(!SV.trial||SV.trial.day!==today){const mul=pOn('trial2')?2:1;SV.trial={day:today,done:1};SV.stats=SV.stats||{};SV.stats.trials=(SV.stats.trials||0)+1;SV.abyss=(SV.abyss||0)+5*mul;const c=pick(STAGES[R.st].foes.concat([STAGES[R.st].elite]));SV.cards[c]=(SV.cards[c]||0)+mul;SV.album[c]=1;SV.gold+=200*R.rd*mul;lines.unshift('試練 達成！ 深淵のかけら +'+5*mul+'・'+cardName(c)+' ×'+mul+'・'+200*R.rd*mul+'G')}else lines.unshift('試練 達成！（今日の ごほうびは 受け取りずみ）')}
 if(R.mode==='throne'&&win){SV.throneWin=(SV.throneWin||0)+1;lines.unshift('真・魔王ピコールを たおした！')}
 SV.stats=SV.stats||{};SV.stats.kills=(SV.stats.kills||0)+R.kills;if((R.hsSkip||0)>120&&(SV.opt.hs||'on')!=='off'&&!(SV.seen||{}).hsAdv)SV.hsAdvPend=1;if(R.mode==='endless'&&R.t0&&R.t-R.t0>=600)SV.stats.retry=1;achCheck(lines,{fast:win&&R.mode==='stage'&&R.st===5&&(SV.opt.hs||'on')==='off'&&effSpd()>=4,hira:R.hiraLog.length,maxStreak:R.maxStreak||0,win,mode:R.mode,hurtN:R.hurtN||0,bossDt:R.bossDt});
 R.hiraLog.forEach(k=>lines.push('ピコーン！ '+WAZA[k].n+'を ひらめいた'));
 if(R.rkN)lines.push('連携を '+R.rkN+'回 出した');
 R.cardsGot.forEach(c=>{SV.cards[c]=(SV.cards[c]||0)+1;if(!SV.album[c])lines.push('新しい カード「'+cardName(c)+'」');SV.album[c]=1});if(R.cardsGot.length)lines.push('カードを '+R.cardsGot.length+'まい 持ち帰った');
 if(win&&R.mode==='stage'){const before=SV.clear.slice(),mr=maxRd();SV.clear[R.st]=Math.max(SV.clear[R.st]||0,R.rd);
  if(R.st<5&&!stOpen(R.st+1,R.rd)===false&&(before[R.st]||0)<R.rd)lines.push(STAGES[R.st+1].n+'（'+R.rd+'周目）が ひらいた');
  if(R.st===5&&maxRd()>mr)lines.push(maxRd()+'周目が ひらいた！ 敵が さらに 強くなる');
  if(R.st<5&&stOpen(R.st+1,R.rd)){SV.sel={st:R.st+1,rd:R.rd}}else if(R.st===5&&maxRd()>R.rd){SV.sel={st:0,rd:R.rd+1}}}
 for(const k in R.wazaUse){const Wz=SV.waza[k];if(!Wz)continue;Wz.exp+=R.wazaUse[k];const s0=Wz.star;while(Wz.star<6&&Wz.exp>=wazaNeed(Wz.star)){Wz.exp-=wazaNeed(Wz.star);Wz.star++}if(Wz.star>s0)lines.push(WAZA[k].n+'が'+starTxt(Wz.star)+'になった')}
 {let an=0,ag=0;R.loot.forEach(it=>{if(SV.autoSell&&isWeakAuto(it)){an++;ag+=sellPrice(it);return}SV.inv.push(it);lines.push('<span style="color:'+RAR[it.r].c+'">'+RAR[it.r].n+'：'+it.name+'</span>を持ち帰った')});if(an){SV.gold+=ag;lines.push('弱い装備を '+an+'こ 自動で 売った（+'+ag+'G）')}}
 let sold=0;while(SV.inv.length>invCap()){const i=SV.inv.findIndex(x=>!x.lock&&!Object.values(SV.eq).includes(x.id));if(i<0)break;sold+=Math.round(5*(SV.inv[i].r+1)*R.F.sellMul);SV.inv.splice(i,1)}if(sold){SV.gold+=sold;lines.push('持ちきれない装備を売った（+'+sold+'G）')}
 if(R.stops)lines.push('ボスの大技を'+R.stops+'回止めた');
 {const pk1=perkKeysOn().filter(k=>!pk0.includes(k));pk1.forEach(k=>lines.push('<span style="color:#d49a00">🎁 特典「'+PK[k][3]+'」が ひらいた！</span>'));if(win&&R.mode==='stage'&&R.st===5&&R.rd>=10&&!SV.endingSeen)SV.endingPend=1}
 if(SV.lv>before)lines.unshift('勇者ランクが '+SV.lv+'に 上がった！（HPと攻撃力アップ'+(SV.lv>100?'・限界突破 ×'+heroLB().toFixed(2):'')+'）');
 if(R.mode==='stage'){SV.lose=SV.lose||{};const lk=R.st+'-'+R.rd;if(win)delete SV.lose[lk];else{SV.lose[lk]=(SV.lose[lk]||0)+1;if(SV.lose[lk]>=3)stuckHints().forEach(t=>lines.push('<span style="color:#1f6fd0">💡 '+t+'</span>'))}}
 {SV.hist=SV.hist||[];SV.hist.unshift({d:Date.now(),m:R.mode,st:R.st,rd:R.rd,w:win?1:0,t:Math.floor(R.t),t0:Math.floor(R.t0||0),k:R.kills,l:R.lv,rk:SV.lv});if(SV.hist.length>100)SV.hist.length=100;
  const B=SV.bests=SV.bests||{};B.kills=Math.max(B.kills||0,R.kills);B.streak=Math.max(B.streak||0,R.maxStreak||0);B.runLv=Math.max(B.runLv||0,R.lv);if(win&&R.bossDt!=null)B.boss=Math.min(B.boss||9999,R.bossDt);B.rank=Math.max(B.rank||0,SV.lv);if(R.mode==='endless')B.dive=Math.max(B.dive||0,Math.floor(R.t-(R.t0||0)))}
 if(win)SV.clears++;SV.best=Math.max(SV.best,Math.floor(R.t));save();
 goalNews().forEach(t=>lines.push('<span style="color:#2a8a4a">◎ 目標「'+t+'」を たっせい！（出撃タブで 受け取れる）</span>'));save();
 const mm=Math.floor(R.t/60)+':'+String(Math.floor(R.t%60)).padStart(2,'0');
 const died=R.hp<=0&&!win,dh=died?deathReport():'';const showRes=()=>modal('<h2>'+(R.mode==='endless'?'深淵で 力つきた…':win?(R.mode==='trial'?'試練 クリア！':R.mode==='throne'?'玉座 制覇！':'ステージ クリア！'):'力つきた…')+'</h2>'+dh+'<ul class="res"><li>生きのびた 時間 '+mm+'</li><li>たおした 敵 '+R.kills+'体</li><li>経験値 '+Math.round(R.xpTot)+' → 勇者ランクと ジョブへ</li><li>ゴールド +'+gold+'</li>'+lines.map(l=>'<li class="hl">'+l+'</li>').join('')+'</ul><div class="opts"><button class="btn primary big" id="tv">拠点へ もどる</button></div>',()=>{document.getElementById('tv').onclick=()=>{if(SV.endingPend){closeModal();playEnding(toCamp)}else toCamp()}});if(died){const lh=R.lastHit;banner('力つきた…',lh?lh.src+(lh.k==='blast'?'の 大技':'に ぶつかった')+'（-'+lh.d+'）':'');R.deathFreeze=1;setTimeout(showRes,window.NOFREEZE?0:1400)}else showRes()}

