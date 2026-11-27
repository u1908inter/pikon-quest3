import json,sys
for t in sys.argv[1:]:
  try:L=[json.loads(l) for l in open(f'out/prog_{t}.jsonl') if l.strip()]
  except Exception as e: print(t,e);continue
  end=[x for x in L if x.get('end')];L=[x for x in L if 'r' in x]
  if not L: print(t,'empty');continue
  ms={}
  for x in L:
    for m in x['ms']: ms[m]=(x['TOT'],x['RUNS'],x['rank'])
  loss={}
  for x in L:
    r=x['r']
    if r['mode']=='stage' and not r['win']: loss[r['rd']]=loss.get(r['rd'],0)+1
  print('==',t,'runs',len(L),'TOT %.1fh'%(L[-1]['TOT']/3600),'rank',L[-1]['rank'],'best',L[-1]['best'],'mast',L[-1]['mast'],'clear',L[-1]['clear'],'err',end[0]['errs'] if end else '')
  print('  ',' '.join('%s:%.1fh/%d'%(k,v[0]/3600,v[1]) for k,v in ms.items()))
  print('   losses',loss)
