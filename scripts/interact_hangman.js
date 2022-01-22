const contractAddress = '0xD96611C58ff9e400049deD314AEe147d97B2B224';

//############## Loading ###############
// on load website
window.addEventListener('DOMContentLoaded', async () => {
    await load();
    console.log(window.contract);
});

//load contract
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function loadContract() {
    return await new window.web3.eth.Contract(meta_data, contractAddress);
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
}

//############# Functions ##############
async function get_game_costs() {
    var costs = await window.contract.methods.get_game_costs().call();
    console.log("info: ", costs);
    costs =  costs.replace(/(\r\n|\n|\r)/gm, "<br>");
    return costs;
}

async function pay_for_game() {
    var amount = document.getElementById('amount').value;
    const acc = await getCurrentAccount();
    const success = await window.contract.methods.pay_game(amount).send({ from: acc });
    console.log("info: ", success);
    return success;
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}


//Dummie functions to fill!!
async function guess(char) {
    return true;
}

async function print_word() {
    return "tzu";
}

async function get_lives() {
    return 5;
}

async function get_game_status() {
    return undefined;
}

//############# ABI ####################
const meta_data = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "get_game_costs",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_hint",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "",
				"type": "bytes1"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes1",
				"name": "letter",
				"type": "bytes1"
			}
		],
		"name": "guess",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "pay_game",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "print_word",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nickname",
				"type": "string"
			}
		],
		"name": "storeNewPlayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
