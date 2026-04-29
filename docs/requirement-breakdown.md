# 《零点一元》 · Requirement Breakdown(13 章逐章拆解)

> 字段:章号 / 标题 / 字数目标 / 主视角 / 概念锚点 / 与上下章衔接 / Goal 映射 / 本轮交付状态。
> 状态枚举:✅ 已交付(本轮或既存) / 📝 梗概(本轮 chapters-tbd) / ⏳ Phase D 续写。

| 章 | 标题 | 字数 | 主视角 | 概念锚点 | 上下衔接 | Goal | 状态 |
|---|---|---|---|---|---|---|---|
| 01 | 价格表 | 3,500 | 林行 | DeepSeek V5 / 0.1 元 / Opus 5 基线 / SaaS 毛利 | 开篇定时间锚 Day 0;末尾"Day 0"备忘录引出第 2 章 | G1 / G3 / G4 | ✅ 既存 |
| 02 | 最后一次代码评审 | 3,800 | 林行 | Claude Code(co-reviewer · 林行 3 年旧伙伴) / GroupChat / Bounded Autonomy / LangGraph 影子值班 / agent observability(成本日志) | 承"Day 0"次晨;埋伏笔"Day 1 的 47 分钟 ETA"指向第 4 章影子工程师 | G2 / G3 / G4 | ✅ 既存 |
| 03 | 19 岁的姜禾 | 3,200 | 姜禾 | AG2-Atelier(虚构,基于 AG2 真实) / GroupChat / skill-driven / context engineering / 12 角色 agent | 视角第一次切到水位线之上;与林行隔屏对照(第 4 章末再切回) | G2 / G3 / G5 | ✅ 本轮 |
| 04 | 影子工程师 | 3,200 | 林行 | LangGraph 内部 agent / 73% 工单已自动化 / Bounded Autonomy 升级路径 / agent observability dashboard / Claude Code(林行旧 IDE) | 承第 2 章 ETA 伏笔;末尾钩子指向第 5 章裁员邮件 | G1 / G2 / G3 / G4 | ✅ 本轮 |
| 05 | 裁员邮件 | 3,800 | 林行 + 郑总 | 47:1 成本曲线 / agent observability / Gartner 40% / 0.1 元第 2 次明写 | 钩子兑现:80% 工程团队被裁;沈澜出场承上 | G1 / G3 | 📝 |
| 06 | skill 学校 | 3,800 | 林行 | skill-driven / context engineering / Bounded Autonomy 入门课 / ChatGPT Agent 学员对比 | 林行第一次踏进新职业生态;为第 9 章范式之争铺三种答案 | G2 / G3 | 📝 |
| 07 | 创始人陆衡 | 4,000 | 陆衡 | 行业专用 agent / 数据护城河 / browser agent 调研殡葬业 | 陆衡视角首次独立成章;为第 8 章三人同框做铺垫 | G2 / G3 / G5 | 📝 |
| 08 | 软件葬礼 | 4,200 | 群像(林行主导) | archived repo 实时投影 / 代码遗产法案 / 0.1 元第 3 次明写 / Manus 直播朗读 stripe-go README | 三主角"Day N"无知同框;末尾钩子指向第 9 章范式之争 | G1 / G2 / G3 / G4 | 📝 |
| 09 | 范式之争 | 3,800 | 三主角对谈(林行视角) | 数据护城河 / 审美 / 愿意慢的能力 / Bounded Autonomy 边界讨论 | 三种答案明确;为第 10-12 章三种活法分章铺路 | G1 / G3 / G4 / G5 | 📝 |
| 10 | 一个人公司 | 3,800 | 姜禾 | GroupChat 14 agent / memory namespace / agent retro / 长期记忆机制 | 姜禾的"水位线之上"答案 | G2 / G3 / G5 | 📝 |
| 11 | 林行的转身 | 3,500 | 林行 | Claude Code(回收旧设备给临终关怀机构) / "AI 不能做的事" / 讣告写作 | 林行的"水位线之外"答案;伏笔来自第 8 章他朗读悼词 | G1 / G2 / G5 | 📝 |
| 12 | 陆衡的反扑 | 3,500 | 陆衡 | 行业专用 agent / Gartner 92% / ARR 5000 万 / 数据护城河兑现 | 陆衡的"水位线之上"答案 | G2 / G3 / G5 | 📝 |
| 13 | 第 181 天 | 3,200 | 林行 | Lyra-Curator / 代码遗产法案 / 0.1 元第 4 次明写 / agent observability dashboard 老人床头 | 全书收束;末句金句质地 | G1 / G3 / G5 | 📝 |

---

## 概念锚点覆盖矩阵(交叉验证 R-CON-01)

| 概念 \ 章 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DeepSeek V5 / 0.1 元 | ● | | | | ● | | | ● | | | | | ● |
| Manus(通用 agent · 葬礼朗读) | | | | | | | | ● | | | | | |
| Claude Code(co-reviewer + 林行 IDE + 临终关怀捐赠) | | ● | | ● | | | | | | | ● | | |
| ChatGPT Agent | | | | | | ● | | | | | | | |
| Claude Code | | | | ● | | | | | | | ● | | |
| AG2 / GroupChat | | ● | ● | | | | | | | ● | | | |
| Bounded Autonomy | | ● | | ● | | ● | | | ● | | | | |
| 长期记忆 | | | ● | | | | | | | ● | | | |
| Browser agent | | ● | | | | | ● | | | | | | |
| 行业专用 agent | | | | | | | ● | | | | | ● | |
| Skill-driven / context eng | | | ● | | | ● | | | | | | | |
| Agent observability | | ● | | ● | ● | | | ● | | | | | ● |
| 数据护城河 | | | | | | | ● | | ● | | | ● | |
| Gartner 数字 | | | | | ● | | | | | | | ● | |
| LangGraph / CrewAI | | ● | | ● | ● | | | | | | | | |
| 代码遗产法案 | | | | | | | | ● | | | | | ● |

每章 ≥ 1 锚点,无空缺。

---

## Goal 映射统计

| Goal | 关联章数 |
|---|---|
| G1 主题 | 1 / 4 / 5 / 8 / 9 / 11 / 13 (7) |
| G2 角色 | 2 / 3 / 4 / 6 / 7 / 8 / 10 / 11 / 12 (9) |
| G3 概念 | 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 / 10 / 12 / 13 (12) |
| G4 节奏 | 1 / 2 / 4 / 8 / 9 (5,三幕末章 + 节奏样本章) |
| G5 情感 | 3 / 7 / 9 / 10 / 11 / 12 / 13 (7) |

(完 · requirement-breakdown.md)
