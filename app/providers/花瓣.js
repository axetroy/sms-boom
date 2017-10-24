const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://huaban.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    // 点击注册按钮
    await page.click('a.register.btn.rbtn');
    await page.waitForSelector('a.switch-email-signup', { timeout: 1000 * 3 });
    // 切换到手机注册
    await page.click('a.switch-email-signup');

    // 等待加载完成
    await page.waitForSelector('#login_frame form[method="post"]>a.rbtn', { timeout: 1000 * 3 });

    await page.type('form input[name="email"]', options.phone, { delay: 50 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(550, 415);
    await page.mouse.click(550, 415);
    await page.mouse.down();
    await page.mouse.move(820, 415, { steps: 10 });
    await page.mouse.up();
    // 松开鼠标

    await utils.sleep(500);

    await page.click('#login_frame form[method="post"]>a.rbtn');
  }
};
