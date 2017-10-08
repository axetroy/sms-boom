const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://my.ruanmei.com/?page=register`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [$mobile, $submit] = await Promise.all([
      page.$('#phone'),
      page.$('#sendsms')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click();
  }
};
