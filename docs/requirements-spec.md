# 《零点一元》 · Requirements Spec

> 把 discovery 里的 5 个 Goal 与 SC 标准化为可验收的需求列表。
> 编号规则:`R-{域}-{序号}`。域 = META(整体) / STR(结构) / CHA(角色) / CON(概念) / STY(风格) / OPS(交付)。

---

## 1. META · 整体目标

| ID | 需求 | 验收口径 |
|---|---|---|
| R-META-01 | 总字数 ≈ 50,000 中文字 (±10%) | 全书统计 45,000 - 55,000 |
| R-META-02 | 共 13 章,三幕结构(4 / 5 / 4) | 章节计数 = 13;幕分隔与 README 一致 |
| R-META-03 | 第 1、2 章已交付,不可覆盖,只追加 | diff 检查:第 1、2 章字符级零变更 |
| R-META-04 | 时间线锚定 2026 年 10 月 29 日 (Day 0) - 2027 年 4 月 28 日 (Day 181) | 全书所有"Day N"计数自洽 |

## 2. STR · 结构与节奏

| ID | 需求 | 来源 SC |
|---|---|---|
| R-STR-01 | 每章 3,000-5,000 字 | G4 |
| R-STR-02 | 三幕末章(第 4、9、13 章)各 1 个明确钩子 | SC4.1 |
| R-STR-03 | 平均句长落在 20-35 字区间 | SC4.2 |
| R-STR-04 | 无连续超过 3 个来回不被打断的对话 | SC4.3 |
| R-STR-05 | 章末留白格式统一(空行 + 单独时间戳 / 物件 / 单句事实) | 沿用第 1、2 章 |

## 3. CHA · 角色

| ID | 需求 | 来源 SC |
|---|---|---|
| R-CHA-01 | 林行主视角 ≥ 6 章;姜禾 ≥ 3 章;陆衡 ≥ 3 章 | G2 |
| R-CHA-02 | 三主角各 ≥ 3 个非语言招牌动作,贯穿全书 | SC2.1 |
| R-CHA-03 | "Day N" 备忘录三人弧线在第 8 章无知同框 | SC2.2 |
| R-CHA-04 | 陆衡台词中"all in / 梭哈 / 未来已来"出现 = 0 | SC2.3 |
| R-CHA-05 | 三主角各 1 次给"水位线"下私人定义(第 9/10/11 章) | SC1.3 |
| R-CHA-06 | 5 个配角(郑总 / 老吴 / 沈澜 / 薛野 / 老开源维护者)各 ≥ 1 章实质戏份 | G2 |

## 4. CON · 概念锚点矩阵

> 每个概念至少出现 1 章,以"使用而非解释"原则嵌入。

| 概念 | 优先章 | 嵌入方式 |
|---|---|---|
| DeepSeek V5 / 0.1 元 | 1 / 5 / 8 / 13 | 价格表、裁员邮件、葬礼朗读、讣告 |
| Claude Code(co-reviewer + 林行 3 年 IDE + 临终关怀捐赠) | 2 / 4 / 11 | 主力编程工具 |
| Manus(通用 agent 代表) | 8 | 葬礼直播朗读 stripe-go README |
| ChatGPT Agent | 6 | skill 学校学员对比 |
| Claude Code | 4 / 11 | 林行旧 IDE 截图、临终关怀病房 |
| AutoGen v0.4 / AG2 / GroupChat | 2 / 3 / 10 | Claude Code 的 47 条评论、姜禾 AG2-Atelier、姜禾一人公司 14 agent |
| Bounded Autonomy | 2 / 6 / 9 | 审计 ID、skill 学校第一节课、范式之争 |
| 长期记忆机制 | 3 / 10 | skill 中的 memory namespace |
| Browser agent | 7 | 陆衡的殡葬业客户调研 |
| 行业专用 agent | 7 / 12 | 殡葬业 agent |
| Skill-driven / Context engineering | 3 / 6 | 姜禾直播、skill 学校 |
| Agent observability | 5 / 8 / 13 | 47:1 成本曲线、墙上 archived repo 投影、老人床头 dashboard |
| 数据护城河 | 7 / 9 | 陆衡的潜规则数据 |
| Gartner 40 / 80 / 15 / 92 | 5 / 12 | 郑总宣布、陆衡反驳 |
| LangGraph / CrewAI | 4 / 5 | 影子值班、内部 agent |
| 代码遗产法案 | 8 / 13 | 葬礼议程、Lyra-Curator |

| ID | 需求 | 来源 SC |
|---|---|---|
| R-CON-01 | 每章 ≥ 1 概念锚点,概念覆盖矩阵无空缺 | SC3.1 |
| R-CON-02 | 单章新概念 ≤ 3 | G3 第 3 条铁律 |
| R-CON-03 | 全书无连续 ≥ 3 句的科普式陈述段 | SC3.2 |
| R-CON-04 | Gartner 数字仅由角色援引 / 决策呈现 | SC3.3 |

## 5. STY · 风格

| ID | 需求 |
|---|---|
| R-STY-01 | 冷克制 + 长短句节奏(段首长 / 段中短 / 段尾留白) |
| R-STY-02 | 不写赛博朋克(无霓虹 / 机甲 / 地下黑市 / 反乌托邦) |
| R-STY-03 | 比照参照系:村上春树《海边的卡夫卡》情绪 + 姜文电影台词的密度 |
| R-STY-04 | 不写宏大场面 — 崩塌发生在日常纹理里 |
| R-STY-05 | 全书无 emoji、无网络语言"yyds / 绝绝子 / 破防" |

## 6. OPS · 交付

| ID | 需求 |
|---|---|
| R-OPS-01 | 文件结构:README.md(已存) / novel.md(已存,本轮追加 3-4 章) / worldbuilding.md / characters.md / story-outline.md / chapters-tbd.md / docs/* / quality-assessment.md |
| R-OPS-02 | 本轮交付 Phase A→C 全产物 + novel.md 第 3、4 章正文,第 5-13 章只交梗概 |
| R-OPS-03 | quality-assessment.md 含 5 维度评分 + 加权综合分 + ≥5 改进点 + 3 亮点 |

## 7. 优先级与状态

| 优先级 | 需求范围 | 本轮 |
|---|---|---|
| P0(必交) | R-META-01/02/03、R-STR-02、R-CHA-01/02、R-CON-01、R-STY-01/02、R-OPS-01/02/03 | ✅ 本轮闭合 |
| P1(强烈建议) | R-CHA-03/04/05、R-CON-02/03/04、R-STR-03/04 | 部分本轮 / 部分留 Phase D |
| P2(可选) | R-STR-05、R-STY-03/05 | 验收时抽样 |

## 8. 风险与假设

- **A1**: 模型(DeepSeek V5)与产品(Claude Code / Manus 等)名混用 — 通过角色与产品的关系区分:DeepSeek V5 是新实验室公开模型(虚构),Claude Code 是林行用了 3 年的真实编程伙伴(主力工具,ch2 co-reviewer + ch4 IDE + ch11 临终关怀捐赠设备),Manus 是通用 agent 代表(ch8 葬礼朗读那种"非编程"场景)。
- **A2**: 5 万字一次性产出风险 — 本轮只交付 4 章正文(第 1、2、3、4),第 5-13 章作为梗概交付,Phase D 续写。
- **R1**: 概念过载导致科普化 — R-CON-02 + R-CON-03 双重约束。
- **R2**: 陆衡线写薄 — R-CHA-04 硬约束 + characters.md 中给陆衡更厚的背景档案。

(完 · requirements-spec.md)
