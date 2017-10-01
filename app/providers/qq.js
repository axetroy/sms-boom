const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');
const utils = require('../utils');

class QQProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(ctx, phone) {
    const URL = `https://ssl.zc.qq.com/v3/index-chs.html`;

    const page = ctx.page;

    await page.goto(URL, {
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
    await page.type(`门卫张大爷abc123`, { delay: 100 });

    await $password.click({ button: 'left' });
    await page.type(`abc123abc123`, { delay: 100 });

    await $phone.click({ button: 'left' });
    await page.type(phone + '', { delay: 100 });
    await $send.click({ button: 'left' });
  }
}

module.exports = QQProvider;
