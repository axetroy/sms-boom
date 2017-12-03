const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.ingping.com/reg/index?retUrl=https%3A%2F%2Fwww.ingping.com&fxPid=`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.waitForSelector('#phoneNum', { timeout: 1000 * 7 });

    await page.type('#phoneNum', options.phone, { delay: 100 });

    await page.click('#sendRegMsgA');

    // 检验是否发送成功
    try {
      await page.waitForSelector('.send-status.disabled');
    } catch (err) {
      throw null;
    }
  }
};
