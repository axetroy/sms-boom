const App = require('./app/app');

const isProduction = process.env.NODE_ENV === 'production';

new App({
  username: 'abc123mmp',
  name: '张大爷',
  password: 'abc123abc123',
  phone: '13377175342',
  once: isProduction === false
})
  .provider(require('./app/providers/qq'))
  .provider(require('./app/providers/阿里云'))
  .provider(require('./app/providers/淘宝'))
  .provider(require('./app/providers/聚合数据'))
  .provider(require('./app/providers/向日葵'))
  .provider(require('./app/providers/优酷'))
  .provider(require('./app/providers/支付宝'))
  .provider(require('./app/providers/爱奇艺'))
  .provider(require('./app/providers/小米'))
  .provider(require('./app/providers/六月游戏'))
  .provider(require('./app/providers/高德地图'))
  .provider(require('./app/providers/久其格格'))
  .provider(require('./app/providers/新网'))
  .provider(require('./app/providers/手机中国'))
  .provider(require('./app/providers/速融'))
  .provider(require('./app/providers/嗨厨房'))
  .provider(require('./app/providers/领域棋牌'))
  .provider(require('./app/providers/猪八戒'))
  .provider(require('./app/providers/花瓣'))
  .provider(require('./app/providers/国美'))
  .provider(require('./app/providers/软媒'))
  .provider(require('./app/providers/百姓网'))
  .provider(require('./app/providers/猎聘'))
  .provider(require('./app/providers/房天下'))
  .provider(require('./app/providers/网易云课堂'))
  .provider(require('./app/providers/segmentfault'))
  .provider(require('./app/providers/lofter'))
  .bootstrap({ autoClose: false });
