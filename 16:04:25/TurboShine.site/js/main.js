/**
 * TurboShine Car Wash - Main JavaScript
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cookie consent
    initCookieConsent();
    
    // Add active class to current nav item
    highlightCurrentPage();
});

/**
 * Initialize cookie consent banner
 */
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
        // Show the cookie banner with a slight delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Add event listener to accept button
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            // Save cookie consent to localStorage
            localStorage.setItem('cookieConsent', 'true');
            
            // Hide the cookie banner
            cookieBanner.classList.remove('show');
        });
    }
}

/**
 * Highlight the current page in the navigation
 */
function highlightCurrentPage() {
    // Get current page path
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Loop through each link and check if it points to the current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Smooth scroll to elements
 */
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