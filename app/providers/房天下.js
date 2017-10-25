const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.fang.com/register.aspx`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#strUsername', options.username, { delay: 50 });
    await page.type('#strPassword', options.password, { delay: 50 });
    await page.type('#strPasswordConfirm', options.password, { delay: 50 });
    await page.type('#strMobile', options.phone, { delay: 50 });
    await page.click('#vcode');

    await page.waitForSelector('#vcode[disabled]', { timeout: 1000 * 3 });
  }
};
