# mern-starter

A monorepo for UI and API services for `mern-starter`.

## Prerequisites

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and make it up and running. (Latest version is recommended)
2. Install [NodeJS](https://nodejs.org/en/). (Latest stable version is recommended)
3. Install latest stable version of [yarn package manager](https://classic.yarnpkg.com/en/docs/install/).

## How to run this app?

Following are the steps to run this app,

### 1. Install dependencies from root directory using `yarn install-all` command

### 2. Run `api` service from `services/api/app` directory using `yarn start` command

### 3. Run `ui` service from `services/ui/app` directory using `yarn start` command

## Other important commands

In the project directory, you can run:

### `yarn install-all`

Installs all dependancies (if available) to each directory in this monorepo.

### `yarn uninstall-all`

Uninstalls all dependancies (if available) from each directory in this monorepo.

### `yarn test-all`

Runs test script for both UI and API services if available.

### `yarn build-all`

Runs build script for both UI and API services.

## Use lerna

### 1. To install local dependency packages `globally`

Use [`lerna add`](https://github.com/lerna/lerna/tree/main/commands/add#readme) command.

### 2. To install local dependency packages in a specific package using `--scope`

You can follow the [better than official](https://futurestud.io/tutorials/lerna-install-dependencies-for-a-specific-package) documentation.
