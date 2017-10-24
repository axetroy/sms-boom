const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://study.163.com/member/login.htm`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.click('#changepage');
    await page.waitForSelector('.u-codebtn', { timeout: 1000 * 5 });
    await page.type('input[name="tel"]', options.phone, { delay: 50 });
  }
};
