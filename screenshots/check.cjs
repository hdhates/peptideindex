const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const b = await chromium.launch();
  const d = await b.newContext({ viewport: { width: 1280, height: 800 }, extraHTTPHeaders: {'Cache-Control':'no-cache'} });
  const dp = await d.newPage();
  await dp.goto('https://thepeptideradar.com', { waitUntil: 'networkidle', timeout: 20000 });
  await dp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\hero-check.png' });
  await dp.evaluate(() => window.scrollTo(0, 2800));
  await new Promise(r=>setTimeout(r,300));
  await dp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\suppliers-section.png' });
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, extraHTTPHeaders: {'Cache-Control':'no-cache'} });
  const mp = await m.newPage();
  await mp.goto('https://thepeptideradar.com', { waitUntil: 'networkidle', timeout: 20000 });
  await mp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\hero-mobile-check.png' });
  await b.close();
  console.log('done');
})();
