# Site Flow — No-Code Website Builder

Build stunning, professional websites without writing code.

## Features

- **Visual Page Builder** — Drag-and-drop interface with inline editing
- **4 Section Types** — Hero, About, Gallery, Contact
- **Theme Customization** — Colors, fonts, real-time preview
- **SEO Tools** — Custom titles, meta descriptions
- **Responsive Design** — Desktop & mobile preview
- **One-Click Publish** — Instant publishing on subdomain
- **Custom Domains** — Connect your own domain (mock)
- **Demo Account** — `demo@siteflow.app` / `demo123`

## Quick Start

1. Open `index.html` in any browser
2. Sign in with the demo account or create a new one
3. Click **New Site** to start building
4. Edit content inline, customize colors/fonts
5. Click **Publish** to go live
6. Share your public URL: `{slug}.siteflow.app`

## Tech Stack

- Vanilla JavaScript (no frameworks)
- CSS Custom Properties for theming
- localStorage for data persistence
- Hash-based SPA routing

## Project Structure

```
├── index.html          # Entry point
├── css/style.css       # All styles
├── js/
│   ├── storage.js      # localStorage wrapper
│   ├── auth.js         # Authentication + demo seed
│   ├── templates.js    # HTML template engine
│   ├── builder.js      # Page builder logic
│   └── app.js          # Router, Dashboard, Toast
├── assets/             # Images & icons
└── README.md
```

## License

MIT
