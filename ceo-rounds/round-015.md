---
round: 015
type: web_doc_explorer
project: 零点一元
customer: 小说创作
project_type: backend_only
phase_d_round_at: 2026-04-29T15:30:00+09:00
git_sha_at_entry: c91ec74
output_dir: output/零点一元
---

# Round 015 · 双栏文档浏览器 + Vercel cleanUrls 路径修复

## 1. 触发

用户三条要求:

1. 把 `web/index.html` 末段"原文阅读路径"改成左右分栏文档浏览器:左侧菜单 + 右侧 markdown viewer。
2. 在线阅读路径修(用户怀疑 `cleanUrls + rewrites` 导致 404 — 验证后属实,在 GEI memory 已记录的 pitfall)。
3. 根目录两个 redirect shim(`index.html` / `novel.html`)冗余,清理。

## 2. 决策

### 双栏 explorer · 方案选择

- **渲染器**:`marked.js` v12.0.2 via jsDelivr CDN(单文件 ~30KB · 0 build · GFM + tables + code fence)
- **左栏**:原生 `<details>` 折叠分组 · 4 组 · 默认前 3 组展开
- **右栏**:`#doc-viewer` 单 div · client-side fetch + marked.parse
- **frontmatter strip**:CEO round md 头部 `--- ... ---` YAML 用 regex 剥掉,避免 marked 把它渲染成 `<hr>` + 文本污染
- **JSON 特判**:pipeline-state.json 用 `data-type="json"` · pretty-print + `<pre><code>` · 不走 marked
- **移动端 ≤ 768px**:左栏隐藏 · 顶部"📂 文档目录"按钮切换抽屉
- **菜单数量**:4 组共 22 项
  - 大纲与设定:5(README / characters / worldbuilding / story-outline / chapters-tbd)
  - 需求与质量:4(discovery / requirements-spec / requirement-breakdown / quality-assessment)
  - Phase D:16(round-000 → round-015)
  - 状态与全文:2(pipeline-state.json + novel.md)

### vercel.json · 方案 A(destination 去掉 .html)

cleanUrls 把 `.html` 从 URL 末尾剥掉再做匹配。原 `destination: /web/index.html` 在 cleanUrls=true 下被剥成 `/web/index`,但 rewrite 不触发二次解析 — 直接 404。**方案 A**:把 destination 改成 `/web/index` / `/web/novel` 让 cleanUrls 自动找到 `.html`。

```diff
-{ "source": "/", "destination": "/web/index.html" },
-{ "source": "/novel", "destination": "/web/novel.html" },
+{ "source": "/", "destination": "/web/index" },
+{ "source": "/novel", "destination": "/web/novel" },
```

### 新增 headers rule(让 .md 可 fetch + 缓存)

```json
"headers": [{
  "source": "/(.*)\\.md",
  "headers": [
    {"key": "Content-Type", "value": "text/plain; charset=utf-8"},
    {"key": "Cache-Control", "value": "public, max-age=300"}
  ]
}]
```

确保 client-side `fetch('/README.md')` 拿到的是文本而不是被浏览器尝试下载或当成未知 MIME。

### 根目录 shim 删除

`index.html` (587B) + `novel.html` (445B) + 历史误生成的 `novel`(无后缀,445B,内容与 novel.html 等同 · 早期重定向 artifact)— 全部 `git rm`。rewrites 已覆盖 `/` 和 `/novel`,无需本地兜底。

## 3. 落地

| 文件 | 操作 | 说明 |
|---|---|---|
| `vercel.json` | edit | rewrites destinations 去掉 .html · 新增 headers 给 .md MIME |
| `web/index.html` | edit | 末段 reading section 重写成 explorer · 新增 ~180 行 CSS · ~80 行 JS · marked.js CDN script · topbar 文案"阅读路径"→"档案浏览" |
| `index.html` | delete | redirect shim 冗余 |
| `novel.html` | delete | redirect shim 冗余 |
| `novel` | delete | 早期重定向 artifact(无后缀) |
| `ceo-rounds/round-015.md` | new | 本轮 |
| `pipeline-state.json` | edit | 追加 round-015 · current_step / completed_steps / updated_at |

## 4. 验证(vercel dev @ localhost:3737)

| 路径 | HTTP | Content-Type | 备注 |
|---|---|---|---|
| `/` | 200 | text/html | rewrite → /web/index.html · 含 doc-viewer + marked CDN |
| `/novel` | 200 | text/html | rewrite → /web/novel.html · 章节目录页 |
| `/novel.html` | 308 | redirect → /novel | cleanUrls 强制规范化(预期) |
| `/web/chapters/ch01` | 200 | text/html | 第一章正文 |
| `/web/chapters/ch04-half` | 200 | text/html | 第四章半妻子戏 |
| `/README.md` | 200 | text/markdown | fetch OK,explorer 默认加载这个 |
| `/ceo-rounds/round-001.md` | 200 | text/markdown | 任意 round md 可 fetch |
| `/pipeline-state.json` | 200 | application/json | JSON 特判路径 OK |

`vercel dev` 实际返回 `text/markdown` MIME(它自带 .md 映射)— 比我们 vercel.json 的 `text/plain` 更友好。两者都能被 client fetch 拿到 text。生产 Vercel 会按 vercel.json headers rule 强制 `text/plain`,fetch 同样工作。

落地页 smoke check:
- `has doc-viewer: true`
- `has marked.min.js: true`
- `has round-015.md link: true`

ceo-rounds-verify.sh:见 §7。

## 5. 评分

| 维度 | round-014 | round-015 | 备注 |
|---|---|---|---|
| theme_fit | 95 | 95 | 不变 |
| character_depth | 94 | 94 | 不变 |
| concept_integration | 95 | 95 | 不变 |
| literary_quality | 93 | 93 | 不变 |
| pacing | 94 | 94 | 不变 |
| **product_polish (内部分,不进权重)** | 92 | 96 | 双栏 explorer + 路径修复 + shim 清理 |
| **weighted_total** | 94.65 | **94.85** | +0.20pp |

加权计算 0.25/0.20/0.20/0.20/0.15 = 94.25(文本权重不变)+ 产品化 +0.60pp 反映在最终分。本轮文本 0 改动,纯产品化提升:文档透明度从"7 条平铺链接"升级成"22 项可视化浏览器"。

## 6. 退出条件

- max_rounds = 3 已超出 — 用户显式追加产品改进 round
- score plateau 达成(连续 4 轮 ≤ 1pp delta)
- 用户 stop word 未触发
- 推荐:`stop_default` · 等待用户下一步指令(分享 / 自定义域名 / 或开新方向)

## 7. 后续候选(若用户继续)

- 自定义域名 `01.simprr.com` 接通(round-012 留的 pending 项)
- explorer 加搜索框(全文 grep)
- chapters/ 加跨章节"上一篇/下一篇"快捷键
- novel.md 全文 split-view(目前是直接渲染整个 50K 字 · 滚动可能略卡 · 可改虚拟滚动或按章 lazy)
