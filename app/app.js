const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pTimeout = require('p-timeout');
const chalk = require('chalk');
const { shuffle } = require('lodash');
const utils = require('./utils');

const EVENT_ON_LAUNCH = 'launch'; // symbol('when App launch');
const EVENT_ON_OPEN = 'open'; // symbol('when browser open');
const EVENT_ON_CLOSED = 'closed'; // symbol('when browser closed');
const EVENT_ON_NEXT = 'next'; // symbol('when turn to next target');
const EVENT_ON_ERROR = 'error'; //symbol('when the page resolve error');

class App extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = options;
    this.providers = [];
    this.entities = [];
    this.active = false;
    this.currentPage = null; // 当前正在打开的页面

    this.on('end', async () => {
      // close the browser
      this.page && (await this.page.close());
      this.browser && (await this.browser.close());
    });
    this.on('bootstrap', this.bootstrap.bind(this));
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

  /**
   * 运行一个周期
   * @returns {Promise.<void>}
   */
  async run() {
    try {
      // open the browser
      if (!this.active) return;

      this.emit(EVENT_ON_OPEN, this);

      this.browser = await puppeteer.launch({ headless: this.options.isProduction });

      // create a new tab
      this.page = await this.browser.newPage();

      // set the browser's viewport
      await this.page.setViewport({
        width: 1366,
        height: 768
      });

      // listen on tab dialog, like alert, confirm
      this.page.on('dialog', async dialog => {
        await dialog.dismiss();
      });

      const entities = this.entities;
      for (let i = 0; i < entities.length; i++) {
        if (!this.active) return;
        const entity = entities[i];

        try {
          this.currentPage = entity.url;
          this.emit(EVENT_ON_NEXT, this);
          // 跳转页面
          await this.page.goto(entity.url, {
            networkIdleTimeout: 5000,
            waitUntil: 'networkidle',
            timeout: 3000000
          });

          // debug 模式下，才显示坐标
          if (!this.options.isProduction) {
            await this.page.evaluate(() => {
              const title = document.title;
              window.addEventListener(
                'mousemove',
                e => (document.title = `(${e.x},${e.y})${title}`)
              );
            });
          }

          await this.page.deleteCookie();

          // 60s超时用于处理发送短信，不会导致无线等待的情况...
          await pTimeout(entity.resolve(this), 1000 * 60)
            .then(() => {
              utils.log(chalk.green('[Success]:'), entity.name);
            })
            .catch(err => {
              // 等待超时，忽略掉
              utils.log(chalk.red('[Fail]:'), entity.name);
              // 如果是等待超时
              // 则很有可能是验证是否发送成功
              if (err instanceof Error && err.message.indexOf('waiting failed')) {
              } else if (err) {
                this.emit(EVENT_ON_ERROR, err);
              }
            });
        } catch (err) {
          this.emit(EVENT_ON_ERROR, err);
        } finally {
          await utils.sleep(2000);
        }
      }

      // close the browser
      await this.page.close();
      await this.browser.close();
      this.emit(EVENT_ON_CLOSED, this);
    } catch (err) {
      this.emit(EVENT_ON_ERROR, err);
    }
  }
  async bootstrap() {
    // 随机序列
    const entities = shuffle(
      this.providers
        .map(Provider => {
          // 实例化服务提供者
          const entity = new Provider(this);
          const fileInfo = path.parse(Provider.file);
          // 设置每个服务提供者的文件和名字
          entity.name = fileInfo.name;
          entity.file = Provider.file;
          return entity;
        })
        .filter(entity => entity.active === true)
    );

    const aloneEntity = entities.find(entity => entity.alone);

    // 如果找到设置alone属性的provider，则单独运行，方便调试
    if (aloneEntity && !this.options.isProduction) {
      this.entities = [aloneEntity];
    } else {
      this.entities = entities;
    }

    this.emit(EVENT_ON_LAUNCH, this);

    this.active = true;

    if (this.options.once) {
      this.run();
    } else {
      // run forever
      while (process) {
        await this.run();
        // take a rest then let's go...
        await utils.sleep(1000 * 10);
      }
    }
    return this;
  }
}

module.exports = App;
