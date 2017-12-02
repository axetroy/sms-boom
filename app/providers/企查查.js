'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.qichacha.com/user_register`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[name=phone]', options.phone, { delay: 100 });

    await page.type('input[name=pswd]', options.password, { delay: 50 });

    await page.mouse.move(841, 345);
    await page.mouse.down();
    await page.mouse.move(1101, 346, { steps: 20 });
    await page.mouse.up();

    await page.click('a.get-mobile-code');

    //    await page.waitForSelector('span.input-group-btn button:first-child[disabled]', { timeout: 1000 * 3 });
  }
};
