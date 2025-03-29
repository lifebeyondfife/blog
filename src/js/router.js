import { renderBlogPosts } from './blog.js';
import { renderAboutPage } from '../pages/about.js';
import { renderCategoriesPage } from '../pages/categories.js';
import { renderPostDetail } from '../pages/post-detail.js';
import { formatDate } from '../utils/helpers.js';

/**
 * Initialize the router
 */
export function initRouter() {
  handleRouteChange();
  
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigateTo(href);
      }
    }
  });
  
  window.addEventListener('popstate', () => {
    handleRouteChange();
  });
}

/**
 * Navigate to a specific route
 * @param {string} url - URL to navigate to
 * @param {Object} options - Navigation options
 * @param {boolean} options.addToHistory - Whether to add to browser history
 */
export function navigateTo(url, options = { addToHistory: true }) {
  if (options.addToHistory) {
    window.history.pushState({}, '', url);
  } else {
    window.history.replaceState({}, '', url);
  }
  handleRouteChange();
}

/**
 * Handle route changes
 */
async function handleRouteChange() {
  const path = window.location.pathname;
  
  updateActiveNavLink(path);
  
  if (path === '/' || path === '/index.html') {
    await renderBlogPosts(1);
  } else if (path.match(/^\/page\/(\d+)$/)) {
    const pageMatch = path.match(/^\/page\/(\d+)$/);
    const pageNum = parseInt(pageMatch[1], 10);
    await renderBlogPosts(pageNum);
  } else if (path === '/about') {
    renderAboutPage();
  } else if (path === '/categories') {
    renderCategoriesPage();
  } else if (path.match(/^\/post\/(\d+)$/)) {
    const postId = path.match(/^\/post\/(\d+)$/)[1];
    renderPostDetail(postId);
  } else if (path.match(/^\/post\/([a-zA-Z0-9_-]+)$/)) {
    const postSlug = path.match(/^\/post\/([a-zA-Z0-9_-]+)$/)[1];
    renderPostDetail(postSlug);
  } else if (path.match(/^\/category\/(.+)$/)) {
    const category = path.match(/^\/category\/(.+)$/)[1];
    renderCategoryPosts(category);
  } else if (path.match(/^\/tag\/(.+)$/)) {
    const tag = path.match(/^\/tag\/(.+)$/)[1];
    renderTagPosts(tag);
  } else {
    renderNotFoundPage();
  }
}

/**
 * Update the active state in the navigation menu
 * @param {string} path - Current path
 */
function updateActiveNavLink(path) {
  const navLinks = document.querySelectorAll('.menu a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const linkHref = link.getAttribute('href');
    if (path === linkHref || 
        (linkHref !== '/' && path.startsWith(linkHref))) {
      link.classList.add('active');
    } else if (linkHref === '/' && path === '/index.html') {
      link.classList.add('active');
    }
  });
}

/**
 * Render posts for a specific category
 * @param {string} category - Category slug
 */
async function renderCategoryPosts(category) {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;
  
  contentArea.innerHTML = `
    <div class="category-heading">
      <h1>Category: ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}</h1>
      <p>Browsing all posts in ${category.replace(/-/g, ' ')}</p>
    </div>
    <div class="filtered-posts">
      <p>Loading posts for ${category.replace(/-/g, ' ')}...</p>
    </div>
  `;
  
  try {
    const { getPostsByCategory } = await import('../js/post-loader.js');
    const posts = await getPostsByCategory(category);
    
    const filteredPostsContainer = contentArea.querySelector('.filtered-posts');
    
    if (!posts || posts.length === 0) {
      filteredPostsContainer.innerHTML = `
        <div class="no-posts">
          <p>No posts found in this category.</p>
          <a href="/" class="btn">Back to All Posts</a>
        </div>
      `;
      return;
    }
    
    filteredPostsContainer.innerHTML = '';

    posts.reverse();
    
    posts.forEach(post => {
      const postDate = new Date(post.date);
      const formattedDate = formatDate(postDate);
      
      const categoryDisplay = Array.isArray(post.categories) 
        ? post.categories[0]
        : post.categories || 'Uncategorized';
      
      const postEl = document.createElement('article');
      postEl.className = 'post-card';
      postEl.innerHTML = `
        <div class="post-content">
          <div class="post-meta">
            <span><i class="far fa-calendar"></i> ${formattedDate}</span>
          </div>
          <h2 class="post-title">${post.title}</h2>
          <div class="post-excerpt">
            <p>${post.excerpt}</p>
          </div>
          <a href="/post/${post.slug}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `;
      
      filteredPostsContainer.appendChild(postEl);
    });
  } catch (error) {
    console.error('Error loading category posts:', error);
    contentArea.querySelector('.filtered-posts').innerHTML = `
      <div class="error-message">
        <p>Error loading posts. Please try again later.</p>
        <a href="/" class="btn">Back to All Posts</a>
      </div>
    `;
  }
}

/**
 * Render posts for a specific tag
 * @param {string} tag - Tag slug
 */
async function renderTagPosts(tag) {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;
  
  contentArea.innerHTML = `
    <div class="tag-heading">
      <h1>Tag: ${tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}</h1>
      <p>Browsing all posts tagged with "${tag.replace(/-/g, ' ')}"</p>
    </div>
    <div class="filtered-posts">
      <p>Loading posts tagged with ${tag.replace(/-/g, ' ')}...</p>
    </div>
  `;
  
  try {
    const { getPostsByTag } = await import('../js/post-loader.js');
    const posts = await getPostsByTag(tag);
    
    const filteredPostsContainer = contentArea.querySelector('.filtered-posts');
    
    if (!posts || posts.length === 0) {
      filteredPostsContainer.innerHTML = `
        <div class="no-posts">
          <p>No posts found with this tag.</p>
          <a href="/" class="btn">Back to All Posts</a>
        </div>
      `;
      return;
    }
    
    filteredPostsContainer.innerHTML = '';
    
    posts.forEach(post => {
      const postDate = new Date(post.date);
      const formattedDate = formatDate(postDate);
      
      const categoryDisplay = Array.isArray(post.categories) 
        ? post.categories[0]
        : post.categories || 'Uncategorized';
      
      const postEl = document.createElement('article');
      postEl.className = 'post-card';
      postEl.innerHTML = `
        <div class="post-content">
          <div class="post-meta">
            <span><i class="far fa-calendar"></i> ${formattedDate}</span>
            <span class="post-category"><i class="fas fa-folder"></i> <a href="/category/${categoryDisplay}">${categoryDisplay}</a></span>
          </div>
          <h2 class="post-title">${post.title}</h2>
          <div class="post-excerpt">
            <p>${post.excerpt}</p>
          </div>
          <a href="/post/${post.slug}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `;
      
      filteredPostsContainer.appendChild(postEl);
    });
  } catch (error) {
    console.error('Error loading tag posts:', error);
    contentArea.querySelector('.filtered-posts').innerHTML = `
      <div class="error-message">
        <p>Error loading posts. Please try again later.</p>
        <a href="/" class="btn">Back to All Posts</a>
      </div>
    `;
  }
}

/**
 * Render 404 Not Found page
 */
function renderNotFoundPage() {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;
  
  contentArea.innerHTML = `
    <div class="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" class="btn">Back to Home</a>
    </div>
  `;
}