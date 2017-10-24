const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.lofter.com/phoneAccount/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#phone-num', options.phone, { delay: 100 });

    await utils.sleep(1000);

    await page.type('#auth-code', options.phone, { delay: 50 });

    await utils.sleep(1000);

    await page.click('#btn-auth');

    // 检验是否发送成功
    await page.waitForSelector('#btn-auth.btn-disabled', { timeout: 1000 * 3 });
  }
};
