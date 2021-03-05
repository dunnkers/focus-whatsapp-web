import puppeteer from 'puppeteer';
import { addListeners } from '../src/lib/dom.js';


(async () => {
    const browser = await puppeteer.launch({ devtools: true });
    const page = await browser.newPage();



    // await page.on('load', () => console.log('Page loaded!'));
    // page.on('framenavigated', frame => {
    //     console.log("navi!!! ");
    //     if (frame.parentFrame() === null) {
    //         console.log("Puppeteer nav frame: ");
    //         console.log(frame._url);
    //     }
    // });
    // page.on('frameattached', frame => {
    //     console.log("frameattached!!! ");
    // });
    // page.on('domcontentloaded', () => console.log('domcontentloaded'));
    // await page.evaluateOnNewDocument(async () => {
    //     console.log('page reload?');
    //     const doc = window.document;
    //     // const script = doc.createElement('script');
    //     // script.setAttribute("type", "module");
    //     // script.setAttribute("src", "/src/lib/dom.js");
    //     // const head = doc.head
    //     //     || doc.getElementsByTagName("head")[0]
    //     //     || doc.documentElement
    //     //     || doc;
    //     // head.insertBefore(script, head.lastChild);
    // });



    await page.goto(`http://127.0.0.1:8080/tests/webpages/loading.html`);
    console.log('Loading 500 milliseconds...');
    await page.waitForTimeout(500);

    const loaded_page = await browser.newPage();
    await loaded_page.goto(`http://127.0.0.1:8080/tests/webpages/with-chat-opened.html`);
    const loaded_body = await loaded_page.$eval('.app-wrapper-web', elem => elem.innerHTML);
    await loaded_page.close();

    console.log('Mimicking WhatsApp loaded event...');
    await page.$eval('.app-wrapper-web', (app, loaded_body) => {
        app.innerHTML = loaded_body;
        debugger;
        console.log(app)
    }, loaded_body);
    // await page.goto(`http://127.0.0.1:8080/tests/webpages/with-chat-opened.html`);
    // const injectTag = async () => {
    //     console.log('injecting tag');
    //     await page.addScriptTag({
    //         type: 'module',
    //         content: `import { addListeners } from '/src/lib/dom.js';
    //                 addListeners();`
    //     });
    //     return 'ok';
    // };
    // await injectTag();
    // // await page.once('load')
    // await page.exposeFunction('injectTag', injectTag);





    // const appWrapper = await page.$('.app-wrapper-web');
    // await page.exposeFunction('addListeners', addListeners);
    // await page.exposeFunction('addListeners', addListeners);
    // console.log(addListeners);
    // await page.evaluate(addListeners);
    // await page.evaluate(async () => {
    //     debugger;
    //     await window.addListeners(window.$);
    // });
    // const aHandle = await page.evaluateHandle('document');

    console.log('Closing browser...');
    await browser.close();
})();