const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pTimeout = require('p-timeout');
const { shuffle } = require('lodash');
const pMap = require('p-map');
const utils = require('./utils');
const config = require('../config');

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
    this.closed = false;
    this.initer = []; // 初始化的函数
    this.on('bootstrap', async () => {
      try {
        const initer = this.initer;
        // init before bootstrap all
        while (initer.length) {
          const initFunc = initer.shift();
          await pTimeout(initFunc.call(this), 1000 * 10);
        }
      } catch (err) {
        console.error(`Boomer init fail...`);
        this.emit(EVENT_ON_ERROR, err);
        process.exit(1);
      }
      this.bootstrap();
    });

    process.on('exit', () => {
      this.close();
    });
  }

  /**
   * 添加初始化事务
   * @param func
   * @returns {App}
   */
  init(func) {
    this.initer.push(func);
    return this;
  }

  /**
   * 从目录加载provider
   * @param dir
   * @returns {App}
   */
  resolveProviders(dir) {
    dir = path.join(config.paths.root, dir);
    const files = fs.readdirSync(dir) || [];
    while (files.length) {
      const file = files.shift();
      const absFilePath = path.join(dir, file);
      const Provider = require(absFilePath);
      Provider.file = absFilePath;
      this.providers.push(Provider);
    }
    return this;
  }

  /**
   * 运行单个站点
   * @param entity
   * @returns {Promise.<void>}
   */
  async runOne(entity) {
    if (this.closed === true) return;

    // create a new tab
    const page = await this.browser.newPage();

    // set the browser's viewport
    await page.setViewport({
      width: 1366,
      height: 768
    });

    // listen on tab dialog, like alert, confirm
    page.on('dialog', async dialog => {
      await dialog.dismiss();
    });

    try {
      this.emit(EVENT_ON_NEXT, entity);
      // 跳转页面
      await page.goto(entity.url, {
        waitUntil: 'load',
        timeout: 3000000
      });

      // 删除cookies
      await page.deleteCookie();

      // debug 模式下，才显示坐标
      if (!this.options.isProduction) {
        await page.evaluate(() => {
          const title = document.title;
          const coordinates = [];
          window.addEventListener('mousemove', e => {
            // trace mouse
            const div = document.createElement('div');
            div.style.width = '5px';
            div.style.height = '5px';
            div.style.borderRadius = '50%';
            div.style.backgroundColor = 'green';
            div.style.position = 'absolute';
            div.style.left = e.x + 5 + 'px';
            div.style.top = e.y + 5 + 'px';

            document.body.appendChild(div);

            coordinates.push({
              x: e.x,
              y: e.y
            });

            setTimeout(() => {
              div.remove();
            }, 2000);

            document.title = `(${e.x},${e.y})${title}`;
          });
        });
      }

      // 60s超时用于处理发送短信，不会导致无限等待的情况...
      await pTimeout(entity.resolve(Object.assign(this, { page })), 1000 * 60);
      utils.success(entity.name);
    } catch (err) {
      // 等待超时，忽略掉
      utils.error(entity.name);
      this.emit(EVENT_ON_ERROR, err);
    }

    try {
      // 关闭标签前，删除浏览记录
      // 1. cookie
      // 2. localStorage
      // 3. sessionStorage
      // 4. indexDb
      await page.deleteCookie();
      await page.evaluate(() => {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        localStorage.clear();
        sessionStorage.clear();
        IDBObjectStore.clear();
      });
      window.addEventListener('mousemove', e => {});
      // 延迟一秒
      await utils.sleep(1000);
    } catch (err) {
      // this.emit(EVENT_ON_ERROR, err);
    } finally {
      // 关闭标签
      await page.close();
    }
  }

  /**
   * 运行所有站点
   * @returns {Promise.<void>}
   */
  async runAll() {
    try {
      this.browser = await puppeteer.launch({ headless: this.options.isProduction });
      this.browser.on('disconnected', () => {
        this.closed = true;
        this.emit(EVENT_ON_CLOSED, this);
      });
      this.closed = false;
      this.emit(EVENT_ON_OPEN, this);
      // 并发5个网站
      await pMap(
        this.entities,
        async entity => {
          try {
            await this.runOne(entity);
          } catch (err) {
            this.emit(EVENT_ON_ERROR, err);
          }
        },
        { concurrency: this.options.concurrency }
      );
    } catch (err) {
      this.emit(EVENT_ON_ERROR, err);
    }
  }

  /**
   * 关掉浏览器
   * @returns {Promise.<void>}
   */
  async close() {
    try {
      const browser = this.browser;
      browser && (await browser.close());
    } catch (err) {
      this.emit(EVENT_ON_CLOSED, err);
    }
  }

  /**
   * 启动程序
   * @returns {Promise.<App>}
   */
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

    this.entities = entities;

    if (!this.options.isProduction) {
      let aloneEntity;

      // 如果找到指定的provider，则单独运行
      if (this.options.launchProvider) {
        aloneEntity = entities.find(entity => entity.name === this.options.launchProvider);
      }

      // 如果找到设置alone属性的provider，则单独运行，方便调试
      if (!aloneEntity) {
        aloneEntity = entities.find(entity => entity.alone);
      }

      if (aloneEntity) {
        this.entities = [aloneEntity];
      }
    }

    this.emit(EVENT_ON_LAUNCH, this);

    if (this.options.once) {
      await this.runAll();
      await this.close();
    } else {
      // run forever
      while (process) {
        await this.runAll();
        // take a rest then let's go...
        await this.close();
        await utils.sleep(1000 * 10);
      }
    }
    return this;
  }
}

module.exports = App;
