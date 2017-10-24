const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://reg.gome.com.cn/register/index/person`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    try {
      // 点击同意协议按钮
      await page.click('input.inpBtn');
    } catch (err) {}

    await page.type('#name', options.username, { delay: 100 });
    await page.type('#password', options.password, { delay: 100 });
    await page.type('#confirmPassword', options.password, { delay: 100 });
    await page.type('#mobile', options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(340, 510, { steps: 10 });
    await page.mouse.down();
    await page.mouse.move(640, 510, { steps: 10 });
    await page.mouse.up();
    // 松开鼠标

    await page.click('#getVerifyCode');

    await page.waitForSelector('#resendSpan', { timeout: 1000 * 3 });
  }
};
