// CustomCab Main JS

// DOM Elements
const header = document.querySelector('.header');
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const faqItems = document.querySelectorAll('.faq-item');
const tabBtns = document.querySelectorAll('.tab-btn');
const serviceCards = document.querySelectorAll('.service-card');

// Helper Functions
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Sticky Header
const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Mobile Menu Toggle
const toggleMobileMenu = () => {
    const mobileNav = document.createElement('div');
    
    if (!document.querySelector('.mobile-nav')) {
        mobileNav.classList.add('mobile-nav');
        mobileNav.appendChild(navList.cloneNode(true));
        header.appendChild(mobileNav);
        
        setTimeout(() => {
            mobileNav.classList.add('open');
        }, 10);
        
        document.body.style.overflow = 'hidden';
        mobileToggle.classList.add('active');
    } else {
        const existingNav = document.querySelector('.mobile-nav');
        existingNav.classList.remove('open');
        
        setTimeout(() => {
            existingNav.remove();
            document.body.style.overflow = '';
            mobileToggle.classList.remove('active');
        }, 300);
    }
};

// Cookie Consent
const checkCookieConsent = () => {
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
};

const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    cookieConsent.classList.remove('show');
};

// FAQ Accordion
const toggleFaq = (index) => {
    const faqAnswer = faqItems[index].querySelector('.faq-answer');
    const faqToggle = faqItems[index].querySelector('.faq-toggle');
    
    if (faqAnswer.classList.contains('open')) {
        faqAnswer.classList.remove('open');
        faqToggle.textContent = '+';
    } else {
        // Close all others
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('open');
        });
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.textContent = '+';
        });
        
        faqAnswer.classList.add('open');
        faqToggle.textContent = '-';
    }
};

// Services Tab Filter
const filterServices = (filter) => {
    serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};

// Form Validation
const validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const formElements = form.elements;
        
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            
            if (element.hasAttribute('required') && element.value.trim() === '') {
                isValid = false;
                element.classList.add('error');
            } else {
                element.classList.remove('error');
            }
        }
        
        if (isValid) {
            // Simulate form submission success
            const formWrapper = form.parentElement;
            form.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                <button class="btn-primary" onclick="location.reload()">Send Another Message</button>
            `;
            
            formWrapper.appendChild(successMessage);
            
            // In a real application, you would submit the form data to a server here
            // fetch('/api/contact', {
            //     method: 'POST',
            //     body: new FormData(form)
            // })
        }
    });
};

// Animate On Scroll
const handleScrollAnimations = () => {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    
    elementsToAnimate.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
            element.classList.add('aos-animate');
        }
    });
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Handlers
    window.addEventListener('scroll', debounce(handleScroll));
    window.addEventListener('scroll', debounce(handleScrollAnimations));
    
    // Mobile Menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cookie Consent
    if (cookieConsent && acceptCookiesBtn) {
        checkCookieConsent();
        acceptCookiesBtn.addEventListener('click', acceptCookies);
    }
    
    // FAQ Accordions
    if (faqItems.length > 0) {
        faqItems.forEach((item, index) => {
            const faqQuestion = item.querySelector('.faq-question');
            faqQuestion.addEventListener('click', () => toggleFaq(index));
        });
    }
    
    // Service Tabs
    if (tabBtns.length > 0 && serviceCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab
                tabBtns.forEach(tab => tab.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter services
                const filter = btn.getAttribute('data-filter');
                filterServices(filter);
            });
        });
    }
    
    // Contact Form Validation
    validateForm('contactForm');
    
    // Initialize AOS
    handleScrollAnimations();
});

// Handle Floating Labels
document.addEventListener('DOMContentLoaded', () => {
    const floatingInputs = document.querySelectorAll('.floating-label input, .floating-label textarea');
    
    floatingInputs.forEach(input => {
        // Set initial state
        if (input.value.trim() !== '') {
            input.classList.add('has-content');
        }
        
        // Handle focus events
        input.addEventListener('focus', () => {
            input.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('focused');
            if (input.value.trim() !== '') {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });
}); 