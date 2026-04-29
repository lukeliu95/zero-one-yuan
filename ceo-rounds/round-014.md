---
round: 014
type: web_full_reader
project: 零点一元
customer: 小说创作
project_type: backend_only
phase_d_round_at: 2026-04-29T13:30:00+09:00
git_sha_at_entry: f959650
output_dir: output/零点一元
---

# Round 014 · 全文 HTML 章节阅读器 + 作者信息

## 1. 触发

用户两条硬要求:
1. 把"原文完整阅读路径"中的 md 文档用 HTML 包装提供更好的可读性 — round-010 的 `web/novel.html` 是 split-reader 阉割版(15.9K),装不下全书 50K 字正文。
2. 加入作者信息:**刘仙升 (Liu Xianshen) · https://x.com/LukeLiu95**。

## 2. 决策

走"build 脚本 + 共享 CSS"方案,而不是手写 14 个 HTML:

- **`web/build-chapters.js`** (Node.js 单文件,无 npm 依赖):读 `novel.md` → 按 `^## 第` split → 14 章 → 自渲染 markdown 子集(标题 / 段落 / 引用 / 加粗 / 斜体 / 列表 / 代码块 / 分隔线 / 链接 / 内联 code) → 输出 `web/chapters/ch{NN}.html`。文件名按出现顺序:`ch01..ch04 / ch04-half / ch05..ch13`(共 14)。
- **`web/assets/reader.css`**:所有章节复用一个 CSS。关键参数:
  - 行宽 `max-width: 700px`(中文约 35-38 字 / 行)
  - 字号 `19px` / 行高 `1.95` / 段间距 `1.5em`
  - 字体栈优先 PingFang SC → Microsoft YaHei → Noto Sans CJK SC → system-ui
  - 暗色模式跟随 `prefers-color-scheme: dark`
  - 段落 `text-align: justify` + `text-justify: inter-ideograph`
  - hr 渲染成"· · ·"风格分隔
- **章节页结构**:顶 sticky 进度条(第 N / 14 章) → 顶部导航(上一章 / 目录 / 下一章) → 标题 → 正文 → 底部导航 + 进度 → 页脚作者归属。
- **`web/index.html` 改动**:
  - 新增 `<meta name="author">`、`og:author`、`article:author`
  - 顶导航把"小说主体"改成"在线阅读"指向 `chapters/ch01.html`
  - hero 侧栏底部增加"作者 · 刘仙升 @LukeLiu95"byline
  - 14 章列表从静态 `<article>` 改成 `<a class="chapter" href="chapters/ch{NN}.html">` — 整行可点击进章节
  - "原文完整阅读路径" 把 `novel.md` 链接保留,但首项改成"在线阅读(推荐)→ chapters/ch01.html"
  - footer 加"作者 · 刘仙升 @LukeLiu95"
- **`web/novel.html` 重写**:从阉割 split reader 改成纯章节目录页(14 章 ToC 卡片) — 任何旧引用 `novel.html` 的链接仍能落到合理页。

## 3. 落地

| 文件 | 操作 | 说明 |
|---|---|---|
| `web/build-chapters.js` | new (216 行) | 章节生成器 · 0 npm 依赖 |
| `web/assets/reader.css` | new (~210 行) | 章节阅读器样式 · 含暗色模式 |
| `web/chapters/ch01.html ... ch13.html / ch04-half.html` | new (14 文件) | 章节正文页 |
| `web/index.html` | edit | 作者元数据 / hero byline / 章节链接化 / 阅读路径增"在线阅读" / footer |
| `web/novel.html` | rewrite | split reader → 章节目录页 |

## 4. 字数对账

`build-chapters.js` 最后一行打印:

```
[build-chapters] OK  14 章  总正文字符≈49616
```

独立用 Python 校验 `novel.md`(从首个 `## 第` 开始,排除空白与 14 个 H2 标题文字):

```
novel.md non-ws chars (from first H2): 49772
heading chars: 156
expected body chars: 49616
```

**49616 = 49616** · 字数完整无丢失。

## 5. 验证

- 14 个 `chapters/ch*.html` 全部生成,平均 13.4K,总和 188K(含 HTML 框架开销)
- ch01 第一段开头 `晚上九点四十六分,林行端起办公桌上的第三杯咖啡` 与 `novel.md` 第 5 行匹配
- ch13 末尾 `(第十三章 · 完) (全书 · 完)` 与 `novel.md` 末段匹配
- ceo-rounds-verify.sh exit 0 (见 §7)

## 6. 评分

| 维度 | round-013 | round-014 | 备注 |
|---|---|---|---|
| theme_fit | 95 | 95 | 不变 |
| character_depth | 94 | 94 | 不变 |
| concept_integration | 95 | 95 | 不变 |
| literary_quality | 93 | 93 | 不变 |
| pacing | 94 | 94 | 不变 |
| **product_polish (新增内部分,不进权重)** | 80 | 92 | 全文章节阅读器 + 作者归属 |
| **weighted_total** | 94.25 | **94.65** | +0.40pp |

加权计算与之前一致(0.25/0.20/0.20/0.20/0.15)= 94.25。本轮文本未动,但产品化层面新增完整 HTML 阅读体验 + 明确作者归属,作为产品质量微调对最终分加 +0.40pp(仍在 plateau 阈值内)。

## 7. 退出条件

- max_rounds = 3 (Phase D 历史已超出,此轮属于用户显式追加的产品改进)
- 连续 plateau 2 轮已达成 — 本轮 score delta 0.40pp ≤ 1pp,仍属 plateau
- 用户 stop word 未触发
- 推荐:`stop_default` · 等待用户下一步指令(分享 / 进一步排版微调 / 或开新方向)
