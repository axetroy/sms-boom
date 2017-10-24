const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://authgtj.alipay.com/login/index.htm`;
    this.active = false; // 暂不启用
    this.times = 0;
  }
  async resolve(ctx) {
    this.times++;
    const options = ctx.options;

    const page = ctx.page;

    await page.evaluate(() => {
      const $username = document.querySelector('#J-input-user');
      $username.value = '';
    });

    await utils.sleep(1000);
    await page.type('#J-input-user', options.phone, { delay: 100 });
    await page.type('#password_rsainput', options.password, { delay: 100 });
    await page.click('#J-login-btn');
    await utils.sleep(3000);

    // 重试5次
    if (this.times % 5 !== 0) {
      try {
        await this.resolve(ctx);
      } catch (err) {}
    }
  }
};
