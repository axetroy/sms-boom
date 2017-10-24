const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.alibaba.com/member/reg/fast/fast_reg.htm?_regfrom=ALIYUN`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#nick', options.username, { delay: 50 });
    await page.type('#password', options.password, { delay: 50 });
    await page.type('#rePassword', options.password, { delay: 50 });
    await page.type('#mobile', options.phone, { delay: 50 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(550, 380);
    await page.mouse.down();
    await page.mouse.move(850, 380, { steps: 5 });
    await page.mouse.up();
    // 松开鼠标

    await utils.sleep(1000);
    await page.click('button.next-btn');

    await page.waitForSelector('button.next-btn[disabled]', { timeout: 1000 * 3 });
  }
};
