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
// QUICK BOOKING FUNCTIONALITY
// ========================================
class QuickBooking {
    constructor() {
        this.serviceType = document.getElementById('service-type');
        this.motorcycleModel = document.getElementById('motorcycle-model');
        this.preferredDate = document.getElementById('preferred-date');
        this.timeSlot = document.getElementById('time-slot');
        this.bookServiceBtn = document.getElementById('book-service-btn');
        
        this.init();
    }
    
    init() {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        this.preferredDate.min = today;
        
        this.bookServiceBtn.addEventListener('click', () => {
            this.processBooking();
        });
        
        // Real-time validation
        [this.serviceType, this.motorcycleModel, this.preferredDate, this.timeSlot].forEach(field => {
            field.addEventListener('change', () => {
                this.validateForm();
            });
        });
    }
    
    validateForm() {
        const isValid = this.serviceType.value && 
                       this.motorcycleModel.value && 
                       this.preferredDate.value && 
                       this.timeSlot.value;
        
        if (isValid) {
            this.bookServiceBtn.classList.remove('opacity-50');
            this.bookServiceBtn.disabled = false;
            this.bookServiceBtn.classList.add('pulse-animation');
        } else {
            this.bookServiceBtn.classList.add('opacity-50');
            this.bookServiceBtn.disabled = true;
            this.bookServiceBtn.classList.remove('pulse-animation');
        }
    }
    
    processBooking() {
        const bookingData = {
            serviceType: this.serviceType.value,
            motorcycleModel: this.motorcycleModel.value,
            preferredDate: this.preferredDate.value,
            timeSlot: this.timeSlot.value
        };
        
        // Show loading state
        this.bookServiceBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>BOOKING...';
        this.bookServiceBtn.disabled = true;
        
        // Simulate booking process
        setTimeout(() => {
            this.showBookingConfirmation(bookingData);
            this.resetForm();
        }, 2000);
    }
    
    showBookingConfirmation(data) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-koops-dark rounded-xl p-8 max-w-md mx-4 text-center">
                <div class="text-6xl text-koops-green mb-4">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4">Booking Confirmed!</h3>
                <div class="text-gray-300 space-y-2 mb-6">
                    <p><strong>Service:</strong> ${data.serviceType}</p>
                    <p><strong>Motorcycle:</strong> ${data.motorcycleModel}</p>
                    <p><strong>Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${data.timeSlot}</p>
                </div>
                <p class="text-sm text-gray-400 mb-6">
                    We'll send you a confirmation email with all the details.
                </p>
                <button onclick="this.closest('.fixed').remove()" class="bg-koops-green text-koops-dark px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
                    CLOSE
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    resetForm() {
        this.serviceType.value = '';
        this.motorcycleModel.value = '';
        this.preferredDate.value = '';
        this.timeSlot.value = '';
        this.bookServiceBtn.innerHTML = '<i class="fas fa-calendar-plus mr-2"></i>BOOK NOW';
        this.bookServiceBtn.disabled = false;
        this.validateForm();
    }
}

// ========================================
// SERVICE CATEGORY INTERACTIONS
// ========================================
class ServiceCategories {
    constructor() {
        this.categories = document.querySelectorAll('.service-category');
        
        this.init();
    }
    
    init() {
        this.categories.forEach(category => {
            category.addEventListener('click', () => {
                const categoryType = category.dataset.category;
                this.showCategoryDetails(categoryType);
            });
        });
    }
    
    showCategoryDetails(categoryType) {
        // Scroll to detailed services section
        document.getElementById('detailed-services').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Filter services by category
        setTimeout(() => {
            const serviceTab = document.querySelector(`[data-service="${categoryType}"]`);
            if (serviceTab) {
                serviceTab.click();
            }
        }, 500);
    }
}

