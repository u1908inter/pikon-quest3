"""紹介ページ用の 動画（戦闘・ボス）を assets/ に 作る（開発用）。
python3 build.py --dev して http://localhost:8766/ で 配信してから 実行する。ffmpeg が 必要。"""
import asyncio,os,time,subprocess,glob,shutil,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from shots import EARLY
from playwright.async_api import async_playwright
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets')
TMP='/tmp/pq3vid'
SCENES=[('battle',"closeModal();SV.opt.nums='crit';SV.sel={st:3,rd:1};startRun();R.t=82;window.__mv=setInterval(()=>{const t=performance.now()/1000,a=t*0.9+Math.sin(t*0.7)*1.2;stick.x=Math.cos(a);stick.y=Math.sin(a)*.85},40)",[(3.6,"R.jg=1;jobSkill()")],8.0),
        ('boss',"closeModal();SV.opt.nums='crit';SV.sel={st:1,rd:1};startRun();R.t=115.5",[],8.0)]
async def main():
    shutil.rmtree(TMP,ignore_errors=True)
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for name,js,acts,dur in SCENES:
            ctx=await b.new_context(viewport={'width':390,'height':780},record_video_dir=TMP+'/'+name,record_video_size={'width':390,'height':780})
            t0=time.time();pg=await ctx.new_page();await pg.route('**/fonts.*/**',lambda r:r.abort())
            await pg.goto('http://localhost:8766/dev.html');await pg.wait_for_timeout(200)
            await pg.evaluate("c=>PQ3.ev(c)",EARLY);await pg.evaluate("window._noSave=1");await pg.reload();await pg.wait_for_timeout(400)
            await pg.evaluate("PQ3.ev('closeModal()')")
            await pg.evaluate("c=>PQ3.ev(c)","(()=>{for(let i=0;i<6;i++)SV.inv.push(makeItem(1));recommendEq();"+js+"})()")
            await pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove())")
            await pg.wait_for_timeout(1500);start=time.time()-t0
            el=0
            for at,a in acts:
                await pg.wait_for_timeout(int((at-el)*1000));el=at;await pg.evaluate("c=>PQ3.ev(c)",a)
            await pg.wait_for_timeout(int((dur-el)*1000)+300)
            await ctx.close()
            src=glob.glob(TMP+'/'+name+'/*.webm')[0]
            subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','%.2f'%start,'-i',src,'-t','%.2f'%dur,'-an','-vf','fps=30,scale=360:-2:flags=lanczos','-c:v','libx264','-preset','veryfast','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart',OUT+'/'+name+'.mp4'],check=True)
            subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','1.0','-i',OUT+'/'+name+'.mp4','-frames:v','1','-q:v','4',OUT+'/'+name+'.jpg'],check=True)
            print(name,os.path.getsize(OUT+'/'+name+'.mp4'))
        await b.close()
asyncio.run(main())
