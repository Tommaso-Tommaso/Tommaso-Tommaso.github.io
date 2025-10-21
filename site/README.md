# Coastal Community of St. John of the Cross

A clean folder you can run locally.

## Run locally
- Double-click `site/index.html` to open in your browser.
- Or use a simple server:
  - PowerShell: `python -m http.server 5500` and open http://localhost:5500/site/

## Structure
- `site/index.html` — Home page
- `site/our-community.html`, `site/carmelite-saints.html`, `site/formation.html`, `site/resources.html`, `site/contact.html`
- `site/assets/css/styles.css`

## Notes
- Fonts are loaded from Google Fonts.
- The hero image uses a public Wikimedia URL; replace with a local image by putting it in `site/assets/images/` and updating `.hero { background-image: url('assets/images/your-image.jpg') }` in `styles.css`.
