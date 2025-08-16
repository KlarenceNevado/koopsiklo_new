//<!-- ========================================
//     JAVASCRIPT/TYPESCRIPT - INTERACTIVE FUNCTIONALITY
//     ======================================== -->

// ========================================
// MOBILE NAVIGATION FUNCTIONALITY
// ========================================
class MobileNavigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        const mobileLinks = this.mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.mobileMenu.classList.remove('hidden');
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
        this.isOpen = true;
    }
    
    closeMenu() {
        this.mobileMenu.classList.add('hidden');
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        this.isOpen = false;
    }
}

// ========================================
// PARTS CATEGORY INTERACTIONS
// ========================================
class PartsCategories {
    constructor() {
        this.categories = document.querySelectorAll('.parts-category');
        this.partCategorySelect = document.getElementById('part-category');
        
        this.init();
    }
    
    init() {
        this.categories.forEach(category => {
            category.addEventListener('click', () => {
                this.selectCategory(category);
            });
        });
    }
    
    selectCategory(categoryElement) {
        const categoryText = categoryElement.querySelector('h3').textContent.toLowerCase();
        
        // Map category names to select options
        const categoryMap = {
            'engine': 'engine',
            'brakes': 'brakes',
            'electrical': 'electrical',
            'suspension': 'suspension',
            'body': 'body',
            'accessories': 'accessories'
        };
        
        const selectValue = categoryMap[categoryText];
        if (selectValue) {
            this.partCategorySelect.value = selectValue;
            this.partCategorySelect.classList.add('form-valid');
        }
        
        // Scroll to form
        document.getElementById('parts-inquiry-form').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add visual feedback
        categoryElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            categoryElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                categoryElement.style.transform = '';
            }, 150);
        }, 150);
    }
}

// ========================================
// FORM VALIDATION AND SUBMISSION
// ========================================
class PartsInquiryForm {
    constructor() {
        this.form = document.getElementById('parts-inquiry-form');
        this.submitBtn = document.getElementById('submit-inquiry');
        this.requiredFields = this.form.querySelectorAll('[required]');
        
        this.init();
    }
    
    init() {
        // Real-time validation
        this.requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Phone number formatting
        const phoneField = document.getElementById('phone-number');
        phoneField.addEventListener('input', (e) => {
            this.formatPhoneNumber(e.target);
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            isValid = phoneRegex.test(value) && value.length >= 10;
        }
        
        // Apply validation styling
        if (isValid) {
            field.classList.remove('form-invalid');
            field.classList.add('form-valid');
        } else {
            field.classList.remove('form-valid');
            field.classList.add('form-invalid');
        }
        
        return isValid;
    }
    
    clearFieldError(field) {
        field.classList.remove('form-invalid');
    }
    
    formatPhoneNumber(field) {
        let value = field.value.replace(/\D/g, '');
        
        if (value.length >= 10) {
            // Format as: 0912-345-6789
            value = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        
        field.value = value;
    }
    
    validateForm() {
        let isValid = true;
        
        this.requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    handleSubmit() {
        if (!this.validateForm()) {
            this.showError('Please fill in all required fields correctly.');
            return;
        }
        
        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>SUBMITTING...';
        this.submitBtn.disabled = true;
        
        // Collect form data
        const formData = this.collectFormData();
        
        // Simulate submission
        setTimeout(() => {
            this.showSuccess(formData);
            this.resetForm();
        }, 2000);
    }
    
    collectFormData() {
        return {
            fullName: document.getElementById('full-name').value,
            phoneNumber: document.getElementById('phone-number').value,
            email: document.getElementById('email').value,
            motorcycleBrand: document.getElementById('motorcycle-brand').value,
            motorcycleModel: document.getElementById('motorcycle-model').value,
            motorcycleYear: document.getElementById('motorcycle-year').value,
            partCategory: document.getElementById('part-category').value,
            inquiryPriority: document.getElementById('inquiry-priority').value,
            partDetails: document.getElementById('part-details').value,
            additionalInfo: document.getElementById('additional-info').value,
            contactMethod: document.querySelector('input[name="contact-method"]:checked').value
        };
    }
    
    showSuccess(formData) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-koops-dark rounded-xl p-8 max-w-md mx-4 text-center">
                <div class="text-6xl text-koops-green mb-4">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4">Inquiry Submitted!</h3>
                <div class="text-gray-300 space-y-2 mb-6">
                    <p>Thank you, <strong>${formData.fullName}</strong>!</p>
                    <p>We've received your parts inquiry for your <strong>${formData.motorcycleBrand} ${formData.motorcycleModel}</strong>.</p>
                    <p class="text-sm">Our parts specialist will contact you via <strong>${formData.contactMethod}</strong> within 24 hours.</p>
                </div>
                <div class="bg-koops-gray rounded-lg p-4 mb-6">
                    <p class="text-sm text-gray-400">Reference ID: <span class="text-koops-green font-mono">#${Date.now().toString().slice(-6)}</span></p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="bg-koops-green text-koops-dark px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
                    CLOSE
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-20 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
        errorDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        
        // Reset button state
        this.submitBtn.classList.remove('loading');
        this.submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>SUBMIT INQUIRY';
        this.submitBtn.disabled = false;
        
        // Clear validation classes
        this.requiredFields.forEach(field => {
            field.classList.remove('form-valid', 'form-invalid');
        });
        
        // Reset radio button to email
        document.querySelector('input[name="contact-method"][value="email"]').checked = true;
    }
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MobileNavigation();
    new PartsCategories();
    new PartsInquiryForm();
    
    // Add intersection observer for animations
    const categories = document.querySelectorAll('.parts-category');
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    categories.forEach(category => {
        categoryObserver.observe(category);
    });
    
    console.log('KOOPSIKLO Parts page initialized successfully! 🔧');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
const Utils = {
    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return phone;
    },
    
    generateReferenceId() {
        return '#' + Date.now().toString().slice(-6);
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
