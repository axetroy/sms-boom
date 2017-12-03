const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.cmpassport.com/umc/reg/alias/?from=9`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    await page.type('#txtPhone', options.phone, { delay: 50 });

    await page.type('#txtSmsCode', options.phone, { delay: 50 });

    await page.click('#btnGetSmsCode');

    // 检验是否发送成功
    try {
      await page.waitForSelector('.getSmsCode.BtnCode', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
