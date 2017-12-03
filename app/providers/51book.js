const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://caigou.51book.com/caigou/manage/designatedRegistryNewSignon.in`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[name="moblie"]', options.phone, { delay: 50 });

    await page.click('#sendMSgBtu');

    // 检验是否发送成功
    try {
      await page.waitForSelector('#sendMSgBtu[disabled]', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
