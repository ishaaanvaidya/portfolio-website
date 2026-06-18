# Ishan Vaidya — Portfolio

Personal portfolio website for Ishan Vaidya, Computer Science undergraduate specializing in Machine Learning, Computer Vision, and Software Engineering.

## Tech Stack

- **Framework:** Next.js 16.2.9 (App Router, static export)
- **UI:** React 19.2.4, Tailwind CSS v4
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **Fonts:** Inter (sans), JetBrains Mono (mono) — via `next/font`
- **Forms:** Formspree

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build (outputs to ./out for static export)
npm run build
```

## Project Structure

```
app/
  layout.tsx          Root layout, metadata, fonts
  page.tsx            Home page (assembles all sections)
  globals.css         Tailwind v4 + theme tokens + keyframes
  components/         Reusable UI (Navbar, ContactForm, StarryBackground, etc.)
  sections/           Page sections (Hero, About, Projects, Skills, Experience, Contact, Footer)
lib/
  utils.ts            cn() class-name merge helper
public/               Static assets (favicon, resume PDF, og-image, sitemap, robots.txt)
next.config.ts        Next.js config (output: "export", trailingSlash: true)
```

## Deployment

This site is configured for **GitHub Pages** via static export (`output: "export"` in `next.config.ts`).

The build output in `out/` is fully static and can be served from any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

Live URL: https://ishanvaidya.github.io/

## Customization

- **Colors:** Edit CSS variables in `app/globals.css` (`--color-background`, `--color-accent`, etc.)
- **Content:** Edit the section files in `app/sections/` (each section's content is hardcoded at the top of the file)
- **Projects:** Edit the `projects` array in `app/sections/Projects.tsx`
- **Skills:** Edit the `skillCategories` array in `app/sections/Skills.tsx`
- **Experience:** Edit the `experiences` array in `app/sections/Experience.tsx`
- **Contact info:** Edit the `contactInfo` array in `app/sections/Contact.tsx` and the Formspree endpoint in `app/components/ContactForm.tsx`

## License

Personal portfolio. Code structure is free to reference; content (name, projects, experience) is personal.
