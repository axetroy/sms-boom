const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.lofter.com/phoneAccount/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile, $code, $submit] = await Promise.all([
      page.$('#phone-num'),
      page.$('#auth-code'),
      page.$('#btn-auth')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 300 });

    await utils.sleep(1000);

    await $code.click();
    await page.type(options.phone, { delay: 100 });

    await utils.sleep(1000);

    await $submit.click();
  }
};
