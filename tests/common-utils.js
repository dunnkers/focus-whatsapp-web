export async function getContent(browser, selector, url) {
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.$eval(selector, elem => elem.innerHTML);
    await page.close();

    return content;
};

export async function setContent(page, selector, content) {
    await page.$eval(selector, (element, content) => {
        element.innerHTML = content;
    }, content);
}