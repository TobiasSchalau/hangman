# hangman
hangman game

GitHub - codebase
local: git repository
in terminal: 
`remixd -s ~/krypto/hangman/ -u https://remix.ethereum.org`
remix: connect to local git repository -> connects to remixd
=> can edit repository files in remixd

1. compile contract
2. Deploy:
    * local: JavaScript
    * on ropsten: Injected Web3 -> needs MetaMask activated + connected 

3. Copy address of contract in _scripts/interact_hangman.js_ in variable _contractAddress_
4. Copy abi of compiled cotract in _scripts/interact_hangman.js_ in variable _meta_data_

## Server
* run `npm install` in hangman/ - to install necessary packages
* run 
    * `node server.js`
    * dev: `npx nodemon server.js`
