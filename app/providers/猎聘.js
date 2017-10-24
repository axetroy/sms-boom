const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.liepin.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('.register-box [name="user_login"]', options.phone, { delay: 50 });
    await page.type('.register-box [name="user_pwd"]', options.password, { delay: 50 });
    await page.click('.register-box .btn-phone-code');

    await page.waitForSelector('.register-box .btn-phone-code.btn-disabled', { timeout: 1000 * 3 });
  }
};
