const Provider = require('../provider');
const utils = require('../utils');

class XiaoMiProvider extends Provider {
  constructor() {
    super();
    this.url = 'https://account.xiaomi.com/pass/register?_locale=zh_CN';
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    await page.mouse.move(670, 370, { step: 10 });

    await page.click('.result-select-regions');

    await utils.sleep(2000);

    await page.click('[data-brief="CN"]');

    await page.mouse.move(200, 300, { step: 10 });
    await page.mouse.move(500, 600, { step: 10 });
    await page.mouse.move(670, 670, { step: 10 });

    const $mobile = await page.$('input[name="phone"]');

    await $mobile.click({ button: 'left' });

    await page.type(options.phone, { delay: 100 });

    await page.mouse.move(670, 560, { step: 10 });

    await utils.sleep(1000);

    await page.click('input[type="submit"]');
  }
}

module.exports = XiaoMiProvider;
