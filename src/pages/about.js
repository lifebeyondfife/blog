// About page component
import { renderPage } from './page-renderer.js';

export function renderAboutPage() {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) return;

  const aboutPageContent = `
    <article class="page about-page">
      <header class="page-header">
        <h1 class="page-title">About Life Beyond Fife</h1>
      </header>
      
      <div class="page-content">
        <div class="author-profile">
          <img src="/images/me.jpg" alt="Author" class="author-image">
          <div class="author-details">
            <h2>iain</h2>
            <span class="author-bio">has been an Engineering Director, Data Scientist, Software Engineer, AI Researcher, and PhD Student</span>
          </div>
        </div>

        <h3>Notable series, posts, and repos</h3>
        <ul>
          <li><a href="/post/what-are-your-engineering-culture-values">Engineering Culture values</a></li>
          <li><a href="https://shows.acast.com/engineering-culture">Engineering Culture podcast</a></li>
          <li><a href="https://github.com/lifebeyondfife/Decider">Open Source .Net Constraint Solver (150+ stars)</a></li>
          <li><a href="/category/compsci">Computing from scratch</a></li>
          <li><a href="/category/fitness">Fitness</a>. Available on <a href="https://www.amazon.co.uk/Route-Fitness-Before-Setting-Foot-ebook/dp/B08RY8CJQ1">Kindle</a>.</li>
          <li><a href="/category/git">Simple introduction to git</a></li>
        </ul>
        
        <br />

        <h3>What You'll Find Here</h3>
        <div class="category-boxes">
          <div class="category-box">
            <i class="fas fa-atlas"></i>
            <h4>Engineering Culture</h4>
            <p>Essays, advice, and thoughts about modern engineering organisations</p>
          </div>
          
          <div class="category-box">
            <i class="fas fa-map-signs"></i>
            <h4>Technology</h4>
            <p>Theory and practice of over a decade of side projects, many available in GitHub</p>
          </div>
          
          <div class="category-box">
            <i class="fas fa-dumbbell"></i>
            <h4>Random Stuff</h4>
            <p>e.g. a series on fitness, specifically powerlifting, which became a Kindle book</p>
          </div>
        </div>
      </div>
    </article>
  `;

  renderPage(contentArea, aboutPageContent);
}