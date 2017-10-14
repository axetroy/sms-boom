const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://authgtj.alipay.com/login/index.htm`;
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

    const [$mobile, $password, $login] = await Promise.all([
      page.$('#J-input-user'),
      page.$('#password_rsainput'),
      page.$('#J-login-btn')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $login.click();

    await utils.sleep(3000);

    // 重试5次
    if (this.times % 5 !== 0) {
      try {
        await this.resolve(ctx);
      } catch (err) {}
    }
  }
};
