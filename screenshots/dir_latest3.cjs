const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    bypassCSP: true,
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
  });
  const page = await context.newPage();

  await page.goto('https://thepeptideradar.com/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(1000);

  // Find the directory section's Y offset
  const sectionTop = await page.evaluate(() => {
    const el = document.getElementById('directory');
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  });
  console.log('directory section top:', sectionTop);

  // Scroll to it
  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, sectionTop || 600);

  await page.waitForTimeout(1200);

  // Take a viewport screenshot
  await page.screenshot({
    path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\directory_latest.png',
    fullPage: false
  });

  await browser.close();
  console.log('Screenshot saved to directory_latest.png');
})().catch(e => { console.error(e.message); process.exit(1); });
