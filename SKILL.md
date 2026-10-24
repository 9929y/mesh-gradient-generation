---
name: generate-mesh-gradient
description: Generate and refine mesh gradients for presentations, web backgrounds and brand visuals, with palette selection and brand-design guidance. Use editable Figma layers or SVG/code routes for sky-inspired, dreamlike, flower-inspired, diffuse, heightmap and multipoint effects, including reference reconstruction.
---

# Mesh Gradient Generation Skill

Turn a visual reference into an explicit recipe, render it in a suitable tool,
inspect the result, and adjust the parameter responsible for the mismatch.
Prefer an editable construction when the user needs to keep designing.

This skill supplies design decisions and small rendering helpers. It does not
install an app, establish a Figma connection, or grant file permissions.

## Start with the actual request

Identify the reference or palette, intended use, dimensions, transparency,
editability, and whether the user wants a still, ambient motion, or image reveal.
Use provided context; ask only when a missing choice changes the outcome.
If dimensions are unspecified, use a 1200 × 800 landscape study and say so.

Read [art-direction.md](references/art-direction.md) for the intended use,
palette selection, brand judgment and an editing process a non-specialist can
follow. For a deck, design in its actual slide ratio with a quiet text zone.
For a website, check mobile crop and text protection. Do not deliver an artwork
that only looks good without its real foreground content.

When color is undecided, offer a small comparison: monochromatic, analogous,
and a restrained contrasting accent (or neutral-plus-accent for dense content).
Use the same geometry and seed so the user is choosing color, not different
compositions. Explain roles, a fitting use and a tradeoff; lock the selected
palette before making a large batch. Do not overwrite supplied brand colors.

Distinguish three tasks:

- **Reconstruct:** preserve the reference's composition, color proportions,
  bright and dark masses, direction, and edge behavior. Do not replace these
  with a random attractive palette.
- **Generate:** design a new composition from the requested palette and mood.
  Label it as an original study rather than an exact recreation.
- **Image-derived abstraction:** extract color, connected regions, approximate
  coverage, position, luminance, and major structure before choosing a renderer.

## Choose a route by capability

Read [adapters.md](references/adapters.md) for the selected tool only.

| Need | Route | What stays editable |
|---|---|---|
| Figma still, color masses, soft topology | Native radial fills and optional vector shapes | Shape, fill, stop alpha, position, scale, stacking |
| Portable still without a write connection | Layered SVG | Paths and gradient definitions in an SVG editor; import fidelity must be checked |
| Warped flow, diffusion, paint simulation, continuous reveal | Canvas/WebGL or a tool with documented shader support | Parameters/code; an exported bitmap is flattened |
| Model-generated material or complex illustration | Available image-generation tool | Usually pixels; never describe it as editable mesh geometry |

Discover the actual connector tools before promising an action. A connection
with only read tools cannot create native Figma layers. If a Figma write tool
exists, use its current instructions and required session flow. Otherwise offer
SVG or a runnable renderer, or explain the one missing connection. Do not
silently substitute a bitmap for requested editable layers.

## Write a compact recipe before rendering

Use normalized coordinates with the origin at the top left. Specify:

```text
effect: atmospheric | fluid | pigment | oil | silhouette | petal
canvas: width, height, opaque base or transparent
palette: ordered colors with intended roles and rough area proportions
regions: color, center(x,y), extent(rx,ry), direction, opacity, edge softness
structure: bright/dark masses, silhouette or petal boundary if required
material: grain scale/amount, optional warp, pooling or brush hierarchy
seed: fixed for reproducible comparisons
delivery: native Figma | layered SVG | rendered image | executable code
```

Several disconnected regions may share one color. One average position per
color loses a composition with the same hue in opposite corners.
Region radii and alpha are not area coverage: overlap and stacking change the
visible proportions. Inspect the composite before claiming a palette match.

## Build the still first

For the Figma workflow, read [figma-recipes.md](references/figma-recipes.md):
Sky-inspired, Dreamlike, Flower-inspired, Diffuse, Heightmap, and Multipoint.
For matching an existing bitmap, also read the fitting and detail-calibration
procedure there. These are distinct construction choices, not six filters.

