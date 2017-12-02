'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://m.shucong.com/register`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input#mobile', options.phone, { delay: 50 });

    await page.click('button#code_phone');

    //    await page.waitForSelector('button#code_phone', { timeout: 1000 * 3 });
  }
};
