// Navigation module - handles sticky nav, mobile menu, and active states

const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMobile = document.querySelector('.navbar-mobile');
const navbarOverlay = document.querySelector('.navbar-overlay');
const navbarClose = document.querySelector('.navbar-close');
const navbarLinks = document.querySelectorAll('.navbar-link, .navbar-mobile-link');

// Sticky navigation
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}

// Mobile menu toggle
function toggleMobileMenu() {
  const isOpen = navbarMobile.classList.contains('active');
  
  navbarMobile.classList.toggle('active');
  navbarToggle.classList.toggle('active');
  navbarOverlay.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';
  
  // Update ARIA attributes
  navbarToggle.setAttribute('aria-expanded', !isOpen);
}

function closeMobileMenu() {
  navbarMobile.classList.remove('active');
  navbarToggle.classList.remove('active');
  navbarOverlay.classList.remove('active');
  document.body.style.overflow = '';
  navbarToggle.setAttribute('aria-expanded', 'false');
}

// Smooth scroll to anchor links
function smoothScroll(e) {
  const href = e.currentTarget.getAttribute('href');
  
  if (href && href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      closeMobileMenu();
    }
  }
}

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  const navbarHeight = navbar.offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navbarLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  });
}

// Keyboard navigation for mobile menu
function handleKeydown(e) {
  if (e.key === 'Escape' && navbarMobile.classList.contains('active')) {
    closeMobileMenu();
  }
}

// Initialize
function init() {
  // Scroll event for sticky nav and active link
  window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveLink();
  }, { passive: true });
  
  // Initial check
  handleScroll();
  updateActiveLink();
  
  // Mobile menu toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', toggleMobileMenu);
    navbarToggle.setAttribute('aria-expanded', 'false');
  }
  
  // Close button
  if (navbarClose) {
    navbarClose.addEventListener('click', closeMobileMenu);
  }
  
  // Overlay click
  if (navbarOverlay) {
    navbarOverlay.addEventListener('click', closeMobileMenu);
  }
  
  // Nav link clicks
  navbarLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { toggleMobileMenu, closeMobileMenu };
