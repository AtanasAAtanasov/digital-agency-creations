// Counter module - animated stat counters

const statNumbers = document.querySelectorAll('.stat-number');

// Easing function for smooth counter animation
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// Animate a single counter
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  
  let frame = 0;
  
  const counter = setInterval(() => {
    frame++;
    
    const progress = frame / totalFrames;
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(easedProgress * target);
    
    element.textContent = current.toLocaleString() + suffix;
    
    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = target.toLocaleString() + suffix;
    }
  }, frameDuration);
  
  return counter;
}

// Intersection Observer for triggering animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Only animate if not already animated
      if (!element.classList.contains('counted')) {
        element.classList.add('counted');
        animateCounter(element);
      }
      
      // Unobserve after animating
      observer.unobserve(element);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Initialize
function init() {
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { animateCounter };
