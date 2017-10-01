const puppeteer = require('puppeteer');
const config = require('./config');
const util = require('./utils');

class App {
  constructor(phone) {
    this.phone = phone;
    this.providers = [];
  }
  provider(provider) {
    this.providers.push(provider);
    return this;
  }
  async bootstrap(options = {}) {
    const browser = await puppeteer.launch({
      headless: config.isProduction
    });
    const page = (this.page = await browser.newPage());
    const providers = this.providers;
    while (providers.length) {
      const Provider = providers.shift();
      const p = new Provider();
      try {
        await p.resolve(this, this.phone);
      } catch (err) {
        console.error(err);
      } finally {
        await util.sleep(2000);
      }
    }
    console.info(`Bootstrap done!`);
    if (options.autoClose === true) {
      await page.close();
      await browser.close();
    }
  }
}

module.exports = App;
