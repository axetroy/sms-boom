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

    await page.type('input#mobile', options.phone, { delay: 500 });

    await page.click('button.cta.right');

    //    await page.waitForSelector('button.cta right', { timeout: 1000 * 3 });
  }
};
