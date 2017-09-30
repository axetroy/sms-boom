const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class QQProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(phone) {
    const URL = `https://passport.alibaba.com/member/reg/fast/fast_reg.htm?_regfrom=ALIYUN`;
    const browser = await puppeteer.launch({
      headless: config.isProduction
    });

    const page = await browser.newPage();

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
    await page.type(`张三abc1154`, { delay: 100 });

    let psw = Math.random() + '';
    await $password.click();
    await page.type(psw, { delay: 100 });

    await $rePassword.click();
    await page.type(psw, { delay: 100 });

    await $mobile.click();
    await page.type(phone + '', { delay: phone });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(365, 380);
    await page.mouse.click(365, 380);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(670, 380, { steps: 1 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await page.mouse.click(438, 433);

    await browser.close();
  }
}

module.exports = QQProvider;
