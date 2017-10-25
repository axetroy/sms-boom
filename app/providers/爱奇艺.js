const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = 'http://www.iqiyi.com/iframe/loginreg?is_reg=1&';
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.waitForSelector('input[data-regbox="name"]', { timeout: 1000 * 5 });
    await page.type('input[data-regbox="name"]', options.phone, { delay: 50 });
    await utils.sleep(1000 * 2);
    await page.click('[rseat="prgd_smsbtn"]');
  }
};
