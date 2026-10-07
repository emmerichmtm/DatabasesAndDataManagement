"""Build the living-book PDF with Tectonic and MakeIndex (no shell escape)."""
from pathlib import Path
import argparse
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser()
p.add_argument('--tectonic', default='tectonic', help='Tectonic executable (tested with 0.17.0)')
p.add_argument('--makeindex', default='makeindex')
args = p.parse_args()
build = ROOT/'build'
build.mkdir(exist_ok=True)
for name in ['main.tex', 'Databases-ReaderBookFormat.tex']:
    shutil.copy2(ROOT/name, build/name)
def run(command):
    subprocess.run(command, cwd=build, check=True)
run([args.tectonic, '-k', '--keep-logs', 'main.tex'])
run([args.makeindex, 'main.idx', '-o', 'main.ind'])
run([args.tectonic, '-k', '--keep-logs', 'main.tex'])
log=(build/'main.log').read_text(errors='replace')
bad=['Undefined control sequence', 'There were undefined references', 'Missing character:', 'Overfull \\hbox', 'Overfull \\vbox', 'No file main.ind']
issues=[s for s in bad if s in log]
if issues:
    raise SystemExit('Build needs review: '+', '.join(issues))
dist=ROOT/'dist'
dist.mkdir(exist_ok=True)
shutil.copy2(build/'main.pdf',dist/'ISEAI-Databases-Reader.pdf')
print('Built dist/ISEAI-Databases-Reader.pdf')
