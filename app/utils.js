const chalk = require('chalk');

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function log() {
  return console.log.apply(console, arguments);
}

function info(message) {
  return console.info(chalk.blue(`[INFO]: `) + message);
}

function warn(message) {
  return console.warn(chalk.yellow(`[WARN]: `) + message);
}

function error(message) {
  return console.warn(chalk.red(`[ERROR]: `) + message);
}

function success(message) {
  return console.warn(chalk.green(`[SUCCESS]: `) + message);
}

/**
 * 模拟用户鼠标行为, 用于欺骗识别是否是机器人的脚本
 * @param page
 */
async function mockUserMouse(page) {
  const coordinates = require('./coordinates.json');

  while (coordinates.length) {
    const coordinate = coordinates.shift();
    await page.mouse.move(coordinate.x, coordinate.y, { step: 10 });
  }
}

exports.sleep = sleep;
exports.log = log;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.success = success;
exports.mockUserMouse = mockUserMouse;
