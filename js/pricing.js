// Pricing module - handles monthly/annual billing toggle

const billingToggle = document.querySelector('.billing-toggle');
const monthlyLabel = billingToggle?.querySelector('[data-period="monthly"]');
const annualLabel = billingToggle?.querySelector('[data-period="annual"]');
const saveBadge = document.querySelector('.billing-save');
const priceElements = document.querySelectorAll('.pricing-amount');
const periodElements = document.querySelectorAll('.pricing-period');

let isAnnual = false;

// Update prices based on billing period
function updatePrices() {
  priceElements.forEach(priceEl => {
    const monthlyPrice = priceEl.getAttribute('data-monthly');
    const annualPrice = priceEl.getAttribute('data-annual');
    
    if (isAnnual && annualPrice) {
      priceEl.textContent = annualPrice;
      priceEl.classList.add('price-update');
      
      // Remove animation class after it completes
      setTimeout(() => {
        priceEl.classList.remove('price-update');
      }, 300);
    } else if (monthlyPrice) {
      priceEl.textContent = monthlyPrice;
      priceEl.classList.add('price-update');
      
      setTimeout(() => {
        priceEl.classList.remove('price-update');
      }, 300);
    }
  });
  
  // Update period labels
  periodElements.forEach(periodEl => {
    if (isAnnual) {
      periodEl.textContent = '/mo (billed annually)';
    } else {
      periodEl.textContent = '/mo';
    }
  });
  
  // Toggle save badge visibility
  if (saveBadge) {
    saveBadge.style.opacity = isAnnual ? '1' : '0';
    saveBadge.style.transition = 'opacity 0.3s';
  }
}

// Set billing period
function setBillingPeriod(period) {
  isAnnual = period === 'annual';
  
  if (monthlyLabel) {
    monthlyLabel.classList.toggle('active', !isAnnual);
  }
  
  if (annualLabel) {
    annualLabel.classList.toggle('active', isAnnual);
  }
  
  updatePrices();
}

// Initialize
function init() {
  if (!billingToggle) return;
  
  // Monthly label click
  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => {
      setBillingPeriod('monthly');
    });
  }
  
  // Annual label click
  if (annualLabel) {
    annualLabel.addEventListener('click', () => {
      setBillingPeriod('annual');
    });
  }
  
  // Initialize with monthly pricing
  setBillingPeriod('monthly');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { setBillingPeriod, isAnnual };
