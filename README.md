# Sofia Silva - Portfolio Website

A personal portfolio website built with Astro + React, showcasing my work as a software engineer.

## Tech Stack

- **Framework:** Astro 4.x
- **UI Library:** React 18 (Islands Architecture)
- **Styling:** Vanilla CSS with CSS Custom Properties
- **Deployment:** GitHub Actions → GitHub Pages
- **Image Optimization:** Astro Image + Sharp

## Key Features

- ⚡ Fast static site generation with minimal JavaScript
- 🎨 Dark/light mode toggle with localStorage persistence
- 📱 Fully responsive design
- ♿ Accessible navigation and smooth scrolling
- 🖼️ Optimized images with automatic WebP conversion
- 🎭 CSS animations (no heavy animation libraries)
- 🔧 Type-safe content collections

## Architecture Highlights

### Dependency Minimalism
Only **5 production dependencies** (79% reduction from previous Gatsby build):
- `astro`
- `react`
- `react-dom`
- `sharp` (for image optimization)
- `@astrojs/react` (dev dependency)

### Component Strategy
- **React Islands** (interactive): Header, MobileMenu, DarkModeToggle
- **Astro Components** (static): Banner, About, Timeline, Portfolio, Footer
- **SVG Icons** (inline): GitHub, LinkedIn, Behance, Link

## Project Structure

```
/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/         # Images (processed by Astro)
│   ├── components/
│   │   ├── react/      # React island components
│   │   ├── icons/      # SVG icon components
│   │   └── *.astro     # Static Astro components
│   ├── content/        # Content collections (markdown)
│   │   ├── hero/
│   │   ├── about/
│   │   ├── experience/
│   │   ├── extra-curricular/
│   │   └── portfolio/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   ├── styles/         # Vanilla CSS modules
│   └── config.ts       # Site configuration
└── package.json
```

## Development

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Content Management

Content is managed through Astro Content Collections in the `src/content/` directory. Each collection has:
- Type-safe schemas defined in `src/content/config.ts`
- Markdown files with frontmatter for structured data
- Automatic validation and TypeScript types

To update content:
1. Edit the markdown files in `src/content/{collection}/index.md`
2. Follow the existing frontmatter structure
3. Run `npm run dev` to see changes instantly

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when you push to the `source` branch.

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `source` branch to trigger deployment

The workflow is defined in `.github/workflows/deploy.yml`.

## Styling

Uses vanilla CSS with CSS Custom Properties for:
- Zero build dependencies for styles
- Future-proof CSS that works forever
- Easy theme customization via CSS variables
- Responsive design with standard media queries

Theme variables are defined in `src/styles/theme.css`:
```css
:root {
  --font-playfair: "Playfair Display", serif;
  --color-primary: #c38352;
  --color-secondary: #71a7b2;
  /* ... */
}
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse scores: 95+ performance, 100 accessibility/best-practices/SEO
- Minimal JavaScript (< 150KB total, mostly React islands)
- Optimized images with responsive srcsets
- Fast initial page load with static HTML

## License

MIT

## Contact

- Email: sofialcfsilva@gmail.com
- GitHub: [@literallysofia](https://github.com/literallysofia)
- LinkedIn: [sofialcfsilva](https://www.linkedin.com/in/sofialcfsilva)

---

Built with [Astro](https://astro.build) and ❤️
