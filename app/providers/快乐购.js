const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.happigo.com/register/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#mobile', options.phone, { delay: 100 });

    await page.click('#send_auth_code');

    await utils.sleep(500);

    // 检验是否发送成功
    const isSuccess = await page.evaluate(() => {
      const span = document.querySelectorAll('#show_times');
      return /\d+/.test(span.innerText);
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
