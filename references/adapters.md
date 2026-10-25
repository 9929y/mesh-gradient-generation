# Tool adapters

## Figma

MCP is the connection that lets an agent inspect and operate a Figma file.
This skill supplies the recipe; the installed connector supplies the actions.
Tool names, permissions and availability vary by client.

1. Discover current tools. Confirm native canvas writes (`use_figma` or an
   equivalent documented tool), readback, screenshots and export separately.
   Read-only design-context tools are insufficient for native creation.
2. Resolve the user-selected file and page. Use any connector-required session
   creation and propagate its returned session ID. Do not reuse another user's
   sample file key or hardcode a team. New-file creation must follow the
   connector's team-selection rules.
3. Load the installed Figma write guidance if available; otherwise consult the
   current official API/tool documentation linked below. Inspect the target
   page before placing artwork; find a clear area beside existing content.
4. Define the recipe. Use `scripts/figma_native.js` only for radial mass artwork.
   Each mass has an isolated frame, radial alpha mask, and solid color rectangle.
   This keeps color editing independent of the falloff curve.
   Its `buildMesh(figma, spec)` is a function library, not a CLI and not a
   standalone Figma plugin. Inline the file into the documented JavaScript
   execution tool, append the invocation, and return its result.
5. Read the returned IDs and inspect the actual rendered composition. Adjust
   the specific masses by ID. Verify the export in the intended format.

Example invocation after loading the helper into the write tool:

```js
// Resolve this from a prior page read. Do not invent the page ID.
const page = await figma.getNodeByIdAsync(PAGE_ID);
if (!page || page.type !== 'PAGE') throw new Error('Target page unavailable');
await figma.setCurrentPageAsync(page);
return buildMesh(figma, {
  name: 'Coral / soft field', width: 1200, height: 800,
  x: CLEAR_X, y: CLEAR_Y, base: '#f2d5c5',
  regions: [
    {color:'#ec694e', x:.22, y:.25, rx:.62, ry:.60, alpha:.95},
    {color:'#f5b657', x:.75, y:.35, rx:.52, ry:.65, alpha:.85},
    {color:'#8c81a4', x:.42, y:.85, rx:.68, ry:.50, alpha:.75},
    {color:'#f7e8cc', x:.80, y:.85, rx:.45, ry:.38, alpha:.90}
  ]
});
```

The helper creates an opaque base unless `base: null` is explicitly supplied.
For changing size/ratio, see [palettes-and-layout.md](palettes-and-layout.md):
keep physical radii relative to the short side, then convert to these per-axis units.

Region `rx/ry` are normalized half-extents of the mask frame, not Gaussian
standard deviations; most visible pigment sits well inside that frame.
`angle` is clockwise degrees in the top-left coordinate system. The alpha
falloff samples `exp(-8*r*r)` at 49 stops, with a zero-alpha outer endpoint.
It returns every created node ID, plus the parent page ID it affected.
It uses no unsupported `GRADIENT_MESH` paint type: the result is a layered
radial-gradient approximation with editable geometry, not a mesh control grid.
No text/fonts, bitmap texture, true refraction, blur or motion are added.

Figma details:

- RGB and gradient-stop alpha use 0–1 values. Solid paint RGB excludes alpha;
  paint opacity and gradient-stop RGBA are distinct.
- Reassign fills as new arrays. Use the connector's asynchronous page switch.
- Do not assume every Plugin API method exists in a connector's execution
  environment. Follow its documented subset.
- After an uncertain failed write, inspect for partial creation before retrying;
  the helper is additive and a blind rerun creates duplicates. If IDs were
  returned, target them. If not, inspect the named frame and its bounds.
- Export filters and blend modes may render differently outside Figma. A
  native layer count is not visual proof; inspect pixels too.

For reference fitting, separate raster corrections or other native effect
families, read [figma-recipes.md](figma-recipes.md).

## Layered SVG and another design application

Run the Python helper with Python 3. It uses only the standard library, has no
network calls, and refuses to overwrite an existing output unless `--force`
is passed. Example:

```sh
python3 scripts/render_svg.py --effect atmospheric --seed 17 \
  --width 1200 --height 800 --palette '#f1d9c9,#e98273,#b3a3bd,#f5ca82' \
  --output study.svg
```

Use `--transparent` only when transparent delivery is wanted. Verify the alpha
by viewing on both light and dark backgrounds; a pale opaque base is not
transparency. Keep a common crop/viewBox for comparisons.

Open/import into the requested application using its available connector or
UI. SVG paths and gradients may remain editable; filter support varies.
Confirm object structure in the receiving editor. If filter appearance fails,
choose native path reconstruction or an explicitly labeled raster export.
Do not promise equivalent editability in every application.

## Canvas, WebGL, shaders

Choose this route when the image needs continuous domain warp, structured
brush rendering, source analysis or reveal. Check the target renderer's actual
API before producing code. The two bundled helpers do not supply this engine.

Keep one parameter schema and one rendering pipeline for preview and export.
Render exports again at the target resolution; do not enlarge the preview.
Fix seeds, orientation and alpha handling. For SVG turbulence/displacement,
specify `color-interpolation-filters` deliberately and inspect browser/editor
differences. A noise displacement approximates material; it is not a simulation.

## Image generation

Use an available image-generation tool for a final bitmap when that fits the
request. Supply reference composition, palette, positions, material and crop,
then inspect the returned image. Describe the result as a raster; importing it
as an image fill in Figma does not make its pigment or topology editable.

## Primary documentation (checked 2026-10-24)

- [Figma MCP setup](https://developers.figma.com/docs/figma-mcp-server/)
- [Figma MCP tools](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma paints](https://developers.figma.com/docs/plugins/api/Paint/)
- [SVG turbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)
- [SVG displacement](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)
