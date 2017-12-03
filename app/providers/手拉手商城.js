const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://mall.slswd.com/register!toPc.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    await page.type('#userName', options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(302, 369);
    await page.mouse.down();
    await page.mouse.move(552, 366, { steps: 20 });
    await utils.sleep(500);
    await page.mouse.up();
    // 松开鼠标

    await page.click('#button');

    await utils.sleep(100);

    // 检验是否发送成功
    try {
      await page.waitForSelector('#button[disabled]');
    } catch (err) {
      throw null;
    }
  }
};
