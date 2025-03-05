/**
 * Main JavaScript for Ihsaan Yasin's personal website
 * Optimized for performance and accessibility
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize components
    initNavigation();
    updateCopyrightYear();
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