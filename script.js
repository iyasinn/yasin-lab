/**
 * Main JavaScript for Ihsaan Yasin's personal website
 * Minimalist, academic-focused functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initNavigation();
  updateCopyrightYear();
  generateTableOfContents();
  setupCodeHighlighting();
  
  // Render dynamic components
  renderExperiences();
  renderProjects();
  renderPublications();
  renderPapers();
  renderBlogs();
  renderSocialLinks('social-links');
  renderSocialLinks('footer-social-links', true);
});

/**
 * Initialize navigation functionality
 * Handles scroll-based navigation and active link highlighting
 */
function initNavigation() {
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
        behavior: 'auto' // No smooth scrolling, just immediate jump for performance
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
}

/**
 * Generate Table of Contents for long-form content
 * Will look for articles with the 'toc-enabled' class
 * and generate TOC from h2 and h3 elements
 */
function generateTableOfContents() {
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
}

/**
 * Setup code highlighting and formatting
 * Adds line numbers to code blocks for better readability
 */
function setupCodeHighlighting() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  // This is a simple function to add line numbers and basic formatting
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
}

/**
 * Update copyright year in footer
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Throttle function to limit execution rate of frequently triggered events
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
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

/**
 * COMPONENT RENDERING FUNCTIONS
 * The following functions handle dynamic content rendering
 */

/**
 * Render experience items from the data source
 */
function renderExperiences() {
  const container = document.getElementById('work-experience');
  if (!container) return;
  
  const template = document.getElementById('experience-template');
  if (!template) return;
  
  experiences.forEach(exp => {
    const clone = document.importNode(template.content, true);
    
    const companyElement = clone.querySelector('.company-name');
    companyElement.textContent = exp.company;
    
    // Add logo if available
    if (exp.logo) {
      const logoSpan = document.createElement('span');
      logoSpan.className = 'company-logo';
      
      const logoImg = document.createElement('img');
      logoImg.src = exp.logo;
      logoImg.alt = exp.logoAlt || `${exp.company} Logo`;
      logoImg.className = 'company-logo-img';
      logoImg.loading = 'lazy'; // Add lazy loading for better performance
      
      logoSpan.appendChild(logoImg);
      companyElement.appendChild(logoSpan);
    }
    
    clone.querySelector('.position').textContent = exp.position;
    clone.querySelector('.experience-date').textContent = exp.date;
    clone.querySelector('.description').innerHTML = exp.description;
    
    container.appendChild(clone);
  });
}
// function renderExperiences() {
//   const container = document.getElementById('work-experience');
//   if (!container) return;

//   const template = document.getElementById('experience-template');
//   if (!template) return;

//   // Clear previous content (useful if re-rendering)
//   container.innerHTML = '';

//   // Use DocumentFragment for better performance
//   const fragment = document.createDocumentFragment();

//   if (!experiences || experiences.length === 0) {
//       const noExperienceMessage = document.createElement('p');
//       noExperienceMessage.textContent = "No work experience available.";
//       container.appendChild(noExperienceMessage);
//       return;
//   }

//   experiences.forEach(exp => {
//       const clone = document.importNode(template.content, true);

//       const companyElement = clone.querySelector('.company-name');
//       companyElement.textContent = exp.company;

//       // Add logo if available
//       if (exp.logo) {
//           const logoSpan = document.createElement('span');
//           logoSpan.className = 'company-logo';

//           const logoImg = document.createElement('img');
//           logoImg.src = exp.logo;
//           logoImg.alt = exp.logoAlt || `${exp.company} Logo`;
//           logoImg.className = 'company-logo-img';
//           logoImg.loading = 'lazy'; // Lazy load for better performance

//           logoSpan.appendChild(logoImg);
//           companyElement.appendChild(logoSpan);
//       }

//       clone.querySelector('.position').textContent = exp.position;
//       clone.querySelector('.experience-date').textContent = exp.date;

//       // Sanitize description before inserting (Prevent XSS)
//       const descriptionElement = clone.querySelector('.description');
//       descriptionElement.textContent = exp.description; // Prevents XSS

//       fragment.appendChild(clone);
//   });

//   container.appendChild(fragment); // Append all at once
// }


/**
 * Render projects from the data source
 */
function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;
  
  const template = document.getElementById('project-template');
  if (!template) return;
  
  projects.forEach(project => {
    const clone = document.importNode(template.content, true);
    
    const link = clone.querySelector('a');
    link.href = project.url;
    link.textContent = project.title;

    const description = clone.querySelector("p");
    description.textContent = project.description;
    
    container.appendChild(clone);
  });
}

/**
 * Render publications from the data source
 */
function renderPublications() {
  const container = document.getElementById('publications-list');
  if (!container) return;
  
  const template = document.getElementById('publication-template');
  if (!template) return;
  
  publications.forEach(pub => {
    const clone = document.importNode(template.content, true);
    
    const link = clone.querySelector('.publication-link');
    link.href = pub.url;
    link.textContent = pub.title;
    
    clone.querySelector('.publication-meta').textContent = pub.meta;
    
    container.appendChild(clone);
  });
}

/**
 * Render papers from the data source
 */
function renderPapers() {
  const container = document.getElementById('papers-list');
  if (!container) return;
  
  papers.forEach(paper => {
    const paperDiv = document.createElement('div');
    paperDiv.className = 'paper-item';
    
    const title = document.createElement('h4');
    title.textContent = paper.title;
    
    const meta = document.createElement('p');
    meta.className = 'paper-meta';
    meta.textContent = paper.meta;
    
    const desc = document.createElement('p');
    desc.textContent = paper.description;
    
    paperDiv.appendChild(title);
    paperDiv.appendChild(meta);
    paperDiv.appendChild(desc);
    
    container.appendChild(paperDiv);
  });
}

/**
 * Render blogs from the data source
 */
function renderBlogs() {
  const container = document.getElementById('blog-list');
  if (!container) return;
  
  blogs.forEach(blog => {
    const blogDiv = document.createElement('div');
    blogDiv.className = 'blog-item';
    
    const title = document.createElement('h4');
    title.textContent = blog.title;
    
    const meta = document.createElement('div');
    meta.className = 'blog-meta';
    meta.textContent = blog.meta;
    
    const desc = document.createElement('p');
    desc.textContent = blog.description;
    
    blogDiv.appendChild(title);
    blogDiv.appendChild(meta);
    blogDiv.appendChild(desc);
    
    container.appendChild(blogDiv);
  });
}

/**
 * Render social links in either full (icon+text) or text-only format
 * @param {string} containerId - ID of the container element
 * @param {boolean} textOnly - Whether to render text-only links (for footer)
 */
function renderSocialLinks(containerId, textOnly = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const template = textOnly ? null : document.getElementById('social-link-template');
  
  socialLinks.forEach(link => {
    if (textOnly) {
      // Simple text link for footer
      const a = document.createElement('a');
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = link.platform;
      container.appendChild(a);
    } else if (template) {
      // Icon link for main content
      const clone = document.importNode(template.content, true);
      
      const a = clone.querySelector('a');
      a.href = link.url;
      a.setAttribute('aria-label', link.platform);
      
      const icon = clone.querySelector('use');
      icon.setAttribute('xlink:href', link.icon);
      
      const text = clone.querySelector('.link-text');
      text.textContent = link.username;
      
      container.appendChild(clone);
    }
  });
} 