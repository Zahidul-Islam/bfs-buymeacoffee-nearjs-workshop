import { Worker, NearAccount, NEAR } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount("test-account");

  const owner = await root.createSubAccount("beneficiary", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  // Initialize the contract
  await contract.call(contract, "init", { owner: owner.accountId });

  const alice = await root.createSubAccount("alice", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  const bob = await root.createSubAccount("bob", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract, alice, bob, owner };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("buyCoffee", async (t) => {
  const { contract, alice, bob, owner } = t.context.accounts;

  await alice.call(contract, "buyCoffee", {
    message: "This is coffee #2",
    name: "Alice",
    amount: NEAR.parse("1 N"),
  });

  const newBalance = await owner.balance();
  const newAvailableBalance = parseFloat(newBalance.available.toHuman());

  t.is(Math.ceil(newAvailableBalance), 31, "owner balance shoudl be 31 NEAR");
});

test("getTotalCoffee", async (t) => {
  const { contract, alice, bob, owner } = t.context.accounts;

  await alice.call(contract, "buyCoffee", {
    message: "This is coffee #1",
    name: "Alice",
    amount: NEAR.parse("1 N"),
  });

  await bob.call(contract, "buyCoffee", {
    message: "This is coffee #2",
    name: "Bob",
    amount: NEAR.parse("1 N"),
  });

  const totalCoffee = await contract.view("getTotalCoffee");

  t.is(totalCoffee, 2, "owner should have 2 coffees");
});

test("getAllCoffee", async (t) => {
  const { contract, alice, bob, owner } = t.context.accounts;

  await alice.call(contract, "buyCoffee", {
    message: "This is coffee #1",
    name: "Bob",
    amount: NEAR.parse("1 N"),
  });

  await bob.call(contract, "buyCoffee", {
    message: "This is coffee #2",
    name: "Bob",
    amount: NEAR.parse("1 N"),
  });

  const totalCoffees = (await contract.view("getAllCoffee")) as [];
  console.log("==> ", totalCoffees);

  t.is(totalCoffees.length as number, 2, "owner balance shoudl be 31 NEAR");
});
