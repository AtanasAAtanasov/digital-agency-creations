// Form module - contact form validation and submission

const contactForm = document.querySelector('#contact-form');

// Validation rules
const validators = {
  name: (value) => {
    if (value.trim().length < 2) {
      return { valid: false, message: 'Name must be at least 2 characters' };
    }
    return { valid: true };
  },
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true };
  },
  
  company: (value) => {
    if (value.trim().length < 2) {
      return { valid: false, message: 'Company name must be at least 2 characters' };
    }
    return { valid: true };
  },
  
  message: (value) => {
    if (value.trim().length < 20) {
      return { valid: false, message: 'Message must be at least 20 characters' };
    }
    return { valid: true };
  }
};

// Show error for a field
function showError(field, message) {
  const formGroup = field.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  
  formGroup.classList.add('error');
  
  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Clear error for a field
function clearError(field) {
  const formGroup = field.closest('.form-group');
  
  formGroup.classList.remove('error');
}

// Validate a single field
function validateField(field) {
  const fieldName = field.name;
  const validator = validators[fieldName];
  
  if (!validator) return { valid: true };
  
  const result = validator(field.value);
  
  if (!result.valid) {
    showError(field, result.message);
  } else {
    clearError(field);
  }
  
  return result;
}

// Validate all fields
function validateForm() {
  let isValid = true;
  const fields = contactForm.querySelectorAll('input, textarea, select');
  
  fields.forEach(field => {
    if (field.name && validators[field.name]) {
      const result = validateField(field);
      if (!result.valid) {
        isValid = false;
      }
    }
  });
  
  return isValid;
}

// Show toast notification
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  const title = type === 'success' ? 'Success!' : 'Error';
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;
  
  // Add to DOM
  document.body.appendChild(toast);
  
  // Close button functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('notification-slide-out');
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.add('notification-slide-out');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();
  
  if (!validateForm()) {
    showToast('Please fix the errors before submitting', 'error');
    return;
  }
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
  
  // Simulate form submission (replace with actual API call)
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success
    showToast('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Clear any remaining errors
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));
    
  } catch (error) {
    showToast('Something went wrong. Please try again later.', 'error');
    console.error('Form submission error:', error);
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

// Initialize
function init() {
  if (!contactForm) return;
  
  // Real-time validation on blur
  const fields = contactForm.querySelectorAll('input, textarea, select');
  
  fields.forEach(field => {
    if (field.name && validators[field.name]) {
      field.addEventListener('blur', () => {
        if (field.value) {
          validateField(field);
        }
      });
      
      field.addEventListener('input', () => {
        // Only clear error on input, don't validate yet
        const formGroup = field.closest('.form-group');
        if (formGroup.classList.contains('error')) {
          validateField(field);
        }
      });
    }
  });
  
  // Form submission
  contactForm.addEventListener('submit', handleSubmit);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { validateForm, showToast };
