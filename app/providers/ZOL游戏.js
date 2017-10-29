const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://service.zol.com.cn/user/siteLogin.php`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#tel', options.phone, { delay: 100 });

    await page.click('#get-anicode');

    // 检验是否发送成功
    await page.waitForSelector('#get-anicode.resendphonecode', { timeout: 1000 * 3 });
  }
};
