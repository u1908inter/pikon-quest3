import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false},lv:150,runs:9,gold:9999,abyss:500,clear:[2,2,2,2,2,2],endBest:100,allies:{slime:{lv:99,exp:0,evo:1},bat:{lv:99,exp:0}},party:['slime','bat']}))")
        await pg.reload();await pg.wait_for_timeout(400)
        f0=await pg.evaluate("PQ3.ev('JSON.stringify([flags().dmg.toFixed(3),maxHP(),heroLB().toFixed(3)])')");print('before',f0)
        await pg.click('[data-tab=town]');await pg.click('[data-act=townv][data-v=altar]');await pg.wait_for_timeout(100)
        for k in ['atk','atk','hp','ally','cut','xp']: await pg.click(f'[data-act=altar][data-k={k}]')
        print('altar',await pg.evaluate("PQ3.ev('JSON.stringify([SV.altar,SV.abyss,flags().dmg.toFixed(3),flags().taken.toFixed(3),maxHP()])')"))
        await pg.screenshot(path='/tmp/pq3test_altar.png',full_page=True)
        # ally exp beyond 99
        print('ally',await pg.evaluate("PQ3.ev('startRun();R.xpTot=200000;endRun(false);JSON.stringify([SV.allies.slime.lv,SV.allies.bat.lv,allyMul(SV.allies.slime).toFixed(2)])')"))
        print((await pg.inner_text('#mbox'))[:300].replace('\n',' / '))
        print(errs);await b.close()
asyncio.run(main())
