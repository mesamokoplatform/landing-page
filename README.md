# Mesa Moko — Landing Page

A static replica of [mesamoko.com](https://mesamoko.com), rebuilt from the app's own IP as a
standalone Next.js site. This is a homepage clone (structure, copy, and media sourced from the
live site) — not a fork of the production app. It is consumed by the `mesamoko` meta-repo as the
`landing-page` submodule and deploys itself to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Tests

```bash
npm test
```

Runs the Vitest suite (component + rendering + asset-path tests).

## Refreshing media

Video and image assets under `public/` are fetched from the live site. To re-fetch:

```bash
./scripts/fetch-assets.sh
```

## Environment variables (waitlist forms)

The site has two waitlist forms (restaurant + diner), each submitting via
[Web3Forms](https://web3forms.com). Each form needs its own access key, injected at build time:

| Env var | Destination |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY_RESTAURANT` | `restaurant@mesamoko.com` |
| `NEXT_PUBLIC_WEB3FORMS_KEY_DINER` | `diners@mesamoko.com` |

Copy `.env.example` to `.env.local` and fill in real keys for local testing (create free keys at
web3forms.com — one per destination address).

If a key is missing or empty, the corresponding form degrades to a "not yet configured" state
instead of submitting — the site still builds and renders without the keys set.

In CI/deploy, the same two variables are read from **repository secrets** `WEB3FORMS_KEY_RESTAURANT`
and `WEB3FORMS_KEY_DINER` (see the deploy workflow).

## Base path (GitHub Pages project sites)

A GitHub Pages **project** site is served from a subpath, e.g.
`https://<org>.github.io/landing-page/`. Next's `basePath` handles framework assets, and
`lib/asset.ts` prefixes the raw `<video>`/`<img>` `src` paths, both driven by one env var:

- `NEXT_PUBLIC_BASE_PATH=/landing-page` — set by the deploy workflow for the project-page URL.
- Leave it **unset/empty** for a root/user-org page or a custom domain.

```bash
# local production preview matching the deployed subpath
NEXT_PUBLIC_BASE_PATH=/landing-page npm run build && npx serve out
```

## Static export / GitHub Pages

Fully static export (`output: "export"`) — no server runtime:

- `next build` emits static HTML/CSS/JS to `out/`.
- `images.unoptimized: true` — no image optimization server on Pages.
- `public/.nojekyll` (copied into `out/`) disables Jekyll so `_next/` is served as-is.
- **Custom domain:** add a `public/CNAME` file with the domain and clear `NEXT_PUBLIC_BASE_PATH`
  in the workflow, then configure DNS per
  [GitHub's docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

### Enabling GitHub Pages

1. This repo must be **public** (GitHub Pages is free only on public repos) or on a paid plan.
2. **Settings → Pages → Source**: select **GitHub Actions**.
3. Add repository secrets under **Settings → Secrets and variables → Actions**:
   `WEB3FORMS_KEY_RESTAURANT`, `WEB3FORMS_KEY_DINER`.
4. Push to `main` (or **Actions → Deploy to GitHub Pages → Run workflow**) —
   `.github/workflows/deploy.yml` builds and deploys `out/`.
