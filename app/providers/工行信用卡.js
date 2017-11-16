const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://mims.icbc.com.cn/IMServiceServer/servlet/ICBCBaseReqNSServlet?dse_operationName=ApplyCreditCardOp&coreCode=HZDW000008461&paraPromoCode=EW0004600000000GZ01`;
    this.alone = true;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.waitForNavigation();

    await page.waitForSelector('#province0', { timeout: 1000 * 3 });

    await page.click('#province0'); // 点击第一个省份

    await page.waitForSelector('#city0', { timeout: 1000 * 3 });

    await page.click('#city0'); // 点击第一个城市

    await page.waitForSelector('#cardList', { timeout: 1000 * 3 });

    await page.waitForSelector('#cardList button.red_btn_card', { timeout: 1000 * 3 });

    await page.click('#cardList button.red_btn_card');

    await page.waitForNavigation();

    await page.waitForSelector('#mobile', { timeout: 1000 * 3 });

    // 输入手机号
    await page.type('#mobile', options.phone, { delay: 50 });

    // 发送验证码
    await page.click('#getButton button');

    await utils.sleep(500);

    const isSuccess = await page.evaluate(() => {
      const btn = document.querySelector('#getButton');
      const style = btn.style;
      console.log(style);
      return style.display === 'none';
    });

    await (isSuccess ? Promise.resolve(true) : Promise.reject(false));
  }
};
