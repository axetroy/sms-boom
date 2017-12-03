const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.panda.tv/all`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.click('.sidebar-userinfo-register-btn');

    await page.waitForSelector("input[name='account']");

    await page.type("input[name='account']", options.phone, { delay: 50 });

    await page.click('.ruc-send-auth-code-btn');

    // 拖拽验证码
    await page.waitForSelector('#aliverificate-content');

    await utils.mockUserMouse(page);
    // 按下鼠标，拖动滚动条
    await page.mouse.move(540, 400);
    await page.mouse.down();
    await page.mouse.move(830, 408, { steps: 5 });
    await page.mouse.up();
    // 松开鼠标

    // 检验是否发送成功
    try {
      await page.waitForSelector('.ruc-send-auth-code-btn.button-disable', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
