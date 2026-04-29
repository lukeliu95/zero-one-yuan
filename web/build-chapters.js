#!/usr/bin/env node
/**
 * build-chapters.js — 把 novel.md 拆成 web/chapters/ch{NN}.html
 * 用法: node web/build-chapters.js
 * 入: ../novel.md (相对脚本)
 * 出: ./chapters/ch01.html ... ch13.html (含 ch04-half.html · 共 14 个)
 *
 * Markdown 子集: # / ## / ### 标题, > 引用, **bold**, *italic*, ---, 空行分段, ``` 代码块, - 列表, 1. 有序列表
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'novel.md');
const OUT  = path.join(__dirname, 'chapters');

// 文件名映射 (按 novel.md 出现顺序 1..14)
const SLUGS = [
  'ch01', 'ch02', 'ch03', 'ch04', 'ch04-half',
  'ch05', 'ch06', 'ch07', 'ch08', 'ch09',
  'ch10', 'ch11', 'ch12', 'ch13',
];

const AUTHOR_NAME = '刘仙升';
const AUTHOR_HANDLE = 'LukeLiu95';
const AUTHOR_URL = 'https://x.com/LukeLiu95';

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// 行内格式化 (escape 后再处理 ** *)
function inlineFormat(text) {
  let s = escapeHtml(text);
  // 代码 (backtick)
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 链接 [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
  // 粗体 **x**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // 斜体 *x*
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  return s;
}

/** 把一段 markdown 文本 (单章, 不含外层 H2) 转为 HTML body 字符串 */
function mdBlocksToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let i = 0;
  let inCode = false;
  let codeLang = '';
  let codeBuf = [];
  let listType = null; // 'ul' | 'ol' | null
  let listBuf = [];
  let paraBuf = [];
  let quoteBuf = [];

  function flushPara() {
    if (paraBuf.length) {
      const text = paraBuf.join(' ').trim();
      if (text) out.push(`<p>${inlineFormat(text)}</p>`);
      paraBuf = [];
    }
  }
  function flushQuote() {
    if (quoteBuf.length) {
      const text = quoteBuf.join(' ').trim();
      out.push(`<blockquote><p>${inlineFormat(text)}</p></blockquote>`);
      quoteBuf = [];
    }
  }
  function flushList() {
    if (listType && listBuf.length) {
      out.push(`<${listType}>`);
      for (const item of listBuf) out.push(`  <li>${inlineFormat(item)}</li>`);
      out.push(`</${listType}>`);
      listBuf = [];
      listType = null;
    }
  }
  function flushAll() { flushPara(); flushQuote(); flushList(); }

  while (i < lines.length) {
    const ln = lines[i];

    // 代码块
    const fenceM = ln.match(/^```(\w*)\s*$/);
    if (fenceM) {
      if (!inCode) {
        flushAll();
        inCode = true;
        codeLang = fenceM[1] || '';
        codeBuf = [];
      } else {
        const code = codeBuf.map(escapeHtml).join('\n');
        const cls = codeLang ? ` class="lang-${escapeHtml(codeLang)}"` : '';
        out.push(`<pre><code${cls}>${code}</code></pre>`);
        inCode = false;
        codeLang = '';
        codeBuf = [];
      }
      i++; continue;
    }
    if (inCode) { codeBuf.push(ln); i++; continue; }

    // 水平线
    if (/^---+\s*$/.test(ln)) {
      flushAll();
      out.push('<hr />');
      i++; continue;
    }

    // 空行
    if (/^\s*$/.test(ln)) {
      flushAll();
      i++; continue;
    }

    // 标题 ### / ####
    let hM = ln.match(/^(#{3,6})\s+(.*)$/);
    if (hM) {
      flushAll();
      const lvl = hM[1].length;
      out.push(`<h${lvl}>${inlineFormat(hM[2].trim())}</h${lvl}>`);
      i++; continue;
    }

    // 引用
    if (/^>\s?/.test(ln)) {
      flushPara(); flushList();
      quoteBuf.push(ln.replace(/^>\s?/, ''));
      i++; continue;
    } else if (quoteBuf.length) {
      flushQuote();
    }

    // 无序列表
    let ulM = ln.match(/^[\-*]\s+(.*)$/);
    if (ulM) {
      flushPara(); flushQuote();
      if (listType !== 'ul') { flushList(); listType = 'ul'; }
      listBuf.push(ulM[1]);
      i++; continue;
    }
    // 有序列表
    let olM = ln.match(/^\d+\.\s+(.*)$/);
    if (olM) {
      flushPara(); flushQuote();
      if (listType !== 'ol') { flushList(); listType = 'ol'; }
      listBuf.push(olM[1]);
      i++; continue;
    }
    if (listType) flushList();

    // 普通段落 (累积直到空行)
    paraBuf.push(ln.trim());
    i++;
  }

  flushAll();
  return out.join('\n');
}

/** 拆章: 返回 [{title, body}] */
function splitChapters(src) {
  const lines = src.split(/\r?\n/);
  const heads = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+第/.test(lines[i])) heads.push(i);
  }
  const chapters = [];
  for (let k = 0; k < heads.length; k++) {
    const start = heads[k];
    const end = (k + 1 < heads.length) ? heads[k + 1] : lines.length;
    const titleLine = lines[start].replace(/^##\s+/, '').trim();
    const body = lines.slice(start + 1, end).join('\n');
    chapters.push({ title: titleLine, body });
  }
  return chapters;
}

function pageHtml({ idx, total, slug, title, bodyHtml, prevSlug, nextSlug }) {
  const prevLink = prevSlug ? `<a class="nav-link" href="${prevSlug}.html" rel="prev">← 上一章</a>` : `<span class="nav-link disabled">← 上一章</span>`;
  const nextLink = nextSlug ? `<a class="nav-link" href="${nextSlug}.html" rel="next">下一章 →</a>` : `<span class="nav-link disabled">下一章 →</span>`;
  const tocLink  = `<a class="nav-link" href="../index.html#chapters">目录</a>`;
  const progress = `第 ${idx} / ${total} 章`;
  const titleEsc = escapeHtml(title);

  return `<!doctype html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${titleEsc} · 零点一元</title>
  <meta name="description" content="《零点一元》${titleEsc} — 作者:${AUTHOR_NAME}" />
  <meta name="author" content="${AUTHOR_NAME}" />
  <meta property="og:title" content="${titleEsc} · 零点一元" />
  <meta property="og:type" content="article" />
  <meta property="og:author" content="${AUTHOR_URL}" />
  <meta property="article:author" content="${AUTHOR_URL}" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23111316'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='18' fill='%23f6f1e8' font-family='serif'%3E零%3C/text%3E%3C/svg%3E" />
  <link rel="stylesheet" href="../assets/reader.css" />
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
  <header class="reader-top">
    <div class="reader-shell">
      <a class="brand" href="../index.html">零点一元</a>
      <span class="progress">${progress}</span>
    </div>
  </header>

  <nav class="reader-nav top" aria-label="章节导航(顶部)">
    <div class="reader-shell">
      ${prevLink}
      ${tocLink}
      ${nextLink}
    </div>
  </nav>

  <main class="reader-main">
    <article class="chapter">
      <h1 class="chapter-title">${titleEsc}</h1>
${bodyHtml.split('\n').map(l => l ? '      ' + l : l).join('\n')}
    </article>
  </main>

  <nav class="reader-nav bottom" aria-label="章节导航(底部)">
    <div class="reader-shell">
      ${prevLink}
      ${tocLink}
      ${nextLink}
    </div>
    <div class="reader-shell progress-line">
      ${progress}
    </div>
  </nav>

  <footer class="reader-footer">
    <div class="reader-shell">
      <p>《零点一元》 · 作者:<a href="${AUTHOR_URL}" rel="noopener">${AUTHOR_NAME} @${AUTHOR_HANDLE}</a></p>
      <p class="muted">本页由 <code>web/build-chapters.js</code> 从 <code>novel.md</code> 自动生成。</p>
    </div>
  </footer>
</body>
</html>
`;
}

function main() {
  const src = fs.readFileSync(SRC, 'utf8');
  const chapters = splitChapters(src);
  if (chapters.length !== SLUGS.length) {
    console.error(`[build-chapters] FAIL: 章节数=${chapters.length} 期望=${SLUGS.length}`);
    process.exit(2);
  }
  fs.mkdirSync(OUT, { recursive: true });

  const total = chapters.length;
  let totalChars = 0;
  const generated = [];
  for (let k = 0; k < chapters.length; k++) {
    const { title, body } = chapters[k];
    const slug = SLUGS[k];
    const prevSlug = k > 0 ? SLUGS[k - 1] : null;
    const nextSlug = k < total - 1 ? SLUGS[k + 1] : null;
    const bodyHtml = mdBlocksToHtml(body);
    const html = pageHtml({
      idx: k + 1, total, slug, title, bodyHtml, prevSlug, nextSlug,
    });
    const outPath = path.join(OUT, slug + '.html');
    fs.writeFileSync(outPath, html, 'utf8');
    const chars = body.replace(/\s/g, '').length;
    totalChars += chars;
    generated.push({ slug, title, chars, file: outPath });
    console.log(`[build-chapters] ${slug}.html  ${title}  正文字符≈${chars}`);
  }
  console.log(`[build-chapters] OK  ${generated.length} 章  总正文字符≈${totalChars}`);
}

main();
