---
round: 021
type: mobile_optimization
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T06:45:00Z
git_sha_before: c669bf5
git_sha_after_local: after_round_021_pending
---

# Round 021 · 零点一元 · 移动端体验优化(nav/hero/process/phase-d/explorer/chapters/reader)

## 1. 评估(audit)

mobile viewport 390/375/360 三档实测(playwright headless)+ 静态 CSS audit 找到 8 个具体问题:

1. **横向溢出** — 落地页 hscroll = 213px(.pdd-svg-cells min-width 520 / .nav 横向 / 部分 grid 容器超出 viewport),没有 body `overflow-x: hidden` 兜底
2. **触摸目标不足 44px** — `.nav a` padding 6px 10px(高 ~30px)/ `.nav-link`(reader)4px 8px / 章节阅读器上下导航
3. **hero CTA flex:1** 在 360px 屏 2 个按钮各 ~155px,中文 + 箭头会贴边
4. **hero-stats 3 列** 在 ≤390px 数字 + 标签挤一行,字号 18px 但容器只够 ~110px
5. **nav 在 ≤640px 仍堆叠成第二行**(680px 块设了 flex-direction: column),浪费 hero 上方垂直空间
6. **phase-d-stub 占位短卡** 在 mobile 跟 deep dive 段重复,信息冗余
7. **heatmap overflow-x scroll** 用户不知道可以横向滑动(无视觉提示)
8. **reader.css mobile font-size 18px**(spec 19px)、行高 1.9 vs 1.95、padding 36px(<375 太宽);sticky `.reader-top` 在 iOS Safari 没 transform context 偶尔抖动

## 2. 改动(CSS rules)

**`web/index.html` `<style>`**:
- 新增 `meta theme-color` + viewport-fit cover
- `html, body { overflow-x: hidden }` 全局兜底
- `.pdd-cells-wrap::after`(← 滑动 →)— 仅 ≤768px 显示
- `@media (hover:none) and (pointer:coarse)` — `.nav a` / CTA / `.nav-link` ≥44px
- `@media (max-width: 768px)` 加强 — `.section-head 1fr` / `.relics 2 列` / `.characters 1 列` / `.phase-d-stub display:none`
- `@media (max-width: 640px)` 全新 — `--gutter: 16px` / topbar 重新 row 布局 / `.hero-stats` 改 2x2(第三项跨列)/ CTA padding 缩 / `a.chapter` min-height 44 / `.pdd-head` flex-column / `.pdd-stats` 自适应 wrap
- `@media (max-width: 380px)` 全新 — h1 缩 / brand 15px / `.pdd-stats` 50/50 wrap

**`web/assets/reader.css`**:
- `@media (max-width: 720px)` 重写 — font-size 18→**19px**(对齐 spec)/ line-height **1.92** / `.nav-link` padding 12px + min-height 44 + 边框 / `.reader-shell` width calc(100% - 28px)
- `@media (max-width: 380px)` 新增 — font 18 / chapter-title 24px / 更紧 padding
- `.reader-top { transform: translateZ(0); will-change: transform }` — iOS sticky 稳定
- 触摸设备兜底 `@media (hover:none)` `.nav-link min-height 44`

**`web/novel.html`**:
- viewport-fit + theme-color
- `@media (max-width: 640px)` `.toc-list a` 改 2 列 grid(56px + 1fr)/ `.day` 落到第二行 / min-height 56

## 3. 评分(本轮加权)

| 维度 | 权重 | 分 | 备注 |
|---|---|---|---|
| viewport 0 横向溢出(home/ch01/ch09/novel × 3 viewport) | 30% | 95 | playwright 实测 12 通过 0 失败 |
| 触摸目标 ≥44px(nav/CTA/drawer/chapter) | 25% | 96 | nav 44 / CTA 46-49 / toggle 53 / chapter 134 |
| hero/nav/process 移动布局合理 | 20% | 94 | hero-stats 2x2 + nav 单行 + stub 隐藏 |
| reader 阅读体验(字号/行宽/sticky) | 15% | 95 | 19px/1.92 + iOS transform fix |
| 风格一致(paper/4px/无亮紫) | 10% | 96 | 全部沿用 var(--*) tokens |

加权综合分 ≈ **95.10**(round-020: 95.00 → +0.10)

## 4. delta(改动量化)

- 文件 3:`web/index.html`(+108 行 mobile CSS)/ `web/assets/reader.css`(+24 行)/ `web/novel.html`(+18 行)
- 新增断点 3:`(hover:none)` / `≤640` 全新 / `≤380` 全新(reader 同)
- 新增 meta 2:viewport-fit + theme-color × 2 文件
- 测试场景 5:home / drawer / ch01 / ch09 / novel — 全 0 hscroll
- 触摸目标审计 7 个 nav 链接 × 3 viewport = 21 项全 ≥44px

## 5. 建议(给下一轮)

1. **Lighthouse mobile 跑分** — 实测部署后 Performance / Accessibility / Best Practices 三项指标
2. **真机抽测** — iPhone SE / iPhone 15 Pro / Galaxy S 各一台,验证 sticky / 长滚动 / drawer 触摸响应
3. **暗色模式 hero** — 落地页 hero 是固定 night,但 paper 段落在系统暗色下没切换,可考虑加 prefers-color-scheme
4. **Web Vitals** — Vercel insights 已接入,看 LCP / CLS 真实数据
5. **章节内插画占位** — 14 章纯文本,如要再升级可考虑 SVG 章节封面
