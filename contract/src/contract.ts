import { NearBindgen, near, call, view, initialize, Vector } from "near-sdk-js";

class Coffee {
  giver: string;
  message: string;
  name: string;
  timestamp: number;

  constructor({
    giver,
    message,
    name,
    timestamp,
  }: {
    giver: string;
    message: string;
    name: string;
    timestamp: number;
  }) {
    this.giver = giver;
    this.message = message;
    this.name = name;
    this.timestamp = timestamp;
  }
}

function require(statement, message) {
  if (!statement) {
    throw Error(`Assert failed: ${message}`);
  }
}

@NearBindgen({})
class CoffeeContract {
  coffees: Vector = new Vector("coffees");
  owner: string = "buildfromscratch.testnet";

  @initialize({})
  init({ owner }: { owner: string }) {
    require(near.currentAccountId() ===
      near.predecessorAccountId(), `Account ${near.predecessorAccountId()} don't have permission to change the owner`);
    this.owner = owner;
  }

  /*
   * I added a function getAllCoffee which will return the struct array, coffee, to us.
   * This will make it easy to retrieve the coffee from our website!
   */
  @view({})
  getAllCoffee() {
    return this.coffees.toArray();
  }

  @view({})
  getTotalCoffee() {
    near.log(`We have received ${this.coffees.length} total coffees.`);
    return this.coffees.length;
  }

  /*
   * You'll notice I changed the buyCoffee function a little here as well and
   * now it requires a string called _message. This is the message our user
   * sends us from the front end!
   */
  @call({ payableFunction: true })
  buyCoffee({ message, name, amount }) {
    require(this.owner, "Owner is required");
    require(BigInt(amount) > BigInt(0), "Insufficient amount provided");

    const giver = near.predecessorAccountId();

    const coffee = new Coffee({
      giver,
      message,
      name,
      timestamp: Number(near.blockTimestamp()),
    });

    near.log(`${JSON.stringify(giver)} baught a coffee.`);

    this.coffees.push(coffee);

    const promise = near.promiseBatchCreate(this.owner);
    near.promiseBatchActionTransfer(promise, BigInt(amount));

    return this.coffees;
  }
}
