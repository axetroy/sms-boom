const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://api.open.uc.cn/cas/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#registerName', options.phone, { delay: 50 });
    await page.type('#password', options.password, { delay: 50 });
    await page.type('#confirmPassword', options.password, { delay: 50 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(515, 400, { steps: 10 });
    await page.mouse.down();
    await page.mouse.move(546, 410, { steps: 20 });
    await page.mouse.move(648, 408, { steps: 30 });
    await page.mouse.move(768, 406, { steps: 40 });
    await page.mouse.move(800, 406, { steps: 50 });
    await page.mouse.up();
    // 松开鼠标

    await utils.sleep(1000);

    await page.click('#getCodeBtn');

    await page.waitForSelector('#getCodeBtn.btn_code', { timeout: 1000 * 5 });
  }
};
