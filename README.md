# ピコーン・クエスト3

ブラウザで遊べる、ドット絵のサバイバルアクションRPG。[ピコーン・クエスト2](https://github.com/u1908inter/pikon-quest2) の続編。

画面をドラッグして動くだけ。攻撃は自動。押しよせる敵を倒し、技を「ピコーン！」とひらめき、仲間・装備・ジョブを育てて魔王ピコールを目指す。魔界を10周したあとは、どこまでも続く「無限の深淵」が待っている。

## 遊び方

`index.html` をブラウザで開く（スマホ向けの縦画面）。BGM は `bgm/` フォルダの mp3 を読みこむので、`index.html` と同じ場所に置く。

## ファイル構成

| 場所 | 中身 |
|---|---|
| `src/shell.html` | HTML と CSS（スクリプトの場所に `/*@@JS@@*/` の目印） |
| `src/js/*.js` | ゲームのスクリプト。`src/js/ORDER.txt` の順に つなげる |
| `build.py` | ビルド。`python3 build.py` で `index.html`（GitHub Pages 用・アクセス解析あり）と `artifact.html`（アクセス解析なし）、`--dev` で `dev.html`（テスト用） |
| `bgm/` | BGM（草原・森・洞窟・砂漠・雪山・魔界・拠点） |
| `tests/` | 自動テスト（Playwright）。`sh tests/run_all.sh` |
| `sim/` | バランスの シミュレーション（自動プレイ） |

## 開発の流れ

1. `src/js/` を編集する
2. `python3 build.py --dev` で `dev.html` を作って動作確認
3. `sh tests/run_all.sh` でテスト（`pip install playwright && playwright install chromium` が 必要）
4. `python3 build.py` で `index.html` を作って公開

## 公開とアクセス解析

PLiCy 用の データは `python3 build.py` で `dist/pikon-quest3-plicy.zip`（index.html・game.js・bgm/）に できる。PLiCy では 上の ミニ実況の 帯の ぶん 画面を 下げる（URL に `?plicy` を つけると 手元でも 確認できる）。


GitHub Pages（main ブランチの ルート）で `index.html` を 公開する。`index.html` には GoatCounter（`u1908inter.goatcounter.com`）の 計測タグが 入る。

ゲームの 中では、各イベントを セーブごとに 1回だけ 送る（パスは `pq3-〇〇`。github.io 以外から 遊ばれたときは `pq3-x-〇〇`、PLiCy は `pq3-plicy-〇〇`）。デバッグ用の セーブでは 送らない。

| パス | 内容 |
|---|---|
| `start` | はじめて 出撃 |
| `s0`〜`s5` | 各ステージ 1周目 クリア |
| `r1`〜`r10`… | 魔界 ○周目 クリア |
| `ending` | 魔王 撃破（10周目・エンディング） |
| `a5`, `a10`, … | 無限の深淵 ○分 到達（5分 ごと） |
| `throne` | 真・魔王 撃破 |
| `err12345` | エラー（メッセージごとに 番号） |
| `savefail-…` | セーブ失敗 |

## バランスの シミュレーション

```
python3 build.py --dev
python3 -m http.server 8766 &
python3 sim/prog.py A 600 "" rd10          # 新規データから 魔界10周目まで（最大600秒）
LOAD=sim/out/state_A.json python3 sim/prog.py B 1200 "" ab100   # その続きから 深淵100分まで
python3 sim/summ.py A B                     # 到達時間の まとめ（sim/ フォルダで 実行）
```

3つ目の引数で、`DIF`（周回の強さ）や `ABY`（深淵の強さ）を 書きかえて ためせる。例：`"ABY.hp=1.14;DIF.rdExp=1.15"`

## デバッグ

設定 → セーブ の いちばん下の バージョン表示を 7回 タップすると、デバッグ メニュー（エンドコンテンツから 試す など）が 出る。URL に `?debug` を つけても 出る。

## 作者

u1908inter
