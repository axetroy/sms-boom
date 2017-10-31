const chalk = require('chalk');
const boomer = require('../index');
const app = boomer(process.env.PHONE, { once: false });

app
  .on('open', () => {
    console.info(`打开浏览器...`);
  })
  .on('next', (currentTarget) => {
    utils.info(
      `进入到 ${chalk.green(currentTarget.name)} ${chalk.green.underline(currentTarget.url)}`
    );
  })
  .on('error', err => {
    console.error(err);
  })
  // bootstrap
  .emit('bootstrap');
