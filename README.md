# literallysofia.github.io

Personal portfolio website built with [Astro](https://astro.build), showcasing my work as a software engineer and designer. ✨

🔗 **Live:** [literallysofia.github.io](https://literallysofia.github.io)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5.x |
| Styling | Vanilla CSS + Custom Properties |
| Images | Astro Image + Sharp |
| Deployment | GitHub Actions &rarr; GitHub Pages |

## ⚡ Features

- 🌗 Dark/light mode with `localStorage` persistence
- 📱 Responsive design across all breakpoints
- 🖼️ Optimized images with automatic WebP conversion and lazy loading
- 🎨 CSS-only animations (no heavy libraries)
- 🔒 Type-safe content collections with Zod schemas
- 🔀 View transitions for smooth page navigation
- 🔐 Optional password-protected access gate
- 📄 Encrypted CV download (AES-256-GCM + PBKDF2)
- 📜 Scroll-triggered timeline animations

## 📁 Project Structure

```
/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
├── public/                     # Static assets (favicon, encrypted CV)
├── scripts/
│   └── encrypt-cv.mjs          # CV encryption utility
├── src/
│   ├── assets/                 # Images (processed by Astro)
│   ├── components/
│   │   ├── *.astro             # Astro components
│   │   └── icons/              # SVG icon components
│   ├── content/                # Content collections
│   │   ├── hero/               # Homepage hero
│   │   ├── about/              # Education, languages
│   │   ├── experience/         # Work timeline
│   │   ├── extra-curricular/   # Volunteering, speaking
│   │   ├── portfolio/          # Side projects
│   │   └── *.md                 # Collection markdown files
│   ├── layouts/
│   │   └── Layout.astro        # Base layout
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── about.astro         # About
│   │   ├── work.astro          # Work experience
│   │   ├── misc.astro          # Extra-curricular & projects
│   │   └── 404.astro           # Not found
│   ├── styles/                 # CSS modules
│   │   ├── theme.css           # Design tokens & dark/light mode
│   │   ├── global.css          # Global styles
│   │   ├── animations.css      # Animation definitions
│   │   └── ...                 # Component styles
│   ├── content.config.ts       # Collection schemas (glob loaders)
│   └── config.ts               # Site metadata
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

### 📋 Available Scripts

| Script | Description |
|--------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run encrypt-cv` | Encrypt CV PDF (requires `CV_PASSWORD` env var) |

### 🔑 Environment Variables

See `.env.example` for available options:

- `PUBLIC_SITE_PASSWORD` &mdash; password for the access gate
- `PUBLIC_ENABLE_PASSWORD_GATE` &mdash; force-enable gate in dev mode
- `CV_PASSWORD` &mdash; password for CV encryption/decryption

### ✏️ Content Management

Content lives in `src/content/` as Markdown files with typed frontmatter. Schemas are defined in `src/content.config.ts`.

To update content, edit the Markdown files under the relevant collection directory and changes will reflect immediately in dev mode.

## 🌐 Deployment

Pushes to the `source` branch trigger a GitHub Actions workflow that builds and deploys to GitHub Pages.

To set up:

1. Go to repository **Settings** &rarr; **Pages**
2. Set Source to **GitHub Actions**
3. Add `PUBLIC_SITE_PASSWORD` as a repository secret (if using the password gate)

## 📝 License

MIT
