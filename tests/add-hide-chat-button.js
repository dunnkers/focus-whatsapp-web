const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    devtools: true // debug inside page.evaluate (?)
  });

  const page = await browser.newPage();
  const url = path.resolve('./webpages/with-chat-popup.html');
  await page.goto(`file://${url}`);

  await page.$eval('div[style*="transform-origin: left top;"] ul', ul => {
    const li = ul.firstElementChild.cloneNode(true);
    for (let div of li.children) {
      if (div.getAttribute('role') === 'button' && div.textContent) {
        div.textContent = 'Hide chat';
        div.setAttribute('aria-label', 'Hide chat');
      }
    }
    ul.append(li)
  });

  await browser.close();
})();