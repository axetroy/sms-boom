const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

class QQProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(phone) {
    const URL = `https://ssl.zc.qq.com/v3/index-chs.html`;
    const browser = await puppeteer.launch({
      headless: config.isProduction
    });

    const page = await browser.newPage();
    await page.goto(URL, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    const $phone = await page.$('#phone');
    const $send = await page.$('#send-sms');
    await $phone.click();
    await page.type(phone + '');
    await $send.click();

    await browser.close();
  }
}

module.exports = QQProvider;
