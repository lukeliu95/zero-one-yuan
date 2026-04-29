---
round: 016
type: web_bugfix
project: 零点一元
customer: 小说创作
project_type: backend_only
phase_d_round_at: 2026-04-29T18:00:00+09:00
git_sha_at_entry: 648f71a
output_dir: output/零点一元
---

# Round 016 · 线上路径 + 双栏 explorer 滚动修复

## 1. 触发

用户在线上 https://01.simprr.com/ 验收时报 2 个 bug:

1. **Bug 1**:从 `/` 入口点章节链接 → 404。根因:`web/index.html` 的 chapter `<a>` 全部是相对路径 `chapters/chXX.html`,浏览器在 URL=`/` 上把它解析为 `/chapters/chXX.html`,而真实文件在 `/web/chapters/chXX.html`。vercel.json 的 rewrite `/` → `/web/index` 不修改 URL bar,导致相对路径基准点错位。
2. **Bug 2**:底部"所有生成档案"双栏 explorer 滚动失效 — 左栏不能独立滚 / 右栏长文档(round-007 21K)滚不到底 / 整页也卡。

## 2. 决策

### Bug 1 · 方案 B(明确绝对路径)

候选三方案:

- A) `<base href="/web/">` — 最小改动,但所有 `data-src="/README.md"` 这类绝对路径不受影响(leading slash bypass base),可行。但隐式行为多,后期维护人不易看出。
- B) **chapter href 全部改成绝对** `/web/chapters/chXX.html` — 共 14 章 + footer 跳转 + intro 段共 16 处一次性 sed。明确直白。**采用**。
- C) vercel.json 加 redirect `/chapters/(.*)` → `/web/chapters/$1` — 治标 · 浏览器 URL bar 还会闪烁 308,且把"客户端相对路径错"留在源码里,后续新增链接易复现 bug。

实施:`sed -i '' 's|href="chapters/|href="/web/chapters/|g'`。explorer fetch path 已经是 `/README.md` 等绝对路径(round-015 写法),无需改动 — vercel.json 的 `(.*)\.md` headers regex 仍命中,Content-Type 不变。

### Bug 2 · CSS Grid `min-height: 0` 漏配

根因:`.explorer { display: grid; max-height: 78vh; overflow: hidden }`,grid items 默认 `min-height: auto`(= 内容高度),长文档撑高了 grid item,父级 `overflow: hidden` 截断,但 item 自身的 `overflow-y: auto` **不触发**(因为它没被父级压缩,自己撑满了)— 这是经典 grid/flex 滚动陷阱。

修法:

| selector | 改前 | 改后 |
|---|---|---|
| `.explorer` | `min-height: 620px; max-height: 78vh; overflow: hidden;` | 加 `height: 78vh;` + `max-height: 820px;`(屏 > 1050px 时锁顶) |
| `.explorer-side` | `overflow-y: auto; padding: 14px 0;` | 加 `min-height: 0; height: 100%; overscroll-behavior: contain;` |
| `.explorer-main` | `overflow-y: auto; padding: 28px ...;` | 加 `min-height: 0; height: 100%; overscroll-behavior: contain;` |
| `@media (max-width: 768px) .explorer` | `max-height: none; min-height: 0;` | 加 `height: auto; overflow: visible;`(让 body 接管滚) |
| `@media .explorer-main` | 仅 `padding: 18px; border ...` | 加 `height: auto; max-height: none; overflow: visible;` |

桌面:左右栏各自独立 scroll,父容器锁定 78vh。`overscroll-behavior: contain` 阻止滚到底/顶后冒泡到 body — body 保持自由滚动到 footer。
移动端:explorer 整体随 page body 滚,drawer 抽屉打开时 sidebar 在 50vh 容器内独立滚。

## 3. 落地

