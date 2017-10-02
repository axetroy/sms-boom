const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class SixYueGameProvider extends Provider {
  constructor() {
    super();
    this.url = `http://www.6ycom.com/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [$mobile, $submit] = await Promise.all([
      page.$('[name="phone"]'),
      page.$('#send_sms')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click();
  }
}

module.exports = SixYueGameProvider;
