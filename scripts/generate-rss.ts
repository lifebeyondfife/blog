import * as fs from 'fs';
import * as path from 'path';
import { SITE_CONFIG } from '../src/lib/constants';
import { PostMeta, PostsIndex } from '../src/types/post';

const OUTPUT_DIR = path.join(process.cwd(), 'out');
const GENERATED_DIR = path.join(process.cwd(), 'generated');

const postsIndexPath = path.join(GENERATED_DIR, 'posts-index.json');
const postsIndex: PostsIndex = JSON.parse(fs.readFileSync(postsIndexPath, 'utf-8'));

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRfc822Date(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateRssItem(post: PostMeta): string {
  const postUrl = `${SITE_CONFIG.siteUrl}/${post.category}/${post.slug}/`;
  const pubDate = formatRfc822Date(post.date);
  
  let item = `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>`;

  if (post.tags && post.tags.length > 0) {
    for (const tag of post.tags) {
      item += `\n      <category>${escapeXml(tag)}</category>`;
    }
  }

  item += '\n    </item>';
  return item;
}

function generateRssFeed(posts: PostMeta[]): string {
  const buildDate = formatRfc822Date(new Date().toISOString());
  const mostRecentPostDate = posts.length > 0 
    ? formatRfc822Date(posts[0].date) 
    : buildDate;

  const items = posts.map(generateRssItem).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <link>${SITE_CONFIG.siteUrl}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>en-gb</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${mostRecentPostDate}</pubDate>
    <atom:link href="${SITE_CONFIG.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${escapeXml(SITE_CONFIG.author)}</managingEditor>
    <webMaster>${escapeXml(SITE_CONFIG.author)}</webMaster>
${items}
  </channel>
</rss>`;
}

async function generateRss(): Promise<void> {
  console.log('📡 Generating RSS feed...');

  const sortedPosts = [...postsIndex.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rssFeed = generateRssFeed(sortedPosts);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const rssPath = path.join(OUTPUT_DIR, 'rss.xml');
  fs.writeFileSync(rssPath, rssFeed, 'utf-8');

  console.log(`✅ RSS feed generated with ${sortedPosts.length} posts`);
  console.log(`   📄 ${rssPath}`);
}

generateRss().catch(error => {
  console.error('❌ Error generating RSS feed:', error);
  process.exit(1);
});
