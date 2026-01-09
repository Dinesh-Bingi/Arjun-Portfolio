# SPA Routing Configuration

This portfolio uses Single Page Application (SPA) routing with the History API.

## Hosting Configuration Files

The following files ensure SPA routing works correctly on different hosting platforms:

### Netlify / Cloudflare Pages
- `public/_redirects` - Redirects all routes to `index.html`

### Vercel
- `vercel.json` - Rewrites all routes to `index.html`

### Apache
- `public/.htaccess` - Apache mod_rewrite rules for SPA fallback

## Development

Vite dev server automatically handles SPA routing - no additional configuration needed.

## Production Deployment

Ensure the appropriate configuration file is deployed with your build:
- Netlify/Cloudflare Pages: `_redirects` file
- Vercel: `vercel.json` file
- Apache: `.htaccess` file

## Features

- ✅ Direct links to `/projects/project-id` work
- ✅ Page reload (Ctrl+R) works on any route
- ✅ Browser back/forward navigation works correctly
- ✅ Hero video resumes when returning to landing page
- ✅ Project videos reset properly when switching projects
