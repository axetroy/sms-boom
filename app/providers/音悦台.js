const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://shop.yinyuetai.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.click('.J_login');

    // 等待注册框弹出
    await page.waitForSelector('.login-register', { timeout: 1000 * 3 });

    // 点击注册
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('.login-tab>a');
      const loginIndex = [].slice.call(buttons).findIndex(btn => btn.innerText === '注册');
      const loginButton = buttons[loginIndex];
      if (!loginButton) {
        throw null;
      } else {
        loginButton.click();
      }
    });

    await utils.sleep(500);

    await page.type('#register-form input[name="mobile"]', options.phone, { delay: 100 });

    await page.click('.login-get-code');

    // 检验是否发送成功
    try {
      await page.waitForSelector('.login-code-disable', { timeout: 1000 * 3 });
    } catch (err) {
      throw null;
    }
  }
};
