const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://m.jinlianchu.cn/user/register/lc_register?type=ban1&source=2&ozs=60979-2759`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#loginMobile', options.phone, { delay: 50 });
    await page.type('#password', options.password, { delay: 100 });
    await page.type('#code', options.phone, { delay: 50 });
    await utils.sleep(1000);
    await page.click('#btn');
    await page.waitForSelector('#btn[disabled]', { timeout: 1000 * 3 });
  }
};
