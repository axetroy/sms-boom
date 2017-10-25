const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = 'https://account.xiaomi.com/pass/register?_locale=zh_CN';
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    // 随便模拟一段用户操作
    await page.mouse.move(670, 370, { step: 10 });

    await page.click('.result-select-regions');

    await utils.sleep(2000);

    await page.click('[data-brief="CN"]');

    await page.mouse.move(200, 300, { step: 10 });
    await page.mouse.move(500, 600, { step: 10 });
    await page.mouse.move(670, 670, { step: 10 });

    // 开始输入电话号码
    await page.type('input[name="phone"]', options.phone, { delay: 50 });

    await page.mouse.move(670, 560, { step: 10 });

    await utils.sleep(1000);

    await page.click('input[type="submit"]');

    await page.waitForSelector('.send-status.disabled', { timeout: 1000 * 3 });
  }
};
