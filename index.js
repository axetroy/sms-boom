const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

console.info(`process ${chalk.blue(process.pid)} ${chalk.green('start')}.`);

process.on('SIGINT', () => {
  console.info(`SIGINT received`);
  process.exit(1);
});

process.on('exit', () => {
  console.info(`process ${chalk.blue(process.pid)} ${chalk.red('exit')}.`);
});

process.on('uncaughtException', err => {
  console.error('Error caught in uncaughtException event:', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

const puppeteerModulePath = path.join(process.cwd(), 'node_modules', 'puppeteer');
const localChromiumPath = path.join(puppeteerModulePath, '.local-chromium');

try {
  const stat = fs.statSync(localChromiumPath);

  // 不是目录
  if (!stat.isDirectory()) {
    throw null;
  }

  const files = fs.readdirSync(localChromiumPath);

  if (files.length <= 0) {
    throw null;
  }
} catch (err) {
  if (err) {
    console.error(err);
  }
  console.error(
    `Please make sure ${chalk.green('chromium')} have install at ${chalk.yellow(localChromiumPath)}`
  );
  console.error(`Try to reinstall: ${chalk.green('node ' + puppeteerModulePath + '/install.js')}`);
  process.exit(1);
}

const App = require('./app/app');

const isProduction = process.env.NODE_ENV === 'production';

const defaultOptions = {
  isProduction,
  username: 'abc123mmp',
  name: '张大爷',
  password: 'abc123abc123',
  phone: '13000000000', // do not set default phone number
  once: isProduction === false
};

module.exports = function(phoneNumber, options) {
  if (typeof phoneNumber !== 'string' && !isNaN(+phoneNumber)) {
    throw new Error(`Invalid phone number ${phoneNumber}`);
  }
  const app = new App({ ...defaultOptions, ...options, ...{ phone: phoneNumber } });
  // load provider
  app.resolveProviders('./app/providers');
  return app;
};
