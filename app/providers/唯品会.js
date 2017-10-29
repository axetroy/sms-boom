const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.vip.com/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#J_mobile_name', options.phone, { delay: 100 });
    await page.type('#J_mobile_code', '1234', { delay: 100 });

    await utils.sleep(500);

    await page.click('#J_mobile_verifycode_btn');

    // 检验是否发送成功
    await page.waitForSelector('#J_mobile_verifycode_btn.ui-btn-disable', { timeout: 1000 * 3 });
  }
};
