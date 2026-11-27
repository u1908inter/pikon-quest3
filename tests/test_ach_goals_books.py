import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false},lv:120,runs:200,gold:9999,clear:[10,10,10,10,10,10],endBest:6100,altar:{atk:30,hp:25}}))")
        await pg.reload();await pg.wait_for_timeout(500)
        print(await pg.evaluate("PQ3.ev('JSON.stringify([ACH.length,GOALS.length,GOALS.map(g=>g[0]).join(\",\"),Object.keys(SV.ach).length,auraLv(),perkKeysOn().length,PERKS.length,BOOKS.length])')"))
        await pg.click('[data-act=goalList]');await pg.wait_for_timeout(100);await pg.screenshot(path='/tmp/pq3test_goals3.png');await pg.click('#glc')
        await pg.click('[data-tab=rec]');await pg.click('[data-act=recv][data-v=book]');await pg.wait_for_timeout(100);await pg.screenshot(path='/tmp/pq3test_books.png',full_page=True)
        await pg.click('[data-tab=town]');await pg.click('[data-act=townv][data-v=deco]');await pg.click('[data-act=colSel][data-k=rainbow]');await pg.wait_for_timeout(300)
        await pg.screenshot(path='/tmp/pq3test_rainbow.png',clip={'x':0,'y':40,'width':393,'height':250})
        print(errs);await b.close()
asyncio.run(main())
