## Phone Message boomer

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/sms-boom.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/sms-boom.svg?branch=master)](https://travis-ci.org/axetroy/sms-boom)
[![Dependency](https://david-dm.org/axetroy/sms-boom.svg)](https://david-dm.org/axetroy/sms-boom)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=6.7-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/sms-boom.svg)](https://badge.fury.io/js/sms-boom)

![sceenshot1](https://github.com/axetroy/sms-boom/raw/master/screenshot1.jpg)
![sceenshot2](https://github.com/axetroy/sms-boom/raw/master/screenshot2.jpg)
![sceenshot3](https://github.com/axetroy/sms-boom/raw/master/screenshot3.jpg)

## How it work...

开启chrome的headless模式，仿真模拟用户去注册...

暂不支持图片验证码识别

## Usage

```bash
git clone https://github.com/axetroy/sms-boom.git
cd ./sms-boom
```

1. Run once

```bash
export PHONE=your_phone_number    ## set env.NUMBER
node index.js
````

2. Run forever

```bash
vim pm2.json    ## change the env.NUMBER to phone number
pm2 start pm2.json
````

## Contributing

```bash
git clone https://github.com/axetroy/sms-boom.git
cd ./sms-boom
yarn
yarn run start
```

Welcome PR...

You can flow [Contribute Guide](https://github.com/axetroy/sms-boom/blob/master/contributing.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/gpmer/gpm.js/commits?author=axetroy) 🔌 [⚠️](https://github.com/gpmer/gpm.js/commits?author=axetroy) [🐛](https://github.com/gpmer/gpm.js/issues?q=author%3Aaxetroy) 🎨 |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

**本项目仅用于技术研究，由于使用该项目产生的任何纠纷，由使用者承担**

The [Apache License](https://github.com/axetroy/sms-boom/blob/master/LICENSE)