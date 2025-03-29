const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

/**
 * Parse front matter metadata from Markdown content
 * @param {string} content - Raw markdown content
 * @returns {Object} - Parsed metadata and content
 */
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return {
      metadata: {},
      content: content
    };
  }

  const [, frontMatter, markdownContent] = match;
  const metadata = {};

  frontMatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim().replace(/"/g, '');
      let value = line.slice(colonIndex + 1).trim().replace(/"/g, '');

      if (value.includes('-')) {
        const listItems = value.split('-').map(item => item.trim()).filter(Boolean);
        if (listItems.length > 1) {
          value = listItems;
        }
      }

      metadata[key] = value;
    }
  });

  if (frontMatter.includes('categories:') && frontMatter.includes('-')) {
    const categoriesMatch = frontMatter.match(/categories:[\s\S]*?(?=\n\w|$)/);
    if (categoriesMatch) {
      const categoriesBlock = categoriesMatch[0];
      const categories = categoriesBlock
        .split('\n')
        .filter(line => line.includes('-'))
        .map(line => line.replace('-', '').trim().replace(/"/g, ''))
        .filter(Boolean);

      if (categories.length) {
        metadata.categories = categories;
      }
    }
  }

  return {
    metadata,
    content: markdownContent.trim()
  };
}

const postsDir = path.join(__dirname, '../src/posts');
const outputPath = path.join(__dirname, '../src/data/posts-metadata.json');

const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Building posts metadata...');
try {
  const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  console.log(`Found ${postFiles.length} post files`);

  const postsMetadata = [];
  const categories = {};
  const tags = {};

  postFiles.forEach((file, index) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { metadata, content: markdownContent } = parseFrontMatter(content);

    const slug = file.replace(/\.md$/, '');

    const post = {
      id: index + 1,
      slug,
      title: metadata.title || 'Untitled',
      date: metadata.date || new Date().toISOString().split('T')[0],
      categories: Array.isArray(metadata.categories)
        ? metadata.categories
        : (metadata.categories ? [metadata.categories] : []),
      tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags : [metadata.tags]) : [],
      excerpt: markdownContent.substring(0, 150) + '...',
      fileName: file
    };

    post.categories.forEach(category => {
      if (!categories[category]) {
        categories[category] = {
          name: category,
          count: 0,
          slug: category.toLowerCase().replace(/ /g, '-')
        };
      }
      categories[category].count++;
    });

    (post.tags || []).forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = {
          name: tag,
          count: 0,
          slug: tag.toLowerCase().replace(/ /g, '-')
        };
      }
      tags[tag].count++;
    });

    postsMetadata.push(post);
    console.log(`Processed post: ${post.title}`);
  });

  postsMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

  const metadata = {
    posts: postsMetadata,
    categories: Object.values(categories),
    tags: Object.values(tags),
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`Metadata successfully written to ${outputPath}`);
} catch (error) {
  console.error('Error building posts metadata:', error);
  process.exit(1);
}