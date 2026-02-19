// Animations module - handles scroll reveal animations

const revealElements = document.querySelectorAll('.reveal, .reveal-fade-left, .reveal-fade-right, .reveal-scale');

// Intersection Observer options
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.12
};

// Intersection Observer callback
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Optional: unobserve after revealing for better performance
      // observer.unobserve(entry.target);
    }
  });
};

// Create and initialize Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all reveal elements
function init() {
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential external use
export { observer, revealElements };
