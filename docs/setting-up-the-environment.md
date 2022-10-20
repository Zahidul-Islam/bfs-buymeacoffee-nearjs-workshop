## Setting up the environment

We will use the following tools:

- [near-cli](https://github.com/near/near-cli) - Command Line Interface (CLI) tool that enables us to interact with the NEAR network directly from the shell.
- [create-near-app](https://github.com/near/create-near-app) - A CLI tool to create a new NEAR project with different templates

### Setup 

we will set up our development environment. If you are not fimilar with Node.js, it is a JavaScript runtime environment that run a JavaScript Engine and execute JavaScript code.

#### Installing Node.js

You can *skip* this section if you already have a working Node.js >= 16.0 install in your computer. 

Make sure you have git installed. Otherwise, follow [these instructions](https://www.atlassian.com/git/tutorials/install-git).

There are multiple ways of installing Node.js on MacOS. We will be using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm). Copy and paste these commands in a terminal:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 18
nvm use 18
nvm alias default 18
npm install npm --global # Upgrade npm to the latest version
```

> For Ubuntu or Windows here are the [instructions](https://nodejs.org/en/download/package-manager/).

#### Install `near-cli`

You can install the latest versions of `near-cli` globally by running the following commands:

```
npm install -g near-cli
```

#### Install `create-near-app`

You can install the latest versions of `create-near-app` globally by running the following commands:

```
npm install -g create-near-app
```
