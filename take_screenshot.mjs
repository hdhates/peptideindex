import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

// Set a wide viewport to capture the full grid
await page.setViewportSize({ width: 1440, height: 900 });

console.log('Navigating to https://thepeptideradar.com/#directory ...');
await page.goto('https://thepeptideradar.com/#directory', { waitUntil: 'networkidle', timeout: 30000 });

// Wait for the supplier grid to appear
console.log('Waiting for supplier grid...');
try {
  await page.waitForSelector('.supplier-card, .supplier-grid, [class*="supplier"], [class*="card"], .grid', { timeout: 15000 });
} catch (e) {
  console.log('Selector timeout, proceeding anyway...');
}

// Extra wait to ensure JS renders
await page.waitForTimeout(3000);

console.log('Taking screenshot...');
await page.screenshot({
  path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\directory_v2.png',
  fullPage: true
});

await browser.close();
console.log('Done.');
