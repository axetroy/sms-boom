const puppeteer = require('puppeteer');
const config = require('./config');
const util = require('./utils');

class App {
  constructor(options = {}) {
    this.options = options;
    this.providers = [];
  }
  provider(provider) {
    this.providers.push(provider);
    return this;
  }
  async bootstrap(options = {}) {
    const browser = (this.browser = await puppeteer.launch({
      headless: config.isProduction
    }));
    const page = (this.page = await browser.newPage());
    const providers = this.providers;

    const entities = [];

    while (providers.length) {
      const Provider = providers.shift();
      entities.push(new Provider());
    }

    console.info(`Bootstrap done!`);

    while (true) {
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];

        try {
          await entity.resolve(this);
        } catch (err) {
          console.error(err);
        } finally {
          await util.sleep(2000);
        }
      }

      await util.sleep(1000 * 5);
    }

    if (options.autoClose === true) {
      await page.close();
      await browser.close();
    }
  }
}

module.exports = App;
