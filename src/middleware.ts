import { defineMiddleware } from 'astro:middleware';

// Adds baseline security response headers to every SSR response. These are
// HTTP metadata only — they do not change any rendered HTML, styling, or
// behavior. Deliberately NO Content-Security-Policy here: a strict CSP could
// block the embedded chatbot script, inline JSON-LD, fonts, or images, which
// would risk the design/functionality. CSP can be added later with careful
// per-source testing.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Prevent MIME-type sniffing.
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Disallow the site being framed by other origins (clickjacking guard).
  // The chatbot loads via <script>, not an iframe, so this does not affect it.
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  // Send only the origin as referrer on cross-origin navigations.
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Force HTTPS for this host for a year. No includeSubDomains, to avoid
  // affecting any HTTP-only sibling subdomains under a future custom domain.
  response.headers.set('Strict-Transport-Security', 'max-age=31536000');

  // Staging guard: the *.amplifyapp.com preview domain must not be indexed by
  // search engines as duplicate content against the real production site
  // (demskigroup.com). Emit noindex ONLY for that host — the production custom
  // domain, when attached, is unaffected and stays fully indexable.
  if (context.url.hostname.endsWith('amplifyapp.com')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
});
