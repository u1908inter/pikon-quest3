"""紹介ページ用の スクリーンショットを assets/ に 作る（開発用）。
ネタバレを さけるため、序盤〜中盤の 状態で 撮る。
python3 build.py --dev して http://localhost:8766/ で 配信してから 実行する。"""
import asyncio,os
from playwright.async_api import async_playwright
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets')
EARLY="""(()=>{const S={opt:{tips:false,autoLv:true,dbgGod:true,meter:false,nums:'all'},lv:16,exp:0,gold:2400,runs:14,clears:9,clear:[2,2,1,1,0,0],sel:{st:1,rd:2},
 job:'kenshi',jobs:{kenshi:{lv:6,exp:0},mahou:{lv:3,exp:0},mamono:{lv:2,exp:0},suppin:{lv:1,exp:0}},abil:['kenshi0','kenshi1','kenshi2'],
 allies:{slime:{lv:9,exp:0},bat:{lv:7,exp:0},wolf:{lv:6,exp:0},mush:{lv:4,exp:0}},party:['slime','bat','wolf'],
 waza:{kabuto:{star:2,exp:0},kaiten:{star:3,exp:0}},bring:['kaiten','kabuto'],up:{atk:2,hp:2,spd:1,slot:2},album:{slime:1,bat:1,mush:1,wolf:1},cards:{slime:1,bat:1},
 seen:{},ach:{},backupAsked:{r1:1,r3:1,r5:1,th:1,r10:1,r20:1},goals:{g_run:1,g_lv3:1,g_c0:1,g_hira:1,g_ally:1,g_inv:1,g_c1:1}};
 for(const k in INTRO)S.seen[k]=1;TIPS.forEach(t=>S.seen[t[0]]=1);ACH.forEach(a=>S.ach[a[0]]=1);
 window._noSave=1;localStorage.setItem('pq3-vs',JSON.stringify(S))})()"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780},device_scale_factor=2)
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        async def fresh(js):
            await pg.goto('http://localhost:8766/dev.html');await pg.wait_for_timeout(200)
            await pg.evaluate("c=>PQ3.ev(c)",EARLY);await pg.evaluate("window._noSave=1");await pg.reload();await pg.wait_for_timeout(400)
            await pg.evaluate("PQ3.ev('closeModal()')")
            await pg.evaluate("c=>PQ3.ev(c)","(()=>{for(let i=0;i<6;i++)SV.inv.push(makeItem(1));recommendEq();"+js+"})()");await pg.wait_for_timeout(200)
        async def shot(name):
            await pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove())");await pg.screenshot(path=OUT+'/'+name);print(name)
        await fresh("closeModal();SV.opt.nums='crit';SV.sel={st:3,rd:1};startRun();R.t=85");await pg.wait_for_timeout(6000)
        await pg.evaluate("PQ3.ev('R.jg=1;jobSkill()')");await pg.wait_for_timeout(260);await shot('battle.png')
        await fresh("closeModal();SV.sel={st:1,rd:1};startRun();R.t=116");await pg.wait_for_timeout(7000);await shot('boss.png')
        await fresh("""SV.clear=[3,3,2,2,2,1];const it=makeItem(0,{r:3,slot:'w',wt:'sword'});it.lg='wdbl';it.set='kensei';it.afx.forEach((a,i)=>a.q=[.97,.88,.95,.99][i]||.9);it.ref=4;SV.inv.unshift(it);SV.eq.w=it.id;SV.want={dmg:1};closeModal();TAB='gear';renderCamp();itemModal(it.id,'')""")
        await pg.wait_for_timeout(300);await shot('gear.png')
        await fresh("closeModal();TAB='go';GOV='stage';renderCamp()");await pg.wait_for_timeout(1500);await shot('camp.png')
        await b.close()
asyncio.run(main())
