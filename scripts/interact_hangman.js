const contractAddress = '0xe4A91D37fE43b75b486f558901F6e5b861fB2BCD';

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

async function pay_for_game() {
    var amount = document.getElementById('amount').value;
	// get account
    const acc = await getCurrentAccount();
	console.log(acc);
	// check whether transaction is allowed

	// "real" call editing the blockchain
	var check = await window.contract.methods.pay_game(amount).send({ from: acc, value: amount });
	if (!check) return "Transaction cannot be executed. Maybe the send amount was to small.";
    console.log("info: ", check);
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
    console.log("guess() info: ", correct)
    return correct;
}

async function print_word() {
    // print current word
	const acc = await getCurrentAccount();
    const word = await window.contract.methods.print_word().call({ from: acc});
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

async function start() {
	const acc = await getCurrentAccount();
    await window.contract.methods.start_game(0).send({ from: acc});
    return undefined;
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
						"internalType": "string",
						"name": "nickname",
						"type": "string"
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
							},
							{
								"internalType": "enum hangman.LevelDifficulty",
								"name": "level",
								"type": "uint8"
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
