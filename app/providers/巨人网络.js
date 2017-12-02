'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://reg.ztgame.com/`;
  }

  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#reg_form input[name=phone]', options.phone, { delay: 100 });

    await page.click('#reg_form input.get-mpcode');

    //    // 检验是否发送成功
    //    await page.waitForSelector('#reg_form input.get-mpcode[disabled]', {
    //      timeout: 1000 * 3,
    //    });
  }
};
