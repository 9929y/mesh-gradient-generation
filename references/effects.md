# Effect recipes

All numeric ranges below are tunable starting points, not universal visual
rules. Scale lengths with the shorter canvas dimension D. Choose palette and
composition from the user's reference; do not force the example colors.

## Atmospheric color field

**Target:** broad, overlapping color masses with a readable light/dark pattern;
neither discrete glowing circles nor a blurred landscape.

Start with about 7–10 asymmetric elliptical masses, then adjust the count to
the composition. Let adjacent masses overlap substantially (roughly one third
of their width is a useful first study). Use transparent gradient edges so
neighboring colors can meet without a hard ring. Preserve two or three
recognizable hue zones. Avoid arranging all centers along a horizontal line.

Native Figma route: opaque base plus separate ellipses with radial fills,
each fading from its color to the same RGB with zero alpha. Edge softness
comes primarily from gradient stops. Add a small layer blur only if needed;
do not blur until the topology disappears. The helper uses no layer blur.

Controls: mass size, center/extent, stop position, alpha, local contrast.
A pale/porcelain mode reduces contrast; a mineral mode uses a dark base and
one restrained bright accent. These remain the same family.

## Fluid field

**Target:** directional, curved color streams; the image should have a dominant
flow and counterflow rather than evenly stretched stripes.

Construct long elliptical/vector masses along curved directions. In a shader,
warp the sample domain with a smooth seeded vector field, then evaluate the
color field in that domain. Start with low-frequency displacement around
0.01–0.04 D. Increase curvature before adding fine turbulence. Warping a photo
directly retains unwanted texture if the goal is a newly designed field.

Native stretched shapes and SVG ellipses are a static approximation. Use
curved vector paths or a documented shader renderer when the exact topology
matters. No native fluid simulation is provided here.

Controls: flow length, curl scale, direction bias, warp amount, mass definition.

## Pigment diffusion

**Target:** soft uneven deposits, localized pooling and occasional darker rims.
Uniform grain over a smooth field does not alone create wet pigment.

Start from several broad deposits. Perturb boundaries with a stable,
low-frequency field; add selective darker pooling at some boundaries. Keep
fine paper grain independent and much smaller. Use a few quiet open areas
so the entire image does not become noise.

SVG `feTurbulence` plus `feDisplacementMap` approximates uneven bleeding;
it is not a physical fluid/pigment solver. The included SVG helper implements
boundary displacement and optional fine grain, but not a pooling simulation.
Figma imported SVG filters may change or disappear: inspect the import,
rebuild the crucial edges with paths, or label a baked texture as raster.

Controls: deposit size, bleed irregularity, pooling, drying edge, warp.

## Oil / brush

**Target:** coherent painted masses with large, medium and small strokes;
the image should not be a photograph under a brush-texture overlay.

Analyze image-derived work into multiple connected regions per color. Retain
centers, extents and dominant directions. Lay down large paint masses, then
medium strokes along regional axes, then sparse small strokes and canvas grain.
Keep dark accents deliberate so they do not contaminate all colors.

An optional coverage correction uses target_i proportional to weight_i^gamma,
normalized to sum to one. Gamma > 1 favors dominant colors; gamma < 1 makes
weights more even. Measure the composite using a defined nearest-palette
assignment (prefer a perceptual color space), state how unassigned pixels and
transparency are handled, then adjust the corresponding stroke budget/area.
This is a visual proxy, not a universal quality score.

Abstract / Balanced / Defined vary structure retention and stroke scale.
They are modes. The native radial helper and SVG helper do not implement this
brush planner. Use vector stroke construction or a code renderer.

Controls: brush size/width, paint density, angle jitter, canvas grain.

## Chromatic silhouette

**Target:** major contours and luminance masses remain recognizable while fine
detail disappears and interior color is redesigned.

Use a user-supplied mask or a coarse structure map. Recolor inside and outside
with separate gradients while preserving enough luminance separation to read
the form. Do not mistake simple luminance thresholding for reliable subject
segmentation. If a silhouette matters and segmentation is poor, use a supplied
mask, a manual path, or an available segmentation tool and describe the choice.

Figma route: editable vector outline with gradient fills and feathered companion
shapes. Shader route: coarse masks, limited tonal bands and soft chromatic
offset. Strong color remapping is optional; source color fidelity may matter.

Controls: retained structure, edge softness, tonal contrast, chromatic split,
source-to-remapped color mix. Neither included helper extracts a silhouette.

## Flower / petal diffusion

**Target:** asymmetric lobed/petal-like boundaries and translucent interior
glow; botanical anatomy is optional.

Start with about 5–12 overlapping curved petal regions. Vary length, width,
direction and alpha. Avoid identical radial petals unless the reference calls
for symmetry. Allow some edges to remain discernible while others merge into
the background. Build interior highlights separately from the outer silhouette.

Use vector paths with gradient fills for editable Figma artwork. The SVG
helper uses curved petal paths and radial fills for an original schematic study;
it does not derive petals from a source image or model volumetric translucency.

Controls: petal count, length, width, edge softness, interior glow.

## How to compare

Render one reference/palette at a fixed seed, crop and dimensions. Change one
meaningful control at a time. Check hue proportions, composition, dominant
direction, recognizable structure and material edges. If a control changes
pixels but not its intended visual quality, fix the mapping rather than
declaring it validated. Recheck coupled controls (soft edges can hide chromatic
split, and grain can conceal subtle pooling).
