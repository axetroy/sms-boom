## Phone Message boomer

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/sms-boom.svg)](https://greenkeeper.io/)
[![Dependency](https://david-dm.org/axetroy/smsboomer.svg)](https://david-dm.org/axetroy/smsboomer)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=7.6-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/smsboomer.svg)](https://badge.fury.io/js/smsboomer)

<figure class="third">
    <img src="https://github.com/axetroy/sms-boom/raw/master/screenshot.gif">
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

# 查看命令
smsboomer --help

[12504]: start.

   smsboomer 2.0.0 - 利用chrome的headless模式，模拟用户注册进行短信轰炸机

   USAGE

     smsboomer <phone>

   ARGUMENTS

     <phone>      手机号码      required

   OPTIONS

     -f, --forever                   永久运行，默认只运行一次                      optional      default: false
     --dev                           以开发者模式运行，则显示浏览器运行过程        optional      default: false
     --launch <provider>             如果是开发模式，则指定站点名称<provider>      optional      default: ""
     -c, --concurrency <number>      设置并发数量                                  optional      default: 5

   COMMANDS

     update              更新远程的provider
     help <command>      Display help for a specific command

   GLOBAL OPTIONS

     -h, --help         Display help
     -V, --version      Display version
     --no-color         Disable colors
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages

[12504]: Exit with code 0.

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
