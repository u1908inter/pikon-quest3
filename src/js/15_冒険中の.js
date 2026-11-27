/* ---------- 冒険中の はじめての ヒント ---------- */
const TIPS=[
 ['b_move',()=>R.t>.4,'動き方','画面を <b>ドラッグ</b>すると、その 方向に 動く。攻撃は 自動で 出る。<br>敵に 囲まれないように 動きまわろう。2分 生きのびると ボスが 出る。'],
 ['b_gem',()=>R.xpTot>0,'経験値','たおした 敵が 落とす <b>ひし形</b>を 拾うと 経験値が たまる。<br>上の バーが いっぱいに なると レベルアップ。強化を 1つ えらべる。<br>この Lvは 冒険の 中だけ。ためた 経験値は 冒険の あとで ずっと 残る <b>勇者ランク</b>に なる。'],
 ['b_hira',()=>R.hiraLog.length>0,'ピコーン！ ひらめき','戦いの 中で <b>新しい 技を ひらめいた</b>。技は 自動で 出る。<br>拠点の「技」タブで、次の 冒険に 持って行く 技を えらべる。'],
 ['b_jg',()=>R.jg>=1,'ジョブの 必殺技','ジョブの ゲージが たまった！ 下の <b>'+'ボタン</b>を 押すと 必殺技を 出せる。<br>ゲージは 敵を たおすと たまる。'],
 ['b_elite',()=>R.en.some(e=>ETYPE[e.k]&&ETYPE[e.k].elite),'強敵 出現','光る 大きな 敵は <b>強敵</b>。手ごわいが、たおすと 装備や カードを 落としやすい。'],
 ['b_item',()=>R.loot.length>0,'装備を 拾った','拾った 装備は 冒険が おわると 持ち帰れる。<br>拠点の「装備」タブで 身につけよう。武器の 種類で 攻撃の 形が かわる。'],
 ['b_heart',()=>R.newAllies.length>0,'仲間が できた','<b>ハート</b>を 拾うと、その 敵が 仲間に なる。<br>仲間は この 冒険から いっしょに 戦い、拠点の「仲間」タブで 次も 連れて行ける。'],
 ['b_card',()=>R.cardsGot.length>0,'カードを 拾った','カードは 装備の カード枠に 挿すと 力が 上がる。<br>持ち帰ると 図鑑に のる。'],
 ['b_boss',()=>!!R.boss,'ボス 出現','<b>ボス</b>が あらわれた！ たおすと ステージ クリア。<br>大技の 前には 合図が 出る。よく 見て よけよう。'],
 ['b_hp',()=>R.hp<R.max*.35,'体力に 注意','体力が へってきた。敵が 落とす <b>お肉</b>を 拾うと 回復する。<br>敵の 少ない ほうへ 逃げよう。'],
 ['b_rk',()=>(R.rkN||0)>0,'連携 発動！','2つの 技が 続けて 出て <b>連携</b>に なった。組み合わせで 名前と 威力が かわる。'],
 ['b_soul',()=>(R.souls||[]).length>0,'魂を 拾った','すでに 仲間に いる 種族の ハートは <b>魂</b>に なる。<br>拠点の「仲間」タブで 合体に 使うと、仲間が 強くなる。'],
 ['b_combo',()=>(R.comboN||0)>0,'合体技！','決まった 2体の 仲間が そろうと、<b>合体技</b>を 出す。<br>どの 組み合わせで 出るかは 仲間タブの 図鑑で 確かめよう。']];
function tipCheck(){if(SV.opt.tips===false||!modalEl.hidden||R.queue>0)return;SV.seen=SV.seen||{};
 for(const[k,c,t,b]of TIPS){if(SV.seen[k])continue;let ok=false;try{ok=c()}catch(_){}if(!ok)continue;
  SV.seen[k]=1;save();R.paused=true;stick.on=false;stick.x=stick.y=0;
  modal('<h2 style="font-size:17px">ヒント：'+t+'</h2><div class="intro"><p>'+b+'</p></div><div class="opts"><button class="btn primary big" id="tok">つづける</button></div>',()=>{document.getElementById('tok').onclick=()=>{closeModal();if(R&&!R.over){R.paused=false;last=performance.now()}}});return}}

