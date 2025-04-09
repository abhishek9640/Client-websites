/**
 * ChopZone.site - Tree Cutting Service Website
 * Main JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
    // Cookie Consent Management
    const cookieConsent = document.getElementById("cookie-consent");
    const acceptCookiesBtn = document.getElementById("accept-cookies");
    
    // Check if the user has already accepted cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        // Show the cookie consent banner
        setTimeout(function() {
            cookieConsent.classList.add("active");
        }, 1000); // Delay showing the banner for 1 second
    }
    
    // Handle accept cookies button click
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener("click", function() {
            // Set a flag in localStorage
            localStorage.setItem("cookiesAccepted", "true");
            
            // Hide the cookie consent banner
            cookieConsent.classList.remove("active");
        });
    }
    
    // Form Validation for Contact Form
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            // This is just a placeholder for form submission
            // In a real implementation, you would handle form submission to a server
            event.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll("[required]");
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("is-invalid");
                } else {
                    field.classList.remove("is-invalid");
                }
            });
            
            // If the form is valid, you would typically send the data to a server
            if (isValid) {
                alert("Thank you for your submission! We will get back to you soon.");
                contactForm.reset();
            } else {
                alert("Please fill in all required fields.");
            }
        });
    }
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(function(link) {
        if (link.getAttribute("href") === currentLocation.substring(currentLocation.lastIndexOf("/") + 1)) {
            link.classList.add("active");
        } else if (currentLocation.lastIndexOf("/") === (currentLocation.length - 1) && link.getAttribute("href") === "index.html") {
            link.classList.add("active");
        }
    });
}); 