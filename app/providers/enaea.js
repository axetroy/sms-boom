const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://study.enaea.edu.cn/customRegisterRedirect.do`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.type('#J_enterUsername', options.username, { delay: 50 });
    await page.type('#J_enterRealname', options.name, { delay: 50 });
    await page.type('#J_enterPassword', options.password, { delay: 50 });
    await page.type('#J_confirmPassword', options.password, { delay: 50 });
    await page.type('#J_enterPhone', options.phone, { delay: 50 });
    await page.type('#J_enterEmail', options.email, { delay: 50 });
    await page.type('#J_verifycode', '123456', { delay: 50 });

    await page.click('#getVerficationCode');

    await utils.sleep(1000 * 4);

    // 检验是否发送成功
    const isSuccess = await page.evaluate(() => {
      const text = document.querySelector('#getVerficationCode');
      return text.innerText.indexOf('秒') >= 0;
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
