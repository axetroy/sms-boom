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

    const [$mobile, $submit] = await Promise.all([
      page.$('input[name="phone"]'),
      page.$('.login-reg-code')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click();
  }
};
