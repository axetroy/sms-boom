## Phone Message boomer

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/sms-boom.svg)](https://greenkeeper.io/)
[![Dependency](https://david-dm.org/axetroy/smsboomer.svg)](https://david-dm.org/axetroy/smsboomer)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=6.7-blue.svg?style=flat-square)

<figure class="third">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot1.jpg" width="240" height="427">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot2.jpg" width="240" height="427">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot3.jpg" width="240" height="427">
</figure>

## How it works...

开启chrome的headless模式，仿真模拟用户去注册...

暂不支持图片验证码识别

## Usage

### 避免重复下载**chromium**

如果你的系统没有安装**chromium**, 请忽略这一条

```bash
# 在终端运行
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

###  从NPM安装运行

```bash
npm install smsboomer -g
smsboomer 138xxxxxxxx
# run for help information

smsboomer -h

  boomer 0.0.1
   
  USAGE
  
   boomer <phone>
  
  ARGUMENTS
  
   <phone>      手机号码      required
  
  OPTIONS
  
   -f, --forever      是否持久运行，默认只运行一个周期                    optional      default: false
   --dev              是否是开发模式，如果true，则显示浏览器运行过程        optional      default: false
  
  GLOBAL OPTIONS
  
   -h, --help         Display help
   -V, --version      Display version
   --no-color         Disable colors
   --quiet            Quiet mode - only displays warn and error messages
   -v, --verbose      Verbose mode - will also output debug messages

```

### 自行引入包

```javascript
const boomer = require('smsboomer');

const app = boomer("138xxxxxxxx", { once: true });

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
```

### 从源码运行

```bash
git clone https://github.com/axetroy/sms-boom.git
cd ./sms-boom
export PHONE=13800000000  ## 设置process.env.PHONE为目标手机号

node ./example/once.js  # 运行一个周期
# 或者
node ./example/forever.js # 无限循环运行
```

## 遇到困难?

### yarn安装依赖报错

```bash
axetroy@axetroy-H81M-DS2:~/gpm/github.com/axetroy/sms-boom$ yarn
yarn install v1.2.1
[1/5] Resolving packages...
[2/5] Fetching packages...
[3/5] Linking dependencies...
[4/5] Building fresh packages...
[3/3] ⢀ caporal
[2/3] ⢀ puppeteer
[-/3] ⢀ waiting...
[-/3] ⢀ waiting...
error /home/axetroy/gpm/github.com/axetroy/sms-boom/node_modules/puppeteer: Command failed.
Exit code: 1
Command: node install.js
Arguments: 
Directory: /home/axetroy/gpm/github.com/axetroy/sms-boom/node_modules/puppeteer
Output:
ERROR: Failed to download Chromium r508693! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
{ Error: connect ETIMEDOUT 172.217.27.144:443
    at Object._errnoException (util.js:1026:11)
    at _exceptionWithHostPort (util.js:1049:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1174:14)
  code: 'ETIMEDOUT',
  errno: 'ETIMEDOUT',
```

原因: 网络问题，无法下载chromium

解决: 设置环境变量``PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true``, 然后重新安装依赖， 或者运行``npm rebuild``

### Chromium revision is not downloaded. Run "npm install"

```bash
{ AssertionError [ERR_ASSERTION]: Chromium revision is not downloaded. Run "npm install"
    at Console.assert (console.js:188:23)
    at Function.launch (/home/axetroy/gpm/github.com/axetroy/sms-boom/node_modules/puppeteer/lib/Launcher.js:94:15)
    at <anonymous>
  generatedMessage: false,
  name: 'AssertionError [ERR_ASSERTION]',
  code: 'ERR_ASSERTION',
  actual: false,
  expected: true,
  operator: '==' }
```

原因: 依赖没有被正确安装

解决: 重新安装npm依赖，或者运行``npm rebuild``

### 手动安装 ``npm install puppeteer``

```bash
axetroy@axetroy-H81M-DS2:~/gpm/github.com/axetroy/sms-boom$ npm install puppeteer

> puppeteer@0.12.0 install /home/axetroy/gpm/github.com/axetroy/sms-boom/node_modules/puppeteer
> node install.js

Downloading Chromium r508693 - 96.2 Mb [====================] 100% 0.0s 
Chromium downloaded to /home/axetroy/gpm/github.com/axetroy/sms-boom/node_modules/puppeteer/.local-chromium/linux-508693
+ puppeteer@0.12.0
added 1 package in 14.979s
```

## Contributing

[贡献指南](https://github.com/axetroy/sms-boom/blob/master/CONTRIBUTING.md)

**如果这能帮助到你, 不妨点个 :star2:，非常感谢**

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/sms-boom/commits?author=axetroy "Code") [🔌](#plugin-axetroy "Plugin/utility libraries") [⚠️](https://github.com/axetroy/sms-boom/commits?author=axetroy "Tests") [🐛](https://github.com/axetroy/sms-boom/issues?q=author%3Aaxetroy "Bug reports") [🎨](#design-axetroy "Design") | [<img src="https://avatars0.githubusercontent.com/u/14875359?v=3" width="100px;"/><br /><sub>Windom Z</sub>](http://windomz.github.io/)<br />[💻](https://github.com/axetroy/sms-boom/commits?author=WindomZ "Code") [📖](https://github.com/axetroy/sms-boom/commits?author=WindomZ "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Disclaimer

**本项目仅用于技术研究，由于使用该项目产生的任何纠纷，由使用者承担**

## License

The [Apache License](https://github.com/axetroy/sms-boom/blob/master/LICENSE)
