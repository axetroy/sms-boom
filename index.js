const App = require('./app/app');

const isProduction = process.env.NODE_ENV === 'production';

new App({
  username: 'abc123mmp',
  name: '张大爷',
  password: 'abc123*abc123',
  phone: '13377175342',
  once: isProduction === false
})
  .provider(require('./app/providers/qq'))
  .provider(require('./app/providers/aliyun'))
  .provider(require('./app/providers/taobao'))
  .provider(require('./app/providers/juhe'))
  .provider(require('./app/providers/xiangrikui'))
  .provider(require('./app/providers/youku'))
  .provider(require('./app/providers/alipay'))
  .provider(require('./app/providers/iqiyi'))
  .provider(require('./app/providers/xiaomi'))
  .provider(require('./app/providers/6yuecom'))
  .provider(require('./app/providers/gaode'))
  .provider(require('./app/providers/97gg'))
  .provider(require('./app/providers/xinnet'))
  .provider(require('./app/providers/cnmo'))
  .provider(require('./app/providers/surong'))
  .provider(require('./app/providers/haichufang'))
  .provider(require('./app/providers/lingyuqipai'))
  .provider(require('./app/providers/zhubajie'))
  .bootstrap({ autoClose: false });
