document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent Banner
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show cookie banner if not accepted
        cookieConsent.style.display = 'block';
    }
    
    // Handle cookie acceptance
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.display = 'none';
        });
    }
    
    // Mobile Menu Toggle (for better UX on small screens)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when a link is clicked
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for contact forms
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email');
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Show error message for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.closest('.mb-3');
        const errorElement = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
        
        if (!formGroup.querySelector('.invalid-feedback')) {
            errorElement.className = 'invalid-feedback';
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('is-invalid');
        errorElement.textContent = message;
    }
    
    // Remove error styling when user starts typing
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
            const errorElement = this.closest('.form-group')?.querySelector('.invalid-feedback') || 
                                this.closest('.mb-3')?.querySelector('.invalid-feedback');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}); 