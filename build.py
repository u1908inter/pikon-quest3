#!/usr/bin/env python3
"""ピコーン・クエスト3 のビルド。
src/shell.html に src/js/ の各ファイル（ORDER.txt の順）を埋めこんで 1つの HTML に する。
  python3 build.py        → index.html（公開用）
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
dev='--dev' in sys.argv
if not dev: html=html.replace(DEV,REL)
out=os.path.join(D,'dev.html' if dev else 'index.html')
open(out,'w',encoding='utf-8').write(html)
print('wrote',out,len(html),'bytes')
