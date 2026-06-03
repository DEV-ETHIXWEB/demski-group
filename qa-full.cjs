const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const fail = (msg) => results.push('FAIL: ' + msg);
  const pass = (msg) => results.push('PASS: ' + msg);
  const warn = (msg) => results.push('WARN: ' + msg);

  async function openBot(page) {
    await page.goto('http://localhost:4321/');
    await page.waitForSelector('#bot-launcher.launcher-visible', { timeout: 8000 });
    await page.click('#bot-launcher');
    await page.waitForFunction(() => !document.getElementById('bot-messages')?.classList.contains('chat-body--hidden'), { timeout: 3000 });
  }

  // 1280px
  const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await openBot(p);

  const card = await p.locator('.chat-card').boundingBox();
  if (card && card.x >= 0 && card.x + card.width <= 1280) pass('1280px: card fully in viewport');
  else fail('1280px: card clipped');

  const hdr = await p.locator('.chat-header').isVisible();
  if (hdr) pass('Compact header visible'); else fail('Compact header missing');

  const welcomeGone = await p.evaluate(() => document.getElementById('welcome-screen').style.display === 'none');
  if (welcomeGone) pass('Welcome screen auto-dismissed'); else fail('Welcome screen still showing');

  const firstMsg = await p.locator('.bot-msg').first().textContent();
  if (firstMsg.includes('Hi there')) pass('First bot message correct');
  else fail('First bot message wrong: ' + firstMsg.trim());

  const s1count = await p.locator('#step1-btns button').count();
  if (s1count === 4) pass('Step1: 4 buttons'); else fail('Step1: wrong count ' + s1count);

  const s1grid = await p.evaluate(() => getComputedStyle(document.getElementById('step1-btns')).display);
  if (s1grid === 'grid') pass('Step1: grid layout'); else warn('Step1: display=' + s1grid);

  const badgeHidden = await p.evaluate(() => !document.getElementById('launcher-badge').classList.contains('badge-visible'));
  if (badgeHidden) pass('Badge hidden at start'); else fail('Badge wrongly visible');

  const ctaText = await p.locator('.sticky-schedule-btn').textContent();
  if (ctaText.includes('Schedule a Free Consultation')) pass('Schedule CTA text correct');
  else fail('Schedule CTA wrong: ' + ctaText.trim());

  const ctaHref = await p.locator('.sticky-schedule-btn').getAttribute('href');
  if (ctaHref && ctaHref.includes('calendly')) pass('Schedule CTA links to Calendly');
  else fail('Schedule CTA href wrong');

  await p.screenshot({ path: 'qa2-1280-open.png' });

  // Full flow
  await p.locator('#step1-btns button').nth(1).click();
  await p.waitForSelector('#intentOptBtns', { timeout: 5000 });
  const intentCount = await p.locator('#intentOptBtns button').count();
  pass('Intent buttons: ' + intentCount + ' (5 opts + Back)');

  const backVisible = await p.locator('#intentOptBtns .back-btn').isVisible();
  if (backVisible) pass('Back button on intent step'); else fail('Back button missing on intent');

  const backBox = await p.locator('#intentOptBtns .back-btn').boundingBox();
  const svgBox  = await p.locator('#intentOptBtns .back-btn svg').boundingBox();
  const spanBox = await p.locator('#intentOptBtns .back-btn span').boundingBox();
  if (backBox && svgBox && spanBox) {
    const diff = Math.abs((svgBox.y + svgBox.height/2) - (spanBox.y + spanBox.height/2));
    if (diff < 4) pass('Back btn: arrow+text centered (diff=' + diff.toFixed(1) + 'px)');
    else warn('Back btn misaligned by ' + diff.toFixed(1) + 'px');
  }

  await p.locator('#intentOptBtns button').nth(0).click();
  await p.waitForSelector('#cb-typing', { timeout: 2000 });
  pass('Typing indicator appears');
  await p.waitForSelector('#cb-typing', { state: 'detached', timeout: 4000 });
  pass('Typing indicator disappears');

  await p.waitForSelector('#timelineBtns', { timeout: 3000 });
  const tlBack = await p.locator('#timelineBtns .back-btn').isVisible();
  if (tlBack) pass('Back button on timeline'); else fail('Back missing on timeline');

  await p.locator('#timelineBtns button').nth(1).click();
  await p.waitForSelector('#budgetBtns', { timeout: 5000 });
  const budBack = await p.locator('#budgetBtns .back-btn').isVisible();
  if (budBack) pass('Back button on budget'); else fail('Back missing on budget');

  await p.screenshot({ path: 'qa2-budget.png' });

  await p.locator('#budgetBtns button').nth(0).click();
  await p.waitForSelector('#cb-typing', { state: 'detached', timeout: 4000 });

  // Name validation
  await p.fill('#bot-input', 'A');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(1800);
  const nameErr = await p.locator('.bot-msg').last().textContent();
  if (nameErr.includes('full name')) pass('Name validation works'); else fail('Name validation failed: ' + nameErr.trim());

  // Emoji check
  const allText = await p.evaluate(() => [...document.querySelectorAll('.bot-msg')].map(e => e.textContent).join(' '));
  const emojis = [...allText.matchAll(/[\u{1F300}-\u{1F9FF}]/gu)].map(m => m[0]).filter(e => e !== '\u{1F44B}');
  if (emojis.length === 0) pass('No unexpected emojis'); else fail('Unexpected emojis: ' + emojis.join(' '));
  if (!allText.includes('—') && !allText.includes('–')) pass('No em/en dashes');
  else fail('Em/en dash found in bot text');

  await p.fill('#bot-input', 'Akash Sharma');
  await p.keyboard.press('Enter');
  await p.waitForSelector('#cb-typing', { state: 'detached', timeout: 3000 });

  await p.fill('#bot-input', '123');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(1800);
  const phoneErr = await p.locator('.bot-msg').last().textContent();
  if (phoneErr.includes('phone')) pass('Phone validation works'); else fail('Phone validation failed');

  await p.fill('#bot-input', '4069363049');
  await p.keyboard.press('Enter');
  await p.waitForSelector('#cb-typing', { state: 'detached', timeout: 3000 });

  await p.fill('#bot-input', 'bad@email');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(1800);
  const emailErr = await p.locator('.bot-msg').last().textContent();
  if (emailErr.includes('email')) pass('Email validation works'); else fail('Email validation failed');

  await p.fill('#bot-input', 'akash@test.com');
  await p.keyboard.press('Enter');
  await p.waitForSelector('#ctaBtns', { timeout: 6000 });
  const ctaCount = await p.locator('#ctaBtns button').count();
  if (ctaCount === 2) pass('CTA: 2 buttons shown'); else fail('CTA: wrong count ' + ctaCount);
  await p.screenshot({ path: 'qa2-cta.png' });

  // Close/reopen
  await p.locator('#top-close-btn').click();
  await p.waitForTimeout(300);
  const closed = await p.evaluate(() => document.getElementById('lead-bot').style.display);
  if (closed === 'none') pass('Close works'); else fail('Close failed');
  await p.click('#bot-launcher');
  await p.waitForTimeout(600);
  const reopened = await p.evaluate(() => document.getElementById('lead-bot').style.display);
  if (reopened === 'block') pass('Reopen works'); else fail('Reopen failed');

  // 1440px
  const p1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await openBot(p1440);
  const c1440 = await p1440.locator('.chat-card').boundingBox();
  if (c1440 && c1440.x + c1440.width <= 1440) pass('1440px: card in viewport'); else fail('1440px: card clipped');
  await p1440.screenshot({ path: 'qa2-1440.png' });

  // 1920px
  const p1920 = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await openBot(p1920);
  const c1920 = await p1920.locator('.chat-card').boundingBox();
  if (c1920 && c1920.x + c1920.width <= 1920) pass('1920px: card in viewport'); else fail('1920px: card clipped');
  await p1920.screenshot({ path: 'qa2-1920.png' });

  // Mobile 375px
  const pmob = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await pmob.goto('http://localhost:4321/');
  await pmob.waitForSelector('#bot-launcher.launcher-visible', { timeout: 8000 });
  await pmob.click('#bot-launcher');
  await pmob.waitForFunction(() => !document.getElementById('bot-messages')?.classList.contains('chat-body--hidden'), { timeout: 3000 });
  const mobCard = await pmob.locator('.chat-card').boundingBox();
  if (mobCard && mobCard.width >= 370) pass('Mobile 375px: card full width'); else fail('Mobile: card not full width, w=' + (mobCard ? mobCard.width : 'null'));
  const mobOverflow = await pmob.evaluate(() => document.body.scrollWidth > 375);
  if (!mobOverflow) pass('Mobile: no horizontal overflow'); else fail('Mobile: horizontal overflow');
  await pmob.screenshot({ path: 'qa2-mobile.png' });

  // Back button flows
  const pb = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await openBot(pb);
  await pb.locator('#step1-btns button').nth(0).click();
  await pb.waitForSelector('#intentOptBtns', { timeout: 5000 });
  await pb.locator('#intentOptBtns .back-btn').click();
  await pb.waitForSelector('#step1-btns', { timeout: 4000 });
  pass('Back: intent -> step1 restored');

  await pb.locator('#step1-btns button').nth(0).click();
  await pb.waitForSelector('#intentOptBtns', { timeout: 5000 });
  await pb.locator('#intentOptBtns button').nth(0).click();
  await pb.waitForSelector('#timelineBtns', { timeout: 5000 });
  await pb.locator('#timelineBtns .back-btn').click();
  await pb.waitForSelector('#intentOptBtns', { timeout: 4000 });
  pass('Back: timeline -> intent restored');

  await pb.locator('#intentOptBtns button').nth(0).click();
  await pb.waitForSelector('#timelineBtns', { timeout: 5000 });
  await pb.locator('#timelineBtns button').nth(0).click();
  await pb.waitForSelector('#budgetBtns', { timeout: 5000 });
  await pb.locator('#budgetBtns .back-btn').click();
  await pb.waitForSelector('#timelineBtns', { timeout: 4000 });
  pass('Back: budget -> timeline restored');

  // Type during button step
  const pt = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await openBot(pt);
  await pt.locator('#step1-btns button').nth(0).click();
  await pt.waitForSelector('#intentOptBtns', { timeout: 5000 });
  await pt.fill('#bot-input', 'hello');
  await pt.keyboard.press('Enter');
  await pt.waitForTimeout(2500);
  const newIntent = await pt.locator('#intentOptBtns').isVisible().catch(() => false);
  if (newIntent) pass('Typing during step re-renders options'); else warn('Typing during step: options not re-rendered');

  await browser.close();

  // Report
  console.log('\n' + '='.repeat(58));
  console.log('  CHATBOT PRE-DELIVERY QA REPORT');
  console.log('='.repeat(58));
  const passed = results.filter(r => r.startsWith('PASS')).length;
  const failed = results.filter(r => r.startsWith('FAIL')).length;
  const warned = results.filter(r => r.startsWith('WARN')).length;
  results.forEach(r => {
    const pre = r.startsWith('PASS') ? '✅' : r.startsWith('FAIL') ? '❌' : '⚠️ ';
    console.log(pre + ' ' + r.replace(/^(PASS|FAIL|WARN): /, ''));
  });
  console.log('='.repeat(58));
  console.log('  ' + passed + ' passed  |  ' + failed + ' failed  |  ' + warned + ' warnings');
  console.log('  VERDICT: ' + (failed === 0 ? '✅ PASS — READY FOR REVIEW' : '❌ FAIL — DO NOT SHIP'));
  console.log('='.repeat(58));
  if (failed > 0) process.exit(1);
})().catch(e => { console.error('CRASH:', e.message); process.exit(1); });
