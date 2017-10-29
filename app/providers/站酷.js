const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://passport.zcool.com.cn/regPhone.do?appId=1006`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#mobilephone', options.phone, { delay: 50 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(530, 290, { steps: 40 });
    await page.mouse.down();
    await page.mouse.move(622, 299, { steps: 30 });
    await page.mouse.move(736, 285, { steps: 20 });
    await page.mouse.move(850, 290, { steps: 10 });
    await page.mouse.up();
    // 松开鼠标

    await utils.sleep(1000);
    await page.click('#veribtn');

    // await page.waitForSelector('button.next-btn[disabled]', { timeout: 1000 * 3 });
  }
};
