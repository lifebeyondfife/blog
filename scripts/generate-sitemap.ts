import * as fs from 'fs';
import * as path from 'path';
import { SITE_CONFIG } from '../src/lib/constants';

interface PostMeta {
  slug: string;
  category: string;
  date: string;
  url: string;
}

interface PostsIndex {
  posts: PostMeta[];
}

const OUTPUT_DIR = path.join(process.cwd(), 'out');
const GENERATED_DIR = path.join(process.cwd(), 'generated');

const postsIndexPath = path.join(GENERATED_DIR, 'posts-index.json');
const postsIndex: PostsIndex = JSON.parse(fs.readFileSync(postsIndexPath, 'utf-8'));

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function formatDateForSitemap(date: string): string {
  return new Date(date).toISOString().split('T')[0];
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlsXml = urls
    .map(url => {
      const { loc, lastmod, changefreq, priority } = url;
      let xml = `  <url>\n    <loc>${loc}</loc>`;
      
      if (lastmod) {
        xml += `\n    <lastmod>${lastmod}</lastmod>`;
      }
      if (changefreq) {
        xml += `\n    <changefreq>${changefreq}</changefreq>`;
      }
      if (priority !== undefined) {
        xml += `\n    <priority>${priority.toFixed(1)}</priority>`;
      }
      
      xml += '\n  </url>';
      return xml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

function getAllCategories(): string[] {
  const categories = new Set<string>();
  postsIndex.posts.forEach(post => categories.add(post.category));
  return Array.from(categories).sort();
}

function getPostsByCategory(category: string): PostMeta[] {
  return postsIndex.posts.filter(post => post.category === category);
}

function getCategoryPageCount(category: string): number {
  const categoryPosts = getPostsByCategory(category);
  return Math.ceil(categoryPosts.length / SITE_CONFIG.postsPerPage);
}

function getMostRecentPostDate(posts: PostMeta[]): string {
  if (posts.length === 0) return formatDateForSitemap(new Date().toISOString());
  
  const sortedDates = posts
    .map(p => p.date)
    .sort()
    .reverse();
  
  return formatDateForSitemap(sortedDates[0]);
}

async function generateSitemap(): Promise<void> {
  console.log('🗺️  Generating sitemap...');

  const urls: SitemapUrl[] = [];
  
  urls.push({
    loc: `${SITE_CONFIG.siteUrl}/`,
    lastmod: getMostRecentPostDate(postsIndex.posts),
    changefreq: 'weekly',
    priority: 1.0,
  });

  urls.push({
    loc: `${SITE_CONFIG.siteUrl}/posts/`,
    lastmod: getMostRecentPostDate(postsIndex.posts),
    changefreq: 'weekly',
    priority: 0.9,
  });

  urls.push({
    loc: `${SITE_CONFIG.siteUrl}/categories/`,
    changefreq: 'monthly',
    priority: 0.8,
  });

  urls.push({
    loc: `${SITE_CONFIG.siteUrl}/about/`,
    changefreq: 'yearly',
    priority: 0.7,
  });

  postsIndex.posts.forEach(post => {
    const postUrl = `/${post.category}/${post.slug}/`;
    urls.push({
      loc: `${SITE_CONFIG.siteUrl}${postUrl}`,
      lastmod: formatDateForSitemap(post.date),
      changefreq: 'yearly',
      priority: 0.8,
    });
  });

  const totalPostPages = Math.ceil(postsIndex.posts.length / SITE_CONFIG.postsPerPage);
  for (let page = 2; page <= totalPostPages; page++) {
    const startIndex = (page - 1) * SITE_CONFIG.postsPerPage;
    const endIndex = startIndex + SITE_CONFIG.postsPerPage;
    const postsOnPage = postsIndex.posts.slice(startIndex, endIndex);
    
    urls.push({
      loc: `${SITE_CONFIG.siteUrl}/posts/page/${page}/`,
      lastmod: getMostRecentPostDate(postsOnPage),
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  const categories = getAllCategories();
  
  for (const category of categories) {
    const categoryPosts = getPostsByCategory(category);
    const categoryPageCount = getCategoryPageCount(category);
    
    urls.push({
      loc: `${SITE_CONFIG.siteUrl}/${category}/`,
      lastmod: getMostRecentPostDate(categoryPosts),
      changefreq: 'monthly',
      priority: 0.8,
    });

    for (let page = 2; page <= categoryPageCount; page++) {
      const startIndex = (page - 1) * SITE_CONFIG.postsPerPage;
      const endIndex = startIndex + SITE_CONFIG.postsPerPage;
      const postsOnPage = categoryPosts.slice(startIndex, endIndex);
      
      urls.push({
        loc: `${SITE_CONFIG.siteUrl}/${category}/page/${page}/`,
        lastmod: getMostRecentPostDate(postsOnPage),
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  const sitemapXml = generateSitemapXml(urls);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');

  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
  console.log(`   📄 ${sitemapPath}`);
  
  const postUrls = urls.filter(u => u.loc.match(/\/[^/]+\/[^/]+\/?$/) && !u.loc.includes('/page/'));
  const categoryUrls = urls.filter(u => u.loc.match(/\/[^/]+\/?$/) && !u.loc.includes('/posts') && !u.loc.includes('/categories') && !u.loc.includes('/about') && u.loc !== `${SITE_CONFIG.siteUrl}/`);
  const paginationUrls = urls.filter(u => u.loc.includes('/page/'));
  const staticUrls = urls.filter(u => 
    u.loc === `${SITE_CONFIG.siteUrl}/` || 
    u.loc === `${SITE_CONFIG.siteUrl}/posts/` || 
    u.loc === `${SITE_CONFIG.siteUrl}/categories/` || 
    u.loc === `${SITE_CONFIG.siteUrl}/about/`
  );
  
  console.log(`   └─ ${staticUrls.length} static pages`);
  console.log(`   └─ ${postUrls.length} blog posts`);
  console.log(`   └─ ${categoryUrls.length} category pages`);
  console.log(`   └─ ${paginationUrls.length} pagination pages`);
}

generateSitemap().catch(error => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});
