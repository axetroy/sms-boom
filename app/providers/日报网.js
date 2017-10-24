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

    await page.type('#mobile_userid', options.username, { delay: 50 });
    await page.type('#phonenum', options.phone, { delay: 50 });
    await page.type('#password', options.password, { delay: 50 });
    await page.type('#repass', options.password, { delay: 50 });
    await utils.sleep(500);
    await page.click('a.send');
  }
};
