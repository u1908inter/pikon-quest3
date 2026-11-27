"""YouTubeショート用の 縦動画（1080x1920・約30秒・BGMつき）を dist/short/ に 作る（開発用）。
python3 build.py --dev して http://localhost:8766/ で 配信してから 実行する。ffmpeg が 必要。
ネタバレを さけるため、序盤の 状態（tools/shots.py の EARLY）で 撮る。"""
import asyncio,base64,os,time,subprocess,glob,shutil,sys
HERE=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,HERE)
from shots import EARLY
from playwright.async_api import async_playwright
ROOT=os.path.join(HERE,'..');OUT=os.path.join(ROOT,'dist','short');TMP='/tmp/pq3short'
W,H,CAP=1080,1920,300          # 上の 300px が 字幕帯、下の 1080x1620 が ゲーム画面
VW,VH=400,600                   # ゲームの ビューポート（2:3）
MOVE="window.__mv=setInterval(()=>{const t=performance.now()/1000,a=t*0.9+Math.sin(t*0.7)*1.2;stick.x=Math.cos(a);stick.y=Math.sin(a)*.85},40)"
# (名前, 字幕, 小さい字幕, 開始JS, [(秒, JS)], 長さ)
SCENES=[
 ('hook','1プレイ 約2分の','ヴァンサバ風 ドット絵アクション',
  "SV.opt.nums='crit';SV.sel={st:3,rd:1};startRun();R.t=84;"+MOVE,[(1.6,"R.jg=1;jobSkill()")],5.0),
 ('move','攻撃は 自動','操作は 移動だけ',
  "SV.opt.nums='crit';SV.sel={st:2,rd:1};startRun();R.t=70;"+MOVE,[(2.4,"delete SV.waza.kabuto;delete R.waza.kabuto;hirameki('kabuto')")],5.5),
 ('lvup','レベルアップで','強化を えらぶ',
  "SV.opt.nums='crit';SV.opt.autoLv=false;SV.sel={st:1,rd:2};startRun();R.t=40;R.lv=7;"+MOVE,
  [(0.8,"R.queue++;levelUp()"),(2.6,"document.querySelector('#lvc .btn').click()")],4.0),
 ('boss','2分 生きのびたら','ボス戦',
  "SV.opt.nums='crit';SV.sel={st:1,rd:1};startRun();R.t=115.5",[],5.5),
 ('gear','拾った 装備を','くらべて 鍛える',
  """SV.clear=[3,3,2,2,2,1];const it=makeItem(0,{r:3,slot:'w',wt:'sword'});it.lg='wdbl';it.set='kensei';it.afx.forEach((a,i)=>a.q=[.97,.88,.95,.99][i]||.9);it.ref=4;SV.inv.unshift(it);SV.eq.w=it.id;SV.want={dmg:1};TAB='gear';renderCamp()""",
  [(1.0,"itemModal(SV.inv[0].id,'')")],4.5),
]
CAPHTML="""<!doctype html><meta charset=utf-8><style>html,body{margin:0;width:1080px;height:%dpx;background:#14121f;overflow:hidden}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Noto Sans CJK JP';color:#fff;text-align:center}
.a{font-size:96px;font-weight:900;line-height:1.1;text-shadow:0 6px 0 #000}.b{font-size:60px;font-weight:700;color:#ffd34e;margin-top:14px;text-shadow:0 4px 0 #000}</style>
<body>%s</body>"""
ENDHTML="""<!doctype html><meta charset=utf-8><style>html,body{margin:0;width:1080px;height:1920px;background:radial-gradient(circle at 50%% 40%%,#2c2650,#14121f 70%%);overflow:hidden}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Noto Sans CJK JP';color:#fff;text-align:center}
img{width:300px;height:300px;image-rendering:pixelated;border-radius:48px;box-shadow:0 10px 40px #0008}
h1{font-size:120px;font-weight:900;margin:50px 0 10px;line-height:1.1;text-shadow:0 8px 0 #000}
.s{font-size:58px;font-weight:700;color:#ffd34e;margin:8px 0}.m{font-size:52px;color:#cfd;margin:40px 0 0;line-height:1.6}
.p{display:inline-block;margin-top:50px;padding:22px 56px;border-radius:999px;background:#ffd34e;color:#14121f;font-size:56px;font-weight:900}</style>
<body><img src="file://%s"><h1>ピコーン・<br>クエスト3</h1><div class=s>装備厳選 × ヴァンサバ</div>
<div class=m>周回の 先には<br>終わらない 深淵</div><div class=p>無料・ブラウザで あそべる</div></body>"""
def ff(*a):subprocess.run(['ffmpeg','-y','-loglevel','error',*a],check=True)
ENC=['-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-r','30']
async def main():
    shutil.rmtree(TMP,ignore_errors=True);os.makedirs(TMP);os.makedirs(OUT,exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch()
        # 字幕と 最後の 画面
        pg=await b.new_page(viewport={'width':W,'height':CAP})
        for n,a,s,*_ in SCENES:
            await pg.set_content(CAPHTML%(CAP,'<div class=a>'+a+'</div><div class=b>'+s+'</div>'));await pg.wait_for_timeout(100)
            await pg.screenshot(path=TMP+'/cap_'+n+'.png')
        await pg.set_viewport_size({'width':W,'height':H})
        open(TMP+'/end.html','w').write(ENDHTML%os.path.abspath(ROOT+'/assets/icon.png'))
        await pg.goto('file://'+TMP+'/end.html');await pg.wait_for_timeout(300);await pg.screenshot(path=TMP+'/end.png');await pg.close()
        # ゲーム画面の 録画
        for n,a,s,js,acts,dur in SCENES:
            ctx=await b.new_context(viewport={'width':VW,'height':VH},device_scale_factor=2)
            pg=await ctx.new_page();await pg.route('**/fonts.*/**',lambda r:r.abort())
            await pg.goto('http://localhost:8766/dev.html');await pg.wait_for_timeout(200)
            await pg.evaluate("c=>PQ3.ev(c)",EARLY);await pg.evaluate("window._noSave=1");await pg.reload();await pg.wait_for_timeout(400)
            await pg.evaluate("PQ3.ev('closeModal()')")
            await pg.evaluate("c=>PQ3.ev(c)","(()=>{for(let i=0;i<6;i++)SV.inv.push(makeItem(1));recommendEq();closeModal();"+js+"})()")
            await pg.wait_for_timeout(1500);await pg.evaluate("document.querySelectorAll('.toast,.banner').forEach(t=>t.remove())")
            # CDPの スクリーンキャスト（JPEG 92・2倍解像度）で 撮る
            fd=TMP+'/f_'+n;os.makedirs(fd);frames=[];cdp=await ctx.new_cdp_session(pg)
            async def onf(e):
                i=len(frames);open(fd+'/%05d.jpg'%i,'wb').write(base64.b64decode(e['data']));frames.append(e['metadata']['timestamp'])
                try:await cdp.send('Page.screencastFrameAck',{'sessionId':e['sessionId']})
                except Exception:pass
            cdp.on('Page.screencastFrame',lambda e:asyncio.ensure_future(onf(e)))
            await cdp.send('Page.startScreencast',{'format':'jpeg','quality':92,'maxWidth':VW*2,'maxHeight':VH*2,'everyNthFrame':1})
            el=0
            for at,c in acts:
                await pg.wait_for_timeout(int((at-el)*1000));el=at;await pg.evaluate("c=>PQ3.ev(c)",c)
            await pg.wait_for_timeout(int((dur-el)*1000)+300);await cdp.send('Page.stopScreencast');await ctx.close()
            t0=frames[0]
            with open(fd+'/list.txt','w') as f:
                for i in range(len(frames)):
                    nx=frames[i+1] if i+1<len(frames) else frames[i]+1/30
                    f.write("file '%05d.jpg'\nduration %.4f\n"%(i,max(nx-frames[i],0.001)))
                f.write("file '%05d.jpg'\n"%(len(frames)-1))
            ff('-f','concat','-safe','0','-i',fd+'/list.txt','-t','%.2f'%dur,'-i',TMP+'/cap_'+n+'.png','-filter_complex',
               '[0:v]fps=30,scale=%d:%d:flags=lanczos,pad=%d:%d:0:%d:color=#14121f[g];[g][1:v]overlay=0:0,format=yuv420p'%(W,H-CAP,W,H,CAP),
               '-an',*ENC,TMP+'/s_'+n+'.tmp.mp4')
            os.rename(TMP+'/s_'+n+'.tmp.mp4',TMP+'/s_'+n+'.mp4');print(n)
        await b.close()
    ff('-framerate','30','-i',TMP+'/end.png','-vf','format=yuv420p,loop=-1:1,trim=duration=4,fade=in:st=0:d=0.4',*ENC,TMP+'/s_end.tmp.mp4')
    os.rename(TMP+'/s_end.tmp.mp4',TMP+'/s_end.mp4')
    with open(TMP+'/list.txt','w') as f:
        for n in [s[0] for s in SCENES]+['end']:f.write("file 's_%s.mp4'\n"%n)
    ff('-f','concat','-safe','0','-i',TMP+'/list.txt','-c','copy',TMP+'/v.mp4')
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',TMP+'/v.mp4']))
    ff('-i',TMP+'/v.mp4','-stream_loop','-1','-i',ROOT+'/bgm/desert.mp3','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','160k',
       '-af','afade=in:st=0:d=0.3,afade=out:st=%.2f:d=1.5'%(d-1.5),'-t','%.2f'%d,'-movflags','+faststart',OUT+'/pikon-quest3-short.tmp.mp4')
    os.rename(OUT+'/pikon-quest3-short.tmp.mp4',OUT+'/pikon-quest3-short.mp4');print('done %.1fs'%d)
if __name__=="__main__":asyncio.run(main())
