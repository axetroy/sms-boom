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

    try {
      // 如果弹出这个，说明需要输入验证码
      // 则发送失败
      await page.waitForSelector('#js-verification-modal-for-login', { timeout: 1000 * 3 });

      throw null; // 抛出错误，代表发送失败
    } catch (err) {
      throw err;
    }
  }
};
