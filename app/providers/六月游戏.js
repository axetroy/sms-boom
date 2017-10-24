const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.6ycom.com/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('[name="phone"]', options.phone, { delay: 100 });
    await page.click('#send_sms');

    await utils.sleep(1000 * 600);
  }
};
