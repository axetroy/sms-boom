const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://my.ruanmei.com/?page=register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#phone', options.phone, { delay: 50 });
    await page.click('#sendsms');
    await page.waitForSelector('.sendsms_disable', { timeout: 1000 * 3 });
  }
};
