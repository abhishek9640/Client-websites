/**
 * TopGarden.site - Main JavaScript
 * Handles all interactive functionality with performance optimization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileMenu = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !e.target.closest('.mobile-nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            mobileNav.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show testimonial at specified index
        const showTestimonial = (index) => {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
                testimonial.classList.remove('animate-fade-in');
            });
            
            testimonials[index].style.display = 'block';
            testimonials[index].classList.add('animate-fade-in');
        };
        
        // Event listeners for prev/next buttons
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate testimonials
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 6000);
        
        // Pause auto-rotation when hovering over testimonials
        const testimonialContainer = document.querySelector('.testimonials-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });
            
            testimonialContainer.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                }, 6000);
            });
        }
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            let valid = true;
            
            // Reset error states
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(el => el.remove());
            
            // Validate required fields
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                field.classList.remove('error');
                
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                    
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    field.parentNode.appendChild(errorMsg);
                }
            });
            
            // Validate email format
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    valid = false;
                    emailField.classList.add('error');
                    
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid email address';
                    emailField.parentNode.appendChild(errorMsg);
                }
            }
            
            if (!valid) {
                e.preventDefault();
            }
        });
    }
    
    // Add animation classes when elements come into view
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.feature-card, .project-card, .section-title');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
    
    // Cookie Consent Banner
    const setupCookieConsent = () => {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted) {
            // Create cookie consent banner
            const cookieBanner = document.createElement('div');
            cookieBanner.className = 'cookie-banner';
            cookieBanner.innerHTML = `
                <div class="cookie-content">
                    <p>We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.</p>
                    <div class="cookie-actions">
                        <a href="legal/privacy-policy.html" class="cookie-link">Learn more</a>
                        <button id="accept-cookies" class="cookie-button">Accept</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(cookieBanner);
            
            // Add styles for the banner
            const style = document.createElement('style');
            style.textContent = `
                .cookie-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(46, 125, 50, 0.95);
                    color: #fff;
                    padding: 1rem;
                    z-index: 1000;
                    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                }
                .cookie-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .cookie-content p {
                    flex: 1;
                    margin: 0;
                    padding-right: 1rem;
                }
                .cookie-actions {
                    display: flex;
                    align-items: center;
                }
                .cookie-link {
                    color: #fff;
                    text-decoration: underline;
                    margin-right: 1rem;
                }
                .cookie-button {
                    background-color: #fff;
                    color: #2e7d32;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .cookie-button:hover {
                    background-color: #f1f1f1;
                }
                @media (max-width: 768px) {
                    .cookie-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .cookie-content p {
                        margin-bottom: 1rem;
                        padding-right: 0;
                    }
                    .cookie-actions {
                        justify-content: center;
                        width: 100%;
                    }
                }
            `;
            
            document.head.appendChild(style);
            
            // Add event listener to the accept button
            document.getElementById('accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.style.display = 'none';
            });
        }
    };
    
    // Initialize cookie consent
    setupCookieConsent();
}); 