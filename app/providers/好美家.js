const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.jaja123.com/web/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[name="mobile"]', options.phone, { delay: 100 });

    await page.type('input[name="verifyCode"]', options.phone, { delay: 50 });

    await page.click('button[ng-bind="verifyButtonTitle"]');

    // 检验是否发送成功

    await utils.sleep(500);

    const isSuccess = await page.evaluate(() => {
      const button = document.querySelector('button[ng-bind="verifyButtonTitle"]');
      return /^\d+$/.test(button.innerText);
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
