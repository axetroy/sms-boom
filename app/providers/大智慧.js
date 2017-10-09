const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://i.gw.com.cn/UserCenter/page/account/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [$mobile, $password, $submit] = await Promise.all([
      page.$('#mobile'),
      page.$('#mobileUpass'),
      page.$('#sendCode')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $submit.click();
  }
};
