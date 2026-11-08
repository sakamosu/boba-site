#!/usr/bin/env python3
"""Bundle the LP into a single self-contained HTML (dist-single/boba-lp.html).

    python3 build.py            # → dist-single/boba-lp.html

Inlines style.css, copy/*.js, app.js and assets/*.webp (as data URIs) into index.html.
Google Fonts stays external. The folder is the source of truth; dist-single/ is generated.
"""
import base64, pathlib, re

HERE = pathlib.Path(__file__).resolve().parent
html = (HERE / 'index.html').read_text(encoding='utf-8')

# css
css = (HERE / 'style.css').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>', 1)

# scripts (keep order: copy/ja.js, copy/en.js, app.js)
def inline_script(m):
    src = m.group(1)
    code = (HERE / src).read_text(encoding='utf-8')
    return '<script>\n' + code + '\n</script>'
html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)

# images
def inline_img(m):
    path = HERE / m.group(1)
    mime = {'.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg'}[path.suffix]
    return 'src="data:%s;base64,%s"' % (mime, base64.b64encode(path.read_bytes()).decode())
html = re.sub(r'src="(assets/[^"]+)"', inline_img, html)

out = HERE / 'dist-single' / 'boba-lp.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'wrote {out.relative_to(HERE)} ({out.stat().st_size // 1024} KB)')
