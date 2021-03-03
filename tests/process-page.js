const puppeteer = require('puppeteer');
const path = require('path');

const ENTRY = './saved-whatsapp-page/WhatsApp.htm';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = path.resolve(ENTRY);
  await page.goto(`file://${url}`);
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();