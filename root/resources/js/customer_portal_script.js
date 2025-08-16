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
// AUTHENTICATION SYSTEM
// ========================================
class AuthSystem {
    constructor() {
        this.loginTab = document.getElementById('login-tab');
        this.registerTab = document.getElementById('register-tab');
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        this.authSection = document.getElementById('auth-section');
        this.dashboardSection = document.getElementById('dashboard-section');
        
        this.init();
    }
    
    init() {
        // Tab switching
        this.loginTab.addEventListener('click', () => {
            this.showLogin();
        });
        
        this.registerTab.addEventListener('click', () => {
            this.showRegister();
        });
        
        // Form submissions
        this.loginForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        this.registerForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }
    
    showLogin() {
        this.loginTab.classList.add('bg-koops-green', 'text-koops-dark');
        this.loginTab.classList.remove('bg-koops-dark', 'text-white');
        this.registerTab.classList.add('bg-koops-dark', 'text-white');
        this.registerTab.classList.remove('bg-koops-green', 'text-koops-dark');
        
        this.loginForm.classList.remove('hidden');
        this.registerForm.classList.add('hidden');
    }
    
    showRegister() {
        this.registerTab.classList.add('bg-koops-green', 'text-koops-dark');
        this.registerTab.classList.remove('bg-koops-dark', 'text-white');
        this.loginTab.classList.add('bg-koops-dark', 'text-white');
        this.loginTab.classList.remove('bg-koops-green', 'text-koops-dark');
        
        this.registerForm.classList.remove('hidden');
        this.loginForm.classList.add('hidden');
    }
    
    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Show loading state
        const loginBtn = document.getElementById('login-btn');
        loginBtn.classList.add('loading');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>LOGGING IN...';
        loginBtn.disabled = true;
        
        // Simulate login process
        setTimeout(() => {
            this.showDashboard();
        }, 1500);
    }
    
    handleRegister() {
        // Show loading state and simulate registration
        setTimeout(() => {
            this.showSuccess('Account created successfully! Please log in.');
            this.showLogin();
        }, 1500);
    }
    
    showDashboard() {
        this.authSection.classList.add('hidden');
        this.dashboardSection.classList.remove('hidden');
        
        // Update user name
        const userName = document.getElementById('user-name');
        userName.textContent = 'John Doe';
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
}

// ========================================
// DASHBOARD FUNCTIONALITY
// ========================================
class Dashboard {
    constructor() {
        this.tabs = document.querySelectorAll('.dashboard-tab');
        this.contents = document.querySelectorAll('.dashboard-content');
        
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
        const tabName = activeTab.dataset.tab;
        
        // Update tab appearance
        this.tabs.forEach(tab => {
            tab.classList.remove('active', 'bg-koops-green', 'text-koops-dark');
            tab.classList.add('bg-koops-dark', 'text-white');
        });
        
        activeTab.classList.add('active', 'bg-koops-green', 'text-koops-dark');
        activeTab.classList.remove('bg-koops-dark', 'text-white');
        
        // Show corresponding content
        this.contents.forEach(content => {
            content.classList.add('hidden');
        });
        
        const targetContent = document.getElementById(`${tabName}-tab`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
    }
}

// ========================================
// SUPPORT SYSTEM
// ========================================
class SupportSystem {
    constructor() {
        this.init();
    }
    
    init() {
        // Live chat button
        const liveChatBtn = document.querySelector('button:has(.fa-comments)');
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', () => {
                this.openLiveChat();
            });
        }
        
        // FAQ items
        const faqItems = document.querySelectorAll('#support-tab .border button');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                this.toggleFAQ(item);
            });
        });
    }
    
    openLiveChat() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-koops-dark rounded-xl p-6 max-w-md mx-4 w-full">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-white">Live Chat Support</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="bg-koops-gray rounded-lg p-4 h-64 overflow-y-auto mb-4" id="chat-messages">
                    <div class="text-center text-gray-400 text-sm mb-4">Chat started</div>
                    <div class="bg-koops-green text-koops-dark p-3 rounded-lg mb-2 max-w-xs">
                        <p class="text-sm">Hello! I'm Sarah from KOOPSIKLO support. How can I help you today?</p>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <input type="text" id="chat-input" placeholder="Type your message..." class="flex-1 px-4 py-2 bg-koops-gray text-white rounded-lg border border-gray-600 focus:border-koops-green focus:outline-none">
                    <button onclick="sendChatMessage()" class="bg-koops-green text-koops-dark px-4 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 100);
    }
    
    toggleFAQ(item) {
        const question = item.textContent;
        const answers = {
            'How do I schedule a service appointment?': 'You can schedule a service appointment through your dashboard by clicking on "Services" tab and then "Schedule New Service", or by calling our service center at (02) 8123-4567.',
            'What is covered under warranty?': 'Our warranty covers manufacturing defects, engine issues, and electrical problems for the first 2 years or 20,000 km, whichever comes first. Regular maintenance items like oil, filters, and brake pads are not covered.',
            'How can I track my parts order?': 'You can track your parts order in the "Documents" section of your dashboard, or by using the tracking number sent to your email when the order was placed.',
            'How do I update my contact information?': 'Go to the "Account" tab in your dashboard and update your profile information. Don\'t forget to click "Update Profile" to save your changes.'
        };
        
        const answer = answers[question];
        if (answer) {
            const existingAnswer = item.parentNode.querySelector('.faq-answer');
            if (existingAnswer) {
                existingAnswer.remove();
            } else {
                const answerDiv = document.createElement('div');
                answerDiv.className = 'faq-answer mt-3 p-3 bg-koops-gray rounded text-gray-300 text-sm';
                answerDiv.textContent = answer;
                item.parentNode.appendChild(answerDiv);
            }
        }
    }
}

// ========================================
// GLOBAL CHAT FUNCTION
// ========================================
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'text-right mb-2';
        userMsg.innerHTML = `
            <div class="bg-koops-gray text-white p-3 rounded-lg inline-block max-w-xs">
                <p class="text-sm">${message}</p>
            </div>
        `;
        messages.appendChild(userMsg);
        
        // Clear input
        input.value = '';
        
        // Simulate response
        setTimeout(() => {
            const responses = [
                "I understand your concern. Let me help you with that.",
                "That's a great question! Let me check our records for you.",
                "I can definitely assist you with that. One moment please.",
                "Thank you for contacting us. I'll get that sorted for you right away.",
                "I see what you mean. Let me connect you with our technical team."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const botMsg = document.createElement('div');
            botMsg.className = 'mb-2';
            botMsg.innerHTML = `
                <div class="bg-koops-green text-koops-dark p-3 rounded-lg inline-block max-w-xs">
                    <p class="text-sm">${randomResponse}</p>
                </div>
            `;
            messages.appendChild(botMsg);
            
            // Scroll to bottom
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        messages.scrollTop = messages.scrollHeight;
    }
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MobileNavigation();
    new AuthSystem();
    new Dashboard();
    new SupportSystem();
    
    // Add Enter key support for chat
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.id === 'chat-input') {
            sendChatMessage();
        }
    });
    
    console.log('KOOPSIKLO Customer Portal initialized successfully! 👤');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
const Utils = {
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
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
