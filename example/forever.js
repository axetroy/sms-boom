const boomer = require('../index');

const app = boomer(process.env.PHONE, { once: false });

process.on('SIGINT', () => {
  app.emit('end');
  process.exit(1);
});

app
  .on('open', () => {
    console.info(`打开浏览器...`);
  })
  .on('next', () => {
    console.info(`进入到发送验证码页面...`);
  })
  .on('error', err => {
    console.error(`发送错误了 ${err}`);
  })
  // bootstrap
  .emit('bootstrap');
