const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class IQiYiProvider extends Provider {
  constructor() {
    super();
    this.url = 'http://www.iqiyi.com/iframe/loginreg?is_reg=1&';
  }
  async resolve(ctx, phone) {
    const page = ctx.page;

    await page.goto(this.url, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    const $mobile = await page.$('input[data-regbox="name"]');

    if ($mobile) {
      await $mobile.click();
      await page.type(phone + '', { delay: 100 });
    }

    const $submit = await page.$('a[rseat="prgvpd_regbtn"]');

    await $submit.click();
  }
}

module.exports = IQiYiProvider;
