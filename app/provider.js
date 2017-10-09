class Provider {
  constructor(name) {
    this.name = name;
    this.active = true;
    this.alone = false;
  }
  async resolve(phone) {}
}

module.exports = Provider;
