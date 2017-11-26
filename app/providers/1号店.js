const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.yhd.com/passport/register_input.do`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#phone', options.phone, { delay: 100 });
    await utils.sleep(200);

    await page.click('a.receive_code');
    await utils.sleep(2000);
    await page.click('a.receive_code span');

    // 检验是否发送成功
    const isSuccess = await page.evaluate(() => {
      const button = document.querySelector('.receive_code');
      return /\(\d+\)$/.test(button.innerText);
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
