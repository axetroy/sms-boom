const path = require('path');
const chalk = require('chalk');
const checkIsChromiumExist = require('./isChromiumExist');
const config = require('./config');

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

const puppeteerModulePath = path.join(config.paths.root, 'node_modules', 'puppeteer');
const localChromiumPath = path.join(puppeteerModulePath, '.local-chromium');

const isChromiumExist = checkIsChromiumExist();

if (isChromiumExist === false) {
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
