const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://ssl.zc.qq.com/v3/index-chs.html`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#nickname', options.username, { delay: 100 });
    await page.type('#password', options.password, { delay: 100 });
    await page.type('#phone', options.phone, { delay: 100 });
    await page.click('#send-sms', { button: 'left' });

    // 检验是否发送成功
    await page.waitForSelector('.send-sms.disabled', { timeout: 1000 * 3 });
  }
};
