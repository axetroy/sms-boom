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

    const [$agreeBtn, $mobile, $submit] = await Promise.all([
      page.$('#J_AgreementBtn'),
      page.$('#J_Mobile'),
      page.$('#J_BtnMobileForm')
    ]);

    // 点击同意协议按钮
    if ($agreeBtn) {
      await $agreeBtn.click();
    }

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(600, 325, { step: 10 });
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(880, 325, { steps: 10 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(500);

    await $submit.click(500, 380);
  }
};
