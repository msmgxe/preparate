#!/usr/bin/env python3
"""
Genera las fotos que se publican a partir de los originales de public/fotos.

Se corre a mano cuando cambias una imagen:

    python3 scripts/fotos.py

Los originales se quedan donde están (el .gitignore no los sube). Lo que se
publica son los `rumbo-*.jpg` que salen de aquí: recortados al formato que pide
cada hueco de la página y comprimidos, para que el navegador no descargue
píxeles que el marco esconde.

El tercer valor de las entradas verticales es el punto de interés horizontal,
entre 0 y 1: dónde está la persona dentro de la foto original. Es lo único que
hay que tocar si un recorte deja a alguien a medias.
"""
from PIL import Image
import subprocess, tempfile, os

BASE = os.path.join(os.path.dirname(__file__), '..', 'public', 'fotos')


def load(path):
    try:
        return Image.open(path).convert('RGB')
    except Exception:
        # sips lee AVIF aunque este Pillow no lo tenga compilado
        tmp = tempfile.mktemp(suffix='.png')
        subprocess.run(['sips', '-s', 'format', 'png', path, '--out', tmp],
                       check=True, capture_output=True)
        return Image.open(tmp).convert('RGB')


def crop(src, out, ratio, width, focus=0.5, quality=80):
    im = load(os.path.join(BASE, src))
    w, h = im.size
    cw = int(h * ratio)
    if cw <= w:
        left = max(0, min(int(w * focus - cw / 2), w - cw))
        im = im.crop((left, 0, left + cw, h))
    else:
        ch = int(w / ratio)
        top = max(0, int((h - ch) * 0.35))
        im = im.crop((0, top, w, min(h, top + ch)))
    im = im.resize((width, int(width / ratio)), Image.LANCZOS)
    im.save(os.path.join(BASE, out), 'JPEG', quality=quality, optimize=True, progressive=True)
    print(f'{out:26} {im.size[0]}x{im.size[1]}  {os.path.getsize(os.path.join(BASE, out)) // 1024} KB')


VERTICALES = [
    ('premium_photo-1663956108845-ad0432896f06.avif', 'rumbo-hero-a.jpg', 0.30),
    ('pexels-rdne-7683820.jpg',                       'rumbo-hero-b.jpg', 0.56),
]
APAISADAS = [
    ('photo-1513258496099-48168024aec0.avif',         'rumbo-paso-clase.jpg'),
    ('pexels-eduard-perez-2158828645-37831090.jpg',   'rumbo-paso-practica.jpg'),
    ('pexels-yankrukov-8199761.jpg',                  'rumbo-paso-repaso.jpg'),
    ('photo-1541178735493-479c1a27ed24.avif',         'rumbo-caso-asegurar.jpg'),
    ('premium_photo-1664372145591-f7cc308ff5da.avif', 'rumbo-caso-orden.jpg'),
    ('pexels-george-pak-7972949.jpg',                 'rumbo-caso-grupo.jpg'),
]

for src, out, focus in VERTICALES:
    crop(src, out, 4 / 5, 1000, focus)
for src, out in APAISADAS:
    crop(src, out, 4 / 3, 900, quality=78)
