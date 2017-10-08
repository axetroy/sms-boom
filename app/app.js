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
  async run() {
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
            const x = e.x;
            const y = e.y;
            document.title = `(${x},${y})${title}`;
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
  }
  async bootstrap(options = {}) {
    const browser = (this.browser = await puppeteer.launch({
      headless: config.isProduction
    }));
    const page = (this.page = await browser.newPage());
    await page.setViewport({
      width: 1366,
      height: 768
    });
    const providers = this.providers;

    while (providers.length) {
      const Provider = providers.shift();
      this.entities.push(new Provider());
    }

    console.info(`Bootstrap done!`);

    if (this.options.once === true) {
      await this.run();
    } else {
      while (true) {
        await this.run();
        await util.sleep(1000 * 10);
      }
    }

    if (options.autoClose === true) {
      await page.close();
      await browser.close();
    }
  }
}

module.exports = App;
