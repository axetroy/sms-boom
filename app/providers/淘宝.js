const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://reg.taobao.com/member/reg/fill_mobile.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    try {
      // 点击同意协议按钮
      await page.click('#J_AgreementBtn');
    } catch (err) {}

    await page.type('#J_Mobile', options.phone, { delay: 50 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(600, 325, { step: 10 });
    await page.mouse.down();
    await page.mouse.move(880, 325, { steps: 10 });
    await page.mouse.up();
    // 松开鼠标

    await utils.sleep(500);
    await page.click('#J_BtnMobileForm');
  }
};
