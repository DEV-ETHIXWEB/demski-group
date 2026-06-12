const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:4321';

const PAGES = [
  '/', '/about/', '/services/', '/services/custom-development/',
  '/our-clients/', '/blog/', '/results/', '/calculator-form/',
  '/software-cost-calculator/', '/contact-us/', '/careers/', '/privacy-policy/',
  '/technologies/', '/technologies/android/', '/technologies/cloud/',
  '/technologies/dbms/', '/technologies/hybrid/', '/technologies/ios/',
  '/solutions/business-process-automation/', '/solutions/crm-development/',
  '/solutions/custom-business-dashboards/', '/solutions/customer-self-service-portals/',
  '/solutions/data-decision-tools/', '/solutions/digital-transformation/',
  '/solutions/ecommerce/', '/solutions/employee-scheduling/',
  '/solutions/inventory-management-systems/', '/solutions/operations-logistics-software/',
  '/solutions/paid-media/', '/solutions/sales-lead-tracking-tools/',
  '/solutions/technology-consulting/', '/solutions/workflow-automation-solutions/',
  '/services/iot/', '/services/machine-learning/', '/services/maintenance/',
  '/services/ui-ux-design/', '/services/custom-software/',
  '/services/ecommerce-development/', '/services/enterprise-software/',
  '/services/gov/', '/services/qa/', '/services/web/',
];

(async () => {
  const browser = await chromium.launch();
  const allLinks = new Set();
  const consoleErrors = [];

  for (const path of PAGES) {
    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`${path} :: ${msg.text().slice(0, 200)}`);
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(`${path} :: PAGEERROR: ${err.message.slice(0, 200)}`);
    });
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
      const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
      hrefs.forEach(h => {
        if (!h) return;
        if (h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost')) return; // external
        if (h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('#')) return;
        allLinks.add(h.split('#')[0].split('?')[0]);
      });
      // check images on page
      const imgs = await page.$$eval('img', els => els.map(e => ({src: e.currentSrc || e.src, w: e.naturalWidth, h: e.naturalHeight})));
      imgs.forEach(img => {
        if (img.src && img.w === 0 && img.h === 0) {
          consoleErrors.push(`${path} :: BROKEN IMAGE: ${img.src}`);
        }
      });
    } catch (e) {
      console.log('ERR loading ' + path + ': ' + e.message);
    }
    await page.close();
  }

  console.log(`Found ${allLinks.size} unique internal links. Checking status...`);
  const broken = [];
  let count = 0;
  for (const link of allLinks) {
    count++;
    let url = link.startsWith('http') ? link : BASE + link;
    const page = await browser.newPage();
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = resp ? resp.status() : 0;
      if (status >= 400) broken.push(`${link} -> ${status}`);
    } catch (e) {
      broken.push(`${link} -> ERROR: ${e.message.slice(0,100)}`);
    }
    await page.close();
    console.log(`[${count}/${allLinks.size}] ${link}`);
  }

  console.log('--- BROKEN LINKS ---');
  if (broken.length === 0) console.log('None found.');
  else broken.forEach(b => console.log(b));

  console.log('--- CONSOLE ERRORS / PAGE ERRORS / BROKEN IMAGES ---');
  if (consoleErrors.length === 0) console.log('None found.');
  else consoleErrors.forEach(c => console.log(c));

  await browser.close();
})();
