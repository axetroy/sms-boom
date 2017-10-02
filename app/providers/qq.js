const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');
const utils = require('../utils');

class QQProvider extends Provider {
  constructor() {
    super();
    this.url = `https://ssl.zc.qq.com/v3/index-chs.html`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.goto(this.url, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    const [$nickname, $password, $phone, $send] = await Promise.all([
      page.$('#nickname'),
      page.$('#password'),
      page.$('#phone'),
      page.$('#send-sms')
    ]);

    await $nickname.click({ button: 'left' });
    await page.type(options.username, { delay: 100 });

    await $password.click({ button: 'left' });
    await page.type(options.password, { delay: 100 });

    await $phone.click({ button: 'left' });
    await page.type(options.phone, { delay: 100 });
    await $send.click({ button: 'left' });
  }
}

module.exports = QQProvider;
