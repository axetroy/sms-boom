const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');
const utils = require('../utils');

class QQProvider extends Provider {
  constructor() {
    super();
    this.url = `http://www.youku.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.goto(this.url, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    const $user = await page.$('#qheader_login'); // 点击登陆

    await $user.click({ button: 'left' });

    await utils.sleep(2000);

    const $go2register = await page.$('#YT-registeBtn'); // phone

    await $go2register.click({ button: 'left' });

    await utils.sleep(2000);

    const [$phone, $password, $repassword, $send] = await Promise.all([
      page.$('#YT-mPassport'), // phone
      page.$('#YT-mRegPassword'), // password
      page.$('#YT-mRepeatPwd'), // 确认密码
      page.$('#YT-mGetMobileCode') // 发送验证码
    ]);

    await $phone.click({ button: 'left' });
    await page.type(options.phone, { delay: 100 });

    await $password.click({ button: 'left' });
    await page.type(options.password, { delay: 100 });

    await $repassword.click({ button: 'left' });
    await page.type(options.password, { delay: 100 });

    await $send.click({ button: 'left' });
  }
}

module.exports = QQProvider;
