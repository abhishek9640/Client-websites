// Main JavaScript file for InsulMax website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation - Add active class to current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Cookie Consent
    const cookieConsent = document.getElementById('cookie-consent');
    if (cookieConsent) {
        cookieConsent.addEventListener('click', function(e) {
            e.preventDefault();
            showCookieConsent();
        });
    }

    // Check if cookie consent is already accepted
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(showCookieConsent, 2000);
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
});

// Cookie Consent Function
function showCookieConsent() {
    // Create cookie consent element if it doesn't exist
    if (!document.querySelector('.cookie-consent')) {
        const cookieConsentEl = document.createElement('div');
        cookieConsentEl.className = 'cookie-consent';
        cookieConsentEl.innerHTML = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <p class="mb-md-0">We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.</p>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <button class="btn btn-light btn-sm me-2" id="accept-cookies">Accept</button>
                        <button class="btn btn-outline-light btn-sm" id="decline-cookies">Decline</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cookieConsentEl);
        
        // Add event listeners to buttons
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsentEl.remove();
        });
        
        document.getElementById('decline-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsentEl.remove();
        });
        
        // Show consent
        setTimeout(() => {
            cookieConsentEl.classList.add('show');
        }, 300);
    }
}

// Contact Form Validation
function validateContactForm(e) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    
    // Name validation
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    // Message validation
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    if (!isValid) {
        e.preventDefault();
    }
}

// Helper function to display error message
function showError(input, message) {
    input.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.innerText = message;
    input.parentNode.appendChild(errorDiv);
}

// Helper function to validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Performance optimization - Lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
  
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        let active = false;
  
        const lazyLoad = function() {
            if (active === false) {
                active = true;
  
                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
  
                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });
  
                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });
  
                    active = false;
                }, 200);
            }
        };
  
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
}); 