'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.qichacha.com/user_register`;
    this.alone = true;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[name=phone]', options.phone, { delay: 50 });

    await page.type('input[name=pswd]', options.password, { delay: 50 });

    await utils.mockUserMouse(page);
    await page.mouse.move(841, 345);
    await page.mouse.down();
    await page.mouse.move(1101, 346, { steps: 20 });
    await page.mouse.up();

    await page.click('a.get-mobile-code');

    const isSuccess = await page.evaluate(() => {
      const btn = document.querySelector('a.get-mobile-code');
      return btn.innerText.indexOf('重新发送') >= 0;
    });

    if (!isSuccess) {
      throw null;
    }
  }
};
