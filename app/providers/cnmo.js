const Provider = require('../provider');

class CnmoProvider extends Provider {
  constructor() {
    super();
    this.url = `http://passport.cnmo.com/register/`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [
      $mobile,
      $username,
      $password,
      $repassword,
      $submit
    ] = await Promise.all([
      page.$('#m_mobile'),
      page.$('#m_uname'),
      page.$('#m_password'),
      page.$('#m_confirm'),
      page.$('#m_getcode')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $username.click();
    await page.type(options.username, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $repassword.click();
    await page.type(options.password, { delay: 100 });

    await $submit.click();
  }
}

module.exports = CnmoProvider;
