const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.renrenche.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.click('.js-login.login .log-status');

    await page.type('input[name="phone"]', options.phone, { delay: 100 });

    await utils.sleep(1000);

    await page.click('.verify-btn');

    // 检验是否发送成功
  }
};
