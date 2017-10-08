const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://passport.fang.com/register.aspx`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [
      $username,
      $password,
      $rePassword,
      $mobile,
      $submit
    ] = await Promise.all([
      page.$('#strUsername'),
      page.$('#strPassword'),
      page.$('#strPasswordConfirm'),
      page.$('#strMobile'),
      page.$('#vcode')
    ]);

    await $username.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $rePassword.click();
    await page.type(options.password, { delay: 100 });

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $submit.click();
  }
};
