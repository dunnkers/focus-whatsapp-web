import puppeteer from 'puppeteer';
import { getContent, setContent } from './common-utils.js';
import { APP_CONTENT, MENU_SPAN } from '../src/lib/contants.js';

const LOADING = 'http://127.0.0.1:8080/tests/webpages/loading.html';
const LOADED = 'http://127.0.0.1:8080/tests/webpages/loaded.html';
const MENU = 'http://127.0.0.1:8080/tests/webpages/menu.html';

(async () => {
    const browser = await puppeteer.launch({ devtools: true });
    const page = await browser.newPage();
    await page.goto(LOADING);

    console.log('Loading 500 milliseconds...');
    await page.waitForTimeout(500);

    console.log('Mimicking WhatsApp loaded event...');
    const loaded = await getContent(browser, APP_CONTENT, LOADED);
    await setContent(page, APP_CONTENT, loaded);

    console.log('Mimicking opening chat menu...');
    const menu = await getContent(browser, MENU_SPAN, MENU);
    await setContent(page, MENU_SPAN, menu);

    console.log('Closing browser...');
    await browser.close();
})();