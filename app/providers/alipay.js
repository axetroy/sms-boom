const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://memberprod.alipay.com/account/reg/index.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [$mobile, $codeInput, $submit] = await Promise.all([
      page.$('#J-accName'),
      page.$('#J-mobCode'),
      page.$('#J-resend-mobile>button')
    ]);

    await utils.sleep(2000);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $codeInput.click();

    await page.type('123456', { delay: 100 });

    await $submit.click();
  }
};
