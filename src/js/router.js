import { renderBlogPosts } from './blog.js';
import { renderAboutPage } from '../pages/about.js';
import { renderCategoriesPage } from '../pages/categories.js';
import { renderPostDetail } from '../pages/post-detail.js';
import { getPostsByCategory, getPostsByTag } from './post-loader.js';
import { formatDate } from '../utils/helpers.js';

/**
 * Initialize the router
 */
export function initRouter() {
  handleRoute(window.location.pathname);
  
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && 
        link.getAttribute('href').startsWith('/') && 
        !link.getAttribute('href').startsWith('//')) {
      e.preventDefault();
      const path = link.getAttribute('href');
      window.history.pushState({}, '', path);
      handleRoute(path);
    }
  });
  
  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
  });
}

/**
 * Core routing function - handles all routes with simple pattern matching
 * @param {string} path - Current URL path
 */
function handleRoute(path) {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;
  
  updateActiveNavLink(path);
  
  if (path === '/' || path === '/index.html') {
    renderBlogPosts(1);
  }
  else if (path.startsWith('/page/')) {
    const pageNum = parseInt(path.split('/page/')[1], 10);
    renderBlogPosts(pageNum || 1);
  }
  else if (path === '/about') {
    renderAboutPage();
  }
  else if (path === '/categories') {
    renderCategoriesPage();
  }
  else if (path.startsWith('/post/')) {
    const slug = path.split('/post/')[1];
    renderPostDetail(slug);
  }
  else if (path.startsWith('/category/')) {
    const category = path.split('/category/')[1];
    renderCategoryContent(category, contentArea);
  }
  else if (path.startsWith('/tag/')) {
    const tag = path.split('/tag/')[1];
    renderTagContent(tag, contentArea);
  }
  else {
    contentArea.innerHTML = `
      <div class="not-found-page">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" class="btn">Back to Home</a>
      </div>
    `;
  }
}

/**
 * Render the content for a category
 * @param {string} category - Category slug
 * @param {HTMLElement} contentArea - Content area element
 */
function renderCategoryContent(category, contentArea) {
  contentArea.innerHTML = `
    <div class="category-heading">
      <h1>Category: ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}</h1>
      <p>Browsing all posts in ${category.replace(/-/g, ' ')}</p>
    </div>
    <div class="posts-container">
      <p>Loading posts...</p>
    </div>
  `;
  
  getPostsByCategory(category)
    .then(posts => {
      if (!document.contains(contentArea)) return;
      
      const postsContainer = contentArea.querySelector('.posts-container');
      if (!postsContainer) return;
      
      if (!posts || posts.length === 0) {
        postsContainer.innerHTML = `
          <div class="no-posts">
            <p>No posts found in this category.</p>
            <a href="/" class="btn">Back to Home</a>
          </div>
        `;
        return;
      }
      
      let postsHTML = '';
      posts.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(post => {
        const postDate = new Date(post.date);
        const formattedDate = formatDate(postDate);
        
        postsHTML += `
          <article class="post-card">
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
          </article>
        `;
      });
      
      postsContainer.innerHTML = postsHTML;
    })
    .catch(error => {
      console.error('Error loading category posts:', error);
      
      if (!document.contains(contentArea)) return;
      
      const postsContainer = contentArea.querySelector('.posts-container');
      if (postsContainer) {
        postsContainer.innerHTML = `
          <div class="error-message">
            <p>Error loading posts. Please try again later.</p>
            <a href="/" class="btn">Back to Home</a>
          </div>
        `;
      }
    });
}

/**
 * Render the content for a tag
 * @param {string} tag - Tag slug
 * @param {HTMLElement} contentArea - Content area element
 */
function renderTagContent(tag, contentArea) {
  contentArea.innerHTML = `
    <div class="tag-heading">
      <h1>Tag: ${tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}</h1>
      <p>Browsing all posts tagged with "${tag.replace(/-/g, ' ')}"</p>
    </div>
    <div class="posts-container">
      <p>Loading posts...</p>
    </div>
  `;
  
  getPostsByTag(tag)
    .then(posts => {
      if (!document.contains(contentArea)) return;
      
      const postsContainer = contentArea.querySelector('.posts-container');
      if (!postsContainer) return;
      
      if (!posts || posts.length === 0) {
        postsContainer.innerHTML = `
          <div class="no-posts">
            <p>No posts found with this tag.</p>
            <a href="/" class="btn">Back to Home</a>
          </div>
        `;
        return;
      }
      
      let postsHTML = '';
      posts.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(post => {
        const postDate = new Date(post.date);
        const formattedDate = formatDate(postDate);
        
        const categoryDisplay = Array.isArray(post.categories) 
          ? post.categories[0]
          : post.categories || 'Uncategorized';
        
        postsHTML += `
          <article class="post-card">
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
          </article>
        `;
      });
      
      postsContainer.innerHTML = postsHTML;
    })
    .catch(error => {
      console.error('Error loading tag posts:', error);
      
      if (!document.contains(contentArea)) return;
      
      const postsContainer = contentArea.querySelector('.posts-container');
      if (postsContainer) {
        postsContainer.innerHTML = `
          <div class="error-message">
            <p>Error loading posts. Please try again later.</p>
            <a href="/" class="btn">Back to Home</a>
          </div>
        `;
      }
    });
}

/**
 * Update the active state in the navigation menu
 * @param {string} path - Current path
 */
function updateActiveNavLink(path) {
  document.querySelectorAll('.menu a').forEach(link => {
    const linkHref = link.getAttribute('href');
    
    link.classList.remove('active');
    
    if (path === linkHref || 
        (linkHref !== '/' && path.startsWith(linkHref)) ||
        (linkHref === '/' && path === '/index.html')) {
      link.classList.add('active');
    }
  });
}