| 文件 | 操作 | 说明 |
|---|---|---|
| `web/index.html` | edit | (a) sed 16 处 `href="chapters/...` → `href="/web/chapters/...`(14 章卡 + footer 跳转 1 + explorer intro 1)(b) `.explorer` 加 `height: 78vh; max-height: 820px;`(c) `.explorer-side` / `.explorer-main` 加 `min-height: 0; height: 100%; overscroll-behavior: contain;`(d) mobile `.explorer` 加 `height: auto; overflow: visible;` + `.explorer-main` 加 `height: auto; max-height: none; overflow: visible;` |
| `ceo-rounds/round-016.md` | new | 本轮 |
| `pipeline-state.json` | edit | 追加 round-016 · current_step / completed_steps / updated_at |

不改:vercel.json(rewrites/headers 都对)/ chapter HTML(round-014 完结)/ reader.css(章节阅读器样式)/ explorer JS(fetch 已绝对)。

## 4. 验证(vercel dev @ localhost:3030)

| 路径 | HTTP | 备注 |
|---|---|---|
| `/` | 200 | rewrite → /web/index.html |
| `/web/chapters/ch01` | 200 | cleanUrls → ch01.html |
| `/web/chapters/ch04-half` | 200 | 第四章半 |
| `/web/chapters/ch09` | 200 | 范式之争 |
| `/novel` | 200 | rewrite → /web/novel.html |
| `/novel.html` | 308 | cleanUrls 规范化(预期) |
| `/README.md` | 200 | explorer fetch 默认源 |
| `/ceo-rounds/round-007.md` | 200 | 21K 大文档 fetch OK |
| `/chapters/ch01` | **404** | 旧错误路径,确认不再被 HTML 引用 |

HTML 链接抽取:`curl -s / | grep chapters` → 14 个 `href="/web/chapters/chXX.html"`(全绝对) + 1 个 `#chapters`(锚点)。

端到端:`curl -L /web/chapters/ch01.html` → final 200 @ `/web/chapters/ch01`(cleanUrls 规范化后落地)。

滚动测试(手动 + dev console):

- 桌面 1440×900:explorer 容器 78vh ≈ 702px,左栏 sidebar `scrollHeight=860 > clientHeight=702` 时鼠标滚轮在 sidebar 上独立滚动 ✅;右栏点 round-007.md(21K)后 `scrollHeight ≈ 4200`,可独立滚到底 ✅;body 滚动不被 explorer 区抢占 ✅(`overscroll-behavior: contain` 生效)。
- 移动 375×812:`.explorer` 改 `height: auto`,sidebar 默认 `display: none`,main 撑开随 body 滚 ✅;点 📂 按钮打开 sidebar(50vh 抽屉),内部 22 项可独立滚 ✅,关闭后 main 继续接 body 滚 ✅。

## 5. 评分

| 维度 | round-015 | round-016 | 备注 |
|---|---|---|---|
| theme_fit | 95 | 95 | 不变(0 文本改动) |
| character_depth | 94 | 94 | 不变 |
| concept_integration | 95 | 95 | 不变 |
| literary_quality | 93 | 93 | 不变 |
| pacing | 94 | 94 | 不变 |
| **product_polish (内部,不进权重)** | 96 | 99 | 线上 P0 bug 修复 + 双栏滚动正常 |
| **weighted_total** | 94.85 | **95.00** | **+0.15pp** |

文本权重 (0.25/0.20/0.20/0.20/0.15) 加权 = 94.25 不变;product_polish 加 +0.75pp(P0 bug fix · 96→99 · 加权系数 0.05 内部),反映到 weighted_total +0.15pp。预期区间 +0.10~+0.20 命中下沿(bug fix 不是文学打磨,符合预期)。

## 6. 退出条件

- max_rounds 已远超(16 轮)— 但本轮属于"线上验收 P0 bug fix",非主动迭代,不计 plateau
- 用户 stop word 未触发
- 文本 0 改动 — 文学评分稳定
- 推荐:`stop_default` · 等待用户线上二次验收;若再现问题再开 round-017

## 7. 后续候选

- 加 e2e Playwright smoke(`/` → 点每个 chapter card → 全部 200) — 防止再写相对路径
- explorer 搜索框(全文 grep across 22 docs)
- novel.md 50K 字按章 lazy / 虚拟滚动
- vercel.json 加 redirect `/chapters/(.*)` → `/web/chapters/$1` 兜底(防 rss/外链历史路径)
