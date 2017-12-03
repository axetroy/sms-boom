const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://mims.icbc.com.cn/IMServiceServer/servlet/ICBCBaseReqNSServlet?dse_operationName=ApplyCreditCardOp&coreCode=HZDW000008461&paraPromoCode=EW0004600000000GZ01`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await page.goto(this.url);

    await page.waitForSelector('#cardList .red_btn_card', { timeout: 1000 * 3 });

    await page.click('#cardList .red_btn_card');

    await page.waitForNavigation({ timeout: 1000 * 5, waitUntil: 'domcontentloaded' });

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

    if (isSuccess === false) {
      throw null;
    }
  }
};
