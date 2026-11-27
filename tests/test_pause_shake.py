import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false}}))");await pg.reload();await pg.wait_for_timeout(300)
        await pg.click('[data-act=sortie]');await pg.wait_for_timeout(800);await pg.click('#pause');await pg.wait_for_timeout(200)
        await pg.click('#pshk [data-v="0"]');await pg.wait_for_timeout(100);await pg.screenshot(path='/tmp/pq3test_pause.png')
        await pg.click('#phs [data-v="weak"]');await pg.wait_for_timeout(100)
        print(await pg.evaluate("PQ3.ev('shake(9);JSON.stringify([SV.opt.shake,R.shk,SV.opt.hs])')"));await pg.click('#rs')
        print(errs);await b.close()
asyncio.run(main())
