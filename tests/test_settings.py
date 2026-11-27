import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.setItem('pq3-vs',JSON.stringify({opt:{sound:true,zoom:true,tips:false},lv:20,runs:30,clears:20,gold:500,clear:[5,5,5,5,5,5],heard:{camp:1,grass:1},allies:{slime:{lv:20,exp:0}},party:['slime'],waza:{kabuto:{star:6,exp:0}}}))")
        await pg.reload();await pg.wait_for_timeout(400)
        # backup reminder pops at 5s maybe; manual save on top
        await pg.click('[data-act=saveNow]');await pg.wait_for_timeout(200)
        print('toast:',await pg.evaluate("[...document.querySelectorAll('.toast')].map(t=>t.textContent)"))
        print('row:',await pg.inner_text('[data-act=saveNow] >> xpath=..'))
        await pg.click('[data-tab=cfg]')
        for v in ['play','perf','snd','save']:
            await pg.click(f'[data-act=cfgv][data-v={v}]');await pg.wait_for_timeout(80)
            await pg.screenshot(path=f'/tmp/cfg_{v}.png',full_page=True)
        await pg.click('[data-act=cfgv][data-v=perf]')
        await pg.click('[data-act=q][data-v=low]');await pg.click('[data-act=tgl][data-k=meter][data-v="1"]')
        await pg.click('[data-act=tilt][data-v="0"]');await pg.wait_for_timeout(300)
        await pg.screenshot(path='/tmp/pq3test_tilt0.png',clip={'x':0,'y':0,'width':393,'height':330})
        await pg.click('[data-act=tilt][data-v="0.0026"]');await pg.wait_for_timeout(300)
        await pg.screenshot(path='/tmp/pq3test_tilt3.png',clip={'x':0,'y':0,'width':393,'height':330})
        print('opt',await pg.evaluate("JSON.stringify(PQ3.SV.opt)"))
        await pg.click('[data-act=cfgv][data-v=snd]');await pg.click('[data-act=soundTest]');await pg.wait_for_timeout(100)
        await pg.click('[data-snd=grass]');await pg.wait_for_timeout(100);await pg.screenshot(path='/tmp/pq3test_sndtest.png')
        await pg.click('#stc')
        # run in low quality with tilt strong
        await pg.click('[data-tab=go]');await pg.click('[data-act=sortie]');await pg.wait_for_timeout(4000)
        await pg.evaluate("PQ3.ev('R.t=100')");await pg.wait_for_timeout(3000)
        print('run',await pg.evaluate("PQ3.ev('JSON.stringify({en:R.en.length,parts:R.parts.length,nums:R.nums.length,hp:R.hp})')"),await pg.inner_text('#fpsM'))
        await pg.screenshot(path='/tmp/pq3test_runlow.png')
        print('errs',errs);await b.close()
asyncio.run(main())
