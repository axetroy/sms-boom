const Provider = require('../provider');
const utils = require('../utils');

module.exports = class extends Provider {
  constructor() {
    super();
    this.url = `https://www.amazon.cn/ap/register?_encoding=UTF8&openid.assoc_handle=cnflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.cn%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26ref_%3Dnav_newcust`;
  }
  async resolve(ctx) {
    const options = ctx.options;
    const page = ctx.page;

    await utils.mockUserMouse(page);

    await page.type('#ap_customer_name', options.name, { delay: 100 });
    await page.type('#ap_phone_number', options.phone, { delay: 100 });

    await page.type('#ap_email', options.email, { delay: 50 });
    await page.type('#ap_password', options.password, { delay: 50 });

    await page.click('input[name="legalAgreementCheckBox"]');

    await utils.sleep(1000);

    await page.click('#continue');

    // 检验是否发送成功
    await page.waitForSelector('#auth-pv-enter-code', { timeout: 1000 * 3 });
  }
};
