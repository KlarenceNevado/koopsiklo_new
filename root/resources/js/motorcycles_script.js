//<!-- ========================================
//     JAVASCRIPT/TYPESCRIPT - INTERACTIVE FUNCTIONALITY
//    ======================================== -->

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
// ADVANCED SEARCH AND FILTER FUNCTIONALITY
// ========================================
class AdvancedSearchFilter {
    constructor() {
        this.keywordInput = document.getElementById('keyword-search');
        this.typeFilter = document.getElementById('type-filter');
        this.brandFilter = document.getElementById('brand-filter');
        this.priceFilter = document.getElementById('price-filter');
        this.sortFilter = document.getElementById('sort-filter');
        this.searchBtn = document.getElementById('search-btn');
        this.activeFiltersContainer = document.getElementById('active-filters');
        this.motorcycleCards = document.querySelectorAll('.motorcycle-card');
        
        this.activeFilters = {};
        
        this.init();
    }
    
    init() {
        this.searchBtn.addEventListener('click', () => {
            this.performSearch();
        });
        
        this.keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        [this.typeFilter, this.brandFilter, this.priceFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                this.performSearch();
            });
        });
        
        this.sortFilter.addEventListener('change', () => {
            this.sortMotorcycles();
        });
        
        // Real-time search
        this.keywordInput.addEventListener('input', () => {
            this.debounceSearch();
        });
    }
    
    performSearch() {
        const keyword = this.keywordInput.value.toLowerCase();
        const type = this.typeFilter.value;
        const brand = this.brandFilter.value;
        const priceRange = this.priceFilter.value;
        
        this.updateActiveFilters({ keyword, type, brand, priceRange });
        this.filterMotorcycles({ keyword, type, brand, priceRange });
    }
    
    updateActiveFilters(filters) {
        this.activeFilters = {};
        this.activeFiltersContainer.innerHTML = '';
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                this.activeFilters[key] = value;
                this.createFilterTag(key, value);
            }
        });
    }
    
    createFilterTag(key, value) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag bg-koops-green text-koops-dark px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2';
        
        let displayValue = value;
        if (key === 'priceRange') {
            displayValue = this.formatPriceRange(value);
        }
        
        tag.innerHTML = `
            <span>${key}: ${displayValue}</span>
            <button class="hover:text-red-600" onclick="this.parentElement.remove(); searchFilter.removeFilter('${key}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        this.activeFiltersContainer.appendChild(tag);
    }
    
    formatPriceRange(range) {
        const ranges = {
            '0-100000': 'Under ₱100k',
            '100000-200000': '₱100k - ₱200k',
            '200000-300000': '₱200k - ₱300k',
            '300000+': 'Above ₱300k'
        };
        return ranges[range] || range;
    }
    
    removeFilter(key) {
        delete this.activeFilters[key];
        
        // Reset the corresponding input
        switch(key) {
            case 'keyword':
                this.keywordInput.value = '';
                break;
            case 'type':
                this.typeFilter.value = '';
                break;
            case 'brand':
                this.brandFilter.value = '';
                break;
            case 'priceRange':
                this.priceFilter.value = '';
                break;
        }
        
        this.performSearch();
    }
    
    filterMotorcycles(filters) {
        let visibleCount = 0;
        
        this.motorcycleCards.forEach(card => {
            const cardData = {
                name: card.dataset.name.toLowerCase(),
                category: card.dataset.category,
                brand: card.dataset.brand,
                price: parseInt(card.dataset.price)
            };
            
            let isVisible = true;
            
            // Keyword filter
            if (filters.keyword && !cardData.name.includes(filters.keyword)) {
                isVisible = false;
            }
            
            // Type filter
            if (filters.type && cardData.category !== filters.type) {
                isVisible = false;
            }
            
            // Brand filter
            if (filters.brand && cardData.brand !== filters.brand) {
                isVisible = false;
            }
            
            // Price filter
            if (filters.priceRange) {
                const [min, max] = this.parsePriceRange(filters.priceRange);
                if (cardData.price < min || (max && cardData.price > max)) {
                    isVisible = false;
                }
            }
            
            // Show/hide card with animation
            if (isVisible) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });
        
        this.showSearchResults(visibleCount);
    }
    
    parsePriceRange(range) {
        switch(range) {
            case '0-100000': return [0, 100000];
            case '100000-200000': return [100000, 200000];
            case '200000-300000': return [200000, 300000];
            case '300000+': return [300000, null];
            default: return [0, null];
        }
    }
    
    showSearchResults(count) {
        // Create or update results message
        let resultsMsg = document.getElementById('search-results');
        if (!resultsMsg) {
            resultsMsg = document.createElement('div');
            resultsMsg.id = 'search-results';
            resultsMsg.className = 'text-center text-gray-300 mb-8';
            document.getElementById('motorcycles-container').parentNode.insertBefore(resultsMsg, document.getElementById('motorcycles-container'));
        }
        
        resultsMsg.textContent = `Showing ${count} motorcycle${count !== 1 ? 's' : ''}`;
    }
    
    sortMotorcycles() {
        const sortBy = this.sortFilter.value;
        const container = document.getElementById('motorcycles-container');
        const cards = Array.from(this.motorcycleCards);
        
        cards.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'price-low':
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                case 'price-high':
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                case 'newest':
                    // For demo, we'll use a random sort
                    return Math.random() - 0.5;
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        cards.forEach(card => container.appendChild(card));
    }
    
    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearch();
        }, 300);
    }
}

// ========================================
// CATEGORY TABS FUNCTIONALITY
// ========================================
class CategoryTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.category-tab');
        this.motorcycleCards = document.querySelectorAll('.motorcycle-card');
        
        this.init();
    }
    
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchCategory(tab);
            });
        });
    }
    
    switchCategory(activeTab) {
        const category = activeTab.dataset.category;
        
        // Update tab appearance
        this.tabs.forEach(tab => {
            tab.classList.remove('active', 'bg-koops-green', 'text-koops-dark');
            tab.classList.add('bg-koops-gray', 'text-white');
        });
        
        activeTab.classList.add('active', 'bg-koops-green', 'text-koops-dark');
        activeTab.classList.remove('bg-koops-gray', 'text-white');
        
        // Filter motorcycles
        this.filterByCategory(category);
    }
    
    filterByCategory(category) {
        this.motorcycleCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });
    }
}

// ========================================
// VIEW TOGGLE FUNCTIONALITY
// ========================================
class ViewToggle {
    constructor() {
        this.gridViewBtn = document.getElementById('grid-view');
        this.listViewBtn = document.getElementById('list-view');
        this.container = document.getElementById('motorcycles-container');
        
        this.init();
    }
    
    init() {
        this.gridViewBtn.addEventListener('click', () => {
            this.switchToGridView();
        });
        
        this.listViewBtn.addEventListener('click', () => {
            this.switchToListView();
        });
    }
    
    switchToGridView() {
        this.container.classList.remove('list-view');
        this.container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
        
        this.gridViewBtn.classList.add('bg-koops-green', 'text-koops-dark');
        this.gridViewBtn.classList.remove('bg-koops-gray', 'text-white');
        
        this.listViewBtn.classList.remove('bg-koops-green', 'text-koops-dark');
        this.listViewBtn.classList.add('bg-koops-gray', 'text-white');
    }
    
    switchToListView() {
        this.container.classList.add('list-view');
        this.container.className = 'list-view space-y-6';
        
        this.listViewBtn.classList.add('bg-koops-green', 'text-koops-dark');
        this.listViewBtn.classList.remove('bg-koops-gray', 'text-white');
        
        this.gridViewBtn.classList.remove('bg-koops-green', 'text-koops-dark');
        this.gridViewBtn.classList.add('bg-koops-gray', 'text-white');
    }
}

// ========================================
// MOTORCYCLE CARD INTERACTIONS
// ========================================
class MotorcycleInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        // Heart/Wishlist functionality
        const heartButtons = document.querySelectorAll('.fa-heart');
        heartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleWishlist(btn);
            });
        });
        
        // View Details buttons
        const viewDetailsBtns = Array.from(document.querySelectorAll('button')).filter(btn => 
            btn.textContent.includes('VIEW DETAILS')
        );
        
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.motorcycle-card');
                const motorcycleName = card.dataset.name;
                this.showMotorcycleDetails(motorcycleName);
            });
        });
        
        // Calculator buttons
        const calculatorBtns = document.querySelectorAll('.fa-calculator');
        calculatorBtns.forEach(btn => {
            btn.closest('button').addEventListener('click', (e) => {
                const card = e.target.closest('.motorcycle-card');
                const price = card.dataset.price;
                this.showFinanceCalculator(price);
            });
        });
    }
    
    toggleWishlist(heartBtn) {
        if (heartBtn.classList.contains('far')) {
            heartBtn.classList.remove('far');
            heartBtn.classList.add('fas', 'heart-liked');
        } else {
            heartBtn.classList.remove('fas', 'heart-liked');
            heartBtn.classList.add('far');
        }
    }
    
    showMotorcycleDetails(motorcycleName) {
        alert(`Viewing details for ${motorcycleName}. In a real application, this would open a detailed product page with specifications, gallery, and purchase options.`);
    }
    
    showFinanceCalculator(price) {
        const formattedPrice = new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(price);
        
        alert(`Finance Calculator for ${formattedPrice}. In a real application, this would open a loan calculator with different payment terms and interest rates.`);
    }
}

// ========================================
// LOAD MORE FUNCTIONALITY
// ========================================
class LoadMore {
    constructor() {
        this.loadMoreBtn = document.getElementById('load-more');
        this.loadCount = 0;
        
        this.init();
    }
    
    init() {
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreMotorcycles();
        });
    }
    
    loadMoreMotorcycles() {
        this.loadCount++;
        
        // Simulate loading
        this.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>LOADING...';
        this.loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            // In a real application, this would fetch more motorcycles from an API
            this.loadMoreBtn.innerHTML = 'LOAD MORE MOTORCYCLES';
            this.loadMoreBtn.disabled = false;
            
            // Show feedback
            const feedback = document.createElement('div');
            feedback.className = 'fixed top-20 right-4 bg-koops-green text-koops-dark px-4 py-2 rounded-lg shadow-lg z-50';
            feedback.textContent = `Loaded batch ${this.loadCount}. In a real app, more motorcycles would appear here.`;
            document.body.appendChild(feedback);
            
            setTimeout(() => feedback.remove(), 3000);
            
            // Hide button after 3 loads (demo purposes)
            if (this.loadCount >= 3) {
                this.loadMoreBtn.style.display = 'none';
                const endMessage = document.createElement('p');
                endMessage.className = 'text-center text-gray-400 mt-8';
                endMessage.textContent = 'You\'ve seen all available motorcycles!';
                this.loadMoreBtn.parentNode.appendChild(endMessage);
            }
        }, 1500);
    }
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MobileNavigation();
    const searchFilter = new AdvancedSearchFilter();
    new CategoryTabs();
    new ViewToggle();
    new MotorcycleInteractions();
    new LoadMore();
    
    // Make searchFilter globally accessible for filter tag removal
    window.searchFilter = searchFilter;
    
    // Add intersection observer for animations
    const cards = document.querySelectorAll('.motorcycle-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    console.log('KOOPSIKLO Motorcycles page initialized successfully! 🏍️');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
const Utils = {
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
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
