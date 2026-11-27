#!/usr/bin/env python3
"""ピコーン・クエスト3 のビルド。
src/shell.html に src/js/ の各ファイル（ORDER.txt の順）を埋めこんで 1つの HTML に する。
  python3 build.py        → index.html（GitHub Pages 用。アクセス解析 GoatCounter あり）
                             artifact.html（Claude の アーティファクト用。アクセス解析なし）
  python3 build.py --dev  → dev.html（テスト用。window.PQ3.ev が 使える）
"""
import sys,os
D=os.path.dirname(os.path.abspath(__file__))
order=[l.strip() for l in open(os.path.join(D,'src/js/ORDER.txt'),encoding='utf-8') if l.strip()]
js=''.join(open(os.path.join(D,'src/js',f),encoding='utf-8').read() for f in order)
shell=open(os.path.join(D,'src/shell.html'),encoding='utf-8').read()
html=shell.replace('\n/*@@JS@@*/\n',js)
DEV='window.PQ3={get R(){return R},SV,ev:s=>eval(s)};'
REL='window.PQ3={get R(){return R},SV};'
GC='<script data-goatcounter="https://u1908inter.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>'
def wr(name,h):
    out=os.path.join(D,name);open(out,'w',encoding='utf-8').write(h);print('wrote',out,len(h),'bytes')
if '--dev' in sys.argv: wr('dev.html',html.replace('<!--GC-->',''))
else:
    rel=html.replace(DEV,REL)
    wr('index.html',rel.replace('<!--GC-->',GC))
    wr('artifact.html',rel.replace('<!--GC-->',''))
