// MosquitoStop.site - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('open');
        });
    }
    
    // Cookie Consent
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookieBtn = document.querySelector('.accept-cookies');
    
    // Check if cookies were previously accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (cookieConsent && acceptCookieBtn) {
        // If cookies were not accepted previously, show the banner
        if (!cookiesAccepted) {
            setTimeout(function() {
                cookieConsent.classList.add('show');
            }, 1000);
        }
        
        // Accept cookies button click handler
        acceptCookieBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('show');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar.classList.contains('open')) {
                    navbar.classList.remove('open');
                }
            }
        });
    });
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the link href matches the current page
        if (currentLocation.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentLocation === '/' && linkPath === '/') {
            link.classList.add('active');
        }
    });
    
    // Form validation
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');
            
            // Simple validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else if (nameInput) {
                removeError(nameInput);
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value.trim() === '') {
                    isValid = false;
                    showError(emailInput, 'Please enter your email');
                } else if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email');
                } else {
                    removeError(emailInput);
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else if (messageInput) {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, just show a success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.style.display = 'none';
                }
                
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(function() {
                    contactForm.reset();
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    if (submitBtn) {
                        submitBtn.style.display = 'block';
                    }
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.add('is-invalid');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            error.style.color = 'red';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '0.25rem';
            formGroup.appendChild(error);
        }
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('is-invalid');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
});
