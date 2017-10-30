const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * check the chromium have been install in local or not
 * @returns {boolean}
 */
module.exports = function() {
  const localChromiumPath = path.join(config.paths.puppeteer, '.local-chromium');

  let isExisted = false;

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

    const firstFile = files[0];

    const firstFileStat = fs.statSync(path.join(localChromiumPath, firstFile));

    // 不是目录
    if (!firstFileStat.isDirectory()) {
      throw null;
    }

    isExisted = true;
  } catch (err) {}

  return isExisted;
};
