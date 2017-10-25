const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://account.youku.com/register.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#passport', options.phone, { delay: 30 });
    await page.type('#password', options.password, { delay: 30 });
    await page.type('#repeatPsd', options.password, { delay: 30 });
    await page.click('#getMobileCode');

    await page.waitForSelector('#getMobileCode[disable]', { timeout: 1000 * 5 });
  }
};
