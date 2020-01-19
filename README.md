# ConsenSys-Academy-Blockchain-Developer-Program-Project
Implemented a song registry DApp called the Afrobeats Music Store using the Truffle development framework. 

## What it does
The purpose of the DApp is to create a platform for the registering and purchasing songs between different accounts. Song owners can register their songs which can be purchased by different buyers. Different Account holders can be created using Metamask or Ganache.

## Dependencies and Prerequisites
Install these prerequisites:

* [NPM](https://nodejs.org/en/)
* [Truffle](https://github.com/trufflesuite/truffle)
```
$ npm install -g truffle
```
* [Ganache](https://www.trufflesuite.com/ganache)
* Ganache-CLI
```
$ npm install -g ganache-cli
```
* [Metamask](https://metamask.io)
* [lite-server](https://www.npmjs.com/package/lite-server)
```
$ npm install lite-server --save-dev
```

## Set-up and Initialization
### 1. Clone the project
```
$ git clone https://github.com/KalubaChikonde/ConsenSys-Academy-Blockchain-Developer-Program-Project.git
$ cd ConsenSys-Academy-Blockchain-Developer-Program-Project
```
### 2. Install dependencies and pre-requisites
```
$ npm install
```
### 3. Launch Ganache
Once you have launched Ganache, set-up a local blockchain, compile and deploy the smart contracts onto the blockchain:
```
$ truffle compile
$ truffle migrate --reset
$ truffle test
```
### 4. Setup Metamask
Metamask can be used to get a visual representation of the local blockchain.Connect it to your local Etherum blockchain provided by Ganache (localhost 8545) and import ganache accounts into metamask.

### 5. Run the Front End Application
 Run the app on a development server locally for testing/grading. We’ll use lite-server to serve our web app.  http://localhost:3000
```
$ npm run dev
```
## Challenges

* Errors using Metamask.
* Unit test debugging.

## Implementation
* This DApp was developed using Solidity and web3.js.
* Testing of smart contracts was done using: 
  * Ganache
  * Kovan testnet
  * Remix
 * Unit testing was done using javascript - see [testSongRegistry.js](https://github.com/KalubaChikonde/ConsenSys-Academy-Blockchain-Developer-Program-Project/blob/master/test/testSongRegistry.js)
    * Mocha and Chai promises were used. 
