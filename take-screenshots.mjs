import { chromium, devices } from 'playwright';

const iPhone14 = devices['iPhone 14'];
const outputDir = 'C:\\Users\\hugod\\peptideradar';

async function run() {
  const browser = await chromium.launch();

  // 1. Homepage
  {
    const context = await browser.newContext({ ...iPhone14 });
    const page = await context.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outputDir}\\mobile-home.png`, fullPage: true });
    console.log('Saved mobile-home.png');
    await context.close();
  }

  // 2. Homepage with nav open
  {
    const context = await browser.newContext({ ...iPhone14 });
    const page = await context.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    // Try common hamburger selectors
    const hamburgerSelectors = [
      'button[aria-label*="menu" i]',
      'button[aria-label*="nav" i]',
      '.hamburger',
      '.menu-toggle',
      '.nav-toggle',
      '#nav-toggle',
      '#menu-toggle',
      '[data-toggle="nav"]',
      '.burger',
      'button.mobile-menu',
      'nav button',
      'header button',
    ];
    let clicked = false;
    for (const sel of hamburgerSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 1000 })) {
          await el.click();
          await page.waitForTimeout(600);
          clicked = true;
          console.log(`Clicked hamburger with selector: ${sel}`);
          break;
        }
      } catch {}
    }
    if (!clicked) {
      console.log('WARNING: Could not find hamburger button — screenshotting without nav open');
    }
    await page.screenshot({ path: `${outputDir}\\mobile-nav-open.png`, fullPage: true });
    console.log('Saved mobile-nav-open.png');
    await context.close();
  }

  // 3. BPC-157 guide
  {
    const context = await browser.newContext({ ...iPhone14 });
    const page = await context.newPage();
    await page.goto('https://thepeptideradar.com/peptides/bpc-157.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outputDir}\\mobile-guide.png`, fullPage: true });
    console.log('Saved mobile-guide.png');
    await context.close();
  }

  // 4. Guides index
  {
    const context = await browser.newContext({ ...iPhone14 });
    const page = await context.newPage();
    await page.goto('https://thepeptideradar.com/peptides/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outputDir}\\mobile-guides-index.png`, fullPage: true });
    console.log('Saved mobile-guides-index.png');
    await context.close();
  }

  // 5. Advertise page
  {
    const context = await browser.newContext({ ...iPhone14 });
    const page = await context.newPage();
    await page.goto('https://thepeptideradar.com/advertise.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outputDir}\\mobile-advertise.png`, fullPage: true });
    console.log('Saved mobile-advertise.png');
    await context.close();
  }

  await browser.close();
  console.log('All screenshots done.');
}

run().catch(err => { console.error(err); process.exit(1); });
