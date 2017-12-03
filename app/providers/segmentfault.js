const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://segmentfault.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    await page.type('[name="phone"]', options.phone, { delay: 100 });

    await page.click('.getCode');

    // 检验是否发送成功
    try {
      await page.waitForSelector('.getCode[disabled]', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
