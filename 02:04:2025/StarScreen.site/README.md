# StarScreen.site - Outdoor Cinema Installation Website

A professional website for StarScreen, an outdoor cinema installation business. This website is designed to be fast, clean, and optimized for ad placements.

## Features

- Responsive design that works on all devices
- Fast loading with minimal dependencies
- Clean UI optimized for ad placements
- Contact form with validation
- Cookie consent functionality
- SEO-friendly structure

## Pages

- **Home**: Overview of outdoor cinema installation services
- **About**: Information about the company and its expertise
- **Services**: Detailed descriptions of installation services offered
- **Contact**: Contact form and business information
- **Terms & Conditions**: Legal terms of service
- **Privacy Policy**: Information on data collection and usage

## Technology Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Font Awesome for icons

## Setup Instructions

1. Upload all files to your web hosting server.
2. No build process is required as this is a static website.
3. Ensure the correct file permissions are set (typically 644 for files and 755 for directories).

## Directory Structure

```
├── index.html            # Homepage
├── about.html            # About page
├── services.html         # Services page
├── contact.html          # Contact page
├── terms.html            # Terms & Conditions
├── privacy.html          # Privacy Policy
├── css/
│   └── styles.css        # Main stylesheet
├── js/
│   └── script.js         # JavaScript functionality
└── README.md             # This file
```

## Customization

### Changing Colors

The website uses CSS variables for consistent coloring. To change the color scheme, edit the `:root` section in `css/styles.css`:

```css
:root {
    --primary-color: #1a237e;
    --secondary-color: #3949ab;
    /* other color variables */
}
```

### Adding Content

To add new pages or sections, follow the existing HTML structure and use the same components for consistency.

### Form Handling

The contact form is set up for client-side validation only. To make it functional:

1. Set up a server-side script to handle form submissions
2. Update the form action in `contact.html`
3. Add appropriate CSRF protection if needed

## Performance Optimization

This website has been optimized for speed with:

- Minimal external dependencies
- Optimized CSS structure
- No heavy graphics or animations
- Lazy loading for non-critical elements
- Mobile-first responsive design

## Ad Placement

The layout includes several strategic locations where ads can be placed:

- Above the fold on homepage
- Sidebar sections on content pages
- Between content sections
- Footer area

To add ad code, insert your ad units in the designated comment areas in the HTML files.

## Browser Compatibility

This website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Chrome for Android
- Safari iOS

## Maintenance

1. Regularly check for broken links
2. Update copyright year in the footer annually
3. Review and update contact information as needed
4. Keep service descriptions and pricing current

## License

This website is for the exclusive use of StarScreen. All rights reserved.

## Contact

For technical support or questions about this website, please contact:

- Email: webmaster@starscreen.site
- Phone: +1 4257715343


---

© 2024 StarScreen. All rights reserved. 