const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://qipai6.01780178.com/RegisterMP.aspx`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile, $code, $submit] = await Promise.all([
      page.$('#txtTel'),
      page.$('#txtMsgCode'),
      page.$('#btnSendcode')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $code.click();
    await page.type(options.phone, { delay: 100 });

    await utils.sleep(2000);

    await $submit.click();
  }
};
