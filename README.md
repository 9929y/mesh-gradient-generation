# Mesh Gradient Generation Skill

A reusable agent skill for turning a visual reference into a mesh-gradient
recipe, choosing a rendering tool, and refining the result. Figma-first for
editable stills, with SVG and code-rendering routes when appropriate.

Includes guidance for presentation backgrounds, web heroes, thumbnails and
brand systems, plus monochromatic/analogous/contrasting palette selection,
an interactive palette comparison in the HTML guide, and simplified edits.

Read **[SKILL.md](SKILL.md)** for the workflow and **[index.html](index.html)**
for the illustrated Chinese guide. Download the repository and open
`index.html` locally to view its embedded artwork. GitHub's file view shows
HTML source rather than running it.

## Install

Download or clone this repository, then place its folder in your agent's skills
directory and name the folder `generate-mesh-gradient`. For Codex, the usual
location is `~/.codex/skills/generate-mesh-gradient/`. Other agents use their own
skill-loading conventions. Keep `SKILL.md`, `references/` and `scripts/` together.

Example request:

> Use generate-mesh-gradient to create an editable 1200×800 coral-and-lilac
> atmospheric field in my Figma file. Keep color masses asymmetrical and grain
> subtle. Inspect the result and give me its node link and adjustable parameters.

Or: “Create a 16:9 presentation-cover gradient. Compare three palette directions
at the same composition, protect the title area, and explain how I can recolor
the editable result.”

Connect a Figma tool with canvas-writing capability before requesting native
creation. Installing this skill does not provide authentication or a connector.

## Included and limited

- Six Figma construction recipes, related browser effects and optional motion guidance.
- Native Figma Gaussian mask-group helper, plus a Python standard-library SVG generator
  for four original schematic studies.
- No bundled shader/reveal engine, image segmentation, proprietary plugin,
  third-party reference images, or claim of pixel-exact recreation.
- Recipes are grounded in inspected native artwork and recovered historical
  construction records. The original chat UI could not be restored. Validation
  status is recorded in the illustrated guide.

MIT licensed. Not affiliated with Figma or any image-generation provider.
