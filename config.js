const path = require('path');

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  paths: {
    root: __dirname,
    app: path.join(__dirname, 'app'),
    bin: path.join(__dirname, 'bin'),
    puppeteer: path.dirname(require.resolve('puppeteer'))
  }
};
