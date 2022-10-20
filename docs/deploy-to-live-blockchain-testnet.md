# Deploy to live blockchain (testnet)

You can automatically compile and deploy the contract in the NEAR testnet by running:

```
npm run deploy
```

Once finished, check the neardev/dev-account file to find the address in which the contract was deployed:

```
cat ./contract/neardev/dev-account
# ex: dev-1666166607745-82142625107101
```

The contract will be automatically initialized with a default `owner`

To initialize the contract yourself do:

```
near call <dev-account> init '{"owner": "<account>"}' --accountId <dev-account>
```

Example:

```
export NEAR_CONTRACT=dev-1666166607745-82142625107101
near call $NEAR_CONTRACT init '{"owner": "buildfromscratch.testnet"}' --accountId $NEAR_CONTRACT
```

Call the `buyCoffee` method in the contract

```
near call $NEAR_CONTRACT buyCoffee '{"name": "john", "message": "Love your work!", "amount": 1}' --accountId $NEAR_CONTRACT
```

Call the `getAllCoffe` methon in the contract

```
near view $NEAR_CONTRACT getAllCoffe
```

