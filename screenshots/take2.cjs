const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const browser = await chromium.launch();
  
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mobile.newPage();
  await mp.goto('https://thepeptideradar.com', { waitUntil: 'networkidle', timeout: 25000 });
  await mp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\after-mobile-top.png' });
  await mp.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r=>setTimeout(r,300));
  await mp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\after-mobile-guides.png' });
  await mp.evaluate(() => window.scrollTo(0, 2000));
  await new Promise(r=>setTimeout(r,300));
  await mp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\after-mobile-lower.png' });

  const desk = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const dp = await desk.newPage();
  await dp.goto('https://thepeptideradar.com', { waitUntil: 'networkidle', timeout: 25000 });
  await dp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\after-desktop-top.png' });
  await dp.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r=>setTimeout(r,300));
  await dp.screenshot({ path: 'C:\\Users\\hugod\\peptideradar\\screenshots\\after-desktop-guides.png' });
  
  await browser.close();
  console.log('done');
})().catch(e=>{console.error(e.message);process.exit(1)});
