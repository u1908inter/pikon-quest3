/* ---------- ドット絵 ---------- */
const SPR={
cactus:["....ff......","....gg......","...gggg.....","...gegeg....","g..gggg.....","g..gggg..g..","gggggggg.g..","...ggggggg..","...gggg.....","...gdgg.....","..dddddd....","..dddddd...."],
scorpion:["............","............","............","........oo..",".........oo.","..........o.","..........o.",".....ooooo..","o...oooooo..","oo.oeoeooo..",".ooooooooo..","..d.d.d.d..."],
skull:["...wwwwww...","..wwwwwwww..","..wkkwwkkw..","..wwwkkwww..","...wkwkww...","....bbbb....","..bbbbbbbb..","..b.bbbb.b..","..b.bbbb.b..","....b..b....","....b..b....","...bb..bb..."],
golem:["...rrrrrr...","..rrrrrrrr..","..rerrrrer..","..rrrddrrr..","rrrrrrrrrrrr","rrdrrrrrrdrr","rr.rrrrrr.rr","rr.rrddrr.rr","...rrrrrr...","...rr..rr...","..rrr..rrr..","..ddd..ddd.."],
demon:["yy........yy",".yy.mmmm.yy.","..ymmmmmmy..","..mrmmmmrm..","..mmmkkmmm..","c..mmmmmm..c","cc.mmmmmm.cc","ccmmmmmmmmcc","ccmmmmmmmmcc","cc.mmmmmm.cc","c..mm..mm..c","...kk..kk..."],
mush:["............","....rrrr....","..rrwrrrrr..",".rrrrrrwrrr.",".rwrrrrrrrr.","..ssssssss..","...sesses...","...ssssss...","...ssssss...","....s..s....","...dd..dd...","............"],
wolf:["............","............",".g.g........",".ggg........","gegg........","ggggggggg...",".gggggggggg.","..gggggggg.g","..gg.gg.gg..","..d..d..d...","............","............"],
ghost:["............","....wwww....","...wwwwww...","..wwkwwkww..","..wwwwwwww..","..wwwkkwww..","..wwwwwwww..","..wwwwwwww..","..wwwwwwww..","..w.ww.ww.w.","............","............"],
snowman:["....hhhh....","....hhhh....","...hhhhhh...","...wwwwww...","...wkwwkw...","...wwoowww..","..wwwwwwww..",".bwwwwwwwwb.","..wwwkwwww..","..wwwwwwww..","...wwwwww...","............"],
trent:["...gggggg...","..gggggggg..",".gggggggggg.",".ggglggglgg.","..gggggggg..","....bbbb....","...bkbbkb...","...bbbbbb...","..bbbkkbbb..",".bb.bbbb.bb.",".b..bbbb..b.","...bb..bb..."],
hero:["...hhhhh....","..hhhhhhh...","..hssssss...","..hsesses...","...ssssss...","..bbbbbb..w.",".sbbbbbbb.w.",".sbbbbbbbsw.","..bbbbbb..w.","..bb..bb....","..ll..ll....",".lll..lll..."],
slime:["............","............","............",".....gg.....","....gggg....","...gwggggg..","..gwggggggg.",".ggeggggegg.",".gggggggggg.",".gggdddgggg.","..dddddddd..","............"],
bat:["............","............","p....pp....p","pp..pppp..pp","ppppeppepppp",".pppppppppp.","..pp.pp.pp..","..p..dd..p..","............","............","............","............"],
heart:["............","..rr...rr...",".rrrr.rrrr..",".rwrrrrrrr..",".rrrrrrrrr..","..rrrrrrr...","...rrrrr....","....rrr.....",".....r......","............","............","............"],
chest:["............","............","..bbbbbbbb..",".bggggggggb.",".bbbbbbbbbb.",".bggggyggggb".replace(/^(.{12}).*$/,'$1'),".bggggggggb.",".bggggggggb.",".bbbbbbbbbb.","............","............","............"]
};
const PAL={hero:{h:'#7a4a2a',s:'#ffd2a8',e:'#222',b:'#3a7bd5',w:'#e8eef5',l:'#3b2a20'},hero_kenshi:{h:'#7a4a2a',s:'#ffd2a8',e:'#222',b:'#3a7bd5',w:'#e8eef5',l:'#3b2a20'},hero_mahou:{h:'#2b2340',s:'#ffd2a8',e:'#222',b:'#8a4fd1',w:'#c98a3a',l:'#4a2a78'},hero_mamono:{h:'#a0522d',s:'#ffd2a8',e:'#222',b:'#3f9a45',w:'#8d6e63',l:'#3b2a20'},hero_suppin:{h:'#5a3a22',s:'#ffd2a8',e:'#222',b:'#e6e6e6',w:'#b0b0b0',l:'#6b6b6b'},
 slime:{g:'#5fd068',d:'#2f8a3a',e:'#111',w:'#fff'},slimeR:{g:'#ff6b6b',d:'#a83232',e:'#111',w:'#fff'},king:{g:'#ffd34e',d:'#c08a1e',e:'#111',w:'#fff'},
 bat:{p:'#8a5cc8',d:'#4a2a78',e:'#ff4040'},heart:{r:'#ff4f7a',w:'#fff'},chest:{b:'#5a3410',g:'#c98a3a',y:'#ffd34e'},
 aslime:{g:'#7fe0ff',d:'#2a8ab8',e:'#111',w:'#fff'},
 mush:{r:'#e04a3a',w:'#fff',s:'#f1dcb4',e:'#222',d:'#7a5a36'},wolf:{g:'#8a8f99',e:'#ffdd33',d:'#4a4e57'},trent:{g:'#2e7a34',l:'#5fbf5f',b:'#6a4424',k:'#1a1208'},lord:{g:'#7a3ab8',l:'#c08aff',b:'#3a2a20',k:'#ffdd33'},
 skull:{w:'#f0f0f0',k:'#111',b:'#c8c8c8'},ghost:{w:'#dfe8ff',k:'#2a2a55'},golemS:{r:'#8a8f99',d:'#4a4e57',e:'#7fe0ff'},golem:{r:'#6b7280',d:'#3a3f48',e:'#ff5a4e'},
 cactus:{g:'#4caf50',d:'#8d6e63',f:'#ff7ab8',e:'#111'},scorpion:{o:'#e07a2e',d:'#7a3a10',e:'#111'},scorpionB:{o:'#5a5ad8',d:'#20206a',e:'#ff0'},giant:{r:'#c9a063',d:'#7a5a2a',e:'#ffef5a'},
 snowman:{h:'#222',w:'#ffffff',k:'#222',o:'#ff8a2a',b:'#7a5a36'},icebat:{p:'#8fd0ff',d:'#3a7ab8',e:'#ffffff'},yeti:{r:'#eef4fa',d:'#9cb4cc',e:'#3366d6'},fenrir:{g:'#dfe9f5',e:'#3fa9ff',d:'#7a8ca8'},
 imp:{y:'#ff5a4e',m:'#c0442c',r:'#ffdd33',k:'#111',c:'#5a1a1a'},darkskull:{w:'#9a8fb0',k:'#111',b:'#5a4e70'},maknight:{w:'#3a2a50',k:'#ff3030',b:'#6a4a8a'},demon:{y:'#ffd34e',m:'#7a3ab8',r:'#ff3030',k:'#111',c:'#8a1a2a'},abat:{p:'#ffd34e',d:'#a07a10',e:'#222'}};
