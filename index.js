const path = require('path');
const fs = require('fs');

console.info(`process ${process.pid} start.`);

process.on('SIGINT', () => {
  console.info(`SIGINT received`);
  process.exit(1);
});

process.on('exit', () => {
  console.info(`process ${process.pid} exit.`);
});

process.on('uncaughtException', err => {
  console.error('Error caught in uncaughtException event:', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

const localChromiumPath = path.join(process.cwd(), 'node_modules', 'puppeteer', '.local-chromium');

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
  throw new Error(`chromium 没有被正确安装，请重新安装，运行 'npm install'`);
}

console.log(localChromiumPath);

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
