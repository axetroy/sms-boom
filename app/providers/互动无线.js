const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://user.ihuyi.com/register.html`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    await page.type('#tel', options.phone, { delay: 50 });

    // 拖拽验证码
    await page.mouse.move(604, 333);
    await page.mouse.down();
    await page.mouse.move(882, 327, { steps: 20 });
    await page.mouse.up();

    await page.click('#gca');

    await utils.sleep(500);

    // 检验是否发送成功
    const isSuccess = await page.evaluate(() => {
      const text = document.querySelector('.telcode');
      return text.innerText.indexOf('秒') >= 0;
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
