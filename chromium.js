const util = require('util');
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const Context = require('@axetroy/context');
const config = require('./config');

const LOCAL_CHROMIUM = '.local-chromium';

const puppeteerPkg = require(path.join(config.paths.puppeteer, 'package.json'));
const downLoaderPath = path.join(config.paths.puppeteer, 'utils', 'ChromiumDownloader.js');

const installScript =
  fs.readFileSync(downLoaderPath, {
    encoding: 'utf8'
  }) +
  `
  // expose the module to outside
  module.exports.downloadURLs = downloadURLs;
  `;

const context = new Context(downLoaderPath);

const script = new vm.Script(`${installScript}`);

script.runInNewContext(context);

const ChromiumDownloader = context.module.exports;

const Chromium = {
  /**
   * get chromium version should download
   * @returns {*}
   */
  get revision() {
    return puppeteerPkg.puppeteer.chromium_revision;
  },
  /**
   * get current platform
   * @returns {*|string}
   */
  get platform() {
    return ChromiumDownloader.currentPlatform();
  },
  /**
   * chromium download url
   * @returns {string}
   */
  get downloadUrl() {
    const url = ChromiumDownloader.downloadURLs[this.platform];
    return util.format(url, this.revision);
  },
  /**
   * get local chromium path
   * @returns {string}
   */
  get path() {
    return path.join(config.paths.puppeteer, LOCAL_CHROMIUM, this.platform + '-' + this.revision);
  },
  /**
   * check the local chromium is exist or not
   * @returns {boolean}
   */
  get isExist() {
    const localChromiumPath = path.join(config.paths.puppeteer, LOCAL_CHROMIUM);

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
  },
  Downloader: ChromiumDownloader
};

module.exports = Chromium;
