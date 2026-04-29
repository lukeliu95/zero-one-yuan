---
round: 010
type: web_split_reader
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T10:05:00+09:00
---

# Round 010 · 零点一元 · Web 双页结构

## 1. 本轮目标

用户要求在小说内容更新后同步更新 web 页面,并新增一个小说主体落地页。同放在 `web/` 目录中:

- 一个页面介绍如何生成小说。
- 一个页面承载小说主体。

## 2. 决策

保留并更新原 `web/index.html` 作为**生成过程页**。

新增 `web/novel.html` 作为**小说主体阅读页**。

理由:

- 两个页面承担不同任务:一个讲 GEI 如何生成,一个让读者读小说。
- 正文不复制进 HTML,由 `novel.html` 运行时读取 `../novel.md`,避免维护两份正文。
- 当前小说已经 round-009 DeepSeek V5 重锚,生成过程页必须同步更新旧的 Lyra-1 文案。

## 3. 改动

### 3.1 生成过程页

更新 `web/index.html`:

- 页面 title 改为“小说生成过程页”。
- 顶部导航新增“小说主体”入口。
- 世界观说明从 `Lyra-1` 更新为 `DeepSeek V5`。
- 姜禾文物说明从 “Lyra 起草第一句” 更新为 “DeepSeek V5 起草第一句”。
- Phase D 说明从 8 轮更新为 9 轮,补入 DeepSeek V5 模型重锚。
- 最终评分从 93.50 更新为 94.05。
- 阅读路径新增 `web/novel.html`。

### 3.2 小说主体页

新增 `web/novel.html`:

- 自动 fetch `../novel.md`。
- 将 Markdown 渲染为阅读版 HTML。
- 自动生成章节目录。
- 支持桌面三栏布局:目录 / 正文 / 阅读说明。
- 支持移动端横向章节目录。
- 支持阅读进度条与打印。
- fetch 失败时提示直接打开 `novel.md`。

## 4. 验证

本地服务:

```bash
python3 -m http.server 8765
```

验证 URL:

```text
http://127.0.0.1:8765/output/零点一元/web/index.html
http://127.0.0.1:8765/output/零点一元/web/novel.html
```

结果:

- `index.html` 桌面视口 1470x768 渲染通过。
- `novel.html` 桌面视口 1470x768 渲染通过。
- `novel.html` 移动视口 390x844 渲染通过。
- `novel.html` 自动读取 `novel.md` 成功。
- 自动生成章节节点 14 个(含“第四章半”)。
- 目录节点 14 个。
- 页面正文包含 `DeepSeek V5` 与 `第十三章 · 第 181 天`。
- 浏览器控制台 0 error / 0 warning。

## 5. 状态

本轮不修改小说正文,只修改 web 表达层。

- 加权分保持: 94.05
- score delta: 0
- pipeline-state 更新到 `D.round-010-complete`

## 6. Next Round 建议

stop_default。

如继续,可选:

1. 为小说主体页增加夜间阅读模式。
2. 将 `novel.md` 预编译为无 JS 的纯 HTML,支持 file:// 直接打开。
3. 打包交付报告时把两个 web 页面都纳入交付索引。
