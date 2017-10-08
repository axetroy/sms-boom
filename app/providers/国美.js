const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://reg.gome.com.cn/register/index/person`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [
      $agreeBtn,
      $nick,
      $password,
      $rePassword,
      $mobile,
      $submit
    ] = await Promise.all([
      page.$('input.inpBtn'),
      page.$('#name'),
      page.$('#password'),
      page.$('#confirmPassword'),
      page.$('#mobile'),
      page.$('#getVerifyCode')
    ]);

    // 点击同意协议按钮
    if ($agreeBtn) {
      await $agreeBtn.click();
    }

    await $nick.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $rePassword.click();
    await page.type(options.password, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(340, 510, { steps: 10 });

    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(640, 510, { steps: 10 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await $submit.click();
  }
};
