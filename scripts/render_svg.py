#!/usr/bin/env python3
"""Deterministic original mesh studies. Python 3 standard library only."""
import argparse
import html
import math
from pathlib import Path
import random
import re

EFFECTS = ('atmospheric', 'fluid', 'pigment', 'petal')
DEFAULT_PALETTE = ('#f2d5c5', '#eb765c', '#b3a3bd', '#f6c46e', '#7798a0')


def render_svg(effect='atmospheric', width=1200, height=800, seed=17,
               palette=DEFAULT_PALETTE, transparent=False, texture=0.035):
    """Return SVG text. No file writes, image analysis, or network access."""
    if effect not in EFFECTS:
        raise ValueError('Unknown effect')
    if not all(isinstance(n, int) and 16 <= n <= 16384 for n in (width, height)):
        raise ValueError('Dimensions must be integers in 16..16384')
    if not 2 <= len(palette) <= 12 or any(not re.fullmatch(r'#[0-9a-fA-F]{6}', c) for c in palette):
        raise ValueError('Supply 2..12 #RRGGBB colors')
    if not math.isfinite(texture) or not 0 <= texture <= .2:
        raise ValueError('Texture must be between 0 and .2')
    rng = random.Random(seed)
    defs = []
    shapes = []
    count = 9 if effect != 'petal' else 8
    d = min(width, height)
    for i in range(count):
        color = palette[1 + i % (len(palette)-1)]
        gid = f'gradient-{i}'
        defs.append(f'<radialGradient id="{gid}"><stop offset="0" stop-color="{color}"/>'
                    f'<stop offset=".28" stop-color="{color}" stop-opacity=".90"/>'
                    f'<stop offset="1" stop-color="{color}" stop-opacity="0"/></radialGradient>')
        cx, cy = rng.uniform(.02,.98)*width, rng.uniform(.02,.98)*height
        rx, ry = rng.uniform(.25,.55)*width, rng.uniform(.25,.55)*height
        angle = rng.uniform(-65,65)
        if effect == 'fluid':
            rx, ry = rng.uniform(.45,.85)*width, rng.uniform(.06,.15)*height
            angle = -24 + rng.uniform(-16,16)
        if effect == 'petal':
            # Curved, asymmetric lobes around a loose center; not source-derived.
            theta = i * math.tau / count + rng.uniform(-.18,.18)
            cx, cy = width*.50 + rng.uniform(-.06,.06)*width, height*.52 + rng.uniform(-.06,.06)*height
            length = rng.uniform(.36,.58)*d
            spread = rng.uniform(.09,.20)*d
            angle = theta*180/math.pi
            path = (f'M 0 0 C {-spread:.3f} {-length*.22:.3f} '
                    f'{-spread:.3f} {-length:.3f} 0 {-length:.3f} '
                    f'C {spread*1.35:.3f} {-length*.83:.3f} '
                    f'{spread:.3f} {-length*.12:.3f} 0 0 Z')
            shapes.append(f'<path id="petal-{i}" d="{path}" fill="url(#{gid})" '
                          f'transform="translate({cx:.3f} {cy:.3f}) rotate({angle:.3f})"/>')
        else:
            shapes.append(f'<ellipse id="mass-{i}" cx="{cx:.3f}" cy="{cy:.3f}" '
                          f'rx="{rx:.3f}" ry="{ry:.3f}" fill="url(#{gid})" '
                          f'transform="rotate({angle:.3f} {cx:.3f} {cy:.3f})"/>')
    if effect == 'pigment':
        defs.append(f'<filter id="bleed" x="-20%" y="-20%" width="140%" height="140%" '
                    f'color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" '
                    f'baseFrequency="{5/d:.6f} {9/d:.6f}" numOctaves="2" seed="{seed % 10000}" '
                    f'result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" '
                    f'scale="{d*.045:.3f}" xChannelSelector="R" yChannelSelector="G"/></filter>')
    if texture:
        defs.append(f'<filter id="grain" x="0" y="0" width="100%" height="100%" '
                    f'color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" '
                    f'baseFrequency=".75" numOctaves="2" seed="{seed % 10000}" result="noise"/>'
                    f'<feColorMatrix in="noise" type="saturate" values="0"/>'
                    f'<feComposite in2="SourceGraphic" operator="in"/></filter>')
    bg = '' if transparent else f'<rect id="base" width="100%" height="100%" fill="{palette[0]}"/>'
    attr = ' filter="url(#bleed)"' if effect == 'pigment' else ''
    masses = f'<g id="color-masses"{attr}>' + ''.join(shapes) + '</g>'
    # Grain is clipped to artwork alpha. Transparent corners do not get a gray sheet.
    if texture:
        alpha_shapes = re.sub(r' id="[^"]+"', '', bg + masses)
        defs.append('<mask id="art-alpha" mask-type="alpha">' + alpha_shapes + '</mask>')
    grain = (f'<g mask="url(#art-alpha)"><rect id="texture" width="100%" height="100%" '
             f'fill="white" opacity="{texture}" filter="url(#grain)"/></g>') if texture else ''
    title = html.escape(f'{effect} — original procedural study, seed {seed}')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="title">'
            f'<title id="title">{title}</title><defs>'+''.join(defs)+'</defs>'
            +bg+masses+grain+'</svg>')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--effect', choices=EFFECTS, default='atmospheric')
    parser.add_argument('--width', type=int, default=1200)
    parser.add_argument('--height', type=int, default=800)
    parser.add_argument('--seed', type=int, default=17)
    parser.add_argument('--palette', help='Comma-separated #RRGGBB colors; first is the base')
    parser.add_argument('--transparent', action='store_true')
    parser.add_argument('--texture', type=float, default=.035, help='Fine grain opacity, 0..0.2')
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--force', action='store_true', help='Overwrite the named output')
    args = parser.parse_args()
    try:
        svg = render_svg(args.effect, args.width, args.height, args.seed,
                         tuple(c.strip() for c in args.palette.split(',')) if args.palette else DEFAULT_PALETTE,
                         args.transparent, args.texture)
        with args.output.open('w' if args.force else 'x', encoding='utf-8') as target:
            target.write(svg)
    except (ValueError, OSError) as error:
        parser.exit(2, f'Error: {error}\n')
    print(f'Created {args.output} ({args.width}x{args.height}; {args.effect})')


if __name__ == '__main__':
    main()
