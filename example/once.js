const boomer = require('../index');

const app = boomer(process.env.PHONE, { once: true });

app
  .on('open', (ctx) => {
    console.info(`打开浏览器...`);
  })
  .on('next', (ctx) => {
    console.info(`进入到 ${ctx.currentPage}`);
  })
  .on('error', err => {
    console.error(`something go wrong`);
    console.error(err);
  })
  // bootstrap
  .emit('bootstrap');
