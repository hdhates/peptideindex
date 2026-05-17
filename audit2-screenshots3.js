const { chromium } = require('playwright');
const path = require('path');

const outputDir = 'C:\\Users\\hugod\\peptideradar';

async function takeScreenshots() {
  const browser = await chromium.launch();

  // 2b. Desktop — click Directory nav link, then screenshot supplier grid
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });

    // Click the Directory nav link
    await page.click('text=Directory');
    await page.waitForTimeout(800);

    // Screenshot the full visible directory page
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-directory.png'), fullPage: false });
    console.log('2b. audit2-desktop-directory.png done (Directory page)');

    // Also scroll down to show supplier cards and screenshot again
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-directory-scrolled.png'), fullPage: false });
    console.log('2c. audit2-desktop-directory-scrolled.png done');

    await ctx.close();
  }

  await browser.close();
  console.log('Done.');
}

takeScreenshots().catch(err => { console.error(err); process.exit(1); });
