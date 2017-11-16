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

exports.sleep = sleep;
exports.log = log;
exports.info = info;
exports.warn = warn;
exports.error = error;
