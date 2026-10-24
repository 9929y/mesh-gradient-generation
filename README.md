# Mesh Gradient Generation

A reusable agent skill for creating and refining mesh gradients for presentations,
websites and brand visuals. It combines art direction, palette selection and
editable Figma workflows, with SVG and code-rendering alternatives.

[English](#english) · [中文](#中文) · [Agent instructions](SKILL.md) · [Illustrated guide](index.html)

## English

### Purpose and practical value

Use this skill when a gradient needs to support a real design task: a presentation
cover, a readable content-slide background, a website hero, a project thumbnail,
or a consistent family of brand/campaign visuals.

It helps turn a reference or an open-ended request into decisions an agent can
execute: which colors play which roles, where the main masses sit, where text
needs space, how edges merge, and what the user should be able to edit later.
The intended value is less repeated setup and more consistent revisions; no
measured productivity or business-outcome claim is made.

| Application | What the skill helps decide |
|---|---|
| Presentations / PPT | Slide ratio, title-safe space, restrained content backgrounds and export size |
| Websites and thumbnails | Desktop/mobile crops, text protection, visual hierarchy and small-size readability |
| Brand and campaign systems | Palette roles, recognizable shape grammar and controlled variations across assets |
| Reference reconstruction | Native editable color masses, optional separately labeled raster detail, and comparison with the target |

### How to use it

1. Install the complete folder as `mesh-gradient-generation` in your agent's
   skills directory. Keep `SKILL.md`, `references/` and `scripts/` together.
2. Provide the intended use, dimensions/aspect ratio, a reference or brand colors,
   the area reserved for content, and the required editability/output format.
   If you have not chosen colors, ask for a few palette directions at the same
   composition before making a larger set.
3. For native Figma output, connect a tool that can write to the canvas and give
   the agent the target file. This skill does not supply a connector or sign in
   to Figma. The agent must discover the connection's actual capabilities.
4. Review the artwork in its intended application. Refine palette, distribution,
   fusion and contrast; preserve the selected composition during color comparison.

For Codex, a typical installation is:

```sh
git clone https://github.com/9929y/mesh-gradient-generation.git \
  ~/.codex/skills/mesh-gradient-generation
```

Reload your client's skill list if needed. Other agents have their own loading
conventions. Installing the files does not itself enable automatic invocation
in every client.

Example request:

> Use $mesh-gradient-generation to create a 16:9 presentation-cover gradient.
> Compare monochromatic, analogous and restrained contrasting palettes using
> the same composition. Keep the left third quiet for a dark title. After I
> choose a direction, build editable layers in my Figma file, inspect the result,
> and explain how to change its colors and softness.

### How an agent should read this repository

**Start with [SKILL.md](SKILL.md).** This README explains the purpose and setup;
`SKILL.md` is the operational entry point. Read only the references needed for
the current task:

| Task | Read next |
|---|---|
| Choose use case, palette, brand direction or simple editing controls | [Art direction](references/art-direction.md) |
| Build Sky-inspired, Dreamlike, Flower-inspired, Diffuse, Heightmap or Multipoint artwork; reconstruct a reference | [Figma recipes](references/figma-recipes.md) |
| Operate Figma, export SVG, or choose another rendering tool | [Tool adapters](references/adapters.md), plus the installed connector's current instructions |
| Explore fluid, pigment, oil/brush or chromatic silhouette rendering | [Related effect recipes](references/effects.md) |
| Add ambient motion or source-image reveal | [Motion guidance](references/motion.md) |

Inspect the target tool and existing artwork before making changes. Use the
helper that fits the task; do not execute every script or load every reference
by default. Return the artifact/node link, editable controls, validation evidence
and relevant limitations. Repository instructions do not replace the user's
choices or provide permission to modify an unrelated file.

### Included tools and boundaries

- `scripts/figma_native.js`: `buildMesh(figma, spec)` creates isolated native
  Gaussian-mask groups with separate color fills and returns their node IDs.
  Inline it into a supported Figma execution tool; it is not a standalone plugin.
- `scripts/render_svg.py`: Python 3 standard-library generator for four original
  schematic studies. For example:

  ```sh
  python3 scripts/render_svg.py --effect petal --seed 17 \
    --width 1200 --height 800 --output petal-study.svg
  ```

- `index.html`: one illustrated Chinese guide with an interactive palette
  comparison. Download the repository and open this file locally; GitHub's file
  view displays HTML source. The comparison does not sync changes to Figma.

The six Figma recipes are documented methods, not six ready-made generator
buttons. The package does not include image segmentation, a shader/reveal engine
or automatic PPT creation. Native geometry, imported SVG and flattened bitmaps
have different editing limits. The 200 px blur setting is scale-specific and
must not be added automatically to the mask-based route.

Recipes are grounded in inspected native artwork and recovered historical
construction records. The bundled Figma helper passed mock checks and has not
yet been executed against a live canvas. Validation details are in the guide.

## 中文

### 用途与价值

当你需要给一份 PPT 做封面、给网页留出清楚的标题区域，或者让一组品牌视觉
保持一致时，难点往往不只是“生成一个好看的渐变”。你还需要决定颜色怎么搭、
色块放在哪里、哪些地方应该留白，以及之后怎样方便地修改。

**Mesh Gradient Generation** 把这些判断整理成 Agent 可以执行的流程：先确定
用途和视觉方向，再选择配色与构图，连接 Figma 或其他合适的工具制作，最后
检查实际效果和可编辑范围。目标是减少重复设置、让修改更一致；目前没有对节省
时间或商业效果做量化验证。

| 使用场景 | 重点解决什么 |
|---|---|
| PPT 封面、章节页、内容页 | 按原幻灯片比例设计，给标题和图表让出空间，选择合适的导出尺寸 |
| 网页主视觉、项目缩略图 | 检查桌面和手机裁切、文字可读性，以及缩小后是否仍有层次 |
| 品牌和活动视觉 | 固定颜色角色与形状语言，在多个应用中做有控制的变化 |
| 参考图复现 | 分开可编辑色场与可选的位图细节，并用实际导出结果核对差异 |

### 用户怎么使用

1. 将整个目录安装为 `mesh-gradient-generation`，保留内部结构。Codex 常用位置
   是 `~/.codex/skills/mesh-gradient-generation/`；安装命令见上面的英文部分。
   其他 Agent 按各自的 Skill 加载方式使用。
2. 告诉 Agent：用在哪里、画面比例或尺寸、参考图或品牌色、哪里放文字，以及
   是否需要可编辑图层。没选好颜色时，可以先比较单色、邻近色、克制撞色等方向。
3. 需要直接在 Figma 制作时，先接通支持画布写入的工具，并提供目标文件。
   MCP 在这里负责让 Agent 读取和操作 Figma；安装这份 Skill 本身不会建立连接，
   也不会自动登录账号。
4. 将结果放回真实页面或幻灯片里看，再调整配色、分布、融合和对比。比较颜色时
   保持构图不变，避免同时改变太多因素。

可以直接这样提需求：

> 使用 $mesh-gradient-generation，为 16:9 的演示文稿制作封面渐变。
> 在同一个构图上比较单色、邻近色和克制撞色三种配色，左侧三分之一留给深色标题。
> 等我选定方向后，在我提供的 Figma 文件里建立可编辑图层，回看实际效果，
> 并说明我以后如何改色和调整柔和程度。

### Agent 应该怎么读

**先读 [SKILL.md](SKILL.md)。** README 是给使用者看的介绍与安装说明，
真正的执行入口是 `SKILL.md`。随后按任务读取参考文件：

| 当前要做什么 | 读取什么 |
|---|---|
| 判断用途、选择配色、考虑品牌审美和修改方式 | [art-direction.md](references/art-direction.md) |
| 制作六类 Figma 效果，或复现已有参考 | [figma-recipes.md](references/figma-recipes.md) |
| 操作 Figma、导出 SVG、选择其他工具 | [adapters.md](references/adapters.md)，以及当前连接工具的说明 |
| 研究流体、颜料、油彩笔触、彩色剪影等相关方向 | [effects.md](references/effects.md) |
| 增加缓慢运动或图片显影 | [motion.md](references/motion.md) |

先检查工具能力和目标文件里已有的内容，再动手制作。只读需要的参考、只运行
当前任务用得上的脚本。交付时说明产物位置、可调参数、检查结果和实现限制。
不要因为读到了仓库文件，就推定可以修改用户未指定的其他项目。

### 已提供什么，还有哪些边界

原生 Figma 函数会建立“独立色团组＋高斯柔化遮罩＋纯色 Fill”，并返回各层的
节点 ID，便于后续定点改色和调整构图。它需要在支持的 Figma 执行工具中调用，
不是双击就能运行的插件。

SVG 脚本使用 Python 3 标准库生成四类原创示意；六类 Figma 效果则以制作配方
提供，不代表已经有六个现成生成按钮。本包未实现自动做 PPT、图片分割或完整
动画引擎。原生图层、导入 SVG 和位图的可编辑程度不同，需要分别说明。

图解和交互配色比较都在同一份 [index.html](index.html) 中。下载仓库后在浏览器
打开即可；GitHub 文件页只显示 HTML 源码。页面中的改色不会自动同步到 Figma。
200 px 模糊值有对应的画面尺寸和制作路线，不能给所有色团统一套用。

制作方法已结合原生作品结构和恢复的历史操作记录核对。新 Figma 构建函数通过
了模拟检查，尚未在真实画布中执行；具体验证状态保留在图解页中。

## License / 许可

[MIT](LICENSE). Independent community project; not affiliated with Figma or an
image-generation provider. 独立社区项目，与 Figma 或图像生成服务商无隶属关系。
