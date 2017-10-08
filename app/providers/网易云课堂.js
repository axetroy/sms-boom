const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `http://study.163.com/`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const $btnOk = await page.$('.j-cp-entrance-tips-ok');

    if ($btnOk) {
      await $btnOk.click();
    }

    await page.mouse.move(1200, 120, { steps: 10 });
    await page.mouse.down({ button: 'left' });

    await page.click(1200, 120);

    // const $registerBtn = await page.$('#j-login');
    //
    // await $registerBtn.click();

    await utils.sleep(2000);

    const $btngo2signup = await page.$('#changepage');

    if ($btngo2signup) {
      await $btngo2signup.click();
    }

    const [$mobile, $submit] = await Promise.all([
      page.$('#j-tel'),
      page.$('.u-codebtn')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click();
  }
};
