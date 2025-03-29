import { marked } from 'marked';

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

/**
 * Convert Markdown to HTML using the marked library
 * @param {string} markdown - Markdown content
 * @returns {string} - HTML content
 */
function markdownToHtml(markdown) {  
  const renderer = new marked.Renderer();
  
  const options = {
    renderer: renderer,
    headerIds: false,
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false 
  };
  
  return marked.parse(markdown, options);
}

/**
 * Load posts from the file system using webpack's require context
 * @returns {Promise<Array>} - Array of post objects
 */
export async function loadPosts() {
  try {
    const posts = [];

    const postContext = require.context('../posts', false, /\.md$/);
    const postFiles = postContext.keys();

    console.log('Found post files:', postFiles);

    for (const file of postFiles) {
      try {
        const content = postContext(file);
        const { metadata, content: markdownContent } = parseFrontMatter(content);

        const slug = file.replace(/^\.\//, '').replace(/\.md$/, '');

        const post = {
          id: posts.length + 1,
          slug,
          title: metadata.title || 'Untitled',
          date: metadata.date || new Date().toISOString().split('T')[0],
          categories: Array.isArray(metadata.categories)
            ? metadata.categories
            : (metadata.categories ? [metadata.categories] : []),
          tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags : [metadata.tags]) : [],
          fullContent: null,
          content: null,
          excerpt: markdownContent.substring(0, 150) + '...',
          _rawContent: markdownContent
        };

        posts.push(post);
        console.log(`Loaded post: ${post.title}`);
      } catch (fileError) {
        console.error(`Error processing file ${file}:`, fileError);
      }
    }

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

/**
 * Load a specific post by slug with full content
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post object or null if not found
 */
export async function getPostBySlug(slug) {
  const posts = await loadPosts();
  const post = posts.find(post => post.slug === slug);

  if (post && !post.content) {
    post.content = markdownToHtml(post._rawContent);
  }

  return post || null;
}

/**
 * Load a specific post by ID with full content
 * @param {number} id - Post ID
 * @returns {Promise<Object|null>} - Post object or null if not found
 */
export async function getPostById(id) {
  const posts = await loadPosts();
  const post = posts.find(post => post.id === parseInt(id, 10));

  if (post && !post.content) {
    post.content = markdownToHtml(post._rawContent);
  }

  return post || null;
}

/**
 * Get posts by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} - Array of post objects
 */
export async function getPostsByCategory(category) {
  const posts = await loadPosts();
  return posts.filter(post =>
    post.categories.some(cat =>
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * Get posts by tag
 * @param {string} tag - Tag to filter by
 * @returns {Promise<Array>} - Array of post objects
 */
export async function getPostsByTag(tag) {
  const posts = await loadPosts();
  return posts.filter(post =>
    post.tags.some(t =>
      t.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get all categories with counts
 * @returns {Promise<Array>} - Array of category objects with counts
 */
export async function getAllCategories() {
  const posts = await loadPosts();
  const categoryCounts = {};

  posts.forEach(post => {
    post.categories.forEach(category => {
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/ /g, '-')
  }));
}

/**
 * Get all tags with counts
 * @returns {Promise<Array>} - Array of tag objects with counts
 */
export async function getAllTags() {
  const posts = await loadPosts();
  const tagCounts = {};

  posts.forEach(post => {
    (post.tags || []).forEach(tag => {
      if (tagCounts[tag]) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  return Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/ /g, '-')
  }));
}