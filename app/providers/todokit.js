const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.todokit.vip/dashboard/signup-sms`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('form input[type="text"].ivu-input', options.phone, { delay: 100 });

    await page.click('.btn-code');

    // 检验是否发送成功
    await page.waitForSelector('button[disabled].btn-code', { timeout: 1000 * 3 });
  }
};
