const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.alibaba.com/member/reg/fast/fast_reg.htm?_regfrom=ALIYUN`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$nick, $password, $rePassword, $mobile] = await Promise.all([
      page.$('#nick'),
      page.$('#password'),
      page.$('#rePassword'),
      page.$('#mobile')
    ]);

    await $nick.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $rePassword.click();
    await page.type(options.password, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(365, 380);
    await page.mouse.click(365, 380);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(670, 380, { steps: 5 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await page.mouse.click(438, 433);
  }
};
