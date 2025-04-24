/*
 * InstallMate.site - Main JavaScript
 * Author: InstallMate
 * Date: 2023
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            
            // Toggle the hamburger icon
            const spans = this.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].classList.toggle('rotate-45');
                spans[1].classList.toggle('opacity-0');
                spans[2].classList.toggle('rotate-negative-45');
            }
        });
    }
    
    // Handle FAQ toggles
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle the current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For this example, we'll just simulate a successful submission
            
            // Show success message
            if (formSuccess) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Scroll to the success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // Handle floating labels
    const formInputs = document.querySelectorAll('.floating-label input, .floating-label textarea, .floating-label select');
    
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            // Set initial state for any pre-filled inputs (e.g., after a form error)
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
            
            input.addEventListener('focus', () => {
                input.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.classList.remove('focused');
                if (input.value.trim() === '') {
                    input.classList.remove('has-value');
                } else {
                    input.classList.add('has-value');
                }
            });
        });
    }
    
    // Cookie consent handling
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    if (cookieConsent && acceptCookiesBtn) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show the cookie consent banner after a slight delay
            setTimeout(() => {
                cookieConsent.style.display = 'block';
            }, 1000);
        }
        
        // Handle accept button click
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.display = 'none';
        });
    }
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === "#") return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll for certain elements
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.highlight-item, .project-card, .service-card, .timeline-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => {
            el.classList.add('pre-animation');
            animationObserver.observe(el);
        });
    }
}); 