'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://account.weimob.com/register`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input#phone', options.phone, { delay: 100 });

    await page.click('a.getcode');

    // 检验是否发送成功
    try {
      await page.waitForSelector('a.getcode.disabled', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
