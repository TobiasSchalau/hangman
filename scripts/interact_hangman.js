const contractAddress = '0xD96611C58ff9e400049deD314AEe147d97B2B224';

//############## Loading ###############
// on load website
window.addEventListener('DOMContentLoaded', async () => {
    await load();
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
    const costs = await window.contract.methods.get_game_costs().call();
    costs =  costs.replace(/(\r\n|\n|\r)/gm, "<br>");
    return costs;
}

async function pay_for_game() {
    var amount = document.getElementById('amount').value;
	// get account
    const acc = await getCurrentAccount();

	// check whether transaction is allowed
	// this is gonna be executed locally without any tx!!
	const check = await window.contract.methods.pay_game(amount).call();
	if (!check) return "Transaction cannot be executed. Maybe the send amount was to small.";

	// "real" call editing the blockchain
    const success = await window.contract.methods.pay_game(amount).send({ from: acc });
    console.log("info: ", success);
    return "Transaction was successful!";
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}


//Dummie functions to fill!!
async function guess(char) {
	//returns if guess was correct or not
    return true;
}

async function print_word() {
	//returns the current status of the word
    return "tzu";
}

async function get_lives() {
	//if lives <1 jascript prints game over and exits
    return 5;
}

async function get_game_status() {
	//expect sth. like ("You Win!", undefined)
	// "you Win!" -> game ends, undefined -> still playing
	// "game over" is catched earlier
    return undefined;
}

async function start_game_contract(){
	// starts the game if allowed
	// if not return false
	return true
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
