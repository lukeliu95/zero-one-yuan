---
round: 019
type: phase_d_deep_dive_charts
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T06:10:00Z
git_sha_before: a162b4b
git_sha_after_local: after_round_019_pending
---

# Round 019 · 零点一元 · Phase D 横向 Deep Dive + 图表

## 1. 本轮目标

用户原话:"PhaseD 产品进化内容可以在下一行,横过来放,加入一些图表。"

之前 Phase D 卡挤在 4 栏 process grid 里(Phase A/B/C/D 4 栏),空间太窄,17 轮 round 的厚度展示不出来。本轮把 Phase D 拆出来做成 **full-width 横置专栏 + 2 张 SVG 图表 + 分段时间轴**。

## 2. 改动 diff

### 旧:挤在 4 栏 grid 里
```
.process { grid-cols: A | B | C | D }  ← Phase D 一栏 240px,塞不下 17 轮
```

### 新:Phase D 拆出 + 全宽 deep dive 段
```
.process { grid-cols: A | B | C | D-stub(占位短卡) }
.phase-d-detail { full width · 14% screen height · 渐变青紫底 }
  ├ .pdd-head        ← 标题 + lede + 3 个核心 stat
  ├ .pdd-grid (3:2)  ← 左:评分轨迹折线图  右:每轮类型方格热图
  └ .pdd-timeline    ← 4 段分段时间轴 + score delta
```

### 图表 1 · 评分轨迹折线图(SVG inline · 540x220)
- X 轴:r000 → r018(19 个 round)
- Y 轴:84 → 96 加权综合分
- 折线 + 圆点 + 渐变填充(青色 #7CD2D5)
- Y 轴 grid lines @ 85/88/91/94 + monospace 标签
- 每个圆点 hover 显示 "r0XX · 分数"(SVG `<title>`)

### 图表 2 · 每轮类型方格热图(SVG inline · 19 cells)
- 每格 24x24,数字 = round 编号 0-18
- 颜色:baseline 灰 / 内容 9 轮青(#7CD2D5)/ 产品 9 轮紫(#A744E2)
- legend 三行:baseline 1 / 内容 9 / 产品 9
- 移动端 overflow-x scroll(min-width 520px)

### Stat 卡(右上)
- 19 round 文档
- +9.85 pp 累计
- 95.00 当前评分

### 分段时间轴(底部)
- r001-007 · 内容补齐 + 三轴一致性审计 · 85.15→93.50 (+8.35)
- r008-010 · web 落地页 + Vercel 部署 + split reader · 93.50→94.05 (+0.55)
- r011-013 · 文学性 retain + 域名上线 · 94.05→94.25 (+0.20)
- r014-018 · 全文 HTML + 文档浏览器 + 路径修复 + IA 调整 + Hero CTA · 94.25→95.00 (+0.75)

## 3. 实现

- `python3` 内联生成 SVG points 数组(score 数据从 pipeline-state.json 读)
- 0 外部 chart 库(Chart.js / Recharts 都没用)· 纯 SVG inline
- viewBox 自适应,移动端不丢内容
- 添加 28 行 CSS(`.phase-d-detail` 至 `.pdd-delta`)+ 1 段 mobile media query

## 4. 评分

| 维度 | round-018 分 | round-019 分 | 变化 |
|---|---|---|---|
| 主题契合度 | 95 | 95 | 0 |
| 角色立体度 | 93 | 93 | 0 |
| 概念融合自然度 | 96 | 96 | 0 |
| 文学性 | 90 | 90 | 0 |
| 节奏感 | 88 | 88 | 0 |
| **加权综合**(小说本体) | **95.00** | **95.00** | **0** |

小说本体 0 改动。**产品轴**显著提升:Phase D deep dive + 2 张图把"17 轮迭代"从抽象列表变成可视化叙事。

## 5. score delta

- baseline: 85.15
- round-018: 95.00
- round-019: **95.00**(+0.00 · 产品改进 · 不进文学加权)

## 6. next round 建议

`stop_default`。如果继续:
- 给 Phase A/B/C 也加各自的微图表(各阶段可视化对齐)
- 整合 reader 阅读时长 stat(基于 chars/章节估算)
- 在 hero stats 里加一个"19 轮 CEO"的 sparkline 缩略图
