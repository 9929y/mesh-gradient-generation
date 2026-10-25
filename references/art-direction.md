# Use, palette and art direction

This is design guidance, not a claim that a color harmony guarantees good taste.
Evaluate the gradient inside its actual slide, website or brand application.

## Start from use

| Use | Composition | Deliver and verify |
|---|---|---|
| Presentation cover/divider | One dominant mass, a quiet title area, one restrained accent | Actual deck ratio; commonly 16:9, but use the deck's own dimensions. Export at slide-display resolution (e.g. 1920×1080 for a 1080p deck); keep editable masters separately |
| Dense presentation/content slide | Pale or dark quiet field; put movement near margins | Keep chart/label meanings distinct from decorative color. Test projector-like low contrast and an exported slide, not only the design canvas |
| Web hero | Plan a safe title zone, desktop/mobile crops and sufficient bleed | Check actual viewport ratios, compression and text contrast. Use a stable image/CSS fallback if animation is too costly |
| Cards/thumbnails | A recognizable large shape and color identity at small size | Inspect at actual card size. Grain and fine petals may disappear; do not compensate by over-sharpening everything |
| Brand/social campaign | A repeatable relationship between palette, geometry and material | Keep brand anchors and a small family of layouts. Variants should remain recognizable when viewed together |
| Print/poster | Clear hierarchy at viewing distance; preserve room for content | Use the printer's size, resolution and color-profile requirements. An sRGB screen preview does not establish CMYK/print fidelity |

For editable PPT objects, verify the target application's SVG import and
ungroup behavior. Do not promise that Figma masks and filters become equivalent
PowerPoint objects. A high-resolution background bitmap with an editable design
master is often appropriate when only slide text must remain editable.

## Choose palettes by roles

Respect existing brand colors and usage constraints. If none exist, infer a
candidate direction from the audience, context and reference; do not assign
universal meanings such as “blue always means trust.” Ask only about preferences
that materially affect the result.

Define a background/base, dominant pigment, supporting pigment, light anchor,
and optional accent. Some roles can share a hue. Start with 3–5 useful colors,
then add a color only when it solves a visible composition problem. A fixed
60/30/10 ratio is not a requirement: inspect the rendered distribution.

Offer a small comparison at the same crop, geometry, opacity and seed:

| Direction | Build it | Why choose it | Watch for |
|---|---|---|---|
| Monochromatic | One hue family; vary lightness and chroma, with a compatible light or dark anchor | Cohesive identity, restrained deck/background | Flatness if all tones have equal lightness; muddy darks if made only by adding black |
| Analogous | Neighboring hue families with a deliberate warm/cool bias | Gentle depth and easy transitions | Similar midtones can merge; preserve a clear light/dark hierarchy |
| Complementary / split contrast | A dominant family plus a smaller opposing or split-opposing accent | Distinctive focal tension | Broad overlapping complements can desaturate; reduce accent extent/alpha before changing the whole palette |
| Neutral plus accent | Tinted neutrals with one controlled pigment family | Dense decks, UI-heavy compositions, adaptable brand system | Too little color identity; accent must stay visible at the intended size |

Use OKLCH/OKLab when available to adjust lightness and chroma more deliberately
than equal steps in RGB or HSL. Chroma limits vary with hue and lightness;
gamut-map to the delivery space instead of blindly clipping channels.
Color-space interpolation changes the mixture: inspect the actual target tool,
not just a color-wheel relationship. The SVG helper uses supplied HEX colors;
it is not an OKLCH palette-generation engine.

Example studies (not universal brand prescriptions):

- **Warm monochrome:** ivory #FFF4E7, pale apricot #FDDAAA, peach #F6AD71,
  burnt orange #B7542E. Separate structure through lightness.
- **Adjacent warm:** ivory #FFF4E7, gold #E6BE6C, peach #F6AD71,
  rose #C97C83. Keep one warm family dominant.
- **Peach/olive contrast:** ivory #FFF4E7, peach #F6AD71, olive gold #B59B46,
  olive #898418. Test how much olive survives overlap; “complementary” here is
  an art-direction shorthand, not an assertion of exact opposite hue angles.
