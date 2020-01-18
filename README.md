# ConsenSys-Academy-Blockchain-Developer-Program-Project
Implemented a DApp called the Afrobeats Music Store which is a song registry on the Ethereum Framework. 

## What it does
The purpose of the DApp is to register and buy songs between different accounts. Song owners can register their songs which can be purchased by different buyers. Different Account holders can be created using Metamask.

## Dependencies 
Install these prerequisites:

* [NPM](https://nodejs.org/en/)
* [Truffle](https://github.com/trufflesuite/truffle)
```
npm install -g truffle
```
* [Ganache](https://www.trufflesuite.com/ganache)
* Ganache-CLI
```
npm install -g ganache-cli
```
* [Metamask](https://metamask.io)
* [lite-server](https://www.npmjs.com/package/lite-server)
```
npm install lite-server --save-dev
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
