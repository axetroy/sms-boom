const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://id.amap.com/register/index`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#phone', options.phone, { delay: 50 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(560, 325, { steps: 10 });
    await page.mouse.click(560, 325);
    await page.mouse.down();
    await page.mouse.move(840, 325, { steps: 10 });
    await page.mouse.up();
    // 松开鼠标

    await utils.sleep(1000);

    await page.click('#send_msg');

    await utils.sleep(1000 * 999999999);
  }
};
