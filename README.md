## Phone Message boomer

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/sms-boom.svg)](https://greenkeeper.io/)
[![Dependency](https://david-dm.org/axetroy/smsboomer.svg)](https://david-dm.org/axetroy/smsboomer)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=7.6-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/smsboomer.svg)](https://badge.fury.io/js/smsboomer)

<figure class="third">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot1.jpg" width="240" height="427">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot2.jpg" width="240" height="427">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot3.jpg" width="240" height="427">
</figure>

## How it works...

开启chrome的headless模式，仿真模拟用户去注册...

暂不支持图片验证码识别

## Usage

###  以CLI命令运行

```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install smsboomer -g
smsboomer 138xxxxxxxx
```

### 自行引入NPM包

```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install smsboomer --save
```

```javascript
const boomer = require('smsboomer');

const app = boomer("13800000000", { once: true });

app
  .on('open', (ctx) => {
    console.info(`打开浏览器...`);
  })
  .on('next', (currentTarget) => {
    console.info(`进入到 ${currentTarget.name} ${currentTarget.url}`);
  })
  .on('error', err => {
    console.error(err);
  })
  // bootstrap
  .emit('bootstrap');
```

### 从源码运行

```bash
git clone https://github.com/axetroy/sms-boom.git
cd ./sms-boom
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 yarn
export PHONE=13800000000  ## 设置process.env.PHONE为目标手机号

node ./example/once.js  # 运行一个周期
# 或者
node ./example/forever.js # 无限循环运行
```

### 如何更新

由于Chromium下载困难的原因，从1.x版本开始，可以从Github同步Provider，而不用从新安装新版本

这样做的目的是，Github上，添加/修改了Provider，使用者不用从新安装新版本，也能够使用。

运行命令

```bash
smsboomer update
```

## Contributing

> 每一个人都可以是贡献者。
> 如果你发现有的网站，可以作为短信提供者，请在issue中提出，或PR.

[贡献指南](https://github.com/axetroy/sms-boom/blob/master/CONTRIBUTING.md)

**如果这能帮助到你, 不妨点个 :star2:，非常感谢**

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub><b>Axetroy</b></sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/sms-boom/commits?author=axetroy "Code") [🔌](#plugin-axetroy "Plugin/utility libraries") [⚠️](https://github.com/axetroy/sms-boom/commits?author=axetroy "Tests") [🐛](https://github.com/axetroy/sms-boom/issues?q=author%3Aaxetroy "Bug reports") [🎨](#design-axetroy "Design") | [<img src="https://avatars0.githubusercontent.com/u/14875359?v=3" width="100px;"/><br /><sub><b>Windom Z</b></sub>](http://windomz.github.io/)<br />[💻](https://github.com/axetroy/sms-boom/commits?author=WindomZ "Code") [📖](https://github.com/axetroy/sms-boom/commits?author=WindomZ "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/12443954?s=460&v=4" width="100px;"/><br /><sub><b>blackmatch</b></sub>](https://github.com/blackmatch)<br />[💻](https://github.com/axetroy/sms-boom/commits?author=blackmatch "Code") [🐛](https://github.com/axetroy/sms-boom/issues?q=author%3Ablackmatch "Bug reports") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Disclaimer

**本项目仅用于技术研究，由于使用该项目产生的任何纠纷，由使用者承担，如有不当之处，请联系本人 troy450409405@gmail.com**

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxetroy%2Fsms-boom.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxetroy%2Fsms-boom?ref=badge_large)
