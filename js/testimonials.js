// Testimonials module - testimonial carousel/slider

class TestimonialsSlider {
  constructor() {
    this.track = document.querySelector('.testimonials-track');
    this.container = document.querySelector('.testimonials-container');
    this.slides = document.querySelectorAll('.testimonial-slide');
    this.prevBtn = document.querySelector('.slider-btn.prev');
    this.nextBtn = document.querySelector('.slider-btn.next');
    this.dotsContainer = document.querySelector('.testimonials-dots');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000;
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    this.init();
  }
  
  init() {
    if (!this.track || !this.container || this.slides.length === 0) return;
    
    // Calculate slides per view based on viewport
    this.updateSlidesPerView();
    window.addEventListener('resize', () => this.updateSlidesPerView());
    
    // Create dots
    this.createDots();
    
    // Add event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    // Touch events
    this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());
    
    // Start autoplay
    this.startAutoplay();
    
    // Update initial state
    this.updateSlider();
  }
  
  updateSlidesPerView() {
    const width = window.innerWidth;
    
    if (width < 768) {
      this.slidesPerView = 1;
    } else if (width < 1024) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }
    
    this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
    this.updateSlider();
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    for (let i = 0; i <= this.maxIndex; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonials-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      
      if (i === this.currentIndex) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateSlider();
        this.resetAutoplay();
      });
      
      this.dotsContainer.appendChild(dot);
    }
  }
  
  updateSlider() {
    const translatePercentage = -(this.currentIndex * (100 / this.slidesPerView));
    this.track.style.transform = `translateX(${translatePercentage}%)`;
    
    // Update dots
    const dots = this.dotsContainer?.querySelectorAll('.testimonials-dot');
    if (dots) {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
    
    // Update button states
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.maxIndex;
      this.nextBtn.style.opacity = this.currentIndex === this.maxIndex ? '0.5' : '1';
    }
  }
  
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateSlider();
      this.resetAutoplay();
    } else {
      // Loop back to start
      this.currentIndex = 0;
      this.updateSlider();
      this.resetAutoplay();
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
      this.resetAutoplay();
    }
  }
  
  goToSlide(index) {
    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.updateSlider();
      this.resetAutoplay();
    }
  }
  
  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  }
  
  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }
  
  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }
  
  startAutoplay() {
    if (this.autoplayInterval) return;
    
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayDelay);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
  
  pause() {
    this.isPaused = true;
  }
  
  resume() {
    this.isPaused = false;
  }
  
  destroy() {
    this.stopAutoplay();
    
    if (this.prevBtn) {
      this.prevBtn.removeEventListener('click', () => this.next());
    }
    
    if (this.nextBtn) {
      this.nextBtn.removeEventListener('click', () => this.prev());
    }
    
    this.container.removeEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.container.removeEventListener('touchend', (e) => this.handleTouchEnd(e));
  }
}

// Initialize on DOM ready
let slider;

function init() {
  slider = new TestimonialsSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { TestimonialsSlider };
