const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class AliYunProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(ctx) {
    const URL = `https://passport.alibaba.com/member/reg/fast/fast_reg.htm?_regfrom=ALIYUN`;
    const options = ctx.options;
    const page = ctx.page;

    await page.goto(URL, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    const [$nick, $password, $rePassword, $mobile] = await Promise.all([
      page.$('#nick'),
      page.$('#password'),
      page.$('#rePassword'),
      page.$('#mobile')
    ]);

    await $nick.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $rePassword.click();
    await page.type(options.password, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(365, 380);
    await page.mouse.click(365, 380);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(670, 380, { steps: 5 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await page.mouse.click(438, 433);
  }
}

module.exports = AliYunProvider;
