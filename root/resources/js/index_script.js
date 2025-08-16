//<!-- ========================================
//     JAVASCRIPT/TYPESCRIPT - INTERACTIVE FUNCTIONALITY
//    ======================================== -->

// ========================================
// HERO SLIDER FUNCTIONALITY
// ========================================
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.banner-slide');
        this.dots = document.querySelectorAll('.slider-dot');
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoSlide();
    }
    
    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
        
        // Pause auto-slide on hover
        const heroSection = document.querySelector('#hero-slider');
        heroSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
        heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(slideIndex) {
        // Hide current slide
        this.slides[this.currentSlide].style.opacity = '0';
        this.dots[this.currentSlide].classList.remove('bg-koops-green');
        this.dots[this.currentSlide].classList.add('bg-gray-500');
        
        // Show new slide
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].style.opacity = '1';
        this.dots[this.currentSlide].classList.remove('bg-gray-500');
        this.dots[this.currentSlide].classList.add('bg-koops-green');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
    
    resetAutoSlide() {
        this.pauseAutoSlide();
        this.startAutoSlide();
    }
}

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
        
        // Close menu when clicking on links
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
// SEARCH FILTER FUNCTIONALITY
// ========================================
class SearchFilter {
    constructor() {
        this.keywordInput = document.getElementById('keyword-search');
        this.typeFilter = document.getElementById('type-filter');
        this.brandFilter = document.getElementById('brand-filter');
        this.searchBtn = document.getElementById('search-btn');
        
        this.init();
    }
    
    init() {
        this.searchBtn.addEventListener('click', () => {
            this.performSearch();
        });
        
        // Search on Enter key
        this.keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        // Real-time filtering
        [this.keywordInput, this.typeFilter, this.brandFilter].forEach(element => {
            element.addEventListener('input', () => {
                this.debounceSearch();
            });
        });
    }
    
    performSearch() {
        const keyword = this.keywordInput.value.toLowerCase();
        const type = this.typeFilter.value;
        const brand = this.brandFilter.value;
        
        // Simulate search functionality
        console.log('Searching for:', { keyword, type, brand });
        
        // Show search feedback
        this.showSearchFeedback(keyword, type, brand);
        
        // In a real application, this would filter the motorcycle listings
        this.filterMotorcycles(keyword, type, brand);
    }
    
    showSearchFeedback(keyword, type, brand) {
        const searchTerms = [];
        if (keyword) searchTerms.push(`"${keyword}"`);
        if (type) searchTerms.push(type);
        if (brand) searchTerms.push(brand);
        
        if (searchTerms.length > 0) {
            // Create temporary feedback message
            const feedback = document.createElement('div');
            feedback.className = 'fixed top-20 right-4 bg-koops-green text-koops-dark px-4 py-2 rounded-lg shadow-lg z-50';
            feedback.textContent = `Searching for: ${searchTerms.join(', ')}`;
            document.body.appendChild(feedback);
            
            // Remove feedback after 3 seconds
            setTimeout(() => {
                feedback.remove();
            }, 3000);
        }
    }
    
    filterMotorcycles(keyword, type, brand) {
        // This would typically filter the motorcycle cards
        // For demo purposes, we'll just scroll to the motorcycles section
        document.getElementById('motorcycles').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
    
    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearch();
        }, 500);
    }
}

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================
class SmoothNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========================================
// MOTORCYCLE CARD INTERACTIONS
// ========================================
class MotorcycleCards {
    constructor() {
        this.init();
    }
    
    init() {
        const viewDetailsBtns = document.querySelectorAll('button:contains("VIEW DETAILS")');
        
        // Since :contains is not available in querySelector, we'll find buttons by text content
        const buttons = Array.from(document.querySelectorAll('button')).filter(btn => 
            btn.textContent.includes('VIEW DETAILS')
        );
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.bg-koops-gray');
                const motorcycleName = card.querySelector('h3').textContent;
                this.showMotorcycleDetails(motorcycleName);
            });
        });
    }
    
    showMotorcycleDetails(motorcycleName) {
        // Create modal or redirect to details page
        alert(`Viewing details for ${motorcycleName}. In a real application, this would open a detailed view or navigate to a product page.`);
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy loading for images (if we had real images)
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }
    
    setupLazyLoading() {
        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    preloadCriticalResources() {
        // Preload fonts and critical CSS
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        link.as = 'style';
        document.head.appendChild(link);
    }
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroSlider();
    new MobileNavigation();
    new SearchFilter();
    new SmoothNavigation();
    new MotorcycleCards();
    new PerformanceOptimizer();
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('KOOPSIKLO website initialized successfully! 🏍️');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

const Utils = {
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    },
    
    // Debounce function
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
    },
    
    // Smooth scroll to element
    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
