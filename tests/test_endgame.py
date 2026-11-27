import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)+' | '+str(e.stack)[:300]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html')
        await pg.evaluate("window._noSave=1;localStorage.setItem('pq3-vs',JSON.stringify({opt:{sound:true,zoom:true,tips:false},lv:60,runs:30,clears:20,gold:200000,job:'kenshi',jobs:{kenshi:{lv:10,exp:0},mahou:{lv:10,exp:0}},clear:[10,10,10,10,10,10],allies:{slime:{lv:20,exp:0},king:{lv:20,exp:0}},party:['slime','king'],up:{atk:5,hp:5,spd:5,slot:4},waza:{kabuto:{star:6,exp:0}},abyss:100,endBest:1300}))")
        await pg.reload();await pg.wait_for_timeout(400)
        print('ach',await pg.evaluate("PQ3.ev('JSON.stringify(Object.keys(SV.ach||{}))')"))
        # tabs
        for t in ['go','rec','town','cfg']:
            await pg.click(f'[data-tab={t}]');await pg.wait_for_timeout(80)
        await pg.click('[data-tab=go]')
        for v in ['abyss','trial','perk','throne','stage']:
            await pg.click(f'[data-act=gov][data-v={v}]');await pg.wait_for_timeout(60)
        await pg.click('[data-tab=rec]');await pg.click('[data-act=recv][data-v=book]');await pg.click('[data-act=recv][data-v=ach]')
        await pg.click('[data-act=title] >> nth=0');print('title',await pg.evaluate("PQ3.SV.title"))
        await pg.click('[data-tab=town]');await pg.click('[data-act=townv][data-v=deco]')
        for k in ['d_flag','d_statue','d_lantern','f_blue','c_gold']:
            await pg.click(f'[data-act=cosBuy][data-k={k}]');await pg.wait_for_timeout(50)
        print('cos',await pg.evaluate("PQ3.ev('JSON.stringify(SV.cos)')"))
        # camp tap statue
        xy=await pg.evaluate("PQ3.ev('(()=>{const[x,y]=P(-66,-22);const r=cv.getBoundingClientRect();return [r.left+x/VW*r.width,r.top+(y-10)/VH*r.height]})()')")
        await pg.mouse.click(*xy);await pg.wait_for_timeout(200)
        print('bub',await pg.evaluate("PQ3.ev('CAMP.bub.map(b=>b.t)')"))
        await pg.screenshot(path='/tmp/pq3test_camp2.png',clip={'x':0,'y':40,'width':393,'height':260})
        # artifact
        await pg.evaluate("PQ3.ev('SV.inv.push(makeArti(\"time\"));SV.inv.push(makeArti(\"pikon\"));recommendEq();save();renderCamp()')")
        print('artF',await pg.evaluate("PQ3.ev('JSON.stringify([flags().cdm,flags().wazaCd,SV.inv.map(i=>i.name+\":\"+i.r)])')"))
        # upgrade artifact through modal
        aid=await pg.evaluate("PQ3.ev('SV.inv.find(i=>i.a===\"time\").id')")
        await pg.evaluate(f"PQ3.ev('itemModal(\"{aid}\",\"\")')");await pg.wait_for_timeout(100)
        await pg.click('#mbox [data-m=art]');await pg.wait_for_timeout(100)
        print('artLv',await pg.evaluate("PQ3.ev('JSON.stringify([SV.artLv,SV.abyss])')"))
        await pg.evaluate("PQ3.ev('closeModal()')")
        # endless run
        await pg.evaluate("PQ3.ev(\"setMode('camp');startRun('endless');R.t=290\")");await pg.wait_for_timeout(4000)
        print('endless',await pg.evaluate("PQ3.ev('JSON.stringify({st:R.st,sm:R.sm.toFixed(1),boss:!!R.boss,en:R.en.length})')"))
        await pg.evaluate("PQ3.ev('if(R.boss)hurtEnemy(R.boss,1e9);')");await pg.wait_for_timeout(300)
        await pg.evaluate("PQ3.ev('R.hp=0;R.F.guts=0;R.F.revive=0;R.F.phoenix=0;checkDeath()')");await pg.wait_for_timeout(300)
        print((await pg.inner_text('#mbox'))[:200].replace('\n',' / '))
        await pg.evaluate("PQ3.ev('toCamp()')")
        # trial
        print('trial',await pg.evaluate("PQ3.ev('JSON.stringify(todayTrial())')"))
        await pg.evaluate("PQ3.ev(\"startRun('trial')\")");await pg.wait_for_timeout(1500)
        print('trialR',await pg.evaluate("PQ3.ev('JSON.stringify({w:R.weapons,al:R.allies.length,max:R.max,cond:R.cond})')"))
        await pg.evaluate("PQ3.ev('endRun(true)')");await pg.wait_for_timeout(200);print((await pg.inner_text('#mbox'))[:160].replace('\n',' / '));await pg.evaluate("PQ3.ev('toCamp()')")
        # throne
        await pg.evaluate("PQ3.ev(\"startRun('throne')\")");await pg.wait_for_timeout(4500)
        print('throne',await pg.evaluate("PQ3.ev('JSON.stringify({boss:R.boss&&R.boss.T.n,hp:R.boss&&Math.round(R.boss.max)})')"))
        await pg.screenshot(path='/tmp/pq3test_throne.png')
        await pg.evaluate("PQ3.ev('R.hp=R.max;hurtEnemy(R.boss,1e12)')");await pg.wait_for_timeout(2300)
        print((await pg.inner_text('#mbox'))[:220].replace('\n',' / '));await pg.evaluate("PQ3.ev('toCamp()')")
        # evolution generic: katana
        await pg.evaluate("PQ3.ev(\"startRun();R.weapons={katana:5};R.pass={might:1};lvApply({evo:'zantetsu'});R.t=40\")");await pg.wait_for_timeout(2500)
        print('evo',await pg.evaluate("PQ3.ev('JSON.stringify({evoW:R.evoW,k:R.kills})')"))
        await pg.evaluate("PQ3.ev('endRun(false);toCamp()')")
        # perks
        print('perks',await pg.evaluate("PQ3.ev('JSON.stringify([refMax(),abMax(),allySlots(),shopStock(true).length])')"))
        # book rewards claim
        await pg.evaluate("PQ3.ev(\"for(const k in ALLY)SV.allies[k]={lv:1,exp:0};save();renderCamp()\")")
        await pg.click('[data-tab=rec]');await pg.click('[data-act=recv][data-v=book]');await pg.wait_for_timeout(100)
        await pg.click('[data-act=bookrew][data-k=ally]');await pg.wait_for_timeout(100)
        print('book',await pg.evaluate("PQ3.ev('JSON.stringify([SV.bookRew,SV.inv.filter(i=>i.a).map(i=>i.a)])')"))
        await pg.screenshot(path='/tmp/pq3test_rec.png')
        print('errs',errs[:5]);await b.close()
asyncio.run(main())
