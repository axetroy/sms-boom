const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.baixing.com/oz/verify/reg`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    await page.reload(); // 页面需要重新加载，否则无法刷新出微信二维码

    await utils.sleep(2000);

    try {
      await page.mouse.move(546, 264, { steps: 10 });
      await page.click('.tab-title-item');
    } catch (err) {}

    await page.mouse.move(600, 420, { steps: 10 });
    await page.type('[name="mobile"]', options.phone, { delay: 100 });
    await page.mouse.move(670, 500, { steps: 10 });

    await page.click('button[type="submit"]');

    await page.waitForSelector('.code-tip', { timeout: 1000 * 3 });
  }
};
