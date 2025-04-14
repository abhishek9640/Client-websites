document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // If cookies haven't been accepted, show the banner
    if (!cookiesAccepted) {
        cookieBanner.classList.add('active');
    }
    
    // When the accept button is clicked
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            // Save the acceptance in localStorage
            localStorage.setItem('cookiesAccepted', 'true');
            
            // Hide the banner
            cookieBanner.classList.remove('active');
            
            // Optional: You can set actual cookies here if needed
            setCookies();
        });
    }
    
    // Function to set actual cookies if needed
    function setCookies() {
        // Set necessary cookies here
        // Example:
        // document.cookie = "essential_cookie=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        
        // Here you could also initialize analytics or other tracking scripts
        // that were waiting for user consent
    }
}); 