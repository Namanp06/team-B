# API Service

## Prerequisites

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and make it up and running. (Latest version is recommended)
2. Install [NodeJS](https://nodejs.org/en/). (Latest stable version is recommended)
3. Install latest stable version of [yarn package manager](https://classic.yarnpkg.com/en/docs/install/).
4. Run `yarn install-all` from root directory of this monorepo to install all dependancies if not already done.

## Scripts

In the project directory, you can run:

### `yarn start`

Starts the server in the development mode at port `4000`.<br />
Open [http://localhost:4000/docs](http://localhost:4000/docs) to view Swagger API documentation in the browser.

### `yarn build`

Builds the service for production to the `dist` directory.<br />
It correctly bundles NodeJS code in production mode and optimizes the build for the best performance.

The build is minified and uglified with common JS code.<br />
Your app is ready to be deployed!

### `yarn runprod`

Project should have been build successfully before running this command.

Starts the server in the production mode at port `4000`.<br />

Open [http://localhost:4000/docs](http://localhost:4000/docs) to view Swagger API documentation in the browser.