Read [effects.md](references/effects.md) only for the related browser-rendering
families (atmospheric, fluid, pigment, brush, silhouette and petal). Keep each
visual grammar separate from presets such as pale, dark, or saturated. A
fidelity level is a mode of an effect, not a new effect family.

1. Block the base and major color masses. Match composition and light/dark
   balance before adding texture.
2. Adjust overlap, asymmetry, edge softness, and local contrast. A few strong
   masses often work better than many weak ones.
3. Add only the material cues that distinguish the requested family. Keep
   fine grain separate from low-frequency boundary distortion.
4. Render at the intended dimensions. Inspect both the whole image and a
   detail crop at normal display scale.
5. Fix the dominant mismatch, keeping seed and unrelated parameters fixed.
   Stop when the reference/use-case criteria pass.

## Simplify the user's edits

Expose a few meaningful choices first: use-case/quiet zone, palette, composition,
fusion/softness and contrast. Keep per-layer controls available for refinement.
Return `massNodes` from the native helper so later edits can target each group's
transform and its separate color fill without changing the mask.

The observed **200 px layer blur** belongs to the 1536×1024 curved-shape studies.
For that method, 200 × min(width,height)/1024 is a scaling starting point;
match actual appearance after resizing. The Gaussian-mask method creates its
softness through alpha falloff and has no additional layer blur. Do not add
200 px to it automatically or claim the two methods are visually identical.
For normal recoloring, edit the named color fills, preserve geometry, then
inspect the composite. For layout, move/scale/rotate a whole mass group.
Keep raster corrections off during substantial redesign.

Helpers:

- `scripts/figma_native.js` defines `buildMesh(figma, spec)` for native Gaussian
  alpha-mask groups with separate solid color fills. Read the adapter first.
  It deliberately creates no texture,
  segmentation, mesh control-point grid, or animation.
- `python3 scripts/render_svg.py --effect atmospheric --output study.svg`
  creates an original deterministic SVG study. Run `--help` for dimensions,
  seed, palette and texture options. It provides four schematic families;
  it does not analyze an input image or reproduce all six advanced effects.

## Diagnose instead of adding more blur

| Symptom | Likely cause | First correction |
|---|---|---|
| Defocused photograph | Renderer still depends on fine source pixels | Rebuild from simplified regions; discard fine texture |
| Muddy/gray mixture | Too much overlapping complementary pigment | Separate major masses; reduce broad alpha; restore a light or dark anchor |
| Visible colored circles | Similar circular masses and isolated boundaries | Vary aspect/placement; overlap; use shaped vectors where contours matter |
| Horizontal sunset bands | Centers aligned on rows | Change topology and direction, not just hue |
| Texture covers everything | Grain too large or opaque | Lower amount; inspect at actual display size |
| Petal looks like a flower icon | Perfect radial symmetry, hard outline | Break symmetry, vary lengths and soften selected boundaries |
| Export differs from preview | Different dimensions, color/filter handling or pipeline | Render both through the same pipeline; check actual exported pixels |

## Add motion only when requested

Read [motion.md](references/motion.md). Keep the still's settings independent
from reveal progress and ambient time. Do not assume every effect should end
at a photograph: use the user's requested endpoint.

## Deliver with evidence

Return the usable artifact or Figma node link, route, effect and key adjustable
parameters. State what is editable and which effects were approximated or
rasterized. Confirm export dimensions, background/alpha and orientation.
For a reference match, discuss composition/coverage/edges rather than claiming
pixel identity without an image comparison.

Keep original references unchanged. Do not publish private file links, local
paths, personal conversation transcripts, or third-party reference images as
part of a reusable recipe. Use original examples or licensed assets.

## Scope of evidence

The Figma recipes are grounded in read-only inspection of existing native
artwork and recovered historical construction records. The original chat UI
could not be restored. Node structures and representative renders were checked;
design intent and undocumented algorithms are identified as interpretations.
Browser effect and motion guidance additionally synthesizes archived prototype
notes. Parameter ranges are starting points. See `index.html` for validation
status. Neither raw history nor private Figma file links are bundled.
