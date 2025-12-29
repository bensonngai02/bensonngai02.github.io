# Benson Ngai's Personal Website
React + Vite build of bensonngai02.github.io with modular content and markdown-powered writing.

## Development
- Install deps once: `npm install`
- Run locally: `npm run dev` and open the printed localhost URL.
- Production build: `npm run build` (outputs to `dist/`), preview with `npm run preview`.

### Add a blog / writing post
1. Copy `public/blog/welcome-to-the-new-site.md` into `public/blog/your-slug.md`.
2. Update the front matter:
   ```yaml
   ---
   title: "Post title"
   date: "2025-01-01"
   description: "One-liner for the index cards."
   tags: ["tag1", "tag2"]
   archived: false
   ---
   ```
3. Write in Markdown below the front matter. Save and refresh; the post shows up at `/blog/your-slug`.

## Deploying to GitHub Pages
- Build: `npm run build`.
- Publish the `dist/` output to a `gh-pages` branch (e.g., `git subtree push --prefix dist origin gh-pages`) and point GitHub Pages to that branch, or set up a GitHub Action to build and deploy on push.
- The site uses the base `/`, so it serves correctly on bensonngai02.github.io.
- A workflow is included at `.github/workflows/deploy.yml` that builds on `main` and publishes `dist/` to `gh-pages` with the `bensonngai.com` CNAME. Enable GitHub Pages to use the `gh-pages` branch for automatic deploys.
