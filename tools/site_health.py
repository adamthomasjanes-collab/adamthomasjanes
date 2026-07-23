#!/usr/bin/env python3
"""Small zero-dependency release audit for the static portfolio."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=[]; self.refs=[]; self.images=[]; self.buttons=[]; self._button=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag in ('a','link') and a.get('href'): self.refs.append((tag,a['href']))
        if tag in ('img','script') and a.get('src'): self.refs.append((tag,a['src']))
        if tag=='img': self.images.append(a)
        if tag=='button':
            self._button={'attrs':a,'text':''}; self.buttons.append(self._button)
    def handle_data(self,data):
        if self._button is not None: self._button['text'] += data
    def handle_endtag(self,tag):
        if tag=='button': self._button=None

def local_path(ref):
    if ref.startswith(('#','mailto:','tel:','http://','https://','data:','javascript:')): return None
    path=urlsplit(ref).path.lstrip('/')
    return ROOT / path if path else None

def main():
    parser=AuditParser(); parser.feed(HTML.read_text(encoding='utf-8'))
    problems=[]
    dup=sorted({x for x in parser.ids if parser.ids.count(x)>1})
    if dup: problems.append('Duplicate IDs: '+', '.join(dup))
    for img in parser.images:
        if 'alt' not in img: problems.append('Image missing alt: '+img.get('src','[unknown]'))
    for b in parser.buttons:
        if not b['text'].strip() and not b['attrs'].get('aria-label'):
            problems.append('Button has no visible text or aria-label')
    for tag,ref in parser.refs:
        p=local_path(ref)
        if p and not p.exists(): problems.append(f'Missing local {tag} reference: {ref}')
    print('Site health')
    print(f'  IDs: {len(parser.ids)}')
    print(f'  Images: {len(parser.images)}')
    print(f'  Buttons: {len(parser.buttons)}')
    print(f'  Local references checked: {sum(local_path(r) is not None for _,r in parser.refs)}')
    if problems:
        print('\nPROBLEMS')
        for problem in problems: print('  '+problem)
        return 1
    print('  Result: clean')
    return 0
if __name__=='__main__': sys.exit(main())
