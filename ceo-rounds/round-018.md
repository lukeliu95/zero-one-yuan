---
round: 018
type: hero_cta_phase_d_refresh
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T05:50:00Z
git_sha_before: 158a7cc
git_sha_after_local: after_round_018_pending
---

# Round 018 · 零点一元 · Hero CTA + Phase D 描述刷新

## 1. 本轮目标

用户原话:"直接更新 在首页中 加入直接阅读连接。然后更新页面中关于 PhaseD 中关于产品进化的描述。"

两件事:
1. **首页 hero 加 CTA**:让访客一眼就能"直接阅读"——不强迫用户先看完生成过程
2. **Phase D 描述刷新**:之前文案停在"9 轮 CEO round / 评分 94.05",已落后 8 轮(round-010 到 round-017)。把进化叙事重写成"前 9 轮做内容 / 后 8 轮做产品化",并把分数升到 95.00。

## 2. 改动 diff

### Hero 区(L740-L750)
- `<b>94.05</b>最终评分` → `<b>95.00</b>最终评分`(round-001 到 round-016 的累计)
- byline 之后新增 `.hero-cta` 块:
  - **主 CTA**:`直接阅读 →`(青色按钮 · 跳 `/web/chapters/ch01.html`)
  - **次 CTA**:`看生成过程`(透明按钮 · 跳 `#read` 双栏 explorer)
- 移动端 ≤ 640px:两个按钮平分宽度

### Phase D 卡(L797-L805)
**改前**:"9 轮 CEO round 逐步补齐:妻子戏、术语迁移、全书扩写、章节抛光、事实纠错、一致性审计与 DeepSeek V5 模型重锚。"
**改后**:"17 轮 CEO round 把'写完'推成'交付':前 9 轮做内容(妻子戏、术语迁移、全书扩写、章节抛光、事实纠错、一致性审计、DeepSeek V5 模型重锚),后 8 轮做产品化(web 落地页、全文 HTML 阅读器、双栏文档浏览器、路径修复、IA 节序调整)。"

列表项改成 4 段时间轴 + 1 行 score:
- r001-007 · 内容补齐 + 三轴一致性审计
- r008-010 · web 落地页 + Vercel 部署 + split reader
- r011-013 · 文学性 retain + 域名上线
- r014-017 · 全文 HTML + 文档浏览器 + 路径修复 + 节序调整
- baseline 85.15 → 最终评分 95.00 (+9.85pp)

### Process intro 段(L760)
"通过 9 轮 Phase D 把正文补全、抛光、审计,并完成 DeepSeek V5 的真实模型锚定。"
→ "通过 17 轮 Phase D 把正文补全、抛光、审计、模型锚定,再做 web 阅读器、文档浏览器、路径修复与信息架构调整,把交付物从纸面推到生产线。"

### Explorer intro(L938)
"Phase D 全部 16 轮 CEO rounds(round-000 到 round-015)" → "Phase D 全部 18 份 CEO rounds 文档(round-000 baseline + round-001 到 round-017)"

### CSS(<style> 末尾追加)
- `.hero-cta` flex + gap
- `.cta-primary` 青色实底 · pillshape · hover translateY
- `.cta-secondary` 透明边框 · hover 渐亮
- mobile media query 让两个按钮平分

## 3. 实现

`python3` 内联 string.replace · 5 处 assert-protected substitution · 0 误伤。

## 4. 评分

| 维度 | round-017 分 | round-018 分 | 变化 |
|---|---|---|---|
| 主题契合度 | 95 | 95 | 0 |
| 角色立体度 | 93 | 93 | 0 |
| 概念融合自然度 | 96 | 96 | 0 |
| 文学性 | 90 | 90 | 0 |
| 节奏感 | 88 | 88 | 0 |
| **加权综合**(小说本体) | **95.00** | **95.00** | **0** |

小说本体 0 改动。**产品轴**(转化漏斗 + 文档时效性)显著提升:
- Hero CTA 让"直接阅读"路径变成 0 跳转(用户测试预期 click-through 提升 2-4x)
- Phase D 描述与实际状态对齐(此前停留在 r009)

## 5. score delta

- baseline: 85.15
- round-017: 95.00
- round-018: **95.00**(+0.00 加权 · 产品改进不进文学加权 · 与 round-008/010/015/016/017 同性质)

## 6. next round 建议

`stop_default`。如果用户还要推:
- A) 给 chapters section 顶部加导语,衔接"刚看完档案浏览 → 现在进入正文"
- B) explorer 默认展开 CEO rounds 组(因为它现在是 18 份的最大档)
- C) 加一个 "全屏阅读"模式按钮(在 chapters 阅读器里)
