import { marked } from 'marked';

let postsMetadata = null;

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
 * Load metadata from the posts-metadata.json file
 * @returns {Promise<Object>} - The metadata object
 */
async function loadMetadata() {
  if (postsMetadata !== null) {
    return postsMetadata;
  }

  try {
    const response = await fetch('/data/posts-metadata.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load metadata: ${response.status} ${response.statusText}`);
    }
    
    postsMetadata = await response.json();
    console.log('Posts metadata loaded successfully');
    return postsMetadata;
  } catch (error) {
    console.error('Error loading posts metadata:', error);
  }
}

/**
 * Load posts from the metadata file
 * @returns {Promise<Array>} - Array of post objects
 */
export async function loadPosts() {
  const metadata = await loadMetadata();
  return metadata.posts;
}

/**
 * Load a specific post by slug with full content
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post object or null if not found
 */
export async function getPostBySlug(slug) {
  const metadata = await loadMetadata();
  const post = metadata.posts.find(post => post.slug === slug);

  if (!post) {
    return null;
  }

  if (!post.content) {
    try {
      const postContext = require.context('../posts', false, /\.md$/);
      const fileName = post.fileName || `${slug}.md`;
      const fileKey = `./${fileName}`;
      
      if (postContext.keys().includes(fileKey)) {
        const content = postContext(fileKey);
        const { content: markdownContent } = parseFrontMatter(content);
        post.content = markdownToHtml(markdownContent);
        post._rawContent = markdownContent;
      } else {
        for (const key of postContext.keys()) {
          if (key.includes(slug)) {
            const content = postContext(key);
            const { content: markdownContent } = parseFrontMatter(content);
            post.content = markdownToHtml(markdownContent);
            post._rawContent = markdownContent;
            break;
          }
        }
      }
    } catch (error) {
      console.error(`Error loading post content for ${slug}:`, error);
    }
  }

  return post;
}

/**
 * Load a specific post by ID with full content
 * @param {number} id - Post ID
 * @returns {Promise<Object|null>} - Post object or null if not found
 */
export async function getPostById(id) {
  const metadata = await loadMetadata();
  const post = metadata.posts.find(post => post.id === parseInt(id, 10));
  
  if (!post) {
    return null;
  }
  
  if (!post.content) {
    const fullPost = await getPostBySlug(post.slug);
    return fullPost;
  }

  return post;
}

/**
 * Get posts by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} - Array of post objects
 */
export async function getPostsByCategory(category) {
  const metadata = await loadMetadata();
  return metadata.posts.filter(post =>
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
  const metadata = await loadMetadata();
  return metadata.posts.filter(post =>
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
  const metadata = await loadMetadata();
  return metadata.categories;
}

/**
 * Legacy method to get all categories
 * @returns {Promise<Array>} - Array of category objects with counts
 */
async function getAllCategoriesLegacy() {
  const posts = await loadPostsLegacy();
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
  const metadata = await loadMetadata();
  return metadata.tags;
}

/**
 * Legacy method to get all tags
 * @returns {Promise<Array>} - Array of tag objects with counts
 */
async function getAllTagsLegacy() {
  const posts = await loadPostsLegacy();
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