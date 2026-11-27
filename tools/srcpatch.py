"""src/js と src/shell.html に まとめて 置きかえを あてる 補助（開発用）。
使い方: from srcpatch import rep, done ; rep(old,new[,cnt]) ; done()"""
import os,sys,glob
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src')
FILES=sorted(glob.glob(os.path.join(D,'js','*.js')))+[os.path.join(D,'shell.html')]
TXT={f:open(f,encoding='utf-8').read() for f in FILES}
def rep(a,b,cnt=1):
    hits=[(f,TXT[f].count(a)) for f in FILES if a in TXT[f]];n=sum(c for _,c in hits)
    if n!=cnt: sys.exit('anchor count %d: %s'%(n,a[:90]))
    for f,_ in hits: TXT[f]=TXT[f].replace(a,b)
def done():
    for f in FILES:
        if open(f,encoding='utf-8').read()!=TXT[f]: open(f,'w',encoding='utf-8').write(TXT[f])
    print('ok')
