const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://fenbi.com/web/signup`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.waitForSelector('#loginphone', { timeout: 1000 * 3 });

    await utils.sleep(1000 * 2);

    // 点击注册
    await page.click('#loginPasswordPage .registered a');

    await page.type('#signupphone', options.phone, { delay: 50 });

    await page.click('#signupPage .verificationCode');

    // 检验是否发送成功
    try {
      await page.waitForSelector('#signupPage .verificationCode[disabled]', {
        timeout: 1000 * 3
      });
    } catch (err) {
      throw null;
    }
  }
};
