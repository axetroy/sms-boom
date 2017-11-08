const util = require('util');
const vm = require('vm');
const fs = require('fs-extra');
const path = require('path');
const Context = require('@axetroy/context');
const ProgressBar = require('progress');
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

function toMegabytes(bytes) {
  const mb = bytes / 1024 / 1024;
  return `${Math.round(mb * 10) / 10} Mb`;
}

let progressBar = null;
function onProgress(bytesTotal, delta) {
  if (!progressBar) {
    progressBar = new ProgressBar(
      `Downloading Chromium r${revision} - ${toMegabytes(bytesTotal)} [:bar] :percent :etas `,
      {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: bytesTotal
      }
    );
  }
  progressBar.tick(delta);
}

const ChromiumDownloader = context.module.exports;

const Chromium = {
  local: LOCAL_CHROMIUM,
  /**
   * Get the path which is Chromium download path
   * @returns {string}
   */
  get localChromiumPath() {
    return path.join(config.paths.puppeteer, LOCAL_CHROMIUM);
  },
  /**
   * Get the file path which cache local Chromium
   * @returns {string}
   */
  get cacheChromiumPath() {
    return path.join(config.paths.root, LOCAL_CHROMIUM);
  },
  /**
   * Check the is Chromium have been cache in local project
   * @returns {boolean}
   */
  get isExistLocalCache() {
    return (async () => {
      const localCachePath = this.cacheChromiumPath;
      const exist = await fs.pathExists(localCachePath);

      if (exist === true) {
        const files = await fs.readdir(localCachePath);
        if (files.length < 1) return false;

        // 查找到对应的版本
        const existWithPlatformAndVersion = fs.pathExistsSync(
          localCachePath,
          this.platform + '-' + this.revision
        );
        if (existWithPlatformAndVersion) return true;
      }
    })()
      .then(result => Promise.resolve(result))
      .catch(() => Promise.reject(false));
  },
  /**
   * Get chromium version should download
   * @returns {*}
   */
  get revision() {
    return puppeteerPkg.puppeteer.chromium_revision;
  },
  /**
   * Get current platform
   * @returns {*|string}
   */
  get platform() {
    return ChromiumDownloader.currentPlatform();
  },
  /**
   * Chromium download url
   * @returns {string}
   */
  get downloadUrl() {
    const url = ChromiumDownloader.downloadURLs[this.platform];
    return util.format(url, this.revision);
  },
  /**
   * download Chromium
   * @returns {Promise.<void>}
   */
  async download() {
    progressBar = null;
    await this.Downloader.downloadRevision(this.platform, this.revision, onProgress);
  },
  /**
   * Get local chromium path
   * @returns {string}
   */
  get path() {
    return path.join(this.localChromiumPath, this.platform + '-' + this.revision);
  },
  /**
   * Check the Chromium have been download in Puppeteer module
   * @returns {boolean}
   */
  get isExist() {
    return (async () => {
      const localChromiumPath = path.join(config.paths.puppeteer, LOCAL_CHROMIUM);

      const stat = await fs.stat(localChromiumPath);
      // 不是目录
      if (!stat.isDirectory()) {
        throw null;
      }

      const files = await fs.readdir(localChromiumPath);

      if (files.length <= 0) {
        throw null;
      }

      const firstFile = files[0];

      const firstFileStat = await fs.stat(path.join(localChromiumPath, firstFile));

      // 不是目录
      if (!firstFileStat.isDirectory()) {
        throw null;
      }
    })()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false));
  },
  Downloader: ChromiumDownloader
};

module.exports = Chromium;
