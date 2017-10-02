const Provider = require('../provider');
const utils = require('../utils');

class XinNetProvider extends Provider {
  constructor() {
    super();
    this.url = `http://www.xinnet.com/user/user.do?method=toRegister`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [$mobile, $submit] = await Promise.all([
      page.$('#userMobiNumber'),
      page.$('#verifyCode_href')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(460, 470);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(750, 470, { steps: 10 });

    await utils.sleep(1000);

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await $submit.click();
  }
}

module.exports = XinNetProvider;
