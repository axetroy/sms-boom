const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.xinnet.com/user/user.do?method=toRegister`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#userMobiNumber', options.phone, { delay: 50 });
    // 按下鼠标，拖动滚动条
    await page.mouse.move(540, 470);
    await page.mouse.down();
    await page.mouse.move(850, 470, { steps: 10 });
    await page.mouse.up();
    // 松开鼠标
    await utils.sleep(500);
    await page.click('#verifyCode_href');

    await utils.sleep(500);

    const isSuccess = await page.evaluate(() => {
      const sendMsgBtn = document.querySelector('#verifyCode_href');
      return sendMsgBtn.innerText.trim().indexOf('获取验证码') < 0;
    });

    if (!isSuccess) {
      throw null;
    }
  }
};
