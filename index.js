const App = require('./app/app');

const isProduction = process.env.NODE_ENV === 'production';

new App({
  isProduction,
  username: 'abc123mmp',
  name: '张大爷',
  password: 'abc123abc123',
  phone: '13377175342',
  once: isProduction === false
})
  .resolveProviders('./app/providers/')
  .bootstrap();
