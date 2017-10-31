const chalk = require('chalk');
const boomer = require('../index');
const app = boomer(process.env.PHONE, { once: true });

app
  .on('open', (ctx) => {
    console.info(`打开浏览器...`);
  })
  .on('next', (currentTarget) => {
    utils.info(
      `进入到 ${chalk.green(currentTarget.name)} ${chalk.green.underline(currentTarget.url)}`
    );
  })
  .on('error', err => {
    console.error(`something go wrong`);
    console.error(err);
  })
  // bootstrap
  .emit('bootstrap');
