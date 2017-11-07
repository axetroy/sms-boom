const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const Chromium = require('./chromium');
const config = require('./config');
const App = require('./app/app');

console.info(`process ${chalk.blue(process.pid)} ${chalk.green('start')}.`);

process.on('SIGINT', () => {
  console.info(`SIGINT received`);
  process.exit(1);
});

process.on('exit', () => {
  console.info(`process ${chalk.blue(process.pid)} ${chalk.red('exit')}.`);
});

process.on('uncaughtException', err => {
  console.error('Error caught in uncaughtException event:');
  console.error(err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// 运行时检查是已安装Chromium
if (Chromium.isExist === false) {
  // 查看本地是否有缓存
  if (Chromium.isExistLocalCache === true) {
    fs.copySync(Chromium.cacheChromiumPath, Chromium.localChromiumPath);
  } else {
    // 如果没有缓存，则直接退出
    console.error(
      `Please make sure ${chalk.green('chromium')} have install at ${chalk.yellow(
        path.join(config.paths.puppeteer, '.local-chromium')
      )}`
    );
    console.error(
      `Try to reinstall: ${chalk.green(
        'node ' + path.join(config.paths.puppeteer, 'install.js')
      )}\n`
    );

    console.info(
      `If you got network trouble, You can download ${chalk.green(
        Chromium.downloadUrl
      )} by your self and extract to ${chalk.yellow(Chromium.path)}`
    );

    process.exit(1);
  }
} else {
  // 缓存Chromium，防止重复下载
  fs.ensureDirSync(Chromium.cacheChromiumPath);

  // 子目录
  const subPath = Chromium.platform + '-' + Chromium.revision;
  // 最后缓存的目标路径
  const targetPath = path.join(Chromium.cacheChromiumPath, subPath);

  // 如果不存在，则缓存起来
  if (fs.pathExistsSync(targetPath) === false) {
    fs.copySync(path.join(Chromium.localChromiumPath, subPath), targetPath);
  }
}

const isProduction = process.env.NODE_ENV === 'production';

const defaultOptions = {
  isProduction,
  username: 'abc123mmp',
  name: '隔壁老王1024',
  password: 'abc123abc123',
  phone: '13000000000', // do not set default phone number
  once: isProduction === false
};

module.exports = function(phoneNumber, options) {
  if (typeof phoneNumber !== 'string' && !isNaN(+phoneNumber)) {
    throw new Error(`Invalid phone number ${phoneNumber}`);
  }
  const app = new App(Object.assign({}, defaultOptions, options, { phone: phoneNumber }));
  process.on('exit', () => {
    app.close();
  });
  // load provider
  app.resolveProviders('./app/providers');
  return app;
};
