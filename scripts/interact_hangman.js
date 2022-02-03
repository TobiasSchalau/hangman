const contractAddress = '0x3d5F02344BBFDB51bF7d4CafC548ce483F828121';

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

async function pay_for_game(amount) {
	// get account
    var acc = await getCurrentAccount();


	// check whether transaction is allowed
	// this is gonna be executed locally without any tx!!
	var check = await window.contract.methods.pay_game(amount).send({ from: acc });
	console.log(check);
	if (!check) return "Transaction cannot be executed. Maybe the send amount was to small.";

	// "real" call editing the blockchain
    //var success = await window.contract.methods.pay_game(amount).send({ from: acc });
    //console.log("info: ", success);
    return "Transaction was successful!";
}

async function getCurrentAccount() {
    var accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}


//Dummie functions to fill!!
async function guess(char) {
	var correct = await window.contract.methods.guess(char).call();
    console.log("info: ", correct)
	return correct;
}

async function print_word() {
	//returns the current status of the word
	// print current word
    var word = await window.contract.methods.print_word().call();
    return word;
}

async function get_lives() {
	//if lives <1 jascript prints game over and exits
	var lives = await window.contract.methods.get_lives().call();
	if (lives < 1){
    	console.log("Game over!");
		return -1 
	}
	return lives;
	
}

async function get_game_status() {
	//expect sth. like ("You Win!", undefined)
	// "you Win!" -> game ends, undefined -> still playing
	// "game over" is catched earlier
    var status = await window.contract.methods.check_words().call();
    return status;
}

async function start_game_contract(){
	// starts the game if allowed
	// if not return false
	var started = await window.contract.methods.start_game().call();
	return started;
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
				"internalType": "bytes",
				"name": "ret",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_lives",
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
		"name": "get_player_info",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "free_games",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "won_games",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bool",
								"name": "started",
								"type": "bool"
							},
							{
								"internalType": "bytes",
								"name": "true_word",
								"type": "bytes"
							},
							{
								"internalType": "bytes",
								"name": "current_word",
								"type": "bytes"
							},
							{
								"internalType": "bytes",
								"name": "tried_letters",
								"type": "bytes"
							},
							{
								"internalType": "uint256",
								"name": "word_length",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "remaining_lifes",
								"type": "uint256"
							}
						],
						"internalType": "struct hangman.Game",
						"name": "game",
						"type": "tuple"
					}
				],
				"internalType": "struct hangman.Player",
				"name": "",
				"type": "tuple"
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
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"name": "start_game",
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
		"stateMutability": "payable",
		"type": "receive"
	}
];