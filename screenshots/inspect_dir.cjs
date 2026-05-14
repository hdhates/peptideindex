const { chromium } = require('C:\\Users\\hugod\\AppData\\Roaming\\npm\\node_modules\\playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('https://thepeptideradar.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    // Find all sections/divs with IDs
    const ids = Array.from(document.querySelectorAll('[id]')).map(el => ({
      tag: el.tagName,
      id: el.id,
      top: el.getBoundingClientRect().top + window.scrollY,
      text: el.innerText ? el.innerText.substring(0, 80) : ''
    }));
    // Total page height
    const totalH = document.body.scrollHeight;
    return { ids, totalH };
  });

  console.log('Page height:', info.totalH);
  console.log('Elements with IDs:');
  info.ids.forEach(e => console.log(`  #${e.id} (${e.tag}) top=${e.top} | "${e.text.replace(/\n/g,' ')}"`));

  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
