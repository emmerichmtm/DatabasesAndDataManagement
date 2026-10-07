"""Package editable book sources with main.tex at the archive root."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
ROOT=Path(__file__).resolve().parents[1]
names=['main.tex','Databases-ReaderBookFormat.tex','latexmkrc','README.md',
       'CHANGELOG.md','CONTRIBUTING.md','package.json','pnpm-lock.yaml',
       'examples/01-schema.sql','examples/02-data.sql','examples/check-examples.mjs',
       'scripts/build.py','scripts/package-overleaf.py']
dist=ROOT/'dist';dist.mkdir(exist_ok=True)
target=dist/'ISEAI-Databases-Overleaf.zip'
with ZipFile(target,'w',ZIP_DEFLATED) as z:
    for name in names:
        z.write(ROOT/name,name)
print(target)
