const Provider = require('../provider');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://ssl.zc.qq.com/v3/index-chs.html`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    const [$nickname, $password, $phone, $send] = await Promise.all([
      page.$('#nickname'),
      page.$('#password'),
      page.$('#phone'),
      page.$('#send-sms')
    ]);

    await $nickname.click({ button: 'left' });
    await page.type(options.username, { delay: 100 });

    await $password.click({ button: 'left' });
    await page.type(options.password, { delay: 100 });

    await $phone.click({ button: 'left' });
    await page.type(options.phone, { delay: 100 });
    await $send.click({ button: 'left' });
  }
};
