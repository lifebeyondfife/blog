// Categories page component
import { renderPage } from './page-renderer.js';
import { getAllCategories, getAllTags } from '../js/post-loader.js';

/**
 * Render the categories page
 */
export async function renderCategoriesPage() {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;
  
  contentArea.innerHTML = '<div class="loading-categories">Loading categories...</div>';
  
  try {
    const categories = await getAllCategories();
    const tags = await getAllTags();
    
    const categoriesContent = `
      <div class="page categories-page">
        <header class="page-header">
          <h1 class="page-title">Categories</h1>
          <p class="page-description">Browse posts by topic</p>
        </header>
        
        <div class="categories-grid">
          ${categories.length > 0 ? categories.map(category => `
            <div class="category-card">
              <div class="category-content">
                <h2 class="category-title">${category.name}</h2>
                <p class="category-count">${category.count} ${category.count === 1 ? 'post' : 'posts'}</p>
                <p class="category-description">Browse all posts in the ${category.name} category</p>
                <a href="/category/${category.slug}" class="btn btn-outline">View Posts</a>
              </div>
            </div>
          `).join('') : '<p>No categories found.</p>'}
        </div>
        
        ${tags.length > 0 ? `
        <div class="categories-cloud">
          <h2>All Tags</h2>
          <div class="tags-cloud">
            ${tags.map(tag => `
              <a href="/tag/${tag.slug}" class="tag-cloud-item" style="font-size: ${Math.max(1 + (tag.count * 0.1), 0.8)}em;">${tag.name}</a>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    `;

    renderPage(contentArea, categoriesContent);
  } catch (error) {
    console.error('Error rendering categories page:', error);
    contentArea.innerHTML = `
      <div class="error-message">
        <h2>Error Loading Categories</h2>
        <p>There was a problem loading the categories. Please try again later.</p>
        <a href="/" class="btn">Back to Home</a>
      </div>
    `;
  }
}