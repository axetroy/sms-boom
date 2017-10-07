const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://account.youku.com/register.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile, $password, $repassword, $submit] = await Promise.all([
      page.$('#passport'),
      page.$('#password'),
      page.$('#repeatPsd'),
      page.$('#getMobileCode')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $repassword.click();
    await page.type(options.password, { delay: 100 });

    await $submit.click();
  }
}