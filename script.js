/**
 * Main JavaScript for Ihsaan Yasin's personal website
 * Optimized for performance and accessibility
 */

// Feature detection for required APIs
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;

// Performance monitoring
const perfMetrics = {
  startTime: performance.now(),
  domContentLoaded: 0,
  firstInteraction: 0
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Record DOMContentLoaded time
    perfMetrics.domContentLoaded = performance.now() - perfMetrics.startTime;
    console.log(`DOM loaded in ${perfMetrics.domContentLoaded.toFixed(2)}ms`);
    
    // Initialize components
    initSmoothScrolling();
    initNavigationHighlighting();
    updateCopyrightYear();
    
    // Record first interaction
    document.addEventListener('click', () => {
      if (!perfMetrics.firstInteraction) {
        perfMetrics.firstInteraction = performance.now() - perfMetrics.startTime;
        console.log(`First interaction at ${perfMetrics.firstInteraction.toFixed(2)}ms`);
      }
    }, { once: true });
  } catch (error) {
    console.error('Error initializing website:', error);
  }
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  try {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        
        if (target) {
          // Use native scroll behavior if supported, fallback if not
          if (supportsScrollBehavior) {
            window.scrollTo({
              top: target.offsetTop - 80, // Offset for header
              behavior: 'smooth'
            });
          } else {
            // Fallback for browsers that don't support smooth scrolling
            window.scrollTo(0, target.offsetTop - 80);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error initializing smooth scrolling:', error);
  }
}

/**
 * Initialize navigation highlighting based on scroll position
 */
function initNavigationHighlighting() {
  try {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!sections.length || !navLinks.length) return;
    
    if (supportsIntersectionObserver) {
      // Use Intersection Observer for better performance
      const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -20% 0px',
        threshold: 0
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      }, observerOptions);
      
      sections.forEach(section => {
        observer.observe(section);
      });
    } else {
      // Fallback to scroll event with throttling for older browsers
      window.addEventListener('scroll', throttle(() => {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
      }, 100));
    }
  } catch (error) {
    console.error('Error initializing navigation highlighting:', error);
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

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Optimized scroll-based animations using requestAnimationFrame
const animateOnScroll = () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize sections
document.addEventListener('DOMContentLoaded', function() {
    // Show hero section immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }

    // Initialize other sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        section.style.willChange = 'transform, opacity';
    });

    // Trigger initial animation for sections in view
    animateOnScroll();
});

// Throttled scroll event listener
window.addEventListener('scroll', throttle(() => {
    requestAnimationFrame(animateOnScroll);
}, 100)); 