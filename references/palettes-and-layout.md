# Palette samples, size, aspect ratio and blur

Use this when choosing colors, reproducing the guide's palette previews,
adapting an artwork or explaining practical user controls. Native samples in
`design/illustrations/` are rendered images: use them as visual targets, not
as files that contain editable Figma nodes.

## Four actual palette studies

| Key | Base / dominant / support / accent | Use and tradeoff |
|---|---|---|
| mono | #FFF4E7 / #FDDAAA / #F6AD71 / #B7542E | Warm tonal identity; maintain light/dark separation |
| adjacent | #FFF4E7 / #E6BE6C / #F6AD71 / #C97C83 | Gentle warm variation; keep one hue family dominant |
| contrast | #FFF4E7 / #F6AD71 / #B59B46 / #898418 | Peach/olive tension; broad overlap can dull it |
| neutral | #F4F5F3 / #D5DEDE / #91A9B4 / #3F708E | Quiet content settings; protect the actual text area |

These are original browser studies. `scripts/palette_studies.js` supplies
`paletteCSS(colors)` and `paletteSVG(key,width,height)` from the same recipe.
The four SVG files in `design/illustrations/` are generated with the latter.
Keep the geometry fixed when comparing palette choices.

CSS layers, front to back:

| Role | Center x/y | Solid start / transparent end |
|---|---|---|
| Dominant | 18% / 28% | 0% / 60% |
| Support | 78% / 28% | 0% / 62% |
| Accent | 65% / 95% | 0% / 50% |
| Support, second region | 25% / 88% | 0% / 60% |
| Base | Whole frame | Opaque |

Use ellipse radial gradients, CSS default farthest-corner extent and no extra
blur. The SVG helper uses equivalent explicit ellipse extents. Renderer and
color handling can differ, so check the receiving editor. These linear-fade
palette previews are not identical to the Gaussian-mask Figma construction.
To transfer the direction, map colors by role and preserve the major centers,
then calibrate extents/alpha against an actual target render.

## Same ratio: scale the artwork

For a canvas scale k, multiply coordinates, vector control points, mass
dimensions and native layer-blur radii by k. A 1536×1024 master at 150 px blur
becomes 3072×2048 at 300 px blur. If only exporting the same Figma master at 2×,
leave its layer radius at 150 px: export scaling already scales its appearance.

## New ratio: recompose

1. Reserve the actual foreground-content area in the new frame.
2. Keep centers normalized: cx=u*width, cy=v*height.
3. Define physical mass radii from short side S=min(width,height), e.g.
   rxPx=.6*S, ryPx=.9*S. Change centers/angles to fit the new composition.
4. For `buildMesh`, convert back to its per-axis units:
   region.rx=rxPx/width and region.ry=ryPx/height. These are support half-extents,
   not Gaussian sigma and not visible coverage percentages.
5. Reposition shaped vectors and adjust their control points deliberately.
   Preserving short-side radii is a starting strategy, not a way to preserve
   every contour or reference composition automatically.
6. Inspect the result with actual text. Recheck cropped web viewports and
   thumbnails; a quiet area in the master may be outside the visible crop.

`layoutSpec(width,height,key)` returns three original example layouts:
wide (ratio >=1.35), portrait (ratio <=.8) and square/intermediate. These
thresholds belong to the demo, not a universal device classification. Wide
places color right/below a left title area; square reserves upper left;
portrait reserves the top and moves masses down. They are re-layouts, not
stretched/cropped images or guaranteed accessible backgrounds.

In a supported Figma execution tool, inline the two helper sources, choose
a clear page-level position, then call:

```js
const spec = MeshGradientStudies.layoutSpec(1080, 1920, 'contrast');
const result = buildMesh(figma, {...spec, x: clearX, y: clearY});
return result;
```

`clearX/clearY` must come from the current canvas; do not paste them as
undefined variables. `quietZone` is layout metadata for placing foreground
content; the native builder does not create text or draw the guide rectangle.
The SVG preview uses the same Gaussian falloff recipe, but live Figma parity
of these new specs has not been verified. The guide's existing Figma samples
are separate inspected artwork.

## Adjustable blur

The 200 px radius in historical 1536×1024 studies was an observed setting,
not a mandatory default. A new controlled comparison on the rich curved
Flower study changed all five layer-blur radii to 100 / 150 / 200 px on
temporary copies. Geometry, fills, ordering and opacity stayed fixed. The
three source PNGs were actually exported from Figma; copies were then removed.
The public guide uses full-resolution quality-95 JPEG encodings for smaller
page downloads. They are viewing samples, not lossless pixel-comparison targets.

Use `blur = b * min(width,height) / 1024`, choosing b from a comparison range:

| Intended treatment | Suggested b at 1536×1024 | Inspect |
|---|---|---|
| Shaped Flower / visible Heightmap contour | 100–150 px | Contour identity vs harsh boundary |
| Broad Sky / Dreamlike | 120–180 px | Direction and pale passage vs uniform haze |
| Diffuse field | 160–200 px | Fusion vs lost tonal hierarchy |
| Gaussian alpha-mask groups | Extra blur 0 by default | Support size, overlap and falloff instead |

Only the Flower three-value comparison was newly tested. Other ranges are
art-direction starting points, not established optima. Values outside these
ranges may fit a request; different layers may need different radii.
At a 1080 px short side, b=100/150/200 gives about 105/158/211 px. Avoid
rounding every value back to 200. Blur does not fix the wrong palette,
an incorrect contour or a badly positioned light mass.

## Editing handoff

Give the user five choices: use/quiet zone, palette, distribution,
fusion and contrast. Recolor named fills, move/resize/rotate whole groups,
adjust selected vector blur or mask falloff, and review the actual composite.
Keep raster residual corrections off during substantial redesign. Return
node IDs and the chosen palette/layout/softness values so revisions are targeted.
