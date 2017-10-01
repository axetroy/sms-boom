const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');
const utils = require('../utils');

class QQProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(ctx, phone) {
    const URL = `http://www.youku.com/`;

    const page = ctx.page;

    await page.goto(URL, {
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
    await page.type(phone + '', { delay: 100 });

    await $password.click({ button: 'left' });
    await page.type(`abc123abc123`, { delay: 100 });

    await $repassword.click({ button: 'left' });
    await page.type(`abc123abc123`, { delay: 100 });

    await $send.click({ button: 'left' });
  }
}

module.exports = QQProvider;
