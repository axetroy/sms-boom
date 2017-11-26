const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://login.haodou.com/register.php`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    await page.type('#mobile_account', options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(280, 315);
    await page.mouse.down();
    await page.mouse.move(560, 318, { steps: 20 });
    await page.mouse.up();
    // 松开鼠标

    await page.click('#btn_send_sms1');

    // 检验是否发送成功
    // 没法检测
  }
};
