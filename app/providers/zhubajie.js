const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://login.zbj.com/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile, $code, $submit] = await Promise.all([
      page.$('#sacc'),
      page.$('#mobileCode'),
      page.$('.btn-get-code')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $code.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click();
  }
};
