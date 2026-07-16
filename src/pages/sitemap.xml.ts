import type { APIRoute } from 'astro';
import { CLIENT_FALLBACKS } from '../data/clientFallbacks';

const SITE = 'https://demskigroup.com';

const STATIC_ROUTES = [
  '/',
  '/about/',
  '/services/',
  '/services/app-development/',
  '/services/custom-development/',
  '/services/custom-software/',
  '/services/ecommerce-development/',
  '/services/enterprise-software/',
  '/services/gov/',
  '/services/iot-development/',
  '/services/machine-learning/',
  '/services/maintenance/',
  '/services/pos-integration/',
  '/services/qa/',
  '/services/staff-augmentation/',
  '/services/ui-ux-design/',
  '/services/web/',
  '/solutions/business-process-automation/',
  '/solutions/crm-development/',
  '/solutions/custom-business-dashboards/',
  '/solutions/customer-self-service-portals/',
  '/solutions/data-decision-tools/',
  '/solutions/digital-transformation/',
  '/solutions/ecommerce/',
  '/solutions/employee-scheduling/',
  '/solutions/inventory-management-systems/',
  '/solutions/operations-logistics-software/',
  '/solutions/paid-media/',
  '/solutions/sales-lead-tracking-tools/',
  '/solutions/technology-consulting/',
  '/solutions/workflow-automation-solutions/',
  '/technologies/',
  '/technologies/android/',
  '/technologies/cloud/',
  '/technologies/dbms/',
  '/technologies/hybrid/',
  '/technologies/ios/',
  '/methodologies/',
  '/careers/',
  '/blog/',
  '/results/',
  '/our-clients/',
  '/contact-us/',
  '/privacy-policy/',
  '/software-cost-calculator/',
  '/calculator-form/',
  '/custom-software-development-experts/',
];

// Fallback case-study slugs — used ONLY if the live WordPress fetch below
// fails, so the sitemap never loses coverage during an API outage. When WP is
// reachable, the full live list replaces these.
const RESULTS_SLUGS_FALLBACK = [
  'making-property-listings-and-home-buying-simpler-with-a-well-organized-online-platform',
  'automating-aircraft-appraisal-with-a-smart-web-platform',
  'combining-campaigns-products-and-communities-in-one-platform',
  'managing-the-complexities-of-vehicle-repossession-with-a-mobile-first-application',
  'making-insect-identification-faster-and-easier-with-ai',
  'transforming-collectible-grading-into-a-more-automated-and-efficient-process',
  'how-to-tame-complex-operations-with-a-custom-erp-solution',
  'building-safer-workplaces-with-smarter-safety-training-and-compliance-tools',
  'bringing-league-operations-under-one-roof',
  'modernizing-home-appraisals-with-a-mobile-workflow-system',
  'helping-a-startup-launch-a-scalable-saas-platform',
  'streamlining-field-operations-with-a-custom-mobile-app',
];

function xmlEscape(url: string) {
  return url.replace(/&/g, '&amp;');
}

function urlTag(loc: string) {
  return `  <url><loc>${xmlEscape(loc)}</loc></url>`;
}

// Fetches every published slug for a WordPress post type, following
// pagination. Tries each host in order; returns null if none respond, so the
// caller can fall back to its hardcoded list. Never throws.
async function fetchAllSlugs(hosts: string[], type: string): Promise<string[] | null> {
  for (const host of hosts) {
    try {
      const collected: string[] = [];
      let page = 1;
      let totalPages = 1;
      do {
        const res = await fetch(`${host}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=slug&orderby=date&order=desc`, {
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) break;
        totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10) || 1;
        const data = await res.json();
        if (!Array.isArray(data)) break;
        for (const item of data) if (item?.slug) collected.push(item.slug);
        page++;
      } while (page <= totalPages && page <= 20);
      if (collected.length) return collected;
    } catch (e) {
      // try the next host
    }
  }
  return null;
}

export const GET: APIRoute = async () => {
  const urls = new Set<string>();

  // Static pages — always included.
  for (const route of STATIC_ROUTES) urls.add(SITE + route);

  // Case studies — live from WordPress (dev WPEngine primary, demskigroup.com
  // fallback) so newly published case studies are indexed automatically. On a
  // total fetch failure, degrade to the previously hardcoded slugs. The live
  // list naturally excludes case studies that no longer exist in WordPress
  // (whose detail pages would 404).
  const resultsSlugs = (await fetchAllSlugs(
    ['https://demskigrdev.wpenginepowered.com', 'https://demskigroup.com'],
    'results',
  )) ?? RESULTS_SLUGS_FALLBACK;
  for (const slug of resultsSlugs) urls.add(`${SITE}/results/${slug}/`);

  // Client pages — live from WordPress, unioned with the known fallback slugs
  // (each fallback slug still renders a valid page via CLIENT_FALLBACKS, so no
  // 404s). New clients are indexed automatically.
  const liveClients = await fetchAllSlugs(
    ['https://demskigroup.com', 'https://demskigrdev.wpenginepowered.com'],
    'our-clients',
  );
  const clientSlugs = liveClients
    ? [...liveClients, ...Object.keys(CLIENT_FALLBACKS)]
    : Object.keys(CLIENT_FALLBACKS);
  for (const slug of clientSlugs) urls.add(`${SITE}/our-clients/${slug}/`);

  // Blog posts — live, following pagination (previously capped at a single
  // page of 100). Empty on failure, matching the prior behavior of omitting
  // blog URLs when WordPress is unreachable.
  const blogSlugs = (await fetchAllSlugs(['https://demskigroup.com'], 'posts')) ?? [];
  for (const slug of blogSlugs) urls.add(`${SITE}/blog/${slug}/`);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(urls).map(urlTag).join('\n')}\n</urlset>\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
