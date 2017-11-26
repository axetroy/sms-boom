const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.homekoo.com/zhixiao/cuxiao/index.php`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#username5', options.name, { delay: 100 });
    await page.type('#tel5', options.phone, { delay: 100 });

    await page.click('#submit_img5');

    // 检验是否发送成功
  }
};
