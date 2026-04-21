import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from '@/lib/markdown';
import { POSTS_DIRECTORY, SITE_CONFIG } from '@/lib/constants';

interface Frontmatter {
  title: string;
  date: string;
  category: string;
  featuredImage?: string;
  excerpt?: string;
}

interface Args {
  slug: string;
  subdomain: string;
}

function parseArgs(): Args {
  const [slug, subdomain] = process.argv.slice(2);
  if (!slug || !subdomain) {
    console.error('Usage: tsx scripts/export-standalone.ts <slug> <subdomain>');
    console.error('Example: tsx scripts/export-standalone.ts the-three-layers-of-software-engineering layers.lifebeyondfife.com');
    process.exit(1);
  }
  return { slug, subdomain };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function deriveDescription(markdownBody: string): string {
  const firstParagraph = markdownBody
    .split(/\n{2,}/)
    .map(block => block.trim())
    .find(block => block.length > 0 && !block.startsWith('#') && !block.startsWith('<') && !block.startsWith('!['));
  if (!firstParagraph) return '';
  const plain = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

function buildStyles(): string {
  return `
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --heading: #111827;
  --muted: #4b5563;
  --link: #3d6585;
  --link-hover: #4A7BA7;
  --code-bg: #f3f4f6;
  --code-text: #1f2937;
  --border: #d1d5db;
  --blockquote-border: #d1d5db;
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a1624;
    --text: #B4C7D8;
    --heading: #D4E3EE;
    --muted: #B4C7D8;
    --link: #6FA8DC;
    --link-hover: #D4E3EE;
    --code-bg: #1d3349;
    --code-text: #D4E3EE;
    --border: #2a4661;
    --blockquote-border: #2a4661;
    color-scheme: dark;
  }
}

* { box-sizing: border-box; }

html, body { margin: 0; padding: 0; }

body {
  font-family: 'Raleway', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  max-width: 72ch;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--heading);
  margin: 0 0 2rem;
  line-height: 1.2;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--heading);
  margin: 2.5rem 0 1rem;
  line-height: 1.3;
}

h3 {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--heading);
  margin: 2rem 0 0.75rem;
  line-height: 1.4;
}

h4 { font-size: 1.15rem; font-weight: 600; color: var(--heading); margin: 1.5rem 0 0.5rem; }

p { margin: 0 0 1.25rem; }

a {
  color: var(--link);
  text-decoration: none;
}
a:hover { color: var(--link-hover); text-decoration: underline; }

strong { color: var(--heading); font-weight: 600; }

ul, ol { margin: 0 0 1.25rem; padding-left: 1.5rem; }
li { margin: 0.4rem 0; }

blockquote {
  margin: 1.5rem 0;
  padding: 0.25rem 0 0.25rem 1rem;
  border-left: 4px solid var(--blockquote-border);
  color: var(--muted);
  font-style: italic;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  background: var(--code-bg);
  color: var(--code-text);
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
}

pre {
  background: var(--code-bg);
  color: var(--code-text);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  border: 1px solid var(--border);
  margin: 1.5rem 0;
}
pre code { background: transparent; padding: 0; }

hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }

table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; }
th, td { border: 1px solid var(--border); padding: 0.5rem 1rem; text-align: left; }
th { background: var(--code-bg); font-weight: 600; }

img, picture, svg {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem auto;
}

p:has(img), p:has(picture) { text-align: center; }
p picture, p img { display: inline-block; margin: 0; }

figure { margin: 1.5rem 0; text-align: center; }

::selection { background: var(--link); color: var(--bg); }
`.trim();
}

function buildHtml(params: {
  frontmatter: Frontmatter;
  contentHtml: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl: string | null;
}): string {
  const { frontmatter, contentHtml, description, canonicalUrl, ogImageUrl } = params;
  const title = escapeHtml(frontmatter.title);
  const desc = escapeHtml(description);

  const ogImageTag = ogImageUrl
    ? `  <meta property="og:image" content="${escapeHtml(ogImageUrl)}">
  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}">`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="author" content="${escapeHtml(SITE_CONFIG.author)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
${ogImageTag}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${buildStyles()}</style>
</head>
<body>
  <main>
    <article>
      <h1>${title}</h1>
${contentHtml}
    </article>
  </main>
</body>
</html>
`;
}

async function main(): Promise<void> {
  const { slug, subdomain } = parseArgs();

  const filePath = path.join(process.cwd(), POSTS_DIRECTORY, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`Post not found: ${filePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;

  if (!frontmatter.title || !frontmatter.date || !frontmatter.category) {
    console.error(`Post is missing required frontmatter (title, date, category): ${filePath}`);
    process.exit(1);
  }

  const contentHtml = await markdownToHtml(content);
  const canonicalUrl = `https://${subdomain}/`;
  const description = frontmatter.excerpt ?? deriveDescription(content);
  const ogImageUrl = frontmatter.featuredImage ? `https://${subdomain}${frontmatter.featuredImage}` : null;

  const html = buildHtml({ frontmatter, contentHtml, description, canonicalUrl, ogImageUrl });

  const outDir = path.join(process.cwd(), 'out-standalone', slug);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');

  console.log(`Wrote ${path.relative(process.cwd(), outPath)}`);
  console.log(`Canonical: ${canonicalUrl}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
