/**
 * Main JavaScript for Ihsaan Yasin's personal website
 * Minimalist, academic-focused functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize components
    initNavigation();
    updateCopyrightYear();
    generateTableOfContents();
    setupCodeHighlighting();
  } catch (error) {
    console.error('Error initializing website:', error);
  }
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  try {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        // Add active class to current nav item
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll to the section with offset for header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto' // No smooth scrolling, just immediate jump
        });
      });
    });
    
    // Highlight current section based on scroll position
    window.addEventListener('scroll', throttle(() => {
      let currentSectionId = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (window.pageYOffset >= sectionTop - headerHeight - 50) {
          currentSectionId = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, 100));
  } catch (error) {
    console.error('Error initializing navigation:', error);
  }
}

/**
 * Generate Table of Contents for long-form content
 * Will look for articles with the 'toc-enabled' class
 * and generate TOC from h2 and h3 elements
 */
function generateTableOfContents() {
  try {
    const tocEnabledArticles = document.querySelectorAll('.toc-enabled');
    
    tocEnabledArticles.forEach(article => {
      // Find the TOC container
      const tocContainer = article.querySelector('.toc-container');
      if (!tocContainer) return;
      
      // Get all headings to include in TOC
      const headings = article.querySelectorAll('h2, h3');
      
      if (headings.length < 3) {
        // Don't show TOC for articles with few headings
        tocContainer.style.display = 'none';
        return;
      }
      
      const tocList = document.createElement('ul');
      tocList.className = 'toc-list';
      
      // Create TOC entries
      headings.forEach((heading, index) => {
        // Set ID if not present
        if (!heading.id) {
          heading.id = `section-${index}`;
        }
        
        const listItem = document.createElement('li');
        listItem.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          heading.scrollIntoView({behavior: 'auto'});
        });
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
      
      tocContainer.innerHTML = '<h4>Table of Contents</h4>';
      tocContainer.appendChild(tocList);
    });
  } catch (error) {
    console.error('Error generating table of contents:', error);
  }
}

/**
 * Setup code highlighting and formatting
 * This is a placeholder for syntax highlighting
 * You can integrate a lightweight library like PrismJS here
 */
function setupCodeHighlighting() {
  try {
    const codeBlocks = document.querySelectorAll('pre code');
    
    // This is a simple function to add line numbers and basic formatting
    // Replace with PrismJS or highlight.js for full syntax highlighting
    codeBlocks.forEach(codeBlock => {
      // Add line numbers
      const lines = codeBlock.textContent.split('\n');
      const lineNumbers = document.createElement('div');
      lineNumbers.className = 'line-numbers';
      
      lines.forEach((_, index) => {
        const lineNumber = document.createElement('span');
        lineNumber.className = 'line-number';
        lineNumber.textContent = index + 1;
        lineNumbers.appendChild(lineNumber);
      });
      
      const codeParent = codeBlock.parentNode;
      codeParent.classList.add('code-container');
      codeParent.insertBefore(lineNumbers, codeBlock);
    });
  } catch (error) {
    console.error('Error setting up code highlighting:', error);
  }
}

/**
 * Update copyright year in footer
 */
function updateCopyrightYear() {
  try {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error('Error updating copyright year:', error);
  }
}

/**
 * Throttle function to limit execution rate
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
} 