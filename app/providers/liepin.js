const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.liepin.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [$mobile, $password, $submit] = await Promise.all([
      page.$('.register-box [name="user_login"]'),
      page.$('.register-box [name="user_pwd"]'),
      page.$('.register-box .btn-phone-code')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $submit.click();
  }
};
