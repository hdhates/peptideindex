const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    bypassCSP: true,
    extraHTTPHeaders: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
  });
  const page = await context.newPage();

  // Navigate directly to #directory hash
  await page.goto('https://thepeptideradar.com/#directory', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);

  // Check what's visible
  const visible = await page.evaluate(() => {
    const dir = document.getElementById('directory');
    const grid = document.getElementById('supplier-grid');
    const dirStyle = dir ? window.getComputedStyle(dir) : null;
    const gridStyle = grid ? window.getComputedStyle(grid) : null;
    return {
      dirDisplay: dirStyle ? dirStyle.display : 'no-el',
      dirVisibility: dirStyle ? dirStyle.visibility : '',
      gridDisplay: gridStyle ? gridStyle.display : 'no-el',
      gridChildren: grid ? grid.children.length : 0,
      hash: window.location.hash
    };
  });
  console.log('State:', JSON.stringify(visible, null, 2));

  // Take screenshot as-is
  await page.screenshot({
    path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\directory_latest.png',
    fullPage: false
  });

  // Also try clicking the Directory nav link if directory isn't shown
  if (visible.dirDisplay === 'none' || visible.gridChildren === 0) {
    console.log('Directory not visible, clicking nav link...');
    await page.click('a[href="#directory"], a[data-section="directory"], #nav-links a:has-text("Directory")');
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\directory_latest.png',
      fullPage: false
    });
  }

  await browser.close();
  console.log('Done');
})().catch(e => { console.error(e.message); process.exit(1); });
