const puppeteer = require('puppeteer');
const username = 'username';
const root_path = '/home/' + username + '/104_Business_Master_Checkin/';
const config = require(root_path + 'config/default.json');

try {
    (async () => {
        const browser = await puppeteer.launch({
            // Sets the headless field as false to enable brwoser, otherwise it will run in background
            headless: false,
            product: 'chrome',
            ignoreHTTPSErrors: true,
            defaultViewport: null,
            args: [
                    '--no-sandbox',
                    '--disable-gpu',
            ]
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
        // Closes the additional window if the open browser is not supported
        await page.waitForSelector('i.fa.fa-times');
        await page.click('i.fa.fa-times');
        // Waits the timeout in random
        await page.waitForTimeout((Math.random() * (5 * 60 * 1000 - 60 * 1000)) - (60 * 1000));
        // Clocks in or out
        await page.waitForSelector('span[class="btn btn-white btn-lg btn-block"]');
        await page.click('span[class="btn btn-white btn-lg btn-block"]');
        // Puts the screenshot to the records directory with the time to denote
        // Wait for 3 seconds
        await page.waitForTimeout(3000)
        var date = new Date();
        const formatDate = (curr_date) => {
            let fmt_date = curr_date.getFullYear() + "-" + (curr_date.getMonth() + 1) + "-" + curr_date.getDate() + "_" +
                                    curr_date.getHours() + ":" + curr_date.getMinutes() + ":" + curr_date.getSeconds();
            return fmt_date;
        }
        await page.screenshot({path: root_path + 'records/' + formatDate(date) + '.png'});
        // Closes the browser
        await browser.close();
    })();
} catch (e) {
    // do nothing
}
