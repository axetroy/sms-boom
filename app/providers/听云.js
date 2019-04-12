const Provider = require("../provider");
const utils = require("../utils");

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://account.tingyun.com/reg/register#/`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;
    await page.type(
      "body > div.w998 > div.register.ng-scope > div > div:nth-child(1) > div.text.fl > input",
      options.email,
      { delay: 30 }
    );
    await page.type(
      "body > div.w998 > div.register.ng-scope > div > div:nth-child(3) > div.number > input",
      options.phone,
      { delay: 30 }
    );
    await utils.sleep(800);
    await page.click("#btnSendMsg");
    await utils.sleep(1000);
    // 检验是否发送成功
    try {
      let content= await page.$eval("#btnSendMsg", el => el.innerText);
      if (content.indexOf("等待")) {
        return true;        
      }
    } catch (err) {
      throw null;
    }
  }
};
