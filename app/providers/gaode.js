const Provider = require('../provider');
const utils = require('../utils');

class GaoDeProvider extends Provider {
  constructor() {
    super();
    this.url = `http://id.amap.com/register/index`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$mobile] = await Promise.all([page.$('#phone')]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    // 按下鼠标，拖动滚动条
    await page.mouse.move(372, 325, { steps: 10 });
    await page.mouse.click(372, 325);
    await page.mouse.down({
      button: 'left'
    });

    await page.mouse.move(650, 325, { steps: 10 });

    await page.mouse.up({ button: 'left' });
    // 松开鼠标

    await utils.sleep(1000);

    await page.click('#send_msg');
  }
}

module.exports = GaoDeProvider;
