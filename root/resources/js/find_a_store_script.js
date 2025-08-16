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
// STORE LOCATOR FUNCTIONALITY
// ========================================
class StoreLocator {
    constructor() {
        this.locationSearch = document.getElementById('location-search');
        this.serviceFilter = document.getElementById('service-filter');
        this.findNearestBtn = document.getElementById('find-nearest');
        this.filterChips = document.querySelectorAll('.filter-chip');
        this.storeCards = document.querySelectorAll('.store-card');
        this.storeMarkers = document.querySelectorAll('.store-marker');
        this.storeCount = document.getElementById('store-count');
        
        this.userLocation = null;
        this.activeFilter = 'all';
        
        this.init();
    }
    
    init() {
        // Search functionality
        this.locationSearch.addEventListener('input', () => {
            this.handleSearch();
        });
        
        // Service filter
        this.serviceFilter.addEventListener('change', () => {
            this.handleServiceFilter();
        });
        
        // Find nearest button
        this.findNearestBtn.addEventListener('click', () => {
            this.findNearestStore();
        });
        
        // Filter chips
        this.filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.handleFilterChip(chip);
            });
        });
        
        // Store card interactions
        this.storeCards.forEach(card => {
            this.setupStoreCardEvents(card);
        });
        
        // Map marker interactions
        this.storeMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                this.handleMarkerClick(marker);
            });
        });
        
        // Initialize geolocation
        this.initGeolocation();
    }
    
    handleSearch() {
        const searchTerm = this.locationSearch.value.toLowerCase();
        let visibleCount = 0;
        
        this.storeCards.forEach(card => {
            const storeName = card.querySelector('h4').textContent.toLowerCase();
            const storeAddress = card.querySelector('p').textContent.toLowerCase();
            
            if (storeName.includes(searchTerm) || storeAddress.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateStoreCount(visibleCount);
    }
    
    handleServiceFilter() {
        const selectedService = this.serviceFilter.value;
        let visibleCount = 0;
        
        this.storeCards.forEach(card => {
            const services = Array.from(card.querySelectorAll('.bg-koops-green')).map(span => span.textContent.toLowerCase());
            
            if (selectedService === '' || services.some(service => service.includes(selectedService))) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateStoreCount(visibleCount);
    }
    
    handleFilterChip(activeChip) {
        // Update chip appearance
        this.filterChips.forEach(chip => {
            chip.classList.remove('active', 'bg-koops-green', 'text-koops-dark');
            chip.classList.add('bg-koops-dark', 'text-white');
        });
        
        activeChip.classList.add('active', 'bg-koops-green', 'text-koops-dark');
        activeChip.classList.remove('bg-koops-dark', 'text-white');
        
        // Apply filter
        const filter = activeChip.dataset.filter;
        this.activeFilter = filter;
        this.applyFilter(filter);
    }
    
    applyFilter(filter) {
        let visibleCount = 0;
        
        this.storeCards.forEach(card => {
            let shouldShow = true;
            
            switch (filter) {
                case 'open':
                    shouldShow = card.querySelector('.bg-green-600') !== null;
                    break;
                case 'weekend':
                    const hours = card.querySelector('.fa-clock').parentNode.textContent;
                    shouldShow = hours.includes('Sun');
                    break;
                case 'service':
                    const services = Array.from(card.querySelectorAll('.bg-koops-green')).map(span => span.textContent.toLowerCase());
                    shouldShow = services.includes('service');
                    break;
                case 'all':
                default:
                    shouldShow = true;
                    break;
            }
            
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateStoreCount(visibleCount);
    }
    
    findNearestStore() {
        if (!this.userLocation) {
            this.initGeolocation();
            return;
        }
        
        // Show loading state
        this.findNearestBtn.classList.add('loading');
        this.findNearestBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Locating...';
        this.findNearestBtn.disabled = true;
        
        // Simulate finding nearest store
        setTimeout(() => {
            this.highlightNearestStore();
            this.findNearestBtn.classList.remove('loading');
            this.findNearestBtn.innerHTML = '<i class="fas fa-location-arrow mr-2"></i>Find Nearest';
            this.findNearestBtn.disabled = false;
        }, 2000);
    }
    
    highlightNearestStore() {
        // Highlight the first store as "nearest"
        const nearestStore = this.storeCards[0];
        if (nearestStore) {
            nearestStore.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nearestStore.style.border = '2px solid #00ff88';
            
            setTimeout(() => {
                nearestStore.style.border = '';
            }, 3000);
        }
        
        this.showSuccess('Found your nearest KOOPSIKLO store!');
    }
    
    handleMarkerClick(marker) {
        const storeId = marker.dataset.store;
        const correspondingCard = document.querySelector(`[data-store="${storeId}"]`);
        
        if (correspondingCard) {
            correspondingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            correspondingCard.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                correspondingCard.style.transform = '';
            }, 1000);
        }
    }
    
    setupStoreCardEvents(card) {
        // Directions button
        const directionsBtn = card.querySelector('button:has(.fa-directions)');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                this.getDirections(card);
            });
        }
        
        // Call button
        const callBtn = card.querySelector('button:has(.fa-phone)');
        if (callBtn) {
            callBtn.addEventListener('click', () => {
                this.callStore(card);
            });
        }
        
        // Book button
        const bookBtn = card.querySelector('button:has(.fa-calendar)');
        if (bookBtn) {
            bookBtn.addEventListener('click', () => {
                this.bookAppointment(card);
            });
        }
    }
    
    getDirections(card) {
        const storeName = card.querySelector('h4').textContent;
        const address = card.querySelector('.fa-map-marker-alt').parentNode.textContent.replace('🗺️', '').trim();
        
        // Simulate opening directions
        this.showSuccess(`Opening directions to ${storeName}...`);
        
        // In a real app, this would open Google Maps or similar
        console.log(`Getting directions to: ${address}`);
    }
    
    callStore(card) {
        const phone = card.querySelector('.fa-phone').parentNode.textContent.replace('📞', '').trim();
        
        // Simulate calling
        this.showSuccess(`Calling ${phone}...`);
        
        // In a real app, this would initiate a phone call
        console.log(`Calling: ${phone}`);
    }
    
    bookAppointment(card) {
        const storeName = card.querySelector('h4').textContent;
        
        // Show booking modal
        this.showBookingModal(storeName);
    }
    
    showBookingModal(storeName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-koops-dark rounded-xl p-8 max-w-md mx-4 w-full">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-white">Book Appointment</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Store Location</label>
                        <input type="text" value="${storeName}" readonly class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                        <select class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                            <option>General Service</option>
                            <option>Oil Change</option>
                            <option>Brake Service</option>
                            <option>Engine Repair</option>
                            <option>Parts Installation</option>
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                            <input type="date" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                            <select class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                                <option>9:00 AM</option>
                                <option>11:00 AM</option>
                                <option>1:00 PM</option>
                                <option>3:00 PM</option>
                                <option>5:00 PM</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                        <input type="tel" placeholder="0912-345-6789" class="w-full px-4 py-3 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    </div>
                    
                    <div class="flex space-x-4 mt-6">
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-koops-gray text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors">
                            Cancel
                        </button>
                        <button onclick="bookAppointmentConfirm()" class="flex-1 bg-koops-green text-koops-dark py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    initGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.showSuccess('Location detected! You can now find the nearest store.');
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    this.showError('Unable to detect your location. Please enter your address manually.');
                }
            );
        }
    }
    
    updateStoreCount(count) {
        this.storeCount.textContent = count;
    }
    
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-20 right-4 bg-koops-green text-koops-dark px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm success-message';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
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
}

// ========================================
// GLOBAL BOOKING FUNCTION
// ========================================
function bookAppointmentConfirm() {
    // Simulate booking confirmation
    const modal = document.querySelector('.fixed');
    if (modal) {
        modal.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-20 right-4 bg-koops-green text-koops-dark px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm success-message';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>Appointment booked successfully! You'll receive a confirmation SMS shortly.</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MobileNavigation();
    new StoreLocator();
    
    // Add intersection observer for animations
    const serviceFeatures = document.querySelectorAll('.service-feature');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    serviceFeatures.forEach(feature => {
        featureObserver.observe(feature);
    });
    
    console.log('KOOPSIKLO Store Locator initialized successfully! 📍');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
const Utils = {
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in kilometers
        return distance;
    },
    
    deg2rad(deg) {
        return deg * (Math.PI/180);
    },
    
    formatDistance(distance) {
        if (distance < 1) {
            return `${Math.round(distance * 1000)}m`;
        } else {
            return `${distance.toFixed(1)}km`;
        }
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