// ========================================
// SERVICE TABS FUNCTIONALITY
// ========================================
class ServiceTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.service-tab');
        this.serviceCards = document.querySelectorAll('.service-card');
        
        this.init();
    }
    
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab);
            });
        });
    }
    
    switchTab(activeTab) {
        const service = activeTab.dataset.service;
        
        // Update tab appearance
        this.tabs.forEach(tab => {
            tab.classList.remove('active', 'bg-koops-green', 'text-koops-dark');
            tab.classList.add('bg-koops-dark', 'text-white');
        });
        
        activeTab.classList.add('active', 'bg-koops-green', 'text-koops-dark');
        activeTab.classList.remove('bg-koops-dark', 'text-white');
        
        // Filter service cards
        this.filterServices(service);
    }
    
    filterServices(service) {
        let visibleCount = 0;
        
        this.serviceCards.forEach(card => {
            if (service === 'all' || card.dataset.service === service) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });
        
        this.updateServiceCount(visibleCount);
    }
    
    updateServiceCount(count) {
        let countMsg = document.getElementById('service-count');
        if (!countMsg) {
            countMsg = document.createElement('div');
            countMsg.id = 'service-count';
            countMsg.className = 'text-center text-gray-300 mb-8';
            document.getElementById('services-grid').parentNode.insertBefore(countMsg, document.getElementById('services-grid'));
        }
        
        countMsg.textContent = `Showing ${count} service${count !== 1 ? 's' : ''}`;
    }
}

// ========================================
// SERVICE BOOKING FUNCTIONALITY
// ========================================
class ServiceBooking {
    constructor() {
        this.init();
    }
    
    init() {
        // Individual service booking buttons
        const bookButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
            btn.textContent.includes('BOOK SERVICE')
        );
        
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.service-card');
                if (card) {
                    const serviceName = card.querySelector('h3').textContent;
                    const servicePrice = card.dataset.price;
                    this.showServiceBookingModal(serviceName, servicePrice);
                }
            });
        });
        
        // Package booking buttons
        const packageButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
            btn.textContent.includes('CHOOSE PACKAGE')
        );
        
        packageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const packageCard = e.target.closest('div');
                const packageName = packageCard.querySelector('h3').textContent;
                const packagePrice = packageCard.querySelector('.text-3xl').textContent;
                this.showPackageBookingModal(packageName, packagePrice);
            });
        });
    }
    
    showServiceBookingModal(serviceName, price) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-koops-dark rounded-xl p-8 max-w-md mx-4">
                <h3 class="text-2xl font-bold text-white mb-4">Book ${serviceName}</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                        <input type="text" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <input type="tel" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Motorcycle Model</label>
                        <input type="text" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                        <input type="date" min="${new Date().toISOString().split('T')[0]}" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    <div class="bg-koops-gray rounded-lg p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-white">Service Cost:</span>
                            <span class="text-koops-green font-bold">₱${parseInt(price).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-4 mt-6">
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-koops-gray text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors">
                        CANCEL
                    </button>
                    <button onclick="alert('Booking confirmed! We will contact you shortly.'); this.closest('.fixed').remove();" class="flex-1 bg-koops-green text-koops-dark py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
                        CONFIRM BOOKING
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    showPackageBookingModal(packageName, price) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-koops-dark rounded-xl p-8 max-w-md mx-4">
                <h3 class="text-2xl font-bold text-white mb-4">Choose ${packageName}</h3>
                <div class="text-center mb-6">
                    <div class="text-4xl text-koops-green mb-2">${price}</div>
                    <p class="text-gray-300">Complete service package</p>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                        <input type="text" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <input type="tel" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Motorcycle Model</label>
                        <input type="text" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                </div>
                <div class="flex space-x-4 mt-6">
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-koops-gray text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors">
                        CANCEL
                    </button>
                    <button onclick="alert('Package selected! Our team will contact you to schedule all services.'); this.closest('.fixed').remove();" class="flex-1 bg-koops-green text-koops-dark py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
                        SELECT PACKAGE
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MobileNavigation();
    new QuickBooking();
    new ServiceCategories();
    new ServiceTabs();
    new ServiceBooking();
    
    // Add intersection observer for animations
    const cards = document.querySelectorAll('.service-card, .service-category');
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
    
    console.log('KOOPSIKLO Services page initialized successfully! 🔧');
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
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
