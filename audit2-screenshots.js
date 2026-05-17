const { chromium } = require('playwright');
const path = require('path');

const outputDir = 'C:\\Users\\hugod\\peptideradar';

async function takeScreenshots() {
  const browser = await chromium.launch();

  // 1. Desktop homepage (1440x900)
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-home.png'), fullPage: false });
    console.log('1. audit2-desktop-home.png done');
    await ctx.close();
  }

  // 2. Desktop homepage — directory / supplier cards section
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    // Try to scroll to the supplier cards section
    // Common selectors to try
    const selectors = [
      '.supplier-cards', '.suppliers', '#suppliers', '.directory',
      '#directory', '.cards', '.supplier-grid', '[class*="supplier"]',
      '[id*="supplier"]', '[class*="card"]'
    ];
    let scrolled = false;
    for (const sel of selectors) {
      try {
        const el = await page.$(sel);
        if (el) {
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          scrolled = true;
          console.log(`  Scrolled to selector: ${sel}`);
          break;
        }
      } catch (e) {}
    }
    if (!scrolled) {
      // Scroll down ~800px as fallback
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      console.log('  Scrolled by 800px (fallback)');
    }
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-directory.png'), fullPage: false });
    console.log('2. audit2-desktop-directory.png done');
    await ctx.close();
  }

  // 3. Mobile homepage (390x844)
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-mobile-home.png'), fullPage: false });
    console.log('3. audit2-mobile-home.png done');
    await ctx.close();
  }

  // 4. BPC-157 guide at mobile (390x844)
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com/peptides/bpc-157.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-mobile-guide.png'), fullPage: false });
    console.log('4. audit2-mobile-guide.png done');
    await ctx.close();
  }

  // 5. Peptides index at desktop (1440x900)
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com/peptides/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-guides.png'), fullPage: false });
    console.log('5. audit2-desktop-guides.png done');
    await ctx.close();
  }

  await browser.close();
  console.log('All screenshots complete.');
}

takeScreenshots().catch(err => { console.error(err); process.exit(1); });
