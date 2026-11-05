"""Liest alle echten Rechentests (Word-Dateien, ohne Lösungen) aus und schreibt
assets/rechentest-echt.js neu. Der Trainer erzeugt dann nie eine Aufgabe mit genau
denselben Zahlen wie ein echter Test.

Aufruf (im Ordner webseite/):
    python3 werkzeuge/rechentest_ausschluss.py "../Rechentest verschiedener Klassen"
(Ordner mit den entpackten .docx-Dateien; Unterordner werden mit durchsucht.)
"""
import zipfile,re,glob,json,sys,os
root=sys.argv[1]
def runs_text(xml):
    out=''
    for tok in re.finditer(r'<m:f>.*?</m:f>|<w:r[ >].*?</w:r>|<m:r>.*?</m:r>|<m:sSup>.*?</m:sSup>|<m:rad>.*?</m:rad>',xml,flags=re.S):
        t=tok.group(0)
        if t.startswith('<m:f>'):
            num=re.search(r'<m:num>(.*?)</m:num>',t,re.S); den=re.search(r'<m:den>(.*?)</m:den>',t,re.S)
            g=lambda s:''.join(re.findall(r'<m:t[^>]*>([^<]*)</m:t>',s.group(1))) if s else ''
            out+=f' [{g(num)}/{g(den)}] '
        elif t.startswith('<m:sSup>'):
            e=re.search(r'<m:e>(.*?)</m:e>',t,re.S); s=re.search(r'<m:sup>(.*?)</m:sup>',t,re.S)
            g=lambda s:''.join(re.findall(r'<m:t[^>]*>([^<]*)</m:t>',s.group(1))) if s else ''
            out+=g(e)+'^'+g(s)
        elif t.startswith('<m:rad>'):
            out+='√'+''.join(re.findall(r'<m:t[^>]*>([^<]*)</m:t>',t))
        else:
            txt=''.join(re.findall(r'<(?:w|m):t[^>]*>([^<]*)</(?:w|m):t>',t))
            if 'w:val="superscript"' in t and txt: txt='^'+txt
            out+=txt
    return out
aufgaben=[]
for f in sorted(glob.glob(root+'/**/*.docx',recursive=True)):
    if re.search(r'L.SUNG|L.sung|LSG',os.path.basename(f),re.I): continue
    x=zipfile.ZipFile(f).read('word/document.xml').decode('utf8')
    start=False
    for p in re.findall(r'<w:p[ >].*?</w:p>',x,flags=re.S):
        t=re.sub(r'\s+',' ',runs_text(p)).strip()
        if 'Platz für Rechenwege' in t: start=True; continue
        if start and re.search(r'\d',t): aufgaben.append({'datei':os.path.relpath(f,root),'text':t})
RX=re.compile(r'\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?')
def fmt(v): return ('%.6f'%v).rstrip('0').rstrip('.')
def fnv(s):  # Prüfsumme, damit die echten Testzahlen nicht im öffentlichen Repo stehen
    h=0x811c9dc5
    for c in s.encode(): h=((h^c)*0x01000193)&0xffffffff
    return format(h,'08x')
fps=set()
for a in aufgaben:
    t=a['text'].replace('^',' ').replace('√',' ')
    nums=[float(n.replace('.','').replace(',','.')) for n in RX.findall(t)]
    if nums: fps.add(fnv('|'.join(fmt(v) for v in sorted(nums))))
ziel=os.path.join(os.path.dirname(__file__),'..','assets','rechentest-echt.js')
open(ziel,'w',encoding='utf-8').write('// Prüfsummen aller Aufgaben aus den echten Rechentests (nur Hashes, keine Aufgaben).\n// Der Trainer erzeugt nie eine Aufgabe mit genau denselben Zahlen.\n// Neu erzeugen: siehe README (Abschnitt Rechentest).\nconst ECHTE_TESTS = new Set('+json.dumps(sorted(fps),separators=(',',':'))+');\n')
print(len(aufgaben),'Aufgaben gelesen,',len(fps),'Fingerabdrücke geschrieben nach assets/rechentest-echt.js')
