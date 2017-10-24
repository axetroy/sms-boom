const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://passport.cnmo.com/register/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#m_mobile', options.phone, { delay: 50 });
    await page.type('#m_uname', options.username, { delay: 50 });
    await page.type('#m_password', options.password, { delay: 50 });
    await page.type('#m_confirm', options.password, { delay: 50 });
    await page.click('#m_getcode');

    // TODO: check the sending is success or not
  }
};
