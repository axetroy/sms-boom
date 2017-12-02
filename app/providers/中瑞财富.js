'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.zrcaifu.com/register`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input.accname_input', options.phone, {delay: 100});

    await page.type('input[name=password]', options.password, {delay: 50});
    await page.type('input[name=password1]', options.password, {delay: 50});

    await page.click('input#sendsms-for-regiter');

    // TODO: 可能会有验证码

    await page.waitForSelector('input#sendsms-for-regiter[disabled]', {timeout: 1000 * 3});
  }
};
