---
round: 020
type: palette_fix
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T06:25:00Z
git_sha_before: 1237e7f
git_sha_after_local: after_round_020_pending
---

# Round 020 · 零点一元 · Phase D 配色重做

## 1. 本轮目标

用户反馈截图 + "让内容显示更清楚。不要用紫色。使用与当前页面风格相近的颜色。"

诊断 round-019 的失误:
- 我没读全局 CSS variables 就动手,默认按 dark theme 配 dark bg + 白字 + 亮紫亮蓝(#A744E2 / #7CD2D5)
- 实际页面是 paper/cream 风格(`--paper: #f6f1e8`, `--ink: #171717`),phase-d-detail 落在 cream 背景上
- dark gradient 底 + 白字直接造成低对比度("文字看不清")
- 亮紫 #A744E2 与页面深酒红 `--plum: #68475f` 调性不一致

## 2. 配色全部对齐 paper palette

| 元素 | round-019 错配 | round-020 修正 |
|---|---|---|
| 卡背景 | dark gradient(青紫) | `--paper-2: #eee5d7` |
| 卡子项底 | rgba(0,0,0,.18) | `--paper: #f6f1e8` |
| 顶部装饰 | 无 | 3px linear-gradient(--plum → --teal) 顶饰条 |
| 主标题字 | #fff | `--ink: #171717` |
| 副标题字 | rgba(255,255,255,.78) | `--ink-2: #34302a` |
| kicker | --teal(亮) | `--plum: #68475f` |
| stat 数字 | 亮青 #7CD2D5 | `--plum: #68475f` |
| 折线 | 亮青 #7CD2D5 | `--teal: #286f71`(深青) |
| 折线渐变填充 | 亮青 .3→0 | 深青 .22→0 |
| Y grid line | rgba(255,255,255,.07) | rgba(23,23,23,.08) |
| Y tick label | rgba(255,255,255,.45) | rgba(23,23,23,.55) |
| baseline cell | #444 | `#a89880`(暖灰 + paper 系) |
| 内容 cell(9 轮) | 亮青 #7CD2D5 | `--teal: #286f71` |
| 产品 cell(9 轮) | **亮紫 #A744E2** | `--plum: #68475f` |
| cell 数字字 | #0e1117 / #888 | paper(对比深底) |
| timeline strong | 亮青 | `--teal` |
| timeline delta | 亮紫 | `--rust: #a74428`(burnt orange) |
| border | rgba(255,255,255,.06) | `--line: #cfc0aa` |
| border-radius | 12-16px(圆) | 4px(纸质方) |

## 3. 实现

`python3` string.replace · 1 个大 CSS 块整体替换 + 多处 SVG 内联 hex 对换 · assert 保护。0 误伤其他段。

## 4. 评分

无 0 改动。综合分维持 95.00。

## 5. next round 建议

stop_default · 等用户视觉验证。
