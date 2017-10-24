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

    await page.type('#mobilebox_name', options.name, { delay: 30 });
    await page.type('#mobilebox_phone', options.phone, { delay: 30 });
    await page.click('.contact-submit');
  }
};
