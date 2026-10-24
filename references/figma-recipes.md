# Figma construction recipes

These recipes generalize existing editable artwork inspected on 2026-10-24.
Observed structure is evidence; explanations of the visual role are design
interpretations. The private source file and original reference images are not
redistributed. Counts and blur radii below describe inspected examples, not
mandatory defaults. A 200 px blur at 1536×1024 is very different from 200 px
on a small thumbnail. Preserve relative scale and judge the actual render.

## 1. Sky-inspired: a directional field

**Observed:** representative artboards combine about 5–6 native layers:
radial gradient rectangles, curved vector regions with linear gradient fills,
and broad layer blur. Inspected examples use a 200 px blur on 1536×1024.

**Reusable recipe:** establish a dominant diagonal or gently curved sweep.
Build a wide warm light mass, a complementary cooler/darker mass, then a
feathered curved band that connects them. Let one area breathe. Make the
composition feel like changing atmospheric light without imposing a literal
skyline or horizontal sunset stripes unless requested.

Tune sweep angle, highlight height/width, dark-mass extent, path curvature,
stop positions and scaled blur. Use more masses only when the composition
needs them. Keep color-proportion changes separate from layout changes.

## 2. Dreamlike: pools and echoes

**Observed:** similar primitives to Sky-inspired—native radial rectangles and
linear-filled vectors—but in arrangements named double light pool, refracted
light and floating warm island. Inspected examples have about 6 layers and
the same broad blur setting.

**Reusable interpretation:** use two or three offset focal pools, a soft
countershape and a pale passage between them. Avoid making every mass equally
large, bright or centered. Distinction comes from composition and contrast,
not a special Dreamlike API. A folded/refraction-like edge here is a visual
illusion, not evidence of physically simulated glass.

Tune focal separation, one dominant accent, the light passage, local overlap
and softness. Preserve both warm and cool contrast when the reference has it.

## 3. Flower-inspired: soft lobes and folded planes

**Observed:** representative frames mix 2–4 curved vectors with radial light
masses. Vectors carry linear gradients and different opacities; broad blur
merges them into the surrounding field.

**Reusable recipe:** create asymmetric petal/leaf-like curves with one offset
focal area. Use gradients along each lobe, a darker interval between some
forms and independent interior highlights. Do not rely on radial blobs alone
when a shaped boundary is the defining feature. Keep literal flower anatomy
only if it is part of the request.

Tune path tangents, length/width, overlap, direction, opacity and edge blur.
The included SVG petal helper is a separate schematic approximation, not an
exact replay of the inspected vector paths.

## 4. Diffuse: soften a composition, preserve its hierarchy

**Observed:** the diffusion study contains Sky-, Dreamlike- and Flower-like
arrangements in pale and richer color treatments. It uses the same native
radial/vector primitives; no fluid solver or raster pigment simulation was
found in the inspected frames.

**Reusable recipe:** retain the chosen family's major masses, expand selected
soft regions, reduce minor accents and let boundary transitions spread.
Keep a readable luminance hierarchy. This is a treatment of a composition,
not proof of a new physical material engine. Do not confuse it with the
browser pigment-displacement experiment in `effects.md`.

## 5. Heightmap-inspired: stacked tonal contours

**Observed:** two method studies contain 24 native vector layers each, named
with ascending height values. Their fills are solid or linear gradients and
they use broad blur. Structure confirms stacked contour-like regions; it
does not establish the original scalar-field generation algorithm.

**Improved implementation option:** define a smooth scalar field h(x,y),
extract ordered iso-contours, map height to a palette ramp, and place nested
paths in consistent order. Alternatively design contour paths manually.
Use blur to join bands only as needed. Keep contour topology and tonal order
coherent, otherwise the result becomes unrelated soft stripes.

Tune field scale, contour spacing, number of levels, ramp contrast and blur.
This package provides the method; it does not include a contour extractor.

## 6. Multipoint / layered radial: color-and-mask groups

**Observed:** a newer multipoint study uses 18 isolated mass frames per sampled
artboard. Each contains a radial ALPHA mask and a separate solid color fill.
The mask has 49 stops sampling exp(-8r²), with a transparent endpoint. Parent
opacity and transforms control intensity, elongation and direction; those
groups have no layer-blur effect. Separate earlier layered-radial studies use
about 5 radial gradient rectangles with broad blur.

**Reusable recipe:** use a clipped artboard and an optional base. Give each
mass its own isolated group: mask first, solid-color rectangle after it.
The frame boundary prevents the mask from hiding unrelated sibling masses.
Transform the group as a unit so its color and softness stay aligned.

Start with broad foundation masses, then medium transitions and a small
number of accents. The included `buildMesh` implements these groups with a
fixed Gaussian-like profile. Node IDs identify all created groups/masks/fills.
Recolor the solid fill; modify position/scale/rotation on its group.

18 masses was an observed choice, not a required minimum. Avoid adding layers
to compensate for an incorrect palette or badly placed major mass.

## Matching an existing gradient bitmap

Recovered historical records show an earlier six-image reconstruction using
32 editable masses per image, plus two independent raster-detail layers.
The count 32 is specific to that run. Do not describe the entire result as
fully vector if raster corrections are present.

### Fit the broad field

Represent the image as an opaque base and ordered elliptical Gaussian masses:

```text
u = cos(theta)*(x-cx) + sin(theta)*(y-cy)
v = -sin(theta)*(x-cx) + cos(theta)*(y-cy)
alpha = opacity * exp(-0.5*((u/sigmaX)^2 + (v/sigmaY)^2))
composite_next = composite + alpha*(massColor - composite)
```

The recovered run optimized base RGB and each mass's center, log-scales,
rotation, opacity and RGB with bounded L-BFGS-B at a reduced analysis size.
It added masses near high residual-error regions (16 → 24 → 32 in that run).
This explains how position and portion were preserved beyond simple palette
extraction. It is not a segmentation model. Generic optimizer code is not
bundled; use available numerical libraries if this precision is needed.

Map the result to native mask/color groups. Calibrate the mathematical model
against an actual Figma export: stop interpolation, compositing, color space
and integer rounding may disagree. A low loss from the fitting renderer alone
does not establish a low error in Figma.

### Optional detail correction

Only when the user wants a close bitmap match and accepts mixed media:

1. Export the native-only rendering N at the reference crop and resolution.
2. Compare to target T in a defined, consistent color representation.
3. Compute a positive correction P=max(T-N,0) on a black raster and a negative
   correction Q=1-max(N-T,0) on a white raster (values normalized 0..1).
4. Place P as Linear Dodge and Q as Linear Burn above the native composition.
   Keep them independently switchable and name them as raster corrections.
5. Export again and compare actual pixels. Blend implementation/clipping can
   invalidate the simple algebra; use observed results, with a bounded number
   of correction rounds, rather than promising an exact match.

The residual includes everything the native model missed, not necessarily just
grain. Check its magnitude and visual content. It must not become a hidden
full-image replacement used to claim a native reconstruction. Disable it after
large recoloring or geometry changes, or recompute for the new target.

Report native-only and corrected comparisons separately. Define MAE/RMSE
units, dimensions, crop, alpha background and color handling. Tiny historical
errors after raster correction are not a transferable accuracy guarantee.
