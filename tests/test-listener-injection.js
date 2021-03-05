import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ devtools: true });
    const page = await browser.newPage();



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




    console.log('Closing browser...');
    await browser.close();
})();