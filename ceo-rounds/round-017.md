---
round: 017
type: section_reorder
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T05:30:00Z
git_sha_before: de40b62
git_sha_after_local: after_round_017_pending
---

# Round 017 · 零点一元 · index.html 节序调整(档案浏览 → 章节)

## 1. 本轮目标

用户原话:"将章节放在档案浏览 之后。"

调整 web/index.html 内容节序,把读者的注意力路径设计成:
**Hero → 生成过程 → 世界观 → 文物 → 人物 → 档案浏览 → 章节** (原来是 ... → 章节 → 档案浏览)

理由(用户决断 · 我的解读):"档案浏览"展示生成过程产物(README / characters / worldbuilding / 16 轮 CEO rounds),信息密度高,看完之后再点章节进入"在线阅读"是更自然的阅读漏斗——先理解项目怎么做出来的,再去读成果。倒置之前是"成果先 → 过程后",对**对 GEI 项目本身感兴趣的读者**是反向的。

## 2. 改动 diff

### 顶导(L711-L712)
| 改前 | 改后 |
|---|---|
| `<a href="#chapters">章节</a>` 在 `<a href="#read">档案浏览</a>` 之前 | `<a href="#read">档案浏览</a>` 在 `<a href="#chapters">章节</a>` 之前 |

### 节序(body)
| 改前 | 改后 |
|---|---|
| `<section id="chapters">` L916-942(27 行)+ `<section id="read">` L944-1014(71 行) | `<section id="read">` L916-987 + `<section id="chapters">` L988-1014 |

零内容改动 · 只是 splice 顺序对换。

## 3. 实现

`python3` 内联脚本 splice + nav swap + 落盘。无 sed regex 风险。

## 4. 测试

- 视觉验证:`grep <section id=...>` 输出顺序正确(read 在 chapters 之前)
- 顶导:`sed -n '710,713p'` 输出 4 个链接顺序为 人物 → 档案浏览 → 章节 → 在线阅读 ✅
- 章节链接(round-016 修复的 14 个 `/web/chapters/...`)未被影响
- explorer 滚动 CSS(round-016 加的 `min-height: 0`)未被影响

## 5. 评分

| 维度 | round-016 分 | round-017 分 | 变化 |
|---|---|---|---|
| 主题契合度 | 95 | 95 | 0 |
| 角色立体度 | 93 | 93 | 0 |
| 概念融合自然度 | 96 | 96 | 0 |
| 文学性 | 90 | 90 | 0 |
| 节奏感 | 88 | 88 | 0 |
| **加权综合** | **95.00** | **95.00** | **0** |

零评分变化 · 这是 IA(信息架构)调整,不动文学/概念维度。但用户阅读漏斗的转化路径会变得更顺,在产品轴上是正向。

## 6. score delta

- baseline: 85.15
- round-016: 95.00
- round-017: **95.00**(+0.00 加权 · 零叙事改动)

## 7. next round 建议

`stop_default`。如果用户继续指挥,候选:
- 给 hero 区加一个"开始阅读"主 CTA 按钮(直跳 ch01)
- explorer 默认展开 CEO rounds 组(因为现在它是 IA 重点)
- 给 chapters section 顶部加一句导语,衔接"刚才你看了项目怎么做出来 / 现在进入正文"
