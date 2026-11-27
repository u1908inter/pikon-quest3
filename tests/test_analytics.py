import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false},clear:[9,9,9,9,9,9],sel:{st:5,rd:10}}))");await pg.reload();await pg.wait_for_timeout(300)
        await pg.evaluate("window.GCC=[];window.goatcounter={count:o=>GCC.push(o.path)}")
        await pg.evaluate("PQ3.ev('SV.clear=[10,10,10,10,10,9];SV.sel={st:5,rd:10};startRun();endRun(true);toCamp();startRun();endRun(true);toCamp();SV.endBest=640;startRun(\"endless\");R.t=640;R.hp=0;window.NOFREEZE=1;endRun(false)')")
        print(await pg.evaluate("JSON.stringify(GCC)"));print(errs);await b.close()
asyncio.run(main())
