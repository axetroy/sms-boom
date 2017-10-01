const App = require('./app/app');
const QQProvider = require('./app/providers/qq');
const AliyunProvider = require('./app/providers/aliyun');
const AliPayProvider = require('./app/providers/alipay');
const TaobaoProvider = require('./app/providers/taobao');
const JuheProvider = require('./app/providers/juhe');
const XiangRiKuiProvider = require('./app/providers/xiangrikui');
const YoukuProvider = require('./app/providers/youku');
const IQiYiProvider = require('./app/providers/iqiyi');

new App(13377175342)
  .provider(QQProvider)
  .provider(AliyunProvider)
  .provider(TaobaoProvider)
  .provider(JuheProvider)
  .provider(XiangRiKuiProvider)
  .provider(YoukuProvider)
  .provider(AliPayProvider)
  .provider(IQiYiProvider)
  .bootstrap({ autoClose: false });
