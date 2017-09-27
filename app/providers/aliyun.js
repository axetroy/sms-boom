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

    await utils.sleep(2000);

    await page.press('F12');

    await page.goto(URL, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    const result = await page.evaluate(async () => {
      //获取元素的纵坐标
      function getTop(e) {
        let offset = e.offsetTop;
        if (e.offsetParent !== null) offset += getTop(e.offsetParent);
        return offset;
      }
      //获取元素的横坐标
      function getLeft(e) {
        let offset = e.offsetLeft;
        if (e.offsetParent !== null) offset += getLeft(e.offsetParent);
        return offset;
      }

      const $span = document.querySelector('button');
      return {
        x: +getTop($span) + 5,
        y: +getLeft($span) + 5
      };
    });

    console.log(result);

    await page.mouse.move(result.x, result.y, { steps: 20 });

    // await page.mouse.down();
    await page.mouse.click();
    // await page.mouse.move(result.x + 1, result.y);

    // await browser.close();
  }
}

module.exports = QQProvider;
