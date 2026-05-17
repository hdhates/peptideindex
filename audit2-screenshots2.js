const { chromium } = require('playwright');
const path = require('path');

const outputDir = 'C:\\Users\\hugod\\peptideradar';

async function takeScreenshots() {
  const browser = await chromium.launch();

  // 2b. Desktop homepage — scroll deeper to find supplier cards
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('https://thepeptideradar.com', { waitUntil: 'networkidle' });

    // Log all element IDs and classes to find the right section
    const info = await page.evaluate(() => {
      const els = document.querySelectorAll('[id], section, .container > div');
      return Array.from(els).slice(0, 60).map(el => ({
        tag: el.tagName,
        id: el.id,
        cls: el.className,
        y: el.getBoundingClientRect().top + window.scrollY,
        h: el.offsetHeight
      }));
    });
    console.log('DOM elements:', JSON.stringify(info.slice(0, 40), null, 2));

    await ctx.close();
  }

  await browser.close();
}

takeScreenshots().catch(err => { console.error(err); process.exit(1); });
