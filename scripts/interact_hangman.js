const contractAddress = '0x65bC3319e691C1Fc9Ac5a8fa7A60A7333F5e298E';

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
    var costs = await window.contract.methods.get_game_costs().call();
    costs =  costs.replace(/(\r\n|\n|\r)/gm, "<br>");
    return costs;
}

async function check_player_exist(){
	const acc = await getCurrentAccount();
	var exists = await window.contract.methods.check_player_exist().call({ from: acc});
    console.log("check_player_exist() completed: ", exists );
    return exists;
}

async function get_free_games(){
	const acc = await getCurrentAccount();
	var free_games = await window.contract.methods.get_free_games().call({ from: acc});
    console.log("get_free_games() completed: ", free_games);
    return free_games;
}

async function get_won_games(){
	const acc = await getCurrentAccount();
	var won_games = await window.contract.methods.get_won_games().call({ from: acc});
    console.log("get_won_games() completed: ", won_games);
    return won_games;
}


async function pay_for_game() {
    var amount = document.getElementById('amount').value;
	// get account
    const acc = await getCurrentAccount();
	console.log(acc);
	// check whether transaction is allowed

	// "real" call editing the blockchain
	var check = await window.contract.methods.pay_game(amount).send({ from: acc, value: amount });
	if (!check) return "Transaction cannot be executed. Maybe the send amount was to small.";
    console.log("Paying process succesfull");
    return "Transaction was successful!";
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}


//Dummie functions to fill!!
async function guess(char) {
	const acc = await getCurrentAccount();
    var correct = await window.contract.methods.guess(char).send({ from: acc});
    console.log("guess() completed.");
    return correct;
}

//Dummie functions to fill!!
async function request_hint() {
	const acc = await getCurrentAccount();
    var success = await window.contract.methods.get_hint().send({ from: acc});
    console.log("request_hint() completed.");
    return success;
}

async function get_last_hint(){
	const acc = await getCurrentAccount();
    const hint = await window.contract.methods.return_last_hint().call({ from: acc});
	console.log("get_last_hint(): ", hint);
    return hint;
}

async function print_word() {
    // print current word
	const acc = await getCurrentAccount();
    const word = await window.contract.methods.print_word().call({ from: acc});
	console.log("print_word(): ", word);
    return word;
}

async function get_real_word() {
	// only works if game is over
	const acc = await getCurrentAccount();
    const word = await window.contract.methods.get_real_word().call({ from: acc});
	console.log("print_word(): ", word);
    return word;
}

async function get_lives() {
	const acc = await getCurrentAccount();
    var lives = await window.contract.methods.remaining_lifes().call({ from: acc});
    return lives;
}

async function get_game_status() {
	const acc = await getCurrentAccount();

    var status = await window.contract.methods.check_words().call({ from: acc });
    return status;
}

async function start_game_contract(){
	const acc = await getCurrentAccount();
	await window.contract.methods.start_game(0).send({ from: acc});
	return true;
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
		"name": "check_player_exist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_words",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_free_games",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_real_word",
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
		"name": "get_won_games",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"inputs": [],
		"name": "remaining_lifes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "return_last_hint",
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
				"internalType": "enum hangman.LevelDifficulty",
				"name": "_level",
				"type": "uint8"
			}
		],
		"name": "start_game",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
