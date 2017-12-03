const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.zhe800.com/users/signup`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    await page.type('#pemail', options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(340, 355);
    await page.mouse.down();
    await page.mouse.move(630, 350, { steps: 20 });
    await utils.sleep(500);
    await page.mouse.up();
    // 松开鼠标

    await page.click('#i_codeP a');

    await utils.sleep(100);

    // TODO: 检验是否发送成功
  }
};
