import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.clear();localStorage.setItem('pq3-vs',JSON.stringify({opt:{tips:false},lv:20,runs:3,gold:5000,clear:[2,2,2,2,2,1],sel:{st:5,rd:2}}))")
        await pg.reload();await pg.wait_for_timeout(400)
        print('v',await pg.evaluate("PQ3.SV.v"),'dbg tab',await pg.locator('[data-act=cfgv][data-v=dbg]').count())
        # lose 3 times on 魔界2
        for i in range(3):
            await pg.evaluate("PQ3.ev('startRun();R.t=30;endRun(false)')");await pg.wait_for_timeout(150)
            t=await pg.inner_text('#mbox')
            await pg.evaluate("PQ3.ev('toCamp()')")
        print('stuck:',[l for l in t.split('\n') if '💡' in l])
        await pg.evaluate("PQ3.ev('startRun()')");await pg.wait_for_timeout(600)
        print('banner',await pg.evaluate("PQ3.ev('JSON.stringify([R.banner&&R.banner.t,R.F.dmg.toFixed(2)])')"))
        await pg.evaluate("PQ3.ev('endRun(true);toCamp()')")
        # town locks
        await pg.click('[data-tab=town]');await pg.wait_for_timeout(100)
        print('town chips',await pg.evaluate("[...document.querySelectorAll('[data-act=townv]')].map(b=>b.textContent).join(',')"))
        await pg.click('[data-act=townv][data-v=swap]');await pg.wait_for_timeout(100)
        print('toast',await pg.evaluate("[...document.querySelectorAll('.toast')].map(t=>t.textContent)"))
        # history
        await pg.click('[data-tab=rec]');await pg.click('[data-act=recv][data-v=hist]');await pg.wait_for_timeout(100)
        await pg.screenshot(path='/tmp/pq3test_hist.png',full_page=True)
        # perks hidden
        await pg.click('[data-tab=go]');await pg.click('[data-act=gov][data-v=perk]');await pg.wait_for_timeout(100)
        print('perk text',(await pg.inner_text('#panel'))[100:400].replace('\n',' / '))
        # error safety: inject throw in draw
        await pg.evaluate("PQ3.ev('startRun();R.en.push({x:R.x,y:R.y-20})')");await pg.wait_for_timeout(800);print('alive t',await pg.evaluate('PQ3.R.t'));await pg.evaluate("PQ3.ev('R.en.pop();endRun(false);toCamp()')")
        await pg.click('[data-tab=cfg]');await pg.click('[data-act=cfgv][data-v=save]');await pg.wait_for_timeout(100)
        print('errlog',await pg.evaluate("PQ3.ev('ERRLOG.length')"),(await pg.inner_text('#panel'))[-200:].replace('\n',' / '))
        for i in range(7): await pg.click('[data-act=verTap]')
        print('dbg after taps',await pg.locator('[data-act=cfgv][data-v=dbg]').count())
        print(errs);await b.close()
asyncio.run(main())
