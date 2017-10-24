const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.surong360.com/SR360/application/user/emailRegisterPage.do`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#sms', options.phone, { delay: 100 });
    await page.type('#passWord', options.password, { delay: 100 });
    await page.type('#passWordAgain', options.password, { delay: 100 });
    await page.type('#userName', options.username, { delay: 100 });
    await page.click('#verificationCodeSpanId');

    await utils.sleep(1000 * 6000000);
  }
};
