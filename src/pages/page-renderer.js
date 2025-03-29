/**
 * Renders content into a container and activates any functionality needed
 * @param {HTMLElement} container - Container element to render content into
 * @param {string} content - HTML content to render
 */
export function renderPage(container, content) {
  container.innerHTML = '';
  container.innerHTML = content;
  
  initPageElements(container);
}

/**
 * Initialize interactive elements within newly rendered page content
 * @param {HTMLElement} container - Container with the rendered content
 */
function initPageElements(container) {
  const galleries = container.querySelectorAll('.image-gallery');
  if (galleries.length > 0) {
    initImageGalleries(galleries);
  }
  
  const accordions = container.querySelectorAll('.accordion');
  if (accordions.length > 0) {
    initAccordions(accordions);
  }
}

/**
 * Initialize image galleries
 * @param {NodeList} galleries - Gallery elements to initialize
 */
function initImageGalleries(galleries) {
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-image');
    const mainImage = gallery.querySelector('.main-gallery-image');
    
    if (images.length > 0 && mainImage) {
      images.forEach(img => {
        img.addEventListener('click', () => {
          mainImage.src = img.dataset.fullSize || img.src;
          mainImage.alt = img.alt;
          
          images.forEach(i => i.classList.remove('active'));
          
          img.classList.add('active');
        });
      });
    }
  });
}

/**
 * Initialize accordion elements
 * @param {NodeList} accordions - Accordion elements to initialize
 */
function initAccordions(accordions) {
  accordions.forEach(accordion => {
    const headers = accordion.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        
        header.classList.toggle('active');
        
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
}
