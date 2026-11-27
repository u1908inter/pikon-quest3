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
| `build.py` | ビルド。`python3 build.py` で `index.html`（公開用）、`--dev` で `dev.html`（テスト用） |
| `bgm/` | BGM（草原・森・洞窟・砂漠・雪山・魔界・拠点） |
| `tests/` | 自動テスト（Playwright）。`sh tests/run_all.sh` |
| `sim/` | バランスの シミュレーション（自動プレイ） |

## 開発の流れ

1. `src/js/` を編集する
2. `python3 build.py --dev` で `dev.html` を作って動作確認
3. `sh tests/run_all.sh` でテスト（`pip install playwright && playwright install chromium` が 必要）
4. `python3 build.py` で `index.html` を作って公開

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
