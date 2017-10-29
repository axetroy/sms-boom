const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.shijiebang.com/reg/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.waitForSelector('input[name="mobile"]', { timeout: 1000 * 3 });
    await page.type('input[name="mobile"]', options.phone, { delay: 50 });

    await utils.sleep(500);

    // 点击发送验证码
    await page.click('button.btn.sp2');
    await page.waitForSelector('button.btn.sp2.disabled', { timeout: 1000 * 3 });
  }
};
