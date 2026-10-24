# Optional motion and image reveal

Apply only when motion is requested. Approve the still's visual direction
first so texture, composition and timing are not all changing together.

## Two independent variables

Use `progress` for reveal (0 = abstraction, 1 = chosen endpoint) and `time` for
ambient life. Keep the seed and still parameters separate. A comparison at
the same progress is deterministic only with time fixed too. Pause freezes
both; reduced-motion delivery supplies a still and manual access to the endpoint.

Ambient drift can start around 1–2% of canvas size over 7–12 seconds. Treat
these as tuning values, not a required style. Attenuate distortion to zero
at a photographic endpoint; never distort the final source unintentionally.

## Common rejected mechanisms

- Individual blobs visibly translating and scaling back into photo positions.
- Obvious low-, mid- and high-frequency stage windows.
- An abstract layer fading away while a separate photograph fades in.

These can suit other briefs, but they often reveal the construction when the
desired effect is organic information reconstruction. Numerical continuity
alone does not establish perceptual naturalness.

## A workable research direction

Give the renderer one continuous information-capacity field `r(x,y,progress)`.
Use it to control color correction, structure and detail with overlapping
responses rather than separate staged gates. Keep spatial differences subtle
unless the user wants a directional wipe. Sample a continuous scale-space
representation or correct the template's own material units.

For dither/glyph resolve, keep cells fixed and use a stable threshold field.
What changes is the information carried per cell. Do not generate new random
thresholds every frame. Glyphs can carry luminance and structure without
requiring thousands of DOM nodes; an atlas/canvas or shader can render them.

Choose the endpoint explicitly:

- Resolve to photo: at progress 1, reproduce the supplied source with the same
  crop, orientation, color and alpha handling.
- Hold material: retain brush, silhouette or petal character at progress 1.

A capped reveal value is a design choice, not a successful photo endpoint.
Do not carry historical preferences about one endpoint into every new task.

## Verify before adjusting aesthetic timing

Use an asymmetric four-corner orientation fixture through the same image upload,
offscreen, blur, display and export path. Canvas, texture uploads and framebuffer
passes can disagree on vertical origin. Centralize coordinate conversions;
do not scatter unexplained `1-y` fixes. Avoid reversed-edge `smoothstep` calls;
use `1 - smoothstep(low, high, value)` when an inverted ramp is needed.

At fixed time/seed, inspect progress 0, .25, .5, .75 and 1; scrub forward/back
to the same value and compare. Play continuously and reverse mid-reveal.
Confirm every paused state is coherent and the endpoint meets the selected
goal. Quantitative frame differences can expose pops but cannot certify a
natural transition. Test the actual target device and reduced-motion mode.

The bundled native/SVG helpers create stills only. These motion instructions
are implementation guidance; they are not an included tested animation engine.
