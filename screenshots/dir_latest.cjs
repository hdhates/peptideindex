const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    bypassCSP: true,
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
  });
  const page = await context.newPage();

  // Navigate to the directory section
  await page.goto('https://thepeptideradar.com/#directory?v=' + Date.now(), {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait for the supplier grid/cards to appear
  await page.waitForTimeout(1500);

  // Try to scroll to the #directory section
  await page.evaluate(() => {
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });

  await page.waitForTimeout(800);

  // Take a full-page screenshot
  await page.screenshot({
    path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\directory_latest.png',
    fullPage: true
  });

  await browser.close();
  console.log('Screenshot saved to directory_latest.png');
})().catch(e => { console.error(e.message); process.exit(1); });
