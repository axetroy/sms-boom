const Provider = require('../provider');

class SuRong360Provider extends Provider {
  constructor() {
    super();
    this.url = `http://www.surong360.com/SR360/application/user/emailRegisterPage.do`;
  }
  async resolve(ctx) {
    const options = ctx.options;

    const page = ctx.page;

    const [
      $mobile,
      $password,
      $repassword,
      $username,
      $submit
    ] = await Promise.all([
      page.$('#sms'),
      page.$('#passWord'),
      page.$('#passWordAgain'),
      page.$('#userName'),
      page.$('#verificationCodeSpanId')
    ]);

    await $mobile.click();
    await page.type(options.phone, { delay: 100 });

    await $password.click();
    await page.type(options.password, { delay: 100 });

    await $repassword.click();
    await page.type(options.password, { delay: 100 });

    await $username.click();
    await page.type(options.username, { delay: 100 });

    await $submit.click();
  }
}

module.exports = SuRong360Provider;
