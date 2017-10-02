const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class JuheProvider extends Provider {
  constructor() {
    super();
    this.url = `https://www.juhe.cn/register`;
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

    const [$username, $password, $mobile, $sendBtn] = await Promise.all([
      page.$('#username'),
      page.$('#password'),
      page.$('#mobilephone'),
      page.$('#reg_smsbtn')
    ]);

    await $username.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $sendBtn.click({ button: 'left' });
  }
}

module.exports = JuheProvider;
