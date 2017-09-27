class App {
  constructor(phone) {
    this.phone = phone;
    this.providers = [];
  }
  provider(provider) {
    this.providers.push(provider);
    return this;
  }
  async bootstrap() {
    const providers = this.providers;
    while (providers.length) {
      const Provider = providers.shift();
      const p = new Provider();
      try {
        await p.resolve(this.phone);
      } catch (err) {
        console.error(err);
      }
    }
    console.info(`Bootstrap done!`);
  }
}

module.exports = App;
