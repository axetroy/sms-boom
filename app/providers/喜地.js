const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.xidibuy.com/reg/index`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#tel', options.phone, { delay: 100 });

    await page.click('.getTelCode');

    // 检验是否发送成功
    await page.waitForSelector('.getTelCode.notActive', { timeout: 1000 * 3 });
  }
};
