const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://m.jinlianchu.cn/user/register/lc_register?type=ban1&source=2&ozs=60979-2759`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile, $password, $code, $submit] = await Promise.all([
      page.$('#loginMobile'),
      page.$('#password'),
      page.$('#code'),
      page.$('#btn')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 300 });

    await $code.click();
    await page.type(options.phone, { delay: 100 });

    await utils.sleep(1000);

    await $submit.click();
  }
};
