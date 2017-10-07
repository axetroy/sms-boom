const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.juhe.cn/register`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$username, $password, $mobile, $sendBtn] = await Promise.all([
      page.$('#username'),
      page.$('#password'),
      page.$('#mobilephone'),
      page.$('#reg_smsbtn')
    ]);

    await $username.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $sendBtn.click({ button: 'left' });
  }
}