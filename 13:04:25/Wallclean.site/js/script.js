// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
        // Show cookie consent banner
        setTimeout(function() {
            cookieConsent.style.display = 'block';
            cookieConsent.classList.add('fade-in');
        }, 1000);
    }
    
    // Handle cookie acceptance
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            cookieConsent.style.display = 'none';
        });
    }
    
    // Initialize active navigation based on current page
    setActiveNavLink();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when scrolled into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        window.addEventListener('scroll', function() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('fade-in');
                    element.classList.add('animated');
                }
            });
        });
    }
});

// Function to set active navigation link based on current page
function setActiveNavLink() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the path from href attribute
        const linkPath = link.getAttribute('href');
        
        // Set active class if the current location matches the link path
        if (currentLocation.endsWith(linkPath) || 
            (currentLocation === '/' && linkPath === 'index.html') || 
            (currentLocation.endsWith('/index.html') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Form validation for contact form
function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) return true;
    
    const nameInput = form.elements['name'];
    const emailInput = form.elements['email'];
    const messageInput = form.elements['message'];
    let isValid = true;
    
    // Clear previous error messages
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());
    
    // Validate name
    if (nameInput && nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (emailInput && !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (messageInput && messageInput.value.trim() === '') {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error message
function showError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1';
    errorDiv.textContent = message;
    inputElement.parentNode.appendChild(errorDiv);
    inputElement.classList.add('is-invalid');
} 