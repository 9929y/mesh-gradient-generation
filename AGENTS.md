# Agent entry / Agent 阅读入口

For an agent working directly in this repository, read `SKILL.md` next. It is
the execution workflow. A skill loader may load `SKILL.md` directly; do not
assume every client auto-loads this file. README is the bilingual human guide.

直接操作仓库时，下一步读 `SKILL.md`；通过 Skill 加载器使用时，通常直接进入
`SKILL.md`。README 中“给使用者”和“给 Agent”的说明分别面向两种读者。

Read selectively:

| Task | Reference |
|---|---|
| Palette, use case, brand judgment | `references/art-direction.md` |
| Exact sample colors, size/ratio, blur and editing | `references/palettes-and-layout.md` |
| Six Figma construction families / reference matching | `references/figma-recipes.md` |
| Target tool / Figma connection | `references/adapters.md` and its current connector documentation |
| Browser material studies or motion | `references/effects.md` or `references/motion.md` only as needed |

When modifying the package:

- Preserve the name **GenAI Mesh Gradient** and invocation `genai-mesh-gradient`.
- Keep the research connection grounded in the two public papers linked from README.
  Distinguish agent orchestration and procedural rendering from trained diffusion
  models; do not claim paper reproduction, sole invention or unmeasured impact.
- Maintain the single `index.html`; keep English and Chinese README sections aligned.
- Use the real Figma samples as visual targets. The old `petal` sketch is not a
  faithful Flower example. Label native exports, controlled variants and new
  procedural studies accurately; keep original references unchanged.
- Keep sample illustrations in `design/illustrations/`; share their paths
  between README and HTML. Do not publish private file keys or user transcripts.
- Keep palette geometry in `scripts/palette_studies.js` consistent with the
  four palette SVGs. After a code change, run the relevant helper and inspect
  the guide at desktop and mobile widths; check local image/reference links.
- Blur is adjustable. Recompose across aspect ratios. A mask-based field has
  no extra blur by default. Never describe a rendered bitmap as editable layers.

These instructions do not establish a connector or authorize changes to an
unrelated Figma file or external publication.
