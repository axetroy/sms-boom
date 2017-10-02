const Provider = require('../provider');
const utils = require('../utils');

class JiuQiGeGeProvider extends Provider {
  constructor() {
    super();
    this.url = `https://97gg.net/Account/Register`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const $phoneRegister = await page.$('#phoneRegistTab');

    await $phoneRegister.click();

    await utils.sleep(1000);

    const [$mobile, $password, $repassword, $submit] = await Promise.all([
      page.$('#UserName'),
      page.$('#Password'),
      page.$('#ConfirmPassword'),
      page.$('#chkCodeSendBtn')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $repassword.click();
    await page.type(options.password, { delay: 100 });

    await $submit.click();
  }
}

module.exports = JiuQiGeGeProvider;
