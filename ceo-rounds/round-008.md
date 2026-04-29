---
round: 008
type: web_landing_page
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T09:30:00+09:00
git_sha_before: f13ba53c95b2416c20579bfaf3ac6ae37b75cf74
git_sha_after_local: after_round_008_pending
---

# Round 008 · 零点一元 · Web 落地页交付

> 注:本 round 由 /loop 排程的 cron job(2 小时间隔 · :07 触发)于 2026-04-29T09:30+09:00 自动派出 worker 执行。worker 写入了 web/ 目录与 pipeline-state.json round-008 元数据,但因后续用户驱动的 round-009(model_rebrand)误覆盖了本文件,此处依据 pipeline-state.json + web/ 实际产物事后重建文档,保证 v6.1 verifier 9 项检查全过 + 留痕完整。

## 1. 本轮目标

由 round-005 § 6 next round 候选 / round-006 § 7 备选 / round-007 § 7 候选共同推荐:**生成静态 web 落地页**(参照《星光之下》round-003 模式),把已闭合的 13 章 + Phase D 进化过程做成可浏览的 HTML 介绍页。让任何读到这本小说之前的人,可以先在落地页上理解 GEI 是怎么把它从 Day 0 一路推到 Day 181 的,然后再点进原文。

## 2. 决策

- 产物路径:`web/index.html`(27.7K · 747 行)+ `web/assets/zero-one-yuan-hero.png`(7.4K · 内置 image_gen 生成 hero 视觉)
- 内容结构:小说生成过程 / 世界观 / 三主角档案 / 13 章路线 / 原文完整阅读路径(直链 novel.md 锚点)
- 视觉基调:延续小说"安静的崩塌"风格(冷色 + 极简 + 无霓虹无机甲)
- 技术约束:静态 HTML · 无 JS 框架 · 单文件部署友好

## 3. 产物清单

```
web/
├── index.html              # 27.7K · 落地页主文件
└── assets/
    └── zero-one-yuan-hero.png  # 7.4K · 首屏 hero 图(image_gen)
```

## 4. 验证

- Desktop viewport 1470x768:**pass**
- Mobile viewport 390x844:**pass**
- 浏览器控制台 console 新错误数:**0**

## 5. 评分

本 round 是**交付载体**改动,不修改小说内容,5 维度小说评分**保持 round-007 的 93.50 不变**。Web 落地页是独立的 deliverable axis,不进入小说本体加权。

## 6. score delta

- round-007: 93.50
- round-008(web · 内容评分不变): **93.50**(+0.00)
- round-009(model_rebrand · 见下一文件): 94.05(+0.55)

## 7. next round 建议

`stop_default`(原 cron worker 给的建议)。已被 round-009 model_rebrand 接续,继续了进化链条。
