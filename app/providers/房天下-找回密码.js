const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.fang.com/register.aspx`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    // 跳转页面
    await page.goto(
      `https://passport.fang.com/GetbackPwd/FindPwdByMobile?phoneNum=${options.phone}`,
      {
        waitUntil: 'load',
        timeout: 3000000
      }
    );

    try {
      await page.waitForSelector('#btnGetVCode', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }

    await page.click('#btnGetVCode');

    // 检查是否发送成功
    try {
      await page.waitForSelector('#btnGetVCode[disabled]', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
