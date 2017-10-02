const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class IQiYiProvider extends Provider {
  constructor() {
    super();
    this.url = 'http://www.iqiyi.com/iframe/loginreg?is_reg=1&';
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const $mobile = await page.$('input[data-regbox="name"]');

    if ($mobile) {
      await $mobile.click();
      await page.type(options.phone, { delay: 100 });
    }

    await utils.sleep(2000);

    await page.click('[rseat="prgd_smsbtn"]', { button: 'left' });
  }
}

module.exports = IQiYiProvider;
