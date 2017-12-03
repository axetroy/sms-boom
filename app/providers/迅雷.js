const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://vip.xunlei.com/?referfrom=v_pc_qtcp_ggong_xlhy`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    // 点击登陆按钮
    await page.click('a[name="login"]');

    // 等待登陆框出现
    await page.waitForSelector('.login_ifr', { timeout: 1000 * 3 });

    const frames = page.frames();

    let loginFrame = null;

    while (frames.length) {
      const frame = frames.shift();
      try {
        await frame.waitForSelector('#login_box', { timeout: 1000 * 3 });
        loginFrame = frame;
        break;
      } catch (err) {}
    }

    if (loginFrame === null) {
      throw null;
    }

    await page.exposeFunction('getOptions', function() {
      return options;
    });

    const isSuccess = await loginFrame.evaluate(async () => {
      const options = await window.getOptions();
      document.querySelector('#ml_tab').click();
      document.querySelector('#ml_m').value = options.phone;
      document.querySelector('#ml_gc').click();
      // 检验是否发送成功
      return document.querySelector('#ml_gc').classList.contains('verify_grey_btn');
    });

    if (isSuccess === false) {
      throw null;
    }
  }
};
