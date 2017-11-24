const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.1000.com/reg?us=3W-head`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('.mobile', options.phone, { delay: 100 });

    await utils.sleep(500);

    await page.type('#send_code', options.phone, { delay: 50 });

    // 检验是否发送成功
    await page.waitForSelector('#send_tip.disable', { timeout: 1000 * 3 });
  }
};
