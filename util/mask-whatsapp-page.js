import puppeteer from 'puppeteer';
import { exit } from 'process';
import * as path from 'path';

const PANE_SIDE = '#pane-side';
const MAIN = '#main';
const CHATS = 'div[style*="height"] div[style*="translateY"]';

const args = process.argv.slice(2);
if (!args.length) {
  console.error('First argument must be html path.');
  exit(0);
}
const entry = args[0];

const maskText = async (page, main_element) => {
  // text itself
  await page.$$eval(`${main_element} [dir]`, elems => elems.map(elem => {
    elem.innerHTML = 'foo bar';
  }));

  // title attributes
  await page.$$eval(`${main_element} [title]`, elems => elems.map(elem => {
    elem.title = 'foo bar';
  }));

  // e.g. time stamps
  await page.$$eval(`${main_element} div`, elems => elems.map(elem => {
    if (elem.textContent.trim() && elem.childElementCount === 0) {
      elem.innerHTML = '13:43';
    }
  }));
};

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    devtools: true // debug inside page.evaluate (?)
  });
  const page = await browser.newPage();
  const url = path.resolve(entry);
  await page.goto(`file://${url}`);

  await maskText(page, PANE_SIDE);
  await maskText(page, MAIN);

  // remove images
  await page.$$eval('img[src]', elems => elems.map(elem => 
    elem.parentElement.removeChild(elem)
  ));

  // sort and remove chats except a few
  await page.$$eval(`${PANE_SIDE} ${CHATS}`, elems => {
    elems.sort((elem_a, elem_b) => {
      // e.g. "translateY(720px)" to 720
      const num = str => Number(/(\d)+/g.exec(str)[0])
      const a = num(elem_a.style.transform); 
      const b = num(elem_b.style.transform);
      if (a < b) return -1;
      if (a > b) return 1;
      if (a === b) return 0;
    });
    
    // only keep first n chats
    for (let i = 3; i < elems.length; i++) {
      elems[i].parentElement.removeChild(elems[i]);
    }
  });

  // remove only but the last few chat messages.
  // uses `message-in` and `message-out` classes
  await page.$$eval('[class*=message]', elems => {
    // only keep last n chats
    for (let i = 0; i < elems.length - 3; i++) {
      elems[i].parentElement.removeChild(elems[i]);
    }
  });
  
  // obfuscate all data-id attributes
  await page.$$eval('[data-id]', elems => elems.map((elem, i) => {
    elem.setAttribute('data-id', i)
  }));

  // remove all data-pre-plain-text attributes
  await page.$$eval('[data-pre-plain-text]', elems => 
    elems.forEach(elem =>
      elem.removeAttribute('data-pre-plain-text')
    )
  );

  // remove all <script> tags
  await page.$$eval('script', elems =>
    elems.forEach(elem =>
      elem.parentElement.removeChild(elem)
    )
  );

  // inject extension
  await page.addScriptTag({
    type: 'module',
    content: `
      import { addHideChatButton, addListeners } from '/src/lib/dom.js';
      addListeners();
      addHideChatButton();
    `
  });
  
  const content = await page.content();
  await browser.close();
  console.log(content);
})();