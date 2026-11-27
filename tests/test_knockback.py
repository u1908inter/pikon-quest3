import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':393,'height':820})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8766/dev.html');await pg.evaluate("window._noSave=1;localStorage.clear()");await pg.reload();await pg.wait_for_timeout(300)
        r=await pg.evaluate("""PQ3.ev(`(()=>{SV.opt.tips=false;startRun();R.paused=true;R.en=[];R.weapons={};R.waza={};R.allies=[];const out=[];
         for(let k=0;k<20;k++){const e=spawn('slime',R.x+50,R.y+(k%5-2)*4);e.hp=e.max=1e9;e.vx=-700;e.vy=(Math.random()-.5)*80;R.inv=0;const h0=R.hp;let minD=1e9;
          for(let i=0;i<60;i++){step(1/60);minD=Math.min(minD,Math.hypot(e.x-R.x,e.y-R.y))}
          out.push([h0-R.hp,Math.round(minD),Math.round(Math.hypot(e.x-R.x,e.y-R.y))]);R.en=[]}
         const e2=spawn('slime',R.x+30,R.y);e2.hp=e2.max=1e9;R.inv=0;const h1=R.hp;for(let i=0;i<120;i++)step(1/60);
         return JSON.stringify({fly:out,walkHit:h1-R.hp})})()`)""")
        print(r);print(errs);await b.close()
asyncio.run(main())
