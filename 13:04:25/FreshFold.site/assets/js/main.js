/**
 * FreshFold.site - Main JavaScript
 * Handles cookie consent banner and other interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent Banner Logic
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('cookie-accept');
    const declineButton = document.getElementById('cookie-decline');
    
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('freshfold-cookie-consent');
    
    if (!cookieConsent) {
        // If no cookie consent found, show the banner
        setTimeout(function() {
            cookieBanner.style.display = 'block';
        }, 1000); // Delay banner appearance for better UX
    }
    
    // Handle accept button click
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            setCookieConsent('accepted');
            cookieBanner.style.display = 'none';
        });
    }
    
    // Handle decline button click
    if (declineButton) {
        declineButton.addEventListener('click', function() {
            setCookieConsent('declined');
            cookieBanner.style.display = 'none';
        });
    }
    
    // Cookie page specific controls
    const acceptAllCookies = document.getElementById('accept-all-cookies');
    const essentialOnlyCookies = document.getElementById('essential-only-cookies');
    const cookieSettings = document.getElementById('cookie-settings');
    
    if (acceptAllCookies) {
        acceptAllCookies.addEventListener('click', function() {
            setCookieConsent('accepted');
            showConfirmation('All cookies accepted');
        });
    }
    
    if (essentialOnlyCookies) {
        essentialOnlyCookies.addEventListener('click', function() {
            setCookieConsent('essential-only');
            showConfirmation('Essential cookies only accepted');
        });
    }
    
    if (cookieSettings) {
        cookieSettings.addEventListener('click', function() {
            // Placeholder for custom cookie settings modal
            showConfirmation('Cookie settings feature coming soon');
        });
    }
    
    // Function to set cookie consent
    function setCookieConsent(value) {
        localStorage.setItem('freshfold-cookie-consent', value);
        localStorage.setItem('freshfold-cookie-date', new Date().toISOString());
    }
    
    // Function to show confirmation message
    function showConfirmation(message) {
        const confirmation = document.createElement('div');
        confirmation.className = 'cookie-confirmation';
        confirmation.innerHTML = message;
        document.body.appendChild(confirmation);
        
        setTimeout(function() {
            confirmation.style.opacity = '1';
        }, 10);
        
        setTimeout(function() {
            confirmation.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(confirmation);
            }, 500);
        }, 3000);
    }

    // Mobile Navigation Enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                // Close the navbar when clicking outside
                navbarToggler.click();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Validation (if on contact page)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightField(field, true);
                } else {
                    highlightField(field, false);
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                isValid = false;
                highlightField(emailField, true);
            }
            
            if (isValid) {
                // In a real implementation, we'd submit the form to a server
                // For this demo, we'll just show a success message
                contactForm.reset();
                showFormSuccess();
            }
        });
    }
    
    // Function to validate email
    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    
    // Function to highlight invalid fields
    function highlightField(field, isError) {
        if (isError) {
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    }
    
    // Function to show form success message
    function showFormSuccess() {
        const formContainer = document.querySelector('.contact-form-container');
        
        if (formContainer) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = 'Thank you for your message! We\'ll get back to you soon.';
            
            formContainer.appendChild(successMessage);
            
            setTimeout(function() {
                successMessage.remove();
            }, 5000);
        }
    }
});