- **Cool neutral/accent:** paper #F4F5F3, mist #D5DEDE, blue gray #91A9B4,
  blue #3F708E. Keep one darker mass or quiet dark text zone.

Provide each proposal as role-labeled swatches plus a rendered example and one
sentence explaining its use/tradeoff. A list of HEX values alone is not enough.
Let the user choose before producing dozens of color variants. If they say
“more elegant,” translate that into a concrete hypothesis—less competing
saturation, clearer hierarchy, more negative space—and show the comparison.

## Judge it as a brand designer

Check these relationships, rather than prescribing a fashionable color scheme:

1. **Purpose:** does the field support the message and audience, or compete
   with the product/photography/type?
2. **Hierarchy:** is there a dominant mass, a supporting mass, and somewhere
   quiet? Avoid equally sized, equally bright blobs scattered everywhere.
3. **Distinctiveness:** which combination of hue bias, topology and edge rhythm
   makes this brand recognizable across several applications?
4. **Material consistency:** are soft diffusion, crisp contour and grain used
   intentionally? A restrained soft field does not need every texture effect.
5. **Color economy:** is each additional hue doing a job? Compare overlap,
   luminance and crop before increasing saturation.
6. **System:** do the cover, content slide, thumbnail and mobile crop still
   belong together? Preserve palette roles and shape grammar, vary emphasis.

Avoid presenting “premium,” “calm” or “bold” as measured results. Describe the
visible decisions and test them with the intended application.

## A small editing surface

Start with these choices; add deeper parameters only when needed:

- **Purpose / quiet zone:** where content sits and which edge may crop.
- **Palette:** replace role colors while holding geometry and seed fixed.
- **Distribution:** select a composition; move, resize or rotate whole masses.
- **Fusion:** widen or tighten overlap/falloff; use blur only for the chosen method.
- **Contrast / accent:** adjust light/dark separation and the accent's coverage.

Name colors by role and layers by function. Return the base and mass color-node
IDs from a connector workflow. A normal “make it peach/olive” edit changes those
fills, not the entire scene. Preserve the original until the replacement is
reviewed. Avoid a new page and a new export for every tiny slider change.

For the **blurred vector route**, compare 100, 150 and 200 px at a reference
1536×1024 size, then scale by the shorter dimension if the canvas changes.
This is a tuning bracket, not a minimum/maximum requirement. Prefer lower
values when contour identity matters. Judge the actual render: broad blur
can erase structure and color separation. The guide contains a real Figma
Flower comparison. Other family-specific ranges are proposed starting points.
See [palettes-and-layout.md](palettes-and-layout.md) for formulas, the four
rendered palette recipes and cross-ratio re-layout.

For the **mask-group route**, softness comes from the alpha falloff and support
extent. Edit the color rectangle for hue, the entire group for placement, and
the mask only for falloff. Do not add a 200 px blur automatically. These routes
are alternatives, and matching their visual appearance requires calibration.

## Readability and export

For web text, WCAG 2.2's minimum contrast is 4.5:1 for normal text and 3:1 for
large text (as defined by the standard). Evaluate the actual background under
the text at every relevant crop/state; checking only palette swatches misses
bright or dark pockets produced by overlap. Use a stable quiet zone, scrim or
solid backing when the gradient cannot guarantee legibility. Motion introduces
more states to check. Do not label a whole palette “accessible” from one sample.

Check color profiles, transparency and export dimensions. Dither/grain can help
with visible banding but also dirties quiet backgrounds and increases file size;
compare at intended display size and compression. Do not use texture to conceal
a poor color or contour transition.

## Primary sources

- [W3C CSS Color 4: OKLab / OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab)
  — color-space concepts; not evidence that a harmony is aesthetically superior.
- [WCAG 2.2 contrast minimum](https://www.w3.org/TR/WCAG22/#contrast-minimum)
  — the text-contrast thresholds and their conditions.

The composition, harmony and brand-judgment guidance above is a synthesized
design framework, not an externally validated preference study.
