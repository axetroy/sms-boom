const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.juhe.cn/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#username', options.username, { delay: 50 });
    await page.type('#password', options.password, { delay: 50 });
    await page.type('#mobilephone', options.phone, { delay: 50 });
    await page.click('#reg_smsbtn');

    // await utils.sleep(1000 * 60000);
    // TODO: 验证是否发送成功...
  }
};
