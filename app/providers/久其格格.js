const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://97gg.net/Account/Register`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    await page.click('#phoneRegistTab');

    await page.waitForSelector('#chkCodeSendBtn', { timeout: 1000 * 5 });

    await page.type('#UserName', options.phone, { delay: 100 });
    await page.type('#Password', options.password, { delay: 100 });
    await page.type('#ConfirmPassword', options.password, { delay: 100 });

    await page.click('#chkCodeSendBtn');

    // 检验是否发送成功
    await page.waitForSelector('#chkCodeSendBtn[disabled]', { timeout: 1000 * 3 });
  }
};
