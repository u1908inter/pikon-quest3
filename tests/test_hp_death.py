import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false},lv:20,runs:3,clear:[3,3,3,3,3,2],sel:{st:5,rd:3}}))")
        await pg.reload();await pg.wait_for_timeout(400)
        await pg.evaluate("PQ3.ev('startRun()')");await pg.wait_for_timeout(1500)
        await pg.evaluate("PQ3.ev('R.hp=R.max*.22;const e=R.en[0]||spawn(STAGES[5].elite,R.x+10,R.y);R.inv=0;hurtHero(5,e)')");await pg.wait_for_timeout(120)
        await pg.screenshot(path='/tmp/pq3test_hp1.png')
        await pg.evaluate("PQ3.ev('const e=spawn(STAGES[5].elite,R.x+12,R.y-6);for(let i=0;i<6;i++){R.inv=0;R.t+=.3;hurtHero(R.max*.05,R.en[i%R.en.length])}R.inv=0;R.t+=.2;hurtHero(R.max*.6,e)')");await pg.wait_for_timeout(500)
        await pg.screenshot(path='/tmp/pq3test_death1.png')
        await pg.wait_for_timeout(1400)
        await pg.screenshot(path='/tmp/pq3test_death2.png')
        print((await pg.inner_text('#mbox'))[:400].replace('\n',' / '))
        print(errs);await b.close()
asyncio.run(main())
