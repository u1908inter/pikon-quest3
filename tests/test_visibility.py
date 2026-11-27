import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear()");await pg.reload();await pg.wait_for_timeout(300)
        await pg.evaluate("PQ3.ev('debugBuild(10);SV.opt.tips=false;SV.opt.dbgGod=true;SV.opt.autoLv=true;startRun()')");await pg.wait_for_timeout(5000)
        await pg.evaluate("PQ3.ev('R.allies.forEach(a=>{a.x=R.x+3;a.y=R.y+2});spawn(STAGES[0].foes[0],R.x+20,R.y+10);spawn(STAGES[0].foes[0],R.x-18,R.y-14)')");await pg.wait_for_timeout(60)
        await pg.screenshot(path='/tmp/pq3test_top1.png')
        print(errs);await b.close()
asyncio.run(main())
