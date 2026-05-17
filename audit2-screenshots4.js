const { chromium } = require('playwright');
const path = require('path');
const outputDir = 'C:\\Users\\hugod\\peptideradar';

async function go() {
  const browser = await chromium.launch();

  // Full-page desktop homepage
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-home-full.png'), fullPage: true });
    console.log('desktop home full done');
    await ctx.close();
  }

  // Full-page mobile homepage
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-mobile-home-full.png'), fullPage: true });
    console.log('mobile home full done');
    await ctx.close();
  }

  // Full-page BPC-157 mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com/peptides/bpc-157.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-mobile-guide-full.png'), fullPage: true });
    console.log('mobile guide full done');
    await ctx.close();
  }

  // Full-page desktop guides
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com/peptides/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-guides-full.png'), fullPage: true });
    console.log('desktop guides full done');
    await ctx.close();
  }

  // Full-page desktop directory
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });
    await page.click('text=Directory');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, 'audit2-desktop-directory-full.png'), fullPage: true });
    console.log('desktop directory full done');
    await ctx.close();
  }

  await browser.close();
  console.log('All done.');
}

go().catch(err => { console.error(err); process.exit(1); });
