const contractAddress = '0x54F56c773b186DD658E78F4906ca939a6009809A';



// Source code to interact with smart contract
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
    // New web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // ask user for permission
            await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
    // contractAddress and abi are setted after contract deploy
    // var contractAddress = '0xc864D0fef177A69aFa8E302A1b90e450910A4c3E';
    var abi;
    const response = await fetch('http://localhost:3000/meta', {mode: 'cors'});
    console.log(response);
    const data = await response.json();
    abi = JSON.parse(data);

    //contract instance
    contract = new web3.eth.Contract(abi, contractAddress);

});
console.log(window.web3.currentProvider);


//request();



// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
        alert("Error retrieving accounts.");
        return;
    }
    if (accounts.length == 0) {
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});

//Smart contract functions
// function registerSetInfo() {
//     info = $("#newInfo").val();
//     contract.methods.setInfo(info).send({ from: account }).then(function (tx) {
//         console.log("Transaction: ", tx);
//     });
//     $("#newInfo").val('');
// }

// function registerGetInfo() {
//     contract.methods.getInfo().call().then(function (info) {
//         console.log("info: ", info);
//         document.getElementById('lastInfo').innerHTML = info;
//     });
// }

function get_game_costs() {
    contract.methods.get_game_costs().call().then(function (info) {
        console.log("info: ", info);
        document.getElementById('costs').innerHTML = info;
    });
}
