const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.aipai.com/signup.php`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#phone', options.phone, { delay: 100 });
    await page.type('#password_phone', options.password, { delay: 100 });
    await page.type('#password2_phone', options.password, { delay: 100 });
    await page.type('#nick_phone', options.name, { delay: 100 });
    await page.click('#msg');

    // 检验是否发送成功
    await page.waitForSelector('.msg_disabled', { timeout: 1000 * 3 });
  }
};
