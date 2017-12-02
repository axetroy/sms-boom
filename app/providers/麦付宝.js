'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.maifupay.com/register`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input.form-control', options.phone, { delay: 100 });

    await page.click('span.input-group-btn button:first-child');

//    await page.waitForSelector('span.input-group-btn button:first-child[disabled]', { timeout: 1000 * 3 });
  }
};
