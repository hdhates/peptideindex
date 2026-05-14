const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const b = await chromium.launch();
  const d = await b.newContext({ viewport:{width:1280,height:800}, extraHTTPHeaders:{'Cache-Control':'no-cache'} });
  const p = await d.newPage();
  await p.goto('https://thepeptideradar.com?v=' + Date.now(), { waitUntil:'networkidle', timeout:20000 });
  await p.screenshot({ path:'C:\\Users\\hugod\\peptideradar\\screenshots\\new-full-desktop.png', fullPage:true });
  const m = await b.newContext({ viewport:{width:390,height:844}, extraHTTPHeaders:{'Cache-Control':'no-cache'} });
  const mp = await m.newPage();
  await mp.goto('https://thepeptideradar.com?v=' + Date.now(), { waitUntil:'networkidle', timeout:20000 });
  await mp.screenshot({ path:'C:\\Users\\hugod\\peptideradar\\screenshots\\new-full-mobile.png', fullPage:true });
  await b.close(); console.log('done');
})();
