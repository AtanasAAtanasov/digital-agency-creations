# Quick Start Guide

## 5 Steps to Launch Your Digital Agency Creations Website

### 1. Run a Local Server

**Option A: Python (Easiest)**
```bash
cd digital-agency-creations
python3 -m http.server 8080
```

**Option B: Node.js**
```bash
cd digital-agency-creations
npx serve .
```

**Option C: PHP**
```bash
cd digital-agency-creations
php -S localhost:8080
```

### 2. Open in Browser

Navigate to: `http://localhost:8080`

### 3. Test the Website

- Scroll through all sections
- Test mobile menu (resize browser to mobile width)
- Try pricing toggle (monthly/annual)
- Test contact form validation
- Check testimonial slider
- Verify responsive design at different widths

### 4. Customize (Optional)

Edit any of these files to customize:
- **Content**: `index.html`
- **Colors**: `css/tokens.css`
- **Services**: Find `.service-card` in `index.html`
- **Pricing**: Find `.pricing-card` in `index.html`
- **Team**: Find `.team-card` in `index.html`

### 5. Deploy

**Netlify (Quickest):**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `digital-agency-creations` folder
3. Your site is live!

**Vercel:**
1. Push code to GitHub
2. Import project in Vercel
3. Deploy!

**GitHub Pages:**
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch
4. Done!

## Need Help?

See `README.md` for detailed documentation and customization guide.

## Important Notes

⚠️ **ES Modules**: This website uses ES modules (`type="module"`), which means you **must use a local server**. Opening `index.html` directly via `file://` protocol won't work due to browser security restrictions.

🎨 **Glassmorphism**: The glassmorphism effect (`backdrop-filter`) works in Chrome, Edge, and Safari. Firefox has a fallback to solid backgrounds.

📱 **Responsive**: Test on mobile devices or use browser DevTools responsive mode to see all breakpoints.

## Common Issues

**Q: I see a blank page or nothing loads**
A: Make sure you're running a local server (see Step 1). The file:// protocol won't work.

**Q: Navigation doesn't scroll to sections**
A: Ensure the server is running and you're accessing via localhost or your deployed URL.

**Q: Styles look broken**
A: Check that all CSS files are in the `css/` folder and linked correctly in `index.html`.

**Q: JavaScript not working**
A: Open browser DevTools (F12) and check the Console for errors. Ensure you're using a local server.

---

Ready to launch! 🚀
