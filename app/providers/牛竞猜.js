const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = 'http://niugames.cc/Index/Index/Register.html';
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[name="phone"]', options.phone, { delay: 50 });
    await page.type('input.phoneVerify', '1234', { delay: 50 });
    await page.click('.phoneVerifyBtn');
    await page.waitForSelector('.phoneVerifyBtn.disabled', { timeout: 1000 * 3 });
  }
};
