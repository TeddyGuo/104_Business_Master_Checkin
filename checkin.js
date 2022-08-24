const puppeteer = require('puppeteer');
const config = require('./config/default.json');

(async () => {
    const browser = await puppeteer.launch({
        // Sets the headless field as false to enable brwoser, otherwise it will run in background
        headless: false,
        product: 'chrome',
        ignoreHTTPSErrors: true,
        defaultViewport: null
    })

    const page = await browser.newPage();
    // Login
    await page.goto(config.urls.login);
    // Types the email
    await page.waitForSelector('input[data-qa-id=loginUserName]')
    await page.focus('input[data-qa-id=loginUserName]');
    await page.keyboard.type(config.user.username);
    // Types the password
    await page.waitForSelector('input[data-qa-id=loginPassword]')
    await page.focus('input[data-qa-id=loginPassword]');
    await page.keyboard.type(config.user.password);
    // Enters the page for the selection of product
    await page.click('[data-qa-id=loginButton]');
    // Goes to 104 Business Master
    await page.waitForSelector('.Product__product');
    await page.click('.Product__product');
    // Goes to the page of private secretary
    await page.goto(config.urls.checkin);
    // Clocks in or out
    await page.waitForSelector('span[class="btn btn-white btn-lg btn-block"]')
    await page.click('span[class="btn btn-white btn-lg btn-block"]')
    // Puts the screenshot to the records directory with the time to denote
    // Wait for 60 seconds
    await page.waitForTimeout(60000)
    var date = new Date();
    const formatDate = (curr_date) => {
        let fmt_date = curr_date.getFullYear() + "-" + (curr_date.getMonth() + 1) + "-" + curr_date.getDate() + "_" +
                                curr_date.getHours() + ":" + curr_date.getMinutes() + ":" + curr_date.getSeconds();
        return fmt_date;
    }
    await page.screenshot({path: './records/' + formatDate(date) + '.png'});
    // Closes the browser
    await browser.close();
})();
