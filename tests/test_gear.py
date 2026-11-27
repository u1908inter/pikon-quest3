import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false},lv:50,runs:9,gold:99999,abyss:200,clear:[10,10,10,10,10,10],endBest:1300,prevJob:'mahou'}))")
        await pg.reload();await pg.wait_for_timeout(400)
        # generate items in abyss context
        r=await pg.evaluate("""PQ3.ev(`(()=>{startRun('endless');R.t=900;const out=[];for(let i=0;i<400;i++){const it=makeItem(2);out.push(it)}const sh=out.filter(i=>i.shiny).length,lg=out.filter(i=>i.lg).length,st=out.filter(i=>i.set).length,dp=out.filter(i=>i.afx.some(a=>a.k==='deep')).length;
        const best=out.slice(0,12);best[0].shiny=1;best[1].r=3;best[1].lg='dual';best[2].set='kensei';best[3].set='kensei';best[4].set='kensei';best[3].slot='s';best[4].slot='c';
        best[5].afx.forEach(a=>a.q=1);R.over=true;R=null;SV.inv.push(...best);SV.eq.w=best[2].id;SV.eq.s=best[3].id;SV.eq.c=best[4].id;save();
        return JSON.stringify({sh,lg,st,dp,alv:out[0].alv,sample:out[0]})})()`)""")
        print(r[:600])
        print('flags',await pg.evaluate("PQ3.ev('JSON.stringify([flags().sword.toFixed(2),flags().crit.toFixed(2),setCount()])')"))
        await pg.evaluate("PQ3.ev('setMode(\"camp\");TAB=\"gear\";GEARV=\"inv\";renderCamp()')");await pg.wait_for_timeout(200)
        await pg.click('[data-act=want][data-v=dmg]');await pg.click('[data-act=gf][data-v=sp]');await pg.wait_for_timeout(100)
        await pg.screenshot(path='/tmp/pq3test_gear1.png',full_page=True)
        iid=await pg.evaluate("PQ3.SV.inv[5].id")
        await pg.evaluate(f"PQ3.ev('itemModal(\"{iid}\",\"\")')");await pg.wait_for_timeout(100)
        await pg.click('#mbox [data-m=al0]');g0=await pg.evaluate("PQ3.SV.gold")
        await pg.click('#mbox [data-m=rr]');await pg.wait_for_timeout(100)
        print('rr',g0,await pg.evaluate("PQ3.SV.gold"),await pg.evaluate("JSON.stringify(PQ3.SV.inv[5].afx)"))
        await pg.screenshot(path='/tmp/pq3test_item1.png')
        await pg.evaluate("PQ3.ev('closeModal();GEARV=\"eq\";renderCamp()')");await pg.click('[data-act=eqsSave]')
        await pg.evaluate("PQ3.ev('SV.eq.w=null;renderCamp()')");await pg.click('[data-act=eqsLoad]')
        print('eqset',(await pg.evaluate("PQ3.ev('JSON.stringify([SV.eq.w===SV.inv[2].id])')")))
        await pg.screenshot(path='/tmp/pq3test_gear2.png',full_page=True)
        # run: drops pop
        await pg.evaluate("PQ3.ev(\"startRun('endless');R.t=600;const it=makeItem(3);it.shiny=1;R.gems.push({x:R.x+20,y:R.y,k:'item',item:it})\")");await pg.wait_for_timeout(600)
        await pg.screenshot(path='/tmp/pq3test_drop.png')
        print(errs);await b.close()
asyncio.run(main())
