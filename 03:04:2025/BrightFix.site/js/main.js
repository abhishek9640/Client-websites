// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cookie consent functionality
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieConsentBtn = document.getElementById('cookieConsentBtn');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    
    // Check if user has already made a cookie choice
    if (!localStorage.getItem('cookieConsent')) {
        // Show cookie consent banner if no choice has been made
        setTimeout(() => {
            cookieConsent.style.display = 'block';
        }, 1000);
    }
    
    // Accept cookies
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
    });
    
    // Reject cookies
    rejectCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.style.display = 'none';
    });
    
    // Open cookie settings
    cookieConsentBtn.addEventListener('click', function() {
        cookieConsent.style.display = 'block';
    });
    
    // Performance optimization - Lazy loading images
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
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the current path matches the link or if we're on the home page
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
            // For home page
            if (linkPath === 'index.html') {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        }
    });
}); 