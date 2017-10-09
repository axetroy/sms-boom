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

    const [
      $mobile,
      $password,
      $rePassword,
      $submit
    ] = await Promise.all([
      page.$('#registerName'),
      page.$('#password'),
      page.$('#confirmPassword'),
      page.$('#getCodeBtn')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $rePassword.click();
    await page.type(options.password, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(515, 400);
    await page.mouse.click(515, 400);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(800, 400, { steps: 50 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await $submit.click();
  }
};
