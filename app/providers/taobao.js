const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class TaobaoProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(phone) {
    const URL = `https://reg.taobao.com/member/reg/fill_mobile.htm`;

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

    const [$btn, $mobile, $slide] = await Promise.all([
      page.$('#J_AgreementBtn'),
      page.$('#J_Mobile'),
      page.$('#nc_1_n1z')
    ]);

    await $btn.click();

    await $mobile.click();
    await page.type(phone + '', { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(415, 325, { step: 10 });
    await $slide.click(415, 325);
    await page.mouse.down({
      button: 'left'
    });

    await utils.sleep(1000);

    await page.mouse.move(690, 325, { steps: 10 });

    await utils.sleep(1000);

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await page.mouse.click(500, 380);

    await utils.sleep(2000);

    await browser.close();
  }
}

module.exports = TaobaoProvider;
