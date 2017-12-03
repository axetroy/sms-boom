const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://jz.faisco.com/reg.html`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const frames = page.frames();
    let loginFrame = null;

    while (frames.length) {
      const frame = frames.shift();
      try {
        await frame.waitForSelector('#regAcct', { timeout: 1000 * 3 });
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

    await loginFrame.evaluate(async () => {
      const options = await window.getOptions();
      document.querySelector('#regAcct').value = options.phone;
      document.querySelector('button.item_code').click();
      // 检验是否发送成功
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (document.querySelector('button.item_code')) {
            resolve();
          } else {
            reject();
          }
        }, 1000 * 2);
      });
    });
  }
};
