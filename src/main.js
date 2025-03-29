import { initRouter } from './js/router.js';
import './styles/main.css';
import './styles/additional.css';
import './styles/markdown.css';
import './styles/pagination.css';

function initialize() {
  console.log('Life Beyond Fife Blog initializing...');
  initRouter();
  console.log('Blog initialized successfully');
}

document.addEventListener('DOMContentLoaded', initialize);

export { initialize };