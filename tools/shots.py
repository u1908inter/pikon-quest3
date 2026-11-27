"""紹介ページ用の スクリーンショットを assets/ に 作る（開発用）。
python3 build.py --dev して http://localhost:8766/ で 配信してから 実行する。"""
import asyncio,os
from playwright.async_api import async_playwright
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780},device_scale_factor=2)
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        async def fresh(js):
            await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear()");await pg.reload();await pg.wait_for_timeout(300)
            await pg.evaluate("PQ3.ev('closeModal()')");await pg.evaluate("c=>PQ3.ev(c)",js);await pg.wait_for_timeout(200)
        base="debugBuild(10);SV.debug=0;SV.ach={};ACH.forEach(a=>SV.ach[a[0]]=1);SV.opt.tips=false;SV.opt.autoLv=true;SV.opt.dbgGod=true;SV.opt.meter=false;SV.seen={};['tab_go','tab_gear','tab_town','townv_altar','gov_abyss','tab_rec','b_move','b_gem','b_hira','b_jg','b_elite','b_item','b_heart','b_card','b_boss','b_hp','b_rk','b_soul','b_combo','tab_ally','tab_job','tab_waza','tab_card','tab_cfg'].forEach(k=>SV.seen[k]=1);SV.backupAsked={r1:1,r3:1,r5:1,th:1,r10:1,r20:1};"
        # 1 battle (stage, many enemies)
        await fresh(base+"SV.sel={st:2,rd:8};startRun();")
        await pg.wait_for_timeout(9000)
        await pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove())");await pg.screenshot(path=OUT+'/battle.png');print('battle')
        # 2 abyss with aura
        await fresh(base+"SV.endBest=3400;SV.opt.nums='crit';startAbyss(25);")
        await pg.wait_for_timeout(12000)
        await pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove())");await pg.screenshot(path=OUT+'/abyss.png');print('abyss')
        # 3 gear detail
        await fresh(base+"""SV.clear=[10,10,10,10,10,10];const it=makeItem(0,{r:3,slot:'w',wt:'sword'});it.lg='wdbl';it.set='kensei';it.alv=24;it.afx.forEach((a,i)=>a.q=[.97,.88,.95,.99][i]||.9);it.ref=7;SV.inv.unshift(it);SV.eq.w=it.id;SV.want={dmg:1};renderCamp();itemModal(it.id,'')""")
        await pg.wait_for_timeout(300);await pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove())");await pg.screenshot(path=OUT+'/gear.png');print('gear')
        # 4 camp
        await fresh(base+"SV.cos={own:{d_flag:1,d_lantern:1,d_chest:1},deco:{flag:1,lantern:1,chest:1},fire:'',col:''};SV.endBest=2200;TAB='go';GOV='abyss';renderCamp()")
        await pg.wait_for_timeout(1500);await pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove())");await pg.screenshot(path=OUT+'/camp.png');print('camp')
        await b.close()
asyncio.run(main())
