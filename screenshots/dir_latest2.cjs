const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    bypassCSP: true,
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
  });
  const page = await context.newPage();

  // Navigate to the page
  await page.goto('https://thepeptideradar.com/?v=' + Date.now(), {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(1000);

  // Scroll to the #directory section
  await page.evaluate(() => {
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });

  await page.waitForTimeout(1000);

  // Take a viewport screenshot (not full page) — captures what's visible at the directory section
  await page.screenshot({
    path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\directory_latest.png',
    fullPage: false
  });

  await browser.close();
  console.log('Screenshot saved to directory_latest.png');
})().catch(e => { console.error(e.message); process.exit(1); });
