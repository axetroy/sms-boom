const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://wx.gxsbj.cn/bhwx/userAccountAction!register.do`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#tel', options.phone, { delay: 50 });
    await page.click('#btn');
    await page.waitForSelector('.window-alert-img-ok', { timeout: 3000 });
  }
};
