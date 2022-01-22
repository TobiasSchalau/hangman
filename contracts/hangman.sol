// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;
pragma abicoder v2;

import "./LibraryRandomWords.sol";


contract hangman{

    address payable private owner;
    uint[3] private game_cost = [50000,90000,120000];
    enum LevelDifficulty {Easy, Normal, Challenging} //  corresponds to uint8 values 0, 1 and 2


    struct Player{
        address player_address;
        string nickname;
        uint free_games;
        uint won_games;
        Game game;
    }

    struct Game {
        bytes true_word;
        bytes current_word;
        bytes tried_letters;
        uint word_length;
        uint number_failures;
        LevelDifficulty level;
    }
 
    mapping(address => Player) players;

    /**
    * @dev Set contract deployer as owner
    */
    constructor () payable {
        owner = payable(msg.sender); // 'msg.sender' is sender of current call, contract deployer for a constructor
    }

    // send payment to owner of contract
    function send_to_owner (uint256 _amount) private {
        owner.transfer(_amount);
    }

    /**
    * @dev Pay for playing. 
    */
    function pay_game (uint256 amount) payable public returns(bool success) {
        //checks
        if (amount < game_cost[0] ) return false;
        require(msg.value == amount);

        //send money to owner
        send_to_owner(amount);

        //confirm payment and allow playing
        //curr_palyer = players[msg.sender];

        return true;
    }

    function get_game_costs() public view returns (string memory) {

        string memory message = string(abi.encodePacked("Game costs:\n 1 game: ",  uint2str(game_cost[0]),"\n 2 games: " , uint2str(game_cost[1]), "\n 3 games: " , uint2str(game_cost[2])));

        return message;
    }


    function storeNewPlayer(address player_address, string memory nickname) public {
        // Player memory temp_player = Player({player_address:player_address, nickname:nickname, free_games:0, won_games:0, game:Game()});
        // players[msg.sender] = temp_player;
    }
    
    
    function start_game(LevelDifficulty _level) public view{
        require(_level >= LevelDifficulty.Easy && _level < LevelDifficulty.Challenging, "Requested level of difficulty not available. Choose between (Easy:0, Normal:1, Challenging:2).");

        Game memory game = players[msg.sender].game;

        game.level = _level;
        game.number_failures = 0;

        // Initialize word
        game.true_word = WordGenerator.randomWord();
        game.word_length = bytes(game.true_word).length;

        // Initiliaze current word with dashes
        game.current_word = "";
        for (uint i=0; i<game.word_length; i++) {
            game.current_word = abi.encodePacked(game.current_word, "_");
        }
    }


    function random() private view returns (uint) {
        // convert hash to integer
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

    function remaining_lifes() public view returns(uint){
        uint lifes;
        Game memory game = players[msg.sender].game;
        if (game.level == LevelDifficulty.Easy){
            lifes = 5 - game.number_failures;
        }
        else if (game.level == LevelDifficulty.Normal){
            lifes =  4 - game.number_failures;
        } else if (game.level == LevelDifficulty.Challenging){
            lifes =  3 - game.number_failures;
        }
        return lifes;
    }

    function print_word() public view returns (string memory){
        return string(abi.encode(players[msg.sender].game.current_word));
    }

    function set_word(bytes memory word) private view{
        Game memory game = players[msg.sender].game;
        game.true_word = word;
    }

    function alreadyGuessed(bytes1 letter) private view returns (bool){
        bool guessed = false;
        for (uint i=0; i<players[msg.sender].game.tried_letters.length; i++) {
                if (letter == players[msg.sender].game.tried_letters[i]){
                    guessed = true; 
                    break;
                }
            }
        return guessed;
    }

    function guess(bytes1 letter) public view returns(bool){
        //check if you are allowed to play (payed) 
        Game memory game = players[msg.sender].game;
        require(
            game.level == LevelDifficulty.Easy && game.number_failures == 3 ||
            game.level == LevelDifficulty.Normal && game.number_failures == 4 ||
            game.level == LevelDifficulty.Challenging && game.number_failures == 5,
            "You can do better. No guess left."
        );
        require(
            alreadyGuessed(letter),
            "You've already guessed that letter."
        );

        bytes memory result = new bytes(game.word_length);
        bool occured = false;
        for (uint i=0; i<game.word_length; i++) {
            if (letter == game.true_word[i]){
                result[i] = letter;
                occured = true;
            }else{
                result[i]=game.true_word[i];
            }
        }
        game.current_word = result;

        if (!occured) {
            game.number_failures += 1;
        }
        return occured;
    }

    function check_words() private view returns(bool){
        bool correct = true;
        Game memory game = players[msg.sender].game;
        for (uint i=0; i<game.word_length; i++) {
            if (game.current_word[i] != game.true_word[i]){
                correct = false;
                break;
            }
        }
        return correct;
    }

    function get_hint() public view returns(bytes1){
        Game memory game = players[msg.sender].game;
        uint idx = random() % game.word_length;
        bytes1 letter = game.true_word[idx];
        while (alreadyGuessed(letter)){
            idx = random() % game.word_length;
            letter = game.true_word[idx];
        }

        return letter;
    }





    fallback() external payable {

    }

    receive() external payable {

    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

}