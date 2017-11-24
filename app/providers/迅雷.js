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

    // TODO：有待完善

    // 点击登陆按钮
    await page.click('a[name="login"]');

    // 等待登陆框出现
    await page.waitForSelector('.login_ifr', { timeout: 1000 * 3 });

    const frames = page.frames();

    let loginFrame = null;

    while (frames.length) {
      const frame = frames.shift();
      try {
        await frame.waitForSelector('#in_txt', { timeout: 1000 * 3 });
        loginFrame = frame;
        break;
      } catch (err) {}
    }

    if (loginFrame === null) {
      throw null;
    }

    // 等待短信注册按钮出现
    await loginFrame.waitForSelector('#ml_tab', { timeout: 1000 * 3 });

    // 点击短信注册
    await loginFrame.click('#ml_tab');

    await loginFrame.type('#in_txt', options.phone, { delay: 100 });
    await loginFrame.type('#ml_c_l', options.phone, { delay: 100 });

    await loginFrame.click('#ml_gc');

    // 检验是否发送成功
    await loginFrame.waitForSelector('#ml_gc.verify_grey_btn', { timeout: 1000 * 3 });
  }
};
