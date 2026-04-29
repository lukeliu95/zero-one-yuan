# Round 013 · Vercel Web Analytics

## 1. 触发

用户要求查看 GitHub 上 Vercel 添加的 Web Analytics,合并并启用。

## 2. GitHub 合并

- 确认 Vercel bot 创建的 PR:
  - `#1 Install Vercel Web Analytics integration`
  - `#2 Install and Configure Vercel Web Analytics`
- `#1` 初始为 draft,先标记 ready for review,再合并。
- 两个 PR 合入后同步本地 `main`。

## 3. 实施修正

两个 Vercel PR 都修改了同一组 HTML 文件,合入后出现重复 Analytics 脚本:

- `index.html`
- `web/index.html`
- `web/novel.html`

本轮保留 Vercel 当前推荐的静态站点脚本:

```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

删除重复的旧 CDN 版本:

```html
<script defer src="https://cdn.vercel-insights.com/v1/script.js"></script>
```

## 4. 发布

- 推送提交: `f959650 Deduplicate Vercel Web Analytics script`
- 生产部署: `vercel deploy --prod --yes`
- 部署 URL: `https://zero-one-yuan-ld2tocoko-lukes-projects-e427a219.vercel.app`
- 稳定 URL: `https://zero-one-yuan.vercel.app`

## 5. 验证

- `https://zero-one-yuan.vercel.app/` 返回 HTTP 200
- `https://zero-one-yuan.vercel.app/novel` 返回 HTTP 200
- `https://zero-one-yuan.vercel.app/_vercel/insights/script.js` 返回 HTTP 200
- 线上 `https://zero-one-yuan.vercel.app/web/` 中只保留 1 组 Analytics 脚本
- 线上 `https://zero-one-yuan.vercel.app/web/novel` 中只保留 1 组 Analytics 脚本

## 6. 结论

Vercel Web Analytics 已合并、清理重复脚本并部署到生产环境。`/_vercel/insights/script.js` 已由 Vercel 正常提供,说明项目端 Web Analytics 路由已启用并可被页面加载。

