"""Build browser data from data/tools.xlsx (preferred) or tools.csv. No dependencies."""
import csv,json,re,sys,zipfile,xml.etree.ElementTree as E
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FIELDS=['id','name','category','cost','learning_curve','description','best_for','platform','free_features','paid_features','limitations','free_verdict','website','tutorial','pricing_url','last_checked','rank','published']
def read_xlsx(path):
 ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
 with zipfile.ZipFile(path) as z:
  strings=[]
  if 'xl/sharedStrings.xml' in z.namelist():
   strings=[''.join(x.itertext()) for x in E.fromstring(z.read('xl/sharedStrings.xml')).findall('s:si',ns)]
  wb=E.fromstring(z.read('xl/workbook.xml')); sheet=next((s for s in wb.findall('s:sheets/s:sheet',ns) if s.get('name')=='Tools'),None)
  if sheet is None: raise ValueError('Workbook needs a worksheet named Tools')
  rid=sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
  rels=E.fromstring(z.read('xl/_rels/workbook.xml.rels')); target=next(r.get('Target') for r in rels if r.get('Id')==rid)
  target=target.lstrip('/') if target.startswith('/') else 'xl/'+target
  rows=[]
  for row in E.fromstring(z.read(target)).findall('s:sheetData/s:row',ns):
   cells={}
   for c in row.findall('s:c',ns):
    if c.find('s:f',ns) is not None: raise ValueError('Use plain values, not formulas')
    letters=re.match('[A-Z]+',c.get('r')).group(); idx=0
    for ch in letters: idx=idx*26+ord(ch)-64
    v=c.find('s:v',ns); value=v.text if v is not None else ''
    if c.get('t')=='s': value=strings[int(value)]
    if c.get('t')=='inlineStr': value=''.join(c.find('s:is',ns).itertext())
    cells[idx-1]=value or ''
   rows.append([cells.get(i,'') for i in range(max(cells,default=-1)+1)])
  headers=rows[0]; return [dict(zip(headers,r+['']*(len(headers)-len(r)))) for r in rows[1:]]
def validate(rows):
 result=[]; seen=set()
 for n,r in enumerate(rows,2):
  r={k:str(v or '').strip() for k,v in r.items()}
  if not any(r.values()): continue
  if r.get('published','yes').lower() in ('no','false','0'): continue
  for f in ('id','name','category','description','website','learning_curve','cost'):
   if not r.get(f): raise ValueError(f'Row {n}: missing {f}')
  if not re.fullmatch('[a-z0-9-]+',r['id']): raise ValueError(f'Row {n}: invalid id')
  if r['id'] in seen: raise ValueError(f'Row {n}: duplicate id')
  seen.add(r['id'])
  if r['learning_curve'] not in ('Easy start','Some practice','More learning','Not assessed'): raise ValueError(f'Row {n}: invalid learning_curve')
  for f in ('website','tutorial','pricing_url'):
   if r.get(f) and not re.match(r'^https?://[^\s]+$',r[f]): raise ValueError(f'Row {n}: invalid {f}')
  r['rank']=float(r.get('rank') or 100)
  result.append(r)
 if not result: raise ValueError('No published tools')
 return result
def main():
 p=ROOT/'data/tools.xlsx'
 if p.exists(): rows=read_xlsx(p)
 else:
  with (ROOT/'data/tools.csv').open(encoding='utf-8-sig',newline='') as f: rows=list(csv.DictReader(f))
 rows=validate(rows)
 (ROOT/'data/tools.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 (ROOT/'data/tools.js').write_text('window.TOOLS = '+json.dumps(rows,ensure_ascii=False)+';')
 print(f'Validated {len(rows)} tools')
if __name__=='__main__': main()
