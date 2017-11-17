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
  module.exports.DEFAULT_DOWNLOAD_HOST = DEFAULT_DOWNLOAD_HOST;
  `;
const context = new Context(downLoaderPath);
const script = new vm.Script(`${installScript}`);
script.runInNewContext(context);

function toMegabytes(bytes) {
  const mb = bytes / 1024 / 1024;
  return `${Math.round(mb * 10) / 10} Mb`;
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

      if (!exist) return false;

      return await fs.pathExists(path.join(localCachePath, this.platform + '-' + this.revision));
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
    return util.format(url, ChromiumDownloader.DEFAULT_DOWNLOAD_HOST, this.revision);
  },
  /**
   * download Chromium
   * @returns {Promise.<void>}
   */
  async download() {
    let progressBar = null;
    await this.Downloader.downloadRevision(
      this.platform,
      this.revision,
      ChromiumDownloader.DEFAULT_DOWNLOAD_HOST,
      (bytesTotal, delta) => {
        if (!progressBar) {
          progressBar = new ProgressBar(
            `Downloading Chromium ${this.platform}/${this.revision} - ${toMegabytes(
              bytesTotal
            )} [:bar] :percent :etas `,
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
    );
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

      try {
        const stat = await fs.stat(localChromiumPath);
        // 不是目录
        if (!stat.isDirectory()) return false;
      } catch (err) {
        return false;
      }

      // 验证是否下载指定的版本
      return await fs.pathExists(path.join(localChromiumPath, this.platform + '-' + this.revision));
    })()
      .then(isExist => Promise.resolve(isExist))
      .catch(() => Promise.reject(false));
  },
  Downloader: ChromiumDownloader
};

module.exports = Chromium;
