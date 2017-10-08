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

    const $registerBtn = await page.$('a.register.btn.rbtn');

    // 等待加载完成
    await $registerBtn.click();

    await page.waitForSelector('a.switch-email-signup');

    const $registerWithPhone = await page.$('a.switch-email-signup');

    await $registerWithPhone.click();

    // 等待加载完成
    await page.waitForSelector('#login_frame form[method="post"]>a.rbtn');

    const [$submit] = await Promise.all([
      page.$('#login_frame form[method="post"]>a.rbtn')
    ]);

    // await $mobile.click({ button: 'left' });
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(550, 415);
    await page.mouse.click(550, 415);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(820, 415, { steps: 1 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await $submit.click();
  }
};
