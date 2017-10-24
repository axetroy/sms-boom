process.on('SIGINT', () => process.exit(1));
process.on('exit', () => {});
process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});

const App = require('./app/app');

const isProduction = process.env.NODE_ENV === 'production';

const defaultOptions = {
  isProduction,
  username: 'abc123mmp',
  name: '张大爷',
  password: 'abc123abc123',
  phone: '13000000000',
  once: isProduction === false
};

module.exports = function(phoneNumber, options) {
  const app = new App({ ...defaultOptions, ...options, ...{ phone: phoneNumber } });

  app.resolveProviders('./app/providers');

  // it will never resolve
  app.bootstrap();

  return app;
};
