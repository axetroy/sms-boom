const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class XiangRiKuiProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(phone) {
    const URL = `http://z.xiangrikui.com/zn/phone/submit?rand_key=224594`;

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

    const [$name, $mobile, $submit] = await Promise.all([
      page.$('#mobilebox_name'),
      page.$('#mobilebox_phone'),
      page.$('.contact-submit')
    ]);

    await $name.click({ button: 'left' });
    await page.type('门卫张大爷', { delay: 100 });

    await $mobile.click();
    await page.type(phone + '', { delay: 100 });

    await $submit.click({ button: 'left' });

    await utils.sleep(2000);

    await browser.close();
  }
}

module.exports = XiangRiKuiProvider;
