## Create a new NEAR JS project

To create a new NEAR project run this and follow interactive prompts:

```
npx create-near-app
```

You can create contracts written in:

- JavaScript
- Rust

You can create a frontend template in:

- React
- Vanilla JavaScript

For testing we use a sandboxed environment of NEAR (called Workspaces). You can write the tests in JavaScript or Rust.

`create-near-app` cli also supports arguments to skip interactive prompts:

```
npx create-near-app
  <project-name>
  --contract js|rust|assemblyscript
  --frontend vanilla|react|none
  --tests js|rust
  --install
```

Use `--install` to automatically install dependencies from all `package.json` files.

When using arguments, all arguments are required, except for `--install`.

The final project structure should look like this:

```
├── README.md
├── contract
│   ├── README.md
│   ├── babel.config.json
│   ├── build.sh
│   ├── deploy.sh
│   ├── package.json
│   ├── src
│   │   └── contract.ts
│   └── tsconfig.json
├── frontend
│   ├── App.js
│   ├── assets
│   │   ├── favicon.ico
│   │   ├── global.css
│   │   ├── logo-black.svg
│   │   └── logo-white.svg
│   ├── index.html
│   ├── index.js
│   ├── near-interface.js
│   ├── near-wallet.js
│   ├── package.json
│   ├── start.sh
│   └── ui-components.js
├── integration-tests
│   ├── ava.config.cjs
│   ├── package.json
│   └── src
│       └── main.ava.ts
└── package.json
```

Structure of a dApp:

Now that you understand what the dApp does, let us take a closer look to its structure:

- The frontend code lives in the /frontend folder.
- The smart contract code is in the /contract folder.
- The integration tests lives in the /integration-tests folder.