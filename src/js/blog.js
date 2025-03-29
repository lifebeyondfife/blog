import { formatDate } from '../utils/helpers.js';
import { loadPosts } from './post-loader.js';

// Configuration for pagination
const POSTS_PER_PAGE = 5;
let currentPage = 1;
let totalPages = 1;
let allPosts = [];

/**
 * Renders blog posts into the content area with pagination
 */
export async function renderBlogPosts(page = 1) {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;

  contentArea.innerHTML = '<div class="loading-posts">Loading posts...</div>';

  try {
    if (allPosts.length === 0) {
      allPosts = await loadPosts();
    }
    
    if (!allPosts || allPosts.length === 0) {
      contentArea.innerHTML = '<div class="no-posts">No posts found.</div>';
      return;
    }

    currentPage = page;
    totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsForPage = allPosts.slice(startIndex, endIndex);

    contentArea.innerHTML = '';

    const postsContainer = document.createElement('div');
    postsContainer.className = 'posts-container';

    postsForPage.forEach(post => {
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
            <span class="post-category"><i class="fas fa-folder"></i> <a href="/category/${categoryDisplay.toLowerCase().replace(/ /g, '-')}">${categoryDisplay}</a></span>
          </div>
          <h2 class="post-title"><a href="/post/${post.slug}">${post.title}</a></h2>
          <div class="post-excerpt">
            <p>${post.excerpt}</p>
          </div>
          <a href="/post/${post.slug}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `;

      postsContainer.appendChild(postEl);
    });

    contentArea.appendChild(postsContainer);

    if (totalPages > 1) {
      const paginationEl = createPaginationControls(currentPage, totalPages);
      contentArea.appendChild(paginationEl);
    }
  } catch (error) {
    console.error('Error rendering blog posts:', error);
    contentArea.innerHTML = '<div class="error-message">Error loading posts. Please try again later.</div>';
  }
}

/**
 * Creates pagination controls
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {HTMLElement} - Pagination element
 */
function createPaginationControls(currentPage, totalPages) {
  const paginationEl = document.createElement('div');
  paginationEl.className = 'pagination';
  
  const prevButton = document.createElement('a');
  prevButton.className = 'pagination-button prev-page';
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
  
  if (currentPage > 1) {
    prevButton.href = currentPage === 2 ? '/' : `/page/${currentPage - 1}`;
  } else {
    prevButton.classList.add('disabled');
    prevButton.setAttribute('aria-disabled', 'true');
    prevButton.style.pointerEvents = 'none';
  }
  
  const nextButton = document.createElement('a');
  nextButton.className = 'pagination-button next-page';
  nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
  
  if (currentPage < totalPages) {
    nextButton.href = `/page/${currentPage + 1}`;
  } else {
    nextButton.classList.add('disabled');
    nextButton.setAttribute('aria-disabled', 'true');
    nextButton.style.pointerEvents = 'none';
  }
  
  const pageNumbers = document.createElement('div');
  pageNumbers.className = 'page-numbers';
  
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  if (startPage > 1) {
    const firstPageBtn = document.createElement('a');
    firstPageBtn.className = 'page-number';
    firstPageBtn.textContent = '1';
    firstPageBtn.href = '/';
    pageNumbers.appendChild(firstPageBtn);
    
    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'ellipsis';
      ellipsis.textContent = '...';
      pageNumbers.appendChild(ellipsis);
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('a');
    pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    
    if (i === 1) {
      pageBtn.href = '/';
    } else {
      pageBtn.href = `/page/${i}`;
    }
    
    if (i === currentPage) {
      pageBtn.setAttribute('aria-current', 'page');
    }
    
    pageNumbers.appendChild(pageBtn);
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'ellipsis';
      ellipsis.textContent = '...';
      pageNumbers.appendChild(ellipsis);
    }
    
    const lastPageBtn = document.createElement('a');
    lastPageBtn.className = 'page-number';
    lastPageBtn.textContent = totalPages;
    lastPageBtn.href = `/page/${totalPages}`;
    pageNumbers.appendChild(lastPageBtn);
  }
  
  paginationEl.appendChild(prevButton);
  paginationEl.appendChild(pageNumbers);
  paginationEl.appendChild(nextButton);
  
  return paginationEl;
}

/**
 * Initialize the blog functionality
 */
export async function initBlog() {
  await renderBlogPosts(1);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}