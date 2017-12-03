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

    await page.type('input[name="mobile"]', options.phone, { delay: 50 });

    await page.click('#sendVerifySmsButton');

    await utils.sleep(1000);

    try {
      await page.waitForSelector('#sendVerifySmsButton[disabled]');
    } catch (err) {
      throw null;
    }
  }
};
