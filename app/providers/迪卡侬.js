'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.decathlon.com.cn/zh/create`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input#mobile', options.phone, { delay: 50 });

    await page.click('button.cta.right');

    try {
      await page.waitForSelector('#verification-code', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
