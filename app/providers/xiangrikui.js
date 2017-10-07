const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://z.xiangrikui.com/zn/phone/submit?rand_key=224594`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$name, $mobile, $submit] = await Promise.all([
      page.$('#mobilebox_name'),
      page.$('#mobilebox_phone'),
      page.$('.contact-submit')
    ]);

    await $name.click({ button: 'left' });
    await page.type(options.name, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click({ button: 'left' });
  }
}