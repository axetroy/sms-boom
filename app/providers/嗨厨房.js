const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://m.haichufang.com/reg.html`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[name="phone"]', options.phone, { delay: 50 });
    await page.click('.login-reg-code');
  }
};
