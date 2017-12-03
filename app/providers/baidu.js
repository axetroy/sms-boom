'use strict';

const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.baidu.com/v2/?login`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.sleep(500);

    await page.click('#TANGRAM__PSP_3__smsSwitch');

    await utils.sleep(1000);

    await page.type('#TANGRAM__PSP_3__smsPhone', options.phone, { delay: 100 });

    await page.click('#TANGRAM__PSP_3__smsTimer');

    try {
      // 如果需要注册
      await page.waitForSelector('#TANGRAM__PSP_3__smsRegPromptWrapper', {
        timeout: 500,
        visible: true
      });
      await page.click('#TANGRAM__PSP_3__smsRegPromptBtn');
    } catch (err) {}

    try {
      // 检验是否发送成功
      await page.waitForSelector('#TANGRAM__PSP_3__smsTimer.pass-item-time-timing', {
        timeout: 1000 * 3
      });
    } catch (err) {
      throw null;
    }
  }
};
