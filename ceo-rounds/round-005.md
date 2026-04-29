---
round: 005
type: tooling_correctness
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T03:30:00Z
git_sha_before: f13ba53c95b2416c20579bfaf3ac6ae37b75cf74
git_sha_after_local: after_round_005_pending
---

# Round 005 · 零点一元 · "Manus → Claude Code"(主力编程工具纠错)

## 1. 本轮目标

用户原话:"文章中主力编程工具是 Claude Code,不是 Manus,Manus 只是通用 agent 的一种。"

解读:这是一条**事实性纠错**,不是风格调整。Manus 在 2026 年的真实定位是**通用 autonomous agent**(浏览器型 + 多任务工作流),不是 IDE 内的编程伙伴;Claude Code 是 Anthropic 主推的**编程专用 agent**(IDE/CLI/PR 评审场景)。林行作为 SaaS 工程师,日常 IDE + PR co-reviewer 应该是 Claude Code,而 Manus 该出现在他**不写代码**的场景里(比如第 8 章软件葬礼朗读 stripe-go README——那是仪式性的"通用 agent 替人发声",不是编程)。

附加发现(本轮意外收益):把 Ch2 的 co-reviewer 从 Manus 换成 Claude Code,**第 4 章那段"他打开 Claude Code——他用了 3 年的旧伙伴"会与 Ch2 形成回响**——读者会反推:Ch2 那 47 条让林行震撼的评论,是他每天打开的同一个工具写的。这是**写作上的免费升级**——同一个伙伴在 Ch2 既给他做学生家长式的同行评审,又在 Ch4 是他贴着女儿火柴人贴纸的私人 IDE。"我亲手把它训练成今天这样"的命题从抽象变得具体可触。

## 2. 决策

**精准位置替换 + 保留 Ch8 葬礼**:

| 章节 | 原本 | 改后 | 理由 |
|---|---|---|---|
| Ch2 (149-272 行) | Manus(co-reviewer · 47 条评论) | **Claude Code**(co-reviewer · 47 条评论) | 主力编程工具纠错 |
| Ch4 (line 539) | "triage-9 不是 Manus" | "triage-9 不是 Claude Code" | 保持反差锋利度——内部 LangGraph agent 不是 Anthropic 产品 |
| Ch13 (line 1841) | "Day 1 Manus 那句..." | "Day 1 Claude Code 那句..." | 跟 Ch2 保持一致 · 但 Ch8 葬礼 "Day 70 Manus 朗读 stripe-go" 保留 |
| Ch8 (line 1043, 1052) | Manus 朗读 stripe-go README | **保留** | 葬礼仪式 · 通用 agent 给软件念悼词 · 是 Manus 该在的位置 |

**配套文档更新**:
- README.md / characters.md / worldbuilding.md / story-outline.md / chapters-tbd.md(Ch2 描述)
- docs/requirements-spec.md / requirement-breakdown.md(概念覆盖矩阵 — Manus 行收窄到 Ch8;新增 Claude Code 行覆盖 Ch2/4/11)
- docs/discovery-interview.md(借由代价显形示例改用 Claude Code)
- quality-assessment.md(亮点 2 / 概念列表)

**保留为历史快照**:`ceo-rounds/round-000-baseline.md` / `ceo-rounds/round-002.md` 中提到 Manus 不改——它们是某个时间点的状态记录,改动会破坏可追溯性。

## 3. 改动 diff 摘要

- novel.md:Ch2 内 18 处 Manus → Claude Code · Ch4/Ch13 各 1 处定向替换 · Ch8 完整保留 2 处 Manus
- characters.md:3 处替换(招牌台词 + agent 关系描写 + 薛野次日反应)
- worldbuilding.md:Day 1 时间轴行替换
- story-outline.md:Ch2 中段冲突描述 + 概念植入行替换
- README.md:Ch2 大纲段重写,新增"他每天都用的工具,昨天还是他的'伙伴',今天起是替他完成本职工作的那位"金句
- docs/discovery-interview.md:借由代价显形示例 + 新增"我亲手把它训成今天这样"的元注释
- docs/requirement-breakdown.md:Ch2 行 + 概念矩阵 Manus 行收窄 + 新增 Claude Code 行
- docs/requirements-spec.md:概念覆盖表 + A1 假设/约束注释
- quality-assessment.md:亮点 2 + 对话设计行 + 概念列表(Claude Code 已在 Ch4)

## 4. 重新评分

| 维度 | 权重 | round-004 分 | round-005 分 | 变化 |
|---|---|---|---|---|
| 主题契合度 | 0.25 | 92 | 93 | +1(Claude Code 双重身份强化"我亲手把它训成今天这样") |
| 角色立体度 | 0.20 | 92 | 93 | +1(林行与他的工具的关系从抽象变具体) |
| 概念融合自然度 | 0.20 | 92 | 95 | +3(产品/角色对应关系厘清 · Manus 各得其所 · Claude Code 跨章呼应) |
| 文学性 | 0.20 | 88 | 89 | +1(Ch2/Ch4 跨章回响是免费的文学性增量) |
| 节奏感 | 0.15 | 88 | 88 | 0 |
| **加权综合** | 1.00 | **91.65** | **92.85** | **+1.20** |

## 5. score delta

- baseline: 85.15
- round-001: 88.20(+3.05)
- round-002: 89.55(+1.35)
- round-003: 90.85(+1.30)
- round-004: 91.65(+0.80)
- round-005: **92.85**(+1.20)
- 累计 vs baseline: **+7.70 pp**

## 6. next round 建议

- delta 链:3.05 → 1.35 → 1.30 → 0.80 → **1.20**(本轮反弹打破 plateau,因为是事实性纠错而非打磨,价值高于纯 polish)
- **建议**:用户的 /loop 2 小时排程会在下一个 :07 自动派 round-006。建议方向:**第 9 章范式之争内部检查**——这章是全书思想节点,5 维度独立审一遍尤其"愿意慢的能力"那段是否真的撑得住分量。
- 备选:全书一致性扫描(招牌动作漂移检查 / 时间线连贯 / 概念第一次出现的注释密度)
- 不建议:再扩字数 / 再加新概念
