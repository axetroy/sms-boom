const path = require('path');

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  paths: {
    root: path.join(__dirname, '..')
  }
};
