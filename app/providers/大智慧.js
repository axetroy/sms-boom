const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://i.gw.com.cn/UserCenter/page/account/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#mobile', options.phone, { delay: 50 });
    await page.type('#mobileUpass', options.password, { delay: 50 });
    await page.click('#sendCode');

    await page.waitForSelector('#sendCode[disabled]', { timeout: 1000 * 3 });
  }
};
