const App = require('./app/app');
const QQProvider = require('./app/providers/qq');
const AliyunProvider = require('./app/providers/aliyun');
const AliPayProvider = require('./app/providers/alipay');
const TaobaoProvider = require('./app/providers/taobao');
const JuheProvider = require('./app/providers/juhe');
const XiangRiKuiProvider = require('./app/providers/xiangrikui');
const YoukuProvider = require('./app/providers/youku');
const IQiYiProvider = require('./app/providers/iqiyi');
const XiaoMiProvider = require('./app/providers/xiaomi');
const SixYueGameProvider = require('./app/providers/6yuecom');
const GaoDeProvider = require('./app/providers/gaode');
const JiuQiGeGeProvider = require('./app/providers/97gg');
const XinNetProvider = require('./app/providers/xinnet');
const CnmoProvider = require('./app/providers/cnmo');
const SuRong360Provider = require('./app/providers/surong');
const HaiChuFangProvider = require('./app/providers/haichufang');
const LingYuQiPaiProvider = require('./app/providers/lingyuqipai');

const isProduction = process.env.NODE_ENV === 'production';

new App({
  username: 'abc123mmp',
  name: '张大爷',
  password: 'abc123*abc123',
  phone: '13377175342',
  once: isProduction === false
})
  .provider(QQProvider)
  .provider(AliyunProvider)
  .provider(TaobaoProvider)
  .provider(JuheProvider)
  .provider(XiangRiKuiProvider)
  .provider(YoukuProvider)
  .provider(AliPayProvider)
  .provider(IQiYiProvider)
  .provider(XiaoMiProvider)
  .provider(SixYueGameProvider)
  .provider(GaoDeProvider)
  .provider(JiuQiGeGeProvider)
  .provider(XinNetProvider)
  .provider(CnmoProvider)
  .provider(SuRong360Provider)
  .provider(HaiChuFangProvider)
  .provider(LingYuQiPaiProvider)
  .bootstrap({ autoClose: false });
