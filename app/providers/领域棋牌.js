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

    await page.type('#txtTel', options.phone, { delay: 50 });
    await page.type('#txtMsgCode', options.phone, { delay: 50 });
    await utils.sleep(500);
    await page.click('#btnSendcode');

    await page.waitForSelector('#btnSendcode[disabled]', { timeout: 1000 * 3 });
  }
};
