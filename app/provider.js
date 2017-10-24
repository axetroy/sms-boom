class Provider {
  constructor(ctx) {
    // 服务者提供的名字
    this.name = 'Provider';
    // 执行上下文
    this.ctx = ctx;
    // 该provider是否激活
    this.active = true;
    // 是否单独运行，用于调试
    this.alone = false;
    // 服务提供者的文件绝对路径
    this.file = __filename;
  }
  async resolve(phone) {}
}

module.exports = Provider;
