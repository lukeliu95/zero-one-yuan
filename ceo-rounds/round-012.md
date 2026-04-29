---
round: 012
type: publish
project: 零点一元
customer: 小说创作
phase_d_round_at: 2026-04-29T11:15:00+09:00
---

# Round 012 · 零点一元 · GitHub + Vercel 发布

## 1. 本轮目标

用户要求将 `output/零点一元` 作为独立项目提交到 GitHub:

- 发布到 `https://github.com/lukeliu95/`
- 通过 Vercel 发布 web 内容

## 2. 决策

独立仓库名使用 `zero-one-yuan`。

原因:

- 远端 URL 稳定。
- 避免中文仓库名在 Git / Vercel / URL 编码中造成兼容问题。
- 与书名《零点一元》语义保持一致。

## 3. GitHub 发布

本地在 `output/零点一元` 初始化独立 git 仓库:

```bash
git init
git branch -m main
git add .
git commit -m "Initial zero-one-yuan project"
```

创建并推送到:

```text
https://github.com/lukeliu95/zero-one-yuan
```

最终 main 分支最新提交:

```text
7fca521 Add clean novel route
```

## 4. Vercel 发布

Vercel 项目:

```text
zero-one-yuan
```

生产域名:

```text
https://zero-one-yuan.vercel.app
```

可访问路径:

- `https://zero-one-yuan.vercel.app/` → 生成过程页
- `https://zero-one-yuan.vercel.app/web` → 生成过程页
- `https://zero-one-yuan.vercel.app/novel` → 小说主体页
- `https://zero-one-yuan.vercel.app/web/novel` → 小说主体页

Vercel 同时尝试 alias 到:

```text
https://01.simprr.com
```

该域名部署时 DNS / SSL 仍在异步生效中,以 `zero-one-yuan.vercel.app` 为当前稳定交付 URL。

## 5. 发布配置

新增:

- `vercel.json`
- `.gitignore`
- 根入口 `index.html`
- 根入口 `novel.html`
- clean route 入口 `novel`

根入口用于保证 Vercel 上:

- `/` 能打开生成过程页
- `/novel` 能打开小说主体页

## 6. 验证

GitHub:

- `gh repo view lukeliu95/zero-one-yuan` 成功。
- `git push` main 成功。

Vercel:

- `vercel deploy --prod --yes` 成功。
- `curl -I https://zero-one-yuan.vercel.app/` 返回 HTTP 200。
- `curl -I https://zero-one-yuan.vercel.app/novel` 返回 HTTP 200。
- `curl -I https://zero-one-yuan.vercel.app/web/novel` 返回 HTTP 200。
- 浏览器打开根路径后跳转到 `/web` 成功。
- 浏览器打开 `/novel` 后跳转到 `/web/novel` 成功。

## 7. 状态

本轮不修改小说正文,只做独立项目发布。

- 加权分保持: 94.25
- score delta: 0
- pipeline-state 更新到 `D.round-012-complete`
