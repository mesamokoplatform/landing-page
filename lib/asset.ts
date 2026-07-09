// Prefix a public asset path with the deploy basePath. Next's `basePath` only
// auto-prefixes framework-managed assets (_next/*, next/image, next/link) — NOT
// literal string `src` values on our own <video>/<img> tags. On a GitHub Pages
// project subpath (e.g. /landing-page) those raw paths would 404 without this.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH; it's "" for root/custom-domain.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
