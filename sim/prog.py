import asyncio,json,sys,time
from playwright.async_api import async_playwright
TAG=sys.argv[1]; WALL=int(sys.argv[2]); DIFJ=sys.argv[3] if len(sys.argv)>3 else ''; STOP=sys.argv[4] if len(sys.argv)>4 else ''; MODE=sys.argv[5] if len(sys.argv)>5 else 'good'
import os
HERE=os.path.dirname(os.path.abspath(__file__))
OUT=os.path.join(HERE,f'out/prog_{TAG}.jsonl');os.makedirs(os.path.join(HERE,'out'),exist_ok=True)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e.stack)[:400]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear()");await pg.reload();await pg.wait_for_timeout(300)
        await pg.evaluate("PQ3.ev('SV.opt.tips=false;R=null')")
        await pg.evaluate("c=>PQ3.ev(c)",open(os.path.join(HERE,'sim2.js')).read())
        await pg.evaluate("PQ3.ev('sfx.gem=()=>{};sfx.hit=()=>{};window.TOT=0;window.RUNS=0;window.MS={}')");await pg.evaluate("m=>PQ3.ev('SIM.mode=\"'+m+'\"')",MODE)
        if DIFJ: await pg.evaluate('c=>PQ3.ev(c)',DIFJ)
        import os
        if os.environ.get('LOAD'):
            st=open(os.environ['LOAD']).read();await pg.evaluate("s=>PQ3.ev('(()=>{const o=JSON.parse(atob(\"'+s+'\"));for(const k in SV)delete SV[k];Object.assign(SV,o);SV.opt.tips=false})()')",__import__('base64').b64encode(st.encode()).decode())
            await pg.evaluate("PQ3.ev('window.TOT=0;window.RUNS=0;window.MS={}')")
        f=open(OUT,'w');t0=time.time();i=0
        while time.time()-t0<WALL:
            i+=1
            js="""(()=>{SIM.camp();let r;const open=abyssOpen()&&(SV.clear[5]||0)>=10;
             if(open){const eb=SV.endBest||0,sm=Math.max(0,Math.floor(eb/300)*5-10);r=SIM.run(0,1,'endless',sm);r.mode='abyss';r.sm=sm}
             else{const[st,rd]=SIM.next();r=SIM.run(st,rd);if(r.win)SIM.lose=0;else SIM.lose++;r.mode='stage'}
             TOT+=r.played;RUNS++;const ms=[];
             for(let k=1;k<=10;k++)if((SV.clear[5]||0)>=k&&!MS['rd'+k]){MS['rd'+k]=[TOT,RUNS];ms.push('rd'+k)}
             for(let m=5;m<=100;m+=5)if((SV.endBest||0)>=m*60&&!MS['ab'+m]){MS['ab'+m]=[TOT,RUNS];ms.push('ab'+m)}
             return JSON.stringify({r,TOT,RUNS,ms,rank:SV.lv,best:SV.endBest||0,mast:mastered().length,altar:altarSum(),clear:SV.clear,party:SV.party.length})})()"""
            out=await pg.evaluate("c=>PQ3.ev(c)",js)
            f.write(out+'\n');f.flush()
            if STOP and ('"'+STOP+'"') in out: break
        st=await pg.evaluate("PQ3.ev('JSON.stringify(SV)')");open(os.path.join(HERE,f'out/state_{TAG}.json'),'w').write(st)
        f.write(json.dumps({'end':True,'errs':errs[:5]})+'\n');f.close();await b.close()
asyncio.run(main())
