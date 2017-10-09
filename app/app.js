const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const config = require('./config');
const util = require('./utils');

class App {
  constructor(options = {}) {
    this.options = options;
    this.providers = [];
    this.entities = [];
  }
  provider(provider) {
    this.providers.push(provider);
    return this;
  }
  resolveProviders(dir) {
    dir = path.join(process.cwd(), dir);
    const files = fs.readdirSync(dir) || [];

    while (files.length) {
      const file = files.shift();
      this.provider(require(path.join(dir, file)));
    }

    return this;
  }
  async run() {
    // open the browser
    this.browser = await puppeteer.launch({
      headless: config.isProduction
    });

    // create a new tab
    this.page = await this.browser.newPage();

    // set the browser's viewport
    await this.page.setViewport({
      width: 1366,
      height: 768
    });

    // listen on tab dialog, like alert, confirm
    this.page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
    });

    const entities = this.entities;
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      try {
        await this.page.goto(entity.url, {
          networkIdleTimeout: 5000,
          waitUntil: 'networkidle',
          timeout: 3000000
        });

        await this.page.evaluate(() => {
          const title = document.title;
          window.addEventListener('mousemove', e => {
            document.title = `(${e.x},${e.y})${title}`;
          });
        });

        await this.page.deleteCookie();

        // 如果resolve超过xxx秒，则认为是超时，不会无限等待
        await new Promise(async (resolve, reject) => {
          let haveResponse = false;
          entity
            .resolve(this)
            .then(() => {
              if (haveResponse === false) {
                haveResponse = true;
                this.__timer__ && clearTimeout(this.__timer__);
                resolve();
              }
            })
            .catch(err => {
              if (haveResponse === false) {
                haveResponse = true;
                this.__timer__ && clearTimeout(this.__timer__);
                reject(err);
              }
            });
          this.__timer__ = setTimeout(() => {
            if (haveResponse === false) {
              reject(new Error(`Resolve time out...`));
            }
            this.__timer__ && clearTimeout(this.__timer__);
          }, 1000 * 60);
        });
      } catch (err) {
        console.error(err);
      } finally {
        await util.sleep(2000);
      }
    }

    // close the browser
    await this.page.close();
    await this.browser.close();
  }
  async bootstrap() {
    const entities = this.providers
      .map(Provider => new Provider())
      .filter(entity => entity.active === true);

    const aloneEntity = entities.find(entity => entity.alone);

    if (aloneEntity && !this.options.isProduction) {
      this.entities = [aloneEntity];
    } else {
      this.entities = entities;
    }

    if (this.options.once === true) {
      await this.run();
    } else {
      while (true) {
        await this.run();
        await util.sleep(1000 * 10);
      }
    }
  }
}

module.exports = App;
