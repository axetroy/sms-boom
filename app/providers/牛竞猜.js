const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = 'http://niugames.cc/Index/Index/Register.html';
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile, $code, $submit] = await Promise.all([
      page.$('input[name="phone"]'),
      page.$('input.phoneVerify'),
      page.$('.phoneVerifyBtn')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $code.click();
    await page.type('1234', { delay: 100 });

    await $submit.click();
  }
};
