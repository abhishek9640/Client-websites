/**
 * FreshHome.site JavaScript
 * Handles interactive elements of the website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Cookie Consent Banner
    initCookieConsent();
    
    // Contact Form Submission (placeholder functionality)
    initContactForm();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
});

/**
 * Initializes and handles the cookie consent banner
 */
function initCookieConsent() {
    const cookieConsentBanner = document.getElementById('cookie-consent');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    
    // Only show the banner if user hasn't accepted cookies yet
    if (!hasAcceptedCookies()) {
        // Show the cookie consent banner with a slight delay
        setTimeout(function() {
            cookieConsentBanner.style.display = 'block';
        }, 1000);
    }
    
    // Handle accept button click
    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener('click', function() {
            // Set cookie to remember user's choice
            setCookie('freshhome_cookies_accepted', 'true', 365);
            
            // Hide the banner
            cookieConsentBanner.style.display = 'none';
        });
    }
}

/**
 * Checks if user has already accepted cookies
 * @returns {boolean} Whether cookies have been accepted
 */
function hasAcceptedCookies() {
    return getCookie('freshhome_cookies_accepted') === 'true';
}

/**
 * Sets a cookie with the provided name, value and expiration days
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until cookie expires
 */
function setCookie(name, value, days) {
    let expires = '';
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    
    document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
}

/**
 * Gets the value of a cookie by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    
    return null;
}

/**
 * Initializes contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // In a real implementation, you would send the form data to a server here
            // For this demo, we'll show an alert
            
            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Display success message (in a real site this would submit to a backend)
            alert('Thank you for your message! We will contact you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
} 