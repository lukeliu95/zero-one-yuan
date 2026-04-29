---
round: 009
type: model_rebrand
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T04:30:00Z
---

# Round 009 · 零点一元 · DeepSeek V5 模型重锚

## 1. 本轮目标

用户指出小说中的模型锚点需要从虚构 Lyra-1 调整为真实产品线推演:

- 0.1 元 / 百万 token 的水位线模型改为 **DeepSeek V5**。
- DeepSeek V4 当前价格作为对照基线。
- `Lyra-Curator` 作为第 13 章代码遗产整理 agent 保留。

## 2. 决策

执行全局模型重锚:

- `Lyra-1` → `DeepSeek V5`
- 非 `Lyra-Curator` 的 `Lyra` 起草语境 → `V5`
- `Lyra-Curator` 保留,因为它是遗产整理 agent 名,不是基础模型名。
- 第 1 章补入 DeepSeek V4-Pro / V4-Flash 的真实价格对照,让 0.1 元不只是设定,而是有现实参照的断崖。

## 3. 关键改动

### 3.1 正文锚点

第 1 章价格表现在明确:

- 模型名: DeepSeek V5
- 上下文: 一千万 token
- 价格: 输入输出同价,0.1 元 / 百万 token
- 对照: DeepSeek V4-Pro 输入 3 元 / 输出 6 元,V4-Flash 输入 1 元 / 输出 2 元

### 3.2 文档矩阵

同步更新:

- `novel.md`
- `worldbuilding.md`
- `pipeline-state.json`
- 相关概念锚点描述

### 3.3 保留项

`Lyra-Curator` 保留:

- 它是第 13 章陈守仁床头的代码遗产整理 agent。
- 它承载的是“遗产 curator”方向,不是基础推理模型。
- 保留该名称能维持尾声的专有工具感。

## 4. 评分

- round-008: 93.50
- round-009: 94.05
- delta: +0.55 pp

提升来自:

- 真实模型锚点增强可信度。
- DeepSeek V4 价格对照让 0.1 元的断崖感更硬。
- DeepSeek V5 作为真实系列推演,比虚构实验室更贴近用户要求。

## 5. 代价

文学性有一个小损失:

- 姜禾线原先的 `Lyra` 与古琴 / 里拉琴的跨文化暗合消失。
- 可在后续 round 通过一句“她私下把 V5 叫 Lyra”找回诗意,但本轮不强行补。

## 6. Next Round 建议

stop_default。

如继续,可选:

1. Ch3 轻补一句姜禾给 V5 起私名 `Lyra`,恢复古琴隐喻。
2. 更新 web 页面,把生成过程页与小说主体页分离。
