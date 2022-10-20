/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class CoffeeContract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getAllCoffee() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "getAllCoffee",
    });
  }

  async getTotalCoffee() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "getTotalCoffee",
    });
  }

  async buyCoffee({ message, name, amount }) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "buyCoffee",
      args: { message, name, amount },
    });
  }
}
