import { renderPage } from './page-renderer.js';
import { formatDate } from '../utils/helpers.js';
import { getPostBySlug, getPostById } from '../js/post-loader.js';

/**
 * Render a single post detail page
 * @param {string|number} postIdentifier - ID or slug of the post to render
 */
export async function renderPostDetail(postIdentifier) {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;
  
  contentArea.innerHTML = '<div class="loading-post">Loading post...</div>';
  
  try {
    let post = await getPostBySlug(postIdentifier);
    
    if (!post && !isNaN(postIdentifier)) {
      post = await getPostById(postIdentifier);
    }
    
    if (!post) {
      contentArea.innerHTML = `
        <div class="error-message">
          <h2>Post Not Found</h2>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <a href="/" class="btn">Back to Home</a>
        </div>
      `;
      return;
    }
    
    const postDate = new Date(post.date);
    const formattedDate = formatDate(postDate);
    
    const categoryDisplay = Array.isArray(post.categories) 
      ? post.categories.join(', ')
      : post.categories || 'Uncategorized';
    
    const postDetailContent = `
      <article class="post-detail">
        <header class="post-header">
          <div class="post-meta">
            <span class="post-category"><i class="fas fa-folder"></i> <a href="/category/${categoryDisplay}">${categoryDisplay}</a></span>
            <span class="post-date"><i class="far fa-calendar"></i> ${formattedDate}</span>
          </div>
          <h1 class="post-title">${post.title}</h1>
        </header>
        
        <div class="post-content">
          ${post.content}
        </div>
        
        ${post.tags && post.tags.length > 0 ? `
        <div class="post-tags">
          <span class="tag-label">Tags:</span>
          ${post.tags.map(tag => `
            <a href="/tag/${tag}" class="tag">${tag}</a>
          `).join('')}
        </div>
        ` : ''}
        
        <div class="post-navigation">
          <a href="/" class="post-nav-link prev-post">
            <i class="fas fa-arrow-left"></i> Back to All Posts
          </a>
        </div>
        
      </article>
    `;

    renderPage(contentArea, postDetailContent);
  } catch (error) {
    console.error('Error rendering post detail:', error);
    contentArea.innerHTML = `
      <div class="error-message">
        <h2>Error Loading Post</h2>
        <p>There was a problem loading the post. Please try again later.</p>
        <a href="/" class="btn">Back to Home</a>
      </div>
    `;
  }
}