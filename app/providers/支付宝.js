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

    await page.type('#J-accName', options.phone, { delay: 50 });
    await page.type('#J-mobCode', '123456', { delay: 50 });

    // 这里不知道发什么颠
    // 选择符选择不到这个元素
    // 只能执行js脚本
    await page.evaluate(() => {
      const btn = document.querySelector('#J-resend-mobile');
      btn.click();
    });

    await page.waitForSelector('#J-resend-mobile button[disabled]', { timeout: 1000 * 3 });
  }
};
