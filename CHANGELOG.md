<a name="2.0.0"></a>
# [2.0.0](https://github.com/axetroy/sms-boom/compare/v1.4.0...v2.0.0) (2017-12-03)


### Bug Fixes

* lofter provider没有正确检测是否发送短信成功 ([6e339f3](https://github.com/axetroy/sms-boom/commit/6e339f3))
* segmentfault ([e7ec35c](https://github.com/axetroy/sms-boom/commit/e7ec35c))
* username 和 name 为小写 ([e6f2849](https://github.com/axetroy/sms-boom/commit/e6f2849))
* 世界帮provider ([87098e6](https://github.com/axetroy/sms-boom/commit/87098e6))
* 书从provider没有正确检测是否发送短信成功 ([dd9b7a0](https://github.com/axetroy/sms-boom/commit/dd9b7a0))
* 企查查provider没有正确检测是否发送短信成功 ([0bd61bd](https://github.com/axetroy/sms-boom/commit/0bd61bd))
* 修复一些provider没有正确检测是否发送短信成功 ([e2c708b](https://github.com/axetroy/sms-boom/commit/e2c708b))
* 修复中瑞财富验证是否发送成功不正确的问题 ([4e6c736](https://github.com/axetroy/sms-boom/commit/4e6c736))
* 修复巨人网络provider没有正确选择器的问题 ([ccb0816](https://github.com/axetroy/sms-boom/commit/ccb0816))
* 修复微盟未正确检测provider的情况 ([551ef3f](https://github.com/axetroy/sms-boom/commit/551ef3f))
* 修复房天下的provider，在最后检测成功/失败环节抛出不预期的异常 ([df4c220](https://github.com/axetroy/sms-boom/commit/df4c220))
* 修复迅雷provider不正确运行的问题 ([00c29b1](https://github.com/axetroy/sms-boom/commit/00c29b1))
* 巨人网络provider没有正确检测是否发送短信成功 ([300b884](https://github.com/axetroy/sms-boom/commit/300b884))
* 底卡侬provider没有正确检测是否发送短信成功 ([091dd15](https://github.com/axetroy/sms-boom/commit/091dd15))
* 无限启动模式下，无法正确关闭浏览器的问题 ([340b89e](https://github.com/axetroy/sms-boom/commit/340b89e))
* 添加意识的成功/失败提示 ([5079c06](https://github.com/axetroy/sms-boom/commit/5079c06))
* 页面崩溃下，没有正确关闭页面的问题 ([83972f9](https://github.com/axetroy/sms-boom/commit/83972f9))
* 麦付宝provider没有正确检测是否发送短信成功 ([27a49ff](https://github.com/axetroy/sms-boom/commit/27a49ff))


### Features

* add 中瑞财富 provider ([130b62d](https://github.com/axetroy/sms-boom/commit/130b62d))
* add 书丛 provider ([a05b651](https://github.com/axetroy/sms-boom/commit/a05b651))
* add 企查查 provider ([d8dfd8e](https://github.com/axetroy/sms-boom/commit/d8dfd8e))
* add 巨人网络 provider ([f6b08a2](https://github.com/axetroy/sms-boom/commit/f6b08a2))
* add 微盟 provider ([ccf0aee](https://github.com/axetroy/sms-boom/commit/ccf0aee))
* add 迪卡侬 provider ([b56be26](https://github.com/axetroy/sms-boom/commit/b56be26))
* add 麦付宝 provider ([88a1f58](https://github.com/axetroy/sms-boom/commit/88a1f58))
* Upgrade [@axetroy](https://github.com/axetroy)/graceful, try to kill child process before exit ([830ce6b](https://github.com/axetroy/sms-boom/commit/830ce6b))
* 不在提供外部引用的example ([2deed2e](https://github.com/axetroy/sms-boom/commit/2deed2e))
* 关闭标签的同时，清除缓存,cookies,localStorage,sessionStorage,IndexDB ([8f94d9c](https://github.com/axetroy/sms-boom/commit/8f94d9c))
* 删除无效的provider todokit ([89e44d1](https://github.com/axetroy/sms-boom/commit/89e44d1))
* 删除无效的provider 棋牌领域 ([f6d0ed9](https://github.com/axetroy/sms-boom/commit/f6d0ed9))
* 命令行添加参数-c, --concurrency，用于设置并发数量，默认为5个 ([292d0f2](https://github.com/axetroy/sms-boom/commit/292d0f2))
* 增加互动无线provider ([d16faa1](https://github.com/axetroy/sms-boom/commit/d16faa1))
* 增加巨人网络的语言验证码 ([5462e4b](https://github.com/axetroy/sms-boom/commit/5462e4b))
* 增加房天下，找回密码的provider，适用于如果手机已注册 ([06b9238](https://github.com/axetroy/sms-boom/commit/06b9238))
* 增加熊猫直播provider ([545385d](https://github.com/axetroy/sms-boom/commit/545385d))
* 开启多标签模式，现在会并发打开5个标签 ([6146133](https://github.com/axetroy/sms-boom/commit/6146133))
* 每次运行都会获取假的随机用户名/邮箱 ([431ac9c](https://github.com/axetroy/sms-boom/commit/431ac9c))
* 添加51book provider ([0239792](https://github.com/axetroy/sms-boom/commit/0239792))
* 添加enaea provider ([31873df](https://github.com/axetroy/sms-boom/commit/31873df))
* 添加乾贷provider ([0a935ac](https://github.com/axetroy/sms-boom/commit/0a935ac))
* 添加乾贷网的电话验证码 ([7e36751](https://github.com/axetroy/sms-boom/commit/7e36751))
* 添加科凡provider ([3361967](https://github.com/axetroy/sms-boom/commit/3361967))
* 添加粉笔网provider ([e409bbe](https://github.com/axetroy/sms-boom/commit/e409bbe))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/axetroy/sms-boom/compare/v1.3.2...v1.4.0) (2017-11-26)


### Features

* 增加1号店provider ([2d1484a](https://github.com/axetroy/sms-boom/commit/2d1484a))
* 增加喜地provider ([dfe0331](https://github.com/axetroy/sms-boom/commit/dfe0331))
* 增加好豆provider ([0939b50](https://github.com/axetroy/sms-boom/commit/0939b50))
* 增加快乐购provider ([25e97bc](https://github.com/axetroy/sms-boom/commit/25e97bc))
* 增加手拉手商城provider ([7fc61d0](https://github.com/axetroy/sms-boom/commit/7fc61d0))
* 增加音平provider ([0cd1bac](https://github.com/axetroy/sms-boom/commit/0cd1bac))
* 增加音悦台provider ([9885d72](https://github.com/axetroy/sms-boom/commit/9885d72))
* 添加好美家provider ([bf991b5](https://github.com/axetroy/sms-boom/commit/bf991b5))
* 添加尚品宅配provider ([b778ec0](https://github.com/axetroy/sms-boom/commit/b778ec0))
* 添加折800provider ([61f71ea](https://github.com/axetroy/sms-boom/commit/61f71ea))
* 添加纵横中文网provider ([4be0ce5](https://github.com/axetroy/sms-boom/commit/4be0ce5))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/axetroy/sms-boom/compare/v1.3.1...v1.3.2) (2017-11-24)


### Bug Fixes

* fix bugs ([fa18b81](https://github.com/axetroy/sms-boom/commit/fa18b81))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/axetroy/sms-boom/compare/v1.3.0...v1.3.1) (2017-11-24)


### Bug Fixes

* fix bugs ([8986e81](https://github.com/axetroy/sms-boom/commit/8986e81))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/axetroy/sms-boom/compare/v1.2.7...v1.3.0) (2017-11-24)


### Bug Fixes

* **package:** update p-timeout to version 2.0.0 ([e8cc637](https://github.com/axetroy/sms-boom/commit/e8cc637))
* baidu waitForSelector bug ([4a94811](https://github.com/axetroy/sms-boom/commit/4a94811))
* 修复没有设置超时的问题 ([d94bf50](https://github.com/axetroy/sms-boom/commit/d94bf50))


### Features

* app add baidu ([a832de9](https://github.com/axetroy/sms-boom/commit/a832de9))
* 优雅的关闭进程 ([0fab722](https://github.com/axetroy/sms-boom/commit/0fab722))
* 增加千米电商云provider ([a705813](https://github.com/axetroy/sms-boom/commit/a705813))
* 尝试添加模拟鼠标移动，试图骗过验证系统 ([3aa80c9](https://github.com/axetroy/sms-boom/commit/3aa80c9))
* 当推出进程时，尝试关掉浏览器 ([3b41aa5](https://github.com/axetroy/sms-boom/commit/3b41aa5))
* 添加中国移动provider ([07e9a36](https://github.com/axetroy/sms-boom/commit/07e9a36))
* 添加亚马逊provider ([051d964](https://github.com/axetroy/sms-boom/commit/051d964))
* 添加迅雷provider ([79f443d](https://github.com/axetroy/sms-boom/commit/79f443d))
* 添加页面的鼠标追踪 ([8daccb8](https://github.com/axetroy/sms-boom/commit/8daccb8))



<a name="1.2.7"></a>
## [1.2.7](https://github.com/axetroy/sms-boom/compare/v1.2.6...v1.2.7) (2017-11-18)


### Bug Fixes

* fix error example ([a51e259](https://github.com/axetroy/sms-boom/commit/a51e259))
* 修复once.js引入utils，修复工行信用卡通道 ([134e539](https://github.com/axetroy/sms-boom/commit/134e539))
* 移除工行信用卡通道调式模式 ([6c8d87a](https://github.com/axetroy/sms-boom/commit/6c8d87a))



<a name="1.2.6"></a>
## [1.2.6](https://github.com/axetroy/sms-boom/compare/v1.2.5...v1.2.6) (2017-11-17)


### Bug Fixes

* 修复chromium的下载工具出错的问题 ([d57a61b](https://github.com/axetroy/sms-boom/commit/d57a61b))



<a name="1.2.5"></a>
## [1.2.5](https://github.com/axetroy/sms-boom/compare/v1.2.4...v1.2.5) (2017-11-17)



<a name="1.2.4"></a>
## [1.2.4](https://github.com/axetroy/sms-boom/compare/v1.2.3...v1.2.4) (2017-11-11)



<a name="1.2.3"></a>
## [1.2.3](https://github.com/axetroy/sms-boom/compare/v1.2.2...v1.2.3) (2017-11-11)


### Bug Fixes

* fix download process error ([cd14245](https://github.com/axetroy/sms-boom/commit/cd14245))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/axetroy/sms-boom/compare/v1.2.1...v1.2.2) (2017-11-11)


### Bug Fixes

* 适配新版puppter ([beb91b9](https://github.com/axetroy/sms-boom/commit/beb91b9))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/axetroy/sms-boom/compare/v1.2.0...v1.2.1) (2017-11-11)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/axetroy/sms-boom/compare/v1.1.0...v1.2.0) (2017-11-11)


### Bug Fixes

* **package:** update puppeteer to version 0.13.0 ([4dd74d6](https://github.com/axetroy/sms-boom/commit/4dd74d6))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/axetroy/sms-boom/compare/v1.0.0...v1.1.0) (2017-11-08)


### Features

* 下载Chromium显示进度条 ([9bdb78d](https://github.com/axetroy/sms-boom/commit/9bdb78d))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/axetroy/sms-boom/compare/v0.2.5...v1.0.0) (2017-11-08)


### Bug Fixes

* fix missing pkg and invalid file require ([08cb6ef](https://github.com/axetroy/sms-boom/commit/08cb6ef))
* isExist property is not resolve a bool ([14325a9](https://github.com/axetroy/sms-boom/commit/14325a9))
* Make init func error caughtable ([d128be9](https://github.com/axetroy/sms-boom/commit/d128be9))
* typo ([c8fce36](https://github.com/axetroy/sms-boom/commit/c8fce36))


### Features

* auto install Chromium if not detect it have been install ([e749094](https://github.com/axetroy/sms-boom/commit/e749094))
* cli add --launch option ([fcb76dc](https://github.com/axetroy/sms-boom/commit/fcb76dc))
* 增加cli，update命令，用于同步Github的Providers ([34ffc58](https://github.com/axetroy/sms-boom/commit/34ffc58))
* 添加todokit作为Provider ([2fad922](https://github.com/axetroy/sms-boom/commit/2fad922))
* 添加工行信用卡provider ([c644c8a](https://github.com/axetroy/sms-boom/commit/c644c8a))
* 独立出chromium文件，用于检测，获取目录，下载，等等，并且完善下载/解压提示 ([1a7dbd3](https://github.com/axetroy/sms-boom/commit/1a7dbd3))
* 缓存已下载好的Chromium，防止重复下载，然后导致下载错误 ([fe3ad15](https://github.com/axetroy/sms-boom/commit/fe3ad15))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/axetroy/sms-boom/compare/v0.2.4...v0.2.5) (2017-10-31)


### Bug Fixes

* Fix invalid path for install script ([41255e6](https://github.com/axetroy/sms-boom/commit/41255e6))
* invalid selector ([fb3266d](https://github.com/axetroy/sms-boom/commit/fb3266d))
* typo ([20b7182](https://github.com/axetroy/sms-boom/commit/20b7182))
* 修复支付宝报错的问题 ([9557a9a](https://github.com/axetroy/sms-boom/commit/9557a9a))


### Features

* 检测人人车验证码发送是否成功 ([08c2500](https://github.com/axetroy/sms-boom/commit/08c2500))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/axetroy/sms-boom/compare/v0.2.3...v0.2.4) (2017-10-30)


### Bug Fixes

* 修复puppeteer引用路径不正确的问题 ([3fd2899](https://github.com/axetroy/sms-boom/commit/3fd2899))


### Features

* 新增在安装之后，自动验证是否是已安装Chromium，如果没有，则自动安装 ([cd094e3](https://github.com/axetroy/sms-boom/commit/cd094e3))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/axetroy/sms-boom/compare/v0.2.2...v0.2.3) (2017-10-29)


### Bug Fixes

* 修复路径不正确，导致cli没有正确运行 ([aa1b587](https://github.com/axetroy/sms-boom/commit/aa1b587))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/axetroy/sms-boom/compare/v0.2.1...v0.2.2) (2017-10-29)


### Bug Fixes

* 修复路径不正确，导致cli没有正确运行 ([ef208ff](https://github.com/axetroy/sms-boom/commit/ef208ff))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/axetroy/sms-boom/compare/v0.2.0...v0.2.1) (2017-10-29)


### Bug Fixes

* 修复puppeteer目录寻找不正确的问题 ([74a1f87](https://github.com/axetroy/sms-boom/commit/74a1f87))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/axetroy/sms-boom/compare/v0.1.2...v0.2.0) (2017-10-29)


### Bug Fixes

* 修复pupptter安装目录检测不正确的问题 ([615b464](https://github.com/axetroy/sms-boom/commit/615b464))
* 修复世界邦服务提供者，发送短信不正确的问题 ([0f8ad67](https://github.com/axetroy/sms-boom/commit/0f8ad67))
* 修复页面报错，没有正常emit错误的问题 ([32b89f0](https://github.com/axetroy/sms-boom/commit/32b89f0))


### Features

* 增加ZOL游戏 ([16388b1](https://github.com/axetroy/sms-boom/commit/16388b1))
* 增加世界邦provider ([16b6efd](https://github.com/axetroy/sms-boom/commit/16b6efd))
* 增加中关村在线provider ([b6f2bc7](https://github.com/axetroy/sms-boom/commit/b6f2bc7))
* 增加人人车provider ([888e8b1](https://github.com/axetroy/sms-boom/commit/888e8b1))
* 增加爱拍原创 ([ff399af](https://github.com/axetroy/sms-boom/commit/ff399af))
* 增加站酷 ([76fa9a7](https://github.com/axetroy/sms-boom/commit/76fa9a7))
* 添加唯品会provider ([fb8a5be](https://github.com/axetroy/sms-boom/commit/fb8a5be))
* 添加网利宝provider ([1679df7](https://github.com/axetroy/sms-boom/commit/1679df7))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/axetroy/sms-boom/compare/v0.1.1...v0.1.2) (2017-10-27)


### Features

* 程序运行前，检测chromium是否正确安装，如果没有，则给出相应的提示 ([6316689](https://github.com/axetroy/sms-boom/commit/6316689))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/axetroy/sms-boom/compare/v0.1.0...v0.1.1) (2017-10-26)


### Bug Fixes

* 修复小米验证等待，不设置超时的问题 ([b14b5cc](https://github.com/axetroy/sms-boom/commit/b14b5cc))
* 修复房天下验证等待，不设置超时的问题 ([5ee5f71](https://github.com/axetroy/sms-boom/commit/5ee5f71))
* 修复有些等待选择器，没有设置超时的问题 ([f64d1dd](https://github.com/axetroy/sms-boom/commit/f64d1dd))
* 修复程序启动错误，没有输出错误的问题 ([95cf17a](https://github.com/axetroy/sms-boom/commit/95cf17a))


### Features

* 增加社x网 ([55331e8](https://github.com/axetroy/sms-boom/commit/55331e8))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/axetroy/sms-boom/compare/3e7e748...v0.1.0) (2017-10-25)


### Bug Fixes

* **package:** update puppeteer to version 0.12.0 ([ff62442](https://github.com/axetroy/sms-boom/commit/ff62442))
* 修复puppeteer的API变动而失效的问题 ([0ef0493](https://github.com/axetroy/sms-boom/commit/0ef0493))
* 修复浏览器未正确关闭的问题 ([b993d90](https://github.com/axetroy/sms-boom/commit/b993d90))


### Features

* add bin ([6da96de](https://github.com/axetroy/sms-boom/commit/6da96de))
* graceful exit process ([a701785](https://github.com/axetroy/sms-boom/commit/a701785))
* 增加 ([11650ef](https://github.com/axetroy/sms-boom/commit/11650ef))
* 增加6月游戏 ([48015c8](https://github.com/axetroy/sms-boom/commit/48015c8))
* 增加iqiyi ([1eafdd6](https://github.com/axetroy/sms-boom/commit/1eafdd6))
* 增加iqiyi ([2870d0c](https://github.com/axetroy/sms-boom/commit/2870d0c))
* 增加lofter ([b16f457](https://github.com/axetroy/sms-boom/commit/b16f457))
* 增加segmentfault ([105c1ac](https://github.com/axetroy/sms-boom/commit/105c1ac))
* 增加xiaomi ([256ba12](https://github.com/axetroy/sms-boom/commit/256ba12))
* 增加优视 ([41a7059](https://github.com/axetroy/sms-boom/commit/41a7059))
* 增加大智慧 ([fd0dce9](https://github.com/axetroy/sms-boom/commit/fd0dce9))
* 增加支付宝 ([6a3ce31](https://github.com/axetroy/sms-boom/commit/6a3ce31))
* 增加日报网 ([e109eaa](https://github.com/axetroy/sms-boom/commit/e109eaa))
* 添加97gg ([1134439](https://github.com/axetroy/sms-boom/commit/1134439))
* 添加xinnet ([6264194](https://github.com/axetroy/sms-boom/commit/6264194))
* 添加向日葵保险 ([ef36c2a](https://github.com/axetroy/sms-boom/commit/ef36c2a))
* 添加向日葵保险 ([c55af95](https://github.com/axetroy/sms-boom/commit/c55af95))
* 添加支付宝爆破登陆 ([77c8591](https://github.com/axetroy/sms-boom/commit/77c8591))
* 添加淘宝的支持 ([3e7e748](https://github.com/axetroy/sms-boom/commit/3e7e748))
* 添加牛竞猜 ([38974c1](https://github.com/axetroy/sms-boom/commit/38974c1))
* 添加聚合网的支持 ([06d9ef0](https://github.com/axetroy/sms-boom/commit/06d9ef0))
* 添加高德地图 ([e783e1c](https://github.com/axetroy/sms-boom/commit/e783e1c))



