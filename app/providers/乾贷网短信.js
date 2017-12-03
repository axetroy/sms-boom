const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.qiandw.com/Account/RegisterNew`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#mobile', options.phone, { delay: 50 });

    await utils.mockUserMouse(page);
    // 按下鼠标，拖动滚动条
    await page.mouse.move(510, 344);
    await page.mouse.down();
    await page.mouse.move(860, 338, { steps: 5 });
    await page.mouse.up();
    // 松开鼠标

    // 检验是否发送成功
    const isSuccess = await page.evaluate(() => {
      const display = document.querySelector('.resend.text-send').style.display;
      // 倒计时应该会被显示出来
      return display !== 'none' && display !== '';
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
