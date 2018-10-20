const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://weixin.keruyun.com/user/notLogin?shopId=810148818`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('input[type="tel"]', options.phone, { delay: 100 });
    await utils.sleep(200);

    await page.click('button.btn--yellow');
    await utils.sleep(2000);

    // 检验是否发送成功
    const isSuccess = await page.evaluate(() => {
      const button = document.querySelector('button.btn--yellow');
      return /\d+s$/.test(button.innerText);
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
