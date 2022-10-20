# Write and compiling Contract

## Anatomy of a Contract

Smart contracts are simple programs that live in a NEAR network. As any modern application, smart contracts **store data** and **expose methods** to interact with them.

They are written in human-readable languages, then compiled and deployed to an account where everyone can interact with them.

Developers can choose between using JavaScript or Rust to write smart contracts in NEAR.

In this workshop we will use JavaScript.

### Greeting contract

When you create a new NEAR project using `npx create-near-app` you will get a sample **Greeting** smart contract.

```
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class GreetingContract {
  greeting: string = "Hello";

  // This method is read-only and can be called for free
  @view({}) 
  getGreeting(): string {
    return this.greeting;
  }

  // This method changes the state, for which it cost gas
  @call({})
  setSreeting({ message }: { message: string }): void {
    this.greeting = message;
  }
}
```

## Important Sections in the `Contract` 

### Modules

When writing smart contracts you will leverage modules to organize your code, and reuse third-party libraries.

Every smart contarct will `import` functionality from the `near-sdk-js` module.

```
import { NearBindgen, near, call, view, initialize, UnorderedMap } from 'near-sdk-js'
```

### Decorators (`@NearBindgen`, `@view`, `@call`)

A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

## `CoffeeContract`

```
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
```