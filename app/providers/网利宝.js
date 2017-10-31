const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.wanglibao.com/active/channel/index.html?channel=sgqqdh`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#phone', options.phone, { delay: 100 });

    await utils.sleep(500);

    await page.click('.inp_but.register-code');

    // 检验是否发送成功
  }
};
