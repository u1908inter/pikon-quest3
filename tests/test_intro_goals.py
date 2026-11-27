import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)+' | '+str(e.stack)[:300]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear()");await pg.reload();await pg.wait_for_timeout(500)
        print('welcome:',(await pg.inner_text('#mbox'))[:60].replace('\n',' / '),await pg.evaluate("document.getElementById('modal').hidden"))
        await pg.screenshot(path='/tmp/pq3test_intro.png')
        await pg.click('#iok');await pg.wait_for_timeout(100)
        print('panel:',(await pg.inner_text('#panel'))[:220].replace('\n',' / '))
        await pg.click('[data-act=goalList]');await pg.wait_for_timeout(100);await pg.screenshot(path='/tmp/pq3test_goallist.png');await pg.click('#glc')
        # start run, tips
        await pg.click('[data-act=sortie]');await pg.wait_for_timeout(1200)
        print('tip1:',(await pg.inner_text('#mbox'))[:50].replace('\n',' / '),await pg.evaluate("PQ3.R.paused"))
        await pg.screenshot(path='/tmp/pq3test_tip.png')
        await pg.click('#tok');await pg.wait_for_timeout(300);print('resumed',await pg.evaluate("PQ3.R.paused"))
        await pg.evaluate("PQ3.ev('R.boss=spawn(STAGES[0].boss,R.x,R.y-60)')");await pg.wait_for_timeout(800)
        print('tip2:',(await pg.inner_text('#mbox'))[:40].replace('\n',' / '))
        await pg.evaluate("PQ3.ev('closeModal();R.paused=false;endRun(true)')");await pg.wait_for_timeout(300)
        print('result:',(await pg.inner_text('#mbox')).replace('\n',' / ')[:500])
        await pg.evaluate("PQ3.ev('toCamp()')");await pg.wait_for_timeout(200)
        print('tabs:',await pg.inner_text('#tabs'))
        # claim
        n=await pg.locator('[data-act=goalClaim]:not([disabled])').count();print('claimable',n)
        g0=await pg.evaluate("PQ3.SV.gold")
        await pg.click('[data-act=goalClaim]:not([disabled]) >> nth=0');await pg.wait_for_timeout(100)
        print('gold',g0,'->',await pg.evaluate("PQ3.SV.gold"),await pg.evaluate("JSON.stringify(PQ3.SV.goals)"))
        # tabs intros
        for t in ['job','town','rec','cfg']:
            await pg.evaluate(f"PQ3.ev('TAB_COND.{t}=()=>true')") if False else None
        await pg.evaluate("PQ3.ev('SV.runs=3;renderCamp()')");await pg.wait_for_timeout(100)
        for t in ['job','town','rec','cfg']:
            await pg.click(f'[data-tab={t}]');await pg.wait_for_timeout(120)
            print(t,'intro:',(await pg.inner_text('#mbox'))[:30].replace('\n',' / '))
            if await pg.evaluate("!document.getElementById('modal').hidden"): await pg.click('#iok');await pg.wait_for_timeout(80)
        await pg.click('[data-act=help]');await pg.wait_for_timeout(100);await pg.screenshot(path='/tmp/pq3test_help.png');await pg.click('#hlc')
        await pg.click('[data-tab=rec]');print('ach count',await pg.evaluate("PQ3.ev('ACH.length')"))
        print('errs',errs)
        await b.close()
asyncio.run(main())
