const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://passport.zongheng.com/webreg?location=http%3A%2F%2Fwww.zongheng.com%2F`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#regphone', options.phone, { delay: 100 });

    await utils.sleep(1000);

    await page.type('#msgyzm', options.phone, { delay: 50 });

    await utils.sleep(1000);

    await page.click('.reg-w-btn');

    // 检验是否发送成功
    try {
      await page.waitForSelector('.reg-w-btn.sentend', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
