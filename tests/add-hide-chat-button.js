// const puppeteer = require('puppeteer');
// const path = require('path');

import puppeteer from 'puppeteer';
import { addHideChatButton } from '../src/lib/dom.js';

// function addHideChatButton() {
//   console.log('adding hide chat button...');
//   const li = ul.firstElementChild.cloneNode(true);
//   for (const div of li.children) {
//     if (div.getAttribute('role') === 'button' && div.textContent) {
//       div.textContent = 'Hide chat';
//       div.setAttribute('aria-label', 'Hide chat');
//     }
//   }
//   ul.append(li)
// }

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    devtools: true // debug inside page.evaluate (?)
  });

  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:8080/webpages/with-chat-popup.html`);

  console.log(`Current directory: ${process.cwd()}`);
  // emulate entire extension.
  // await page.addScriptTag({
  //   path: './src/main.js',
  //   type: 'module'
  // });

  await page.addScriptTag({
    type: 'module',
    content: `
    import { addHideChatButton } from '/src/lib/dom.js';
    addHideChatButton();
    `
  });

  await page.evaluate();

  // Adding button to context menu functionality.
  await page.evaluate(() => {
    debugger;
    // const observer = new MutationObserver((mutationsList, observer) => {
      
    // });
    // observer.observe(span, { childList: true, subtree: true });
  });
  await page.$eval(
    'div[style*="transform-origin: left top;"] > ul',
    ul => {
    // add listener to <span> that always remains in DOM
    const observer = new MutationObserver((mutationsList, observer) => {
      console.log('MutationObserver triggered: ', mutationsList);
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // add context menu.
          const ul = mutation.addedNodes[0].firstElementChild;
          console.log('found <ul>', ul);
          addHideChatButton(ul);
        }
      }
    })

    const div = ul.parentElement;
    const span = div.parentElement;
    observer.observe(span, { childList: true, subtree: true });

    // remove div
    const divNode = div.cloneNode(true);
    span.removeChild(div);
    span.appendChild(divNode);
  });




  console.log('Closing browser...');
  await browser.close();
})();