const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://www.baixing.com/oz/verify/reg`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    await page.reload();

    await page.evaluate(() => {
      const title = document.title;
      window.addEventListener('mousemove', e => {
        const x = e.x;
        const y = e.y;
        document.title = `(${x},${y})${title}`;
      });
    });

    await utils.sleep(2000);

    const [$firstTab, $mobile, $submit] = await Promise.all([
      page.$('.tab-title-item'),
      page.$('[name="mobile"]'),
      page.$('button[type="submit"]')
    ]);

    if ($firstTab) {
      await page.mouse.move(546, 264, { steps: 10 });
      await $firstTab.click();
    }

    await page.mouse.move(600, 420, { steps: 10 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await page.mouse.move(670, 500, { steps: 10 });

    await $submit.click();
  }
};
