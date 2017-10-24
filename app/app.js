const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pTimeout = require('p-timeout');
const chalk = require('chalk');
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
      const absFilePath = path.join(dir, file);
      const Provider = require(absFilePath);
      Provider.file = absFilePath;
      this.provider(Provider);
    }

    return this;
  }
  async run() {
    // open the browser
    this.browser = await puppeteer.launch({
      headless: config.isProduction
      // devtools: true
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
          window.addEventListener('mousemove', e => (document.title = `(${e.x},${e.y})${title}`));
        });

        await this.page.deleteCookie();

        // 60s超时用于处理发送短信，不会导致无线等待的情况...
        await pTimeout(entity.resolve(this), 1000 * 60)
          .then(() => {
            util.log(chalk.green('[Success]:'), entity.name);
          })
          .catch(err => {
            util.log(chalk.red('[Fail]:'), entity.name);
            if (err) console.error(err);
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
      .map(Provider => {
        // 实例化服务提供者
        const entity = new Provider(this);
        const fileInfo = path.parse(Provider.file);
        // 设置每个服务提供者的文件和名字
        entity.name = fileInfo.name;
        entity.file = Provider.file;
        return entity;
      })
      .filter(entity => entity.active === true);

    const aloneEntity = entities.find(entity => entity.alone);

    // 如果找到设置alone属性的provider，则单独运行，方便调试
    if (aloneEntity && !this.options.isProduction) {
      this.entities = [aloneEntity];
    } else {
      this.entities = entities;
    }

    if (this.options.once) {
      return await this.run();
    }

    // run forever
    while (process) {
      await this.run();
      // take a rest then let's go...
      await util.sleep(1000 * 10);
    }
  }
}

module.exports = App;
