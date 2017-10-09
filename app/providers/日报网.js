const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://usercenter.chinadaily.com.cn/regist/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$nick, $mobile, $password, $rePassword, $submit] = await Promise.all([
      page.$('#mobile_userid'),
      page.$('#phonenum'),
      page.$('#password'),
      page.$('#repass'),
      page.$('a.send')
    ]);

    await $nick.click();
    await page.type(options.username, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $rePassword.click();
    await page.type(options.password, { delay: 100 });

    await utils.sleep(1000);

    await $submit.click();
  }
};
