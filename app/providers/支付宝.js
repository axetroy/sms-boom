const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://memberprod.alipay.com/account/reg/index.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.sleep(1000 * 2);

    await page.type('#J-accName', options.phone, { delay: 50 });

    await utils.sleep(200);

    try {
      const subPages = await page.frames();
      while (subPages.length) {
        const subPage = subPages.shift();
        // 点击统一隐私条款
        await subPage.click('[seed="content-JAgreeButton"]');
      }
    } catch (err) {}

    await page.click('#J-resend-mobile');
  }
};
