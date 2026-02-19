# Digital Agency Creations Website

A modern, fully responsive single-page website for Digital Agency Creations - a full-service digital marketing agency.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production--ready-green.svg)

## Features

- 🎨 **Modern Dark Theme** with glassmorphism design
- 📱 **Fully Responsive** - works on all devices
- ✨ **Smooth Animations** - scroll-reveal effects and transitions
- 🎯 **Complete Service Sections** - SEO, PPC, Social Media, Content Marketing, Email Marketing, Web Design, CRO, Analytics
- 💰 **Tiered Pricing** with monthly/annual toggle
- 💳 **Payment Options** section
- ⭐ **Testimonial Slider** with autoplay and touch support
- 📝 **Contact Form** with validation
- 🚀 **Zero Dependencies** - pure HTML, CSS, and vanilla JavaScript
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🌐 **SEO Optimized** - semantic HTML and meta tags

## Quick Start

### Option 1: Using Python (Recommended)

```bash
cd digital-agency-creations
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Option 2: Using Node.js

```bash
cd digital-agency-creations
npx serve .
```

Or install serve globally:

```bash
npm install -g serve
serve .
```

### Option 3: Using PHP

```bash
cd digital-agency-creations
php -S localhost:8080
```

**Important:** This website uses ES modules (`type="module"`), which are blocked by CORS when opening files directly via `file://` protocol. You must use a local server.

## Project Structure

```
digital-agency-creations/
├── index.html              # Main HTML document
├── css/
│   ├── tokens.css          # Design tokens (colors, typography, spacing)
│   ├── reset.css           # Modern CSS reset
│   ├── layout.css          # Section structural layout
│   ├── components.css      # UI components (buttons, cards, forms)
│   ├── animations.css      # Keyframes and scroll-reveal utilities
│   └── responsive.css      # Mobile-first responsive breakpoints
├── js/
│   ├── main.js             # ES module entry point
│   ├── nav.js              # Navigation and mobile menu
│   ├── animations.js       # Scroll reveal animations
│   ├── pricing.js          # Billing toggle functionality
│   ├── counter.js          # Animated stat counters
│   ├── testimonials.js     # Testimonial slider
│   └── form.js             # Contact form validation
└── README.md               # This file
```

## Customization

### Changing Agency Name

The agency name "Digital Agency Creations" is used throughout the site. To change it:

1. **HTML Title**: Update `<title>` tag in `index.html`
2. **Navigation Logo**: Update `.navbar-logo` in `index.html`
3. **Hero Section**: Update hero headline in `index.html`
4. **Footer**: Update footer brand in `index.html`
5. **Contact Email**: Update email address in contact section and footer

### Updating Pricing

Pricing is controlled via HTML `data` attributes. Find the pricing cards in `index.html` and update:

```html
<span class="pricing-amount" data-monthly="997" data-annual="797">997</span>
```

- `data-monthly`: Monthly price
- `data-annual`: Annual price (per month, billed annually)

### Modifying Colors

All colors are defined as CSS custom properties in `css/tokens.css`. Key variables:

```css
:root {
  --color-bg-deep: #050816;              /* Main background */
  --color-accent-primary: #6c63ff;      /* Purple accent */
  --color-accent-secondary: #00d4ff;    /* Cyan accent */
  --color-accent-cta: #ff6b6b;          /* CTA button color */
}
```

### Adding Services

Services are in the `#services` section of `index.html`. Each service card follows this structure:

```html
<div class="card service-card">
  <div class="service-card-icon">ICON</div>
  <h3>Service Name</h3>
  <p>Description</p>
  <ul class="service-card-features">
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
</div>
```

### Updating Team Members

Team cards are in the `#team` section. Update the content while keeping the structure:

```html
<div class="card team-card">
  <div class="team-avatar">Initials</div>
  <h3>Name</h3>
  <p class="role">Position</p>
  <p class="bio">Short bio</p>
  <div class="team-social">...</div>
</div>
```

## Form Integration

The contact form currently simulates submission. To connect it to a backend:

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Get your form ID
3. Update the form tag in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Update `js/form.js` to use the form's native submission or fetch API.

### Option 2: Netlify Forms

If hosting on Netlify, add:

```html
<form id="contact-form" name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- other fields -->
</form>
```

### Option 3: Custom Backend

Update the `handleSubmit` function in `js/form.js` to send data to your API endpoint:

```javascript
async function handleSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      showToast('Message sent successfully!', 'success');
      contactForm.reset();
    }
  } catch (error) {
    showToast('Error sending message', 'error');
  }
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Glassmorphism (`backdrop-filter`) is not supported in Firefox by default. The site includes a `@supports` fallback for unsupported browsers.

## Performance

- Zero external JavaScript dependencies
- No render-blocking scripts
- Fonts loaded with `display=swap`
- CSS animations use only `transform` and `opacity`
- All images are CSS-based (no HTTP requests for avatars/icons)

## Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels on interactive elements
- Visible focus styles
- Keyboard navigation support
- Screen reader friendly
- Color contrast meets WCAG 2.1 AA

## Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

- **Netlify**: Drag and drop the folder or connect Git
- **Vercel**: Import from Git repository
- **GitHub Pages**: Push to `gh-pages` branch
- **Cloudflare Pages**: Connect Git repository

### Traditional Hosting

Upload all files to your web server's public directory (e.g., `public_html` or `www`).

## SEO Optimization

The site includes:

- Semantic HTML structure
- Proper meta tags (description, keywords, Open Graph, Twitter Cards)
- Descriptive page title
- Heading hierarchy (h1 → h2 → h3)
- Alt text on images
- Canonical URL ready (update in `<head>`)

To further optimize SEO:

1. Add your actual domain to the canonical URL
2. Create a `sitemap.xml`
3. Add `robots.txt`
4. Implement structured data (JSON-LD)
5. Add your Google Analytics tracking code

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact Digital Agency Creations:

- Email: hello@digitalagencycreations.com
- Website: https://digitalagencycreations.com

---

Built with ❤️ for Digital Agency Creations