const cache={};
function deadPal(B){const o={};for(const k in B){const c=B[k];if(!c||c[0]!=='#'){o[k]=c;continue}const h=c.length===4?c.replace(/#(.)(.)(.)/,'#$1$1$2$2$3$3'):c,r=parseInt(h.slice(1,3),16),g2=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16),l=Math.round(.3*r+.59*g2+.11*b),v=Math.round(110+l*.45);o[k]='rgb('+v+','+v+','+Math.min(255,v+18)+')'}return o}
function spr(key,pal){const k=key+pal;if(cache[k])return cache[k];const P=pal==='WHITE'?new Proxy({},{get:()=>'#ffffff'}):pal.startsWith('DEAD:')?deadPal(PAL[pal.slice(5)]):PAL[pal],c=document.createElement('canvas');c.width=12;c.height=12;const x=c.getContext('2d');SPR[key].forEach((r,y)=>{[...r].forEach((ch,xx)=>{if(ch!=='.'&&P[ch]){x.fillStyle=P[ch];x.fillRect(xx,y,1,1)}})});return cache[k]=c}
function putSq(key,pal,x,y,sc,flip,sx,sy){const c=spr(key,pal),w=12*sc*sx,h=12*sc*sy;g.save();g.translate(Math.round(x),Math.round(y+12*sc/2));if(flip)g.scale(-1,1);g.drawImage(c,-w/2,-h,w,h);g.restore()}
function put(key,pal,x,y,sc,flip){const c=spr(key,pal),s=12*(sc||1);x=Math.round(x-s/2);y=Math.round(y-s/2);if(flip){g.save();g.translate(x+s,y);g.scale(-1,1);g.drawImage(c,0,0,s,s);g.restore()}else g.drawImage(c,x,y,s,s)}

