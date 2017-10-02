const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class AliPayProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(ctx) {
    const URL = `https://memberprod.alipay.com/account/reg/index.htm`;

    const options = ctx.options;

    const page = ctx.page;

    await page.goto(URL, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    await utils.sleep(2000);

    const [$mobile, $codeInput, $submit] = await Promise.all([
      page.$('#J-accName'),
      page.$('#J-mobCode'),
      page.$('#J-resend-mobile>button')
    ]);

    await utils.sleep(2000);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $codeInput.click();

    await page.type('123456', { delay: 100 });

    await $submit.click();
  }
}

module.exports = AliPayProvider;
