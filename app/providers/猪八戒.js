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

    await page.type('#sacc', options.phone, { delay: 50 });
    await page.type('#mobileCode', options.phone, { delay: 50 });
    await page.click('.btn-get-code');

    await page.waitForSelector('.btn-get-code.getCode.re-getting', { timeout: 1000 * 3 });
  }
};
