const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');

(async () => {
  const br = await chromium.launch();
  const pg = await br.newPage();
  pg.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await pg.setViewportSize({width:1440,height:900});
  // directory full scroll
  await pg.goto('http://localhost:8765/',{waitUntil:'networkidle'});
  await pg.waitForTimeout(800);
  await pg.evaluate(()=>{ if(window.showPage) window.showPage('directory'); });
  await pg.waitForTimeout(600);
  await pg.screenshot({path:'C:\\Users\\hugod\\peptideradar\\screenshots\\guide_final.png',fullPage:true});

  // guide page
  await pg.goto('http://localhost:8765/peptides/bpc-157.html',{waitUntil:'networkidle'});
  await pg.waitForTimeout(800);
  await pg.screenshot({path:'C:\\Users\\hugod\\peptideradar\\screenshots\\guide_final_mobile.png',fullPage:true});

  await br.close();
  console.log('done');
})();
