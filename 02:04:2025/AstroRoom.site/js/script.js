document.addEventListener('DOMContentLoaded', function() {
    // Check if cookie consent was previously set
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show cookie consent modal after a short delay
        setTimeout(() => {
            const cookieModal = new bootstrap.Modal(document.getElementById('cookieModal'));
            cookieModal.show();
        }, 1000);
    }
    
    // Cookie consent button click
    document.getElementById('cookie-consent-btn').addEventListener('click', function() {
        const cookieModal = new bootstrap.Modal(document.getElementById('cookieModal'));
        cookieModal.show();
    });
    
    // Accept all cookies
    document.getElementById('acceptAll').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'all');
        localStorage.setItem('analyticsCookies', 'true');
        localStorage.setItem('marketingCookies', 'true');
        
        const cookieModal = bootstrap.Modal.getInstance(document.getElementById('cookieModal'));
        cookieModal.hide();
    });
    
    // Accept only necessary cookies
    document.getElementById('acceptNecessary').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'necessary');
        localStorage.setItem('analyticsCookies', 'false');
        localStorage.setItem('marketingCookies', 'false');
        
        const cookieModal = bootstrap.Modal.getInstance(document.getElementById('cookieModal'));
        cookieModal.hide();
    });
    
    // Load saved preferences
    if (cookieConsent) {
        const analyticsCookies = localStorage.getItem('analyticsCookies') === 'true';
        const marketingCookies = localStorage.getItem('marketingCookies') === 'true';
        
        document.getElementById('analyticsCookies').checked = analyticsCookies;
        document.getElementById('marketingCookies').checked = marketingCookies;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Responsive navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                valid = false;
                emailField.classList.add('is-invalid');
            }
            
            if (valid) {
                // Here you would normally submit the form or use AJAX
                // For demo purposes, show success message
                contactForm.reset();
                const successMessage = document.getElementById('formSuccess');
                if (successMessage) {
                    successMessage.classList.remove('d-none');
                    setTimeout(() => {
                        successMessage.classList.add('d-none');
                    }, 5000);
                }
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Lazy load images for performance
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}); 