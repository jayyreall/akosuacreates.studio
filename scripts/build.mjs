import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { navigation, pages } from '../src/pages.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const renderNavigation = () => `
  <header class="site-header">
    <a class="home-mark" href="/" aria-label="Akosua Creates home">Akosua Creates</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">
      <span class="sr-only">Open navigation menu</span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
    <nav class="site-menu" id="site-menu" aria-label="Main navigation">
      <ul>
        ${navigation
          .map((item) => `
          <li>
            <a href="${item.href}">${item.label}</a>
            ${item.children ? `<ul class="submenu">${item.children.map((child) => `<li><a href="${child.href}">${child.label}</a></li>`).join('')}</ul>` : ''}
          </li>`)
          .join('')}
      </ul>
    </nav>
  </header>`;

const renderPage = (page) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <title>${escapeHtml(page.title)} | Akosua Creates</title>
  <link rel="stylesheet" href="/styles.css">
  <script src="/menu.js" defer></script>
</head>
<body>
  ${renderNavigation()}
  <main class="${page.home ? 'home-layout' : 'page-layout'}">
    ${page.home ? renderHome(page) : renderInterior(page)}
  </main>
</body>
</html>
`;

const renderHome = (page) => `
  <section class="hero" aria-labelledby="page-title">
    <div class="hero-copy">
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1 id="page-title">${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.description)}</p>
    </div>
    <figure class="hero-art">
      <img src="/images/homepage-art-reference.jpeg" alt="Black hand-drawn line art on an off-white paper background for Akosua Creates">
    </figure>
  </section>`;

const renderInterior = (page) => `
  <article class="paper-card" aria-labelledby="page-title">
    <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
    <h1 id="page-title">${escapeHtml(page.title)}</h1>
    <p>${escapeHtml(page.description)}</p>
    <a class="return-link" href="/">Return home</a>
  </article>`;

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

for (const page of pages) {
  const outputDir = page.path === '/' ? dist : join(dist, page.path);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, 'index.html'), renderPage(page));
}
