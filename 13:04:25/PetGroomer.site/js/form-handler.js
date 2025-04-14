document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                petType: document.getElementById('pet-type').value,
                message: document.getElementById('message').value
            };
            
            // Form validation
            if (!validateForm(formData)) {
                return false;
            }
            
            // Simulate form submission
            submitForm(formData);
        });
    }
    
    // Validate form inputs
    function validateForm(data) {
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        if (!data.name.trim()) {
            errorMessage += 'Name is required.\n';
            isValid = false;
        }
        
        if (!data.email.trim()) {
            errorMessage += 'Email is required.\n';
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        if (!data.message.trim()) {
            errorMessage += 'Message is required.\n';
            isValid = false;
        }
        
        if (!isValid) {
            alert('Please correct the following errors:\n' + errorMessage);
        }
        
        return isValid;
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Simulate form submission - in a real app, this would send data to a server
    function submitForm(data) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate AJAX request with a timeout
        setTimeout(function() {
            // This would normally be an AJAX call to your server
            console.log('Form submitted with data:', data);
            
            // Reset the form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    }
}); 