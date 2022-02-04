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
        bool started;
        bytes true_word;
        bytes current_word;
        bytes tried_letters;
        uint word_length;
        uint remaining_lifes;
        LevelDifficulty level;

    }
 
    // implicitly stored in storage
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
    function pay_game (uint amount) payable public returns(bool success) {
        //checks
        if (amount < game_cost[0] ) return false;
        require(msg.value == amount, "pay_game(): message not equal to value.");

        //send money to owner
        send_to_owner(amount);
        // create player
        //if player does not exist yet
        // if(keccak256(bytes(players[msg.sender].nickname)) == keccak256(bytes(""))){
        store_new_player();
        // }
        //confirm payment and allow playing
        if(amount >= game_cost[2]){
            //player payed at least 3 games (at least 120000)
            uint payed_games = (amount/game_cost[2]) * 3;
            players[msg.sender].free_games += payed_games;
        }
        else if(amount >= game_cost[1]){
             //player payed for 2 games (between 90k and 120k)
            uint payed_games = 2;
            players[msg.sender].free_games += payed_games;
        }
        else{
             //player payed for 1 game
            uint payed_games = 1;
            players[msg.sender].free_games += payed_games;
        }

        return true;
    }

    function get_game_costs() public view returns (string memory) {

        string memory message = string(abi.encodePacked("Game costs:\n 1 game: ",  uint2str(game_cost[0]),"\n 2 games: " , uint2str(game_cost[1]), "\n 3 games: " , uint2str(game_cost[2])));

        return message;
    }


    function store_new_player() private{
        Player memory temp_player = Player({
            player_address:msg.sender, 
            nickname:"test",
            free_games:0,
            won_games:0,
            game:Game({
                started: false,
                true_word:"",
                current_word:"",
                word_length:0,
                level:LevelDifficulty.Easy,
                remaining_lifes:0,
                tried_letters:""
        })});
        // this pushes the temp_player from memory into storage
        players[msg.sender] = temp_player; 
    }

    function get_player_info() public view returns(Player memory){
        require(keccak256(abi.encodePacked(players[msg.sender].nickname)) != keccak256(""), "get_player_info(): You have not payed yet. Call pay_game first");
        return players[msg.sender];
    }

    function start_game(LevelDifficulty _level) public{
        require(keccak256(abi.encodePacked(players[msg.sender].nickname)) != keccak256(""), "start_game(): You have not payed yet. Call pay_game first");
	    require(_level >= LevelDifficulty.Easy && _level <= LevelDifficulty.Challenging, "start_game(): Requested level of difficulty not available. Choose between (Easy:0, Normal:1, Challenging:2).");
        require(!players[msg.sender].game.started, "start_game(): You have already started a game, finish it.");
        require(players[msg.sender].free_games > 0, "start_game(): You have no free games left. Pay first.");

        Game memory game = players[msg.sender].game;

        players[msg.sender].free_games -= 1; 
        game.level = _level;
        game.started = true;

        // set remaining life
        if(_level == LevelDifficulty.Easy){
            game.remaining_lifes = 5;
        }
        else if(_level == LevelDifficulty.Normal){
            game.remaining_lifes = 3;
        }else{
            game.remaining_lifes = 1;
        }

        // Initialize word
        game.true_word = WordGenerator.randomWord();
        game.word_length = bytes(game.true_word).length;

        // Initiliaze current word with dashes
        
        game.current_word = initialize_word(game.true_word.length);
        for (uint i=0; i<game.word_length; i++) {
            game.current_word = abi.encodePacked(game.current_word, "");
        }
        // store game state in storage
        players[msg.sender].game = game;
    }

    function random() private view returns (uint) {
        // convert hash to integer
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

    function initialize_word(uint length) private pure returns(bytes memory){
        bytes memory temp = new bytes(length);
        for(uint i = 0; i < length; i++){
            temp[i] =  bytes1("-");
        }
        return bytes(temp);
    }

    function print_word() public view returns (string memory){
        require(players[msg.sender].game.started, "print_word(): No game is running right now.");        
        require(keccak256(abi.encodePacked(players[msg.sender].nickname)) != keccak256(""), "print_word(): You have not payed yet. Call pay_game first");
        return string(abi.encode(players[msg.sender].game.current_word));
    }

    function remaining_lifes()public view returns(uint){
        require(players[msg.sender].game.started, "remaining_lifes(): No game is running right now.");        
        return players[msg.sender].game.remaining_lifes;
    }

    function set_word(bytes calldata word) private{
        players[msg.sender].game.true_word = word;
    }

    function alreadyGuessed(bytes1 letter) private view returns (bool){
        bool guessed = false;
        for (uint i=0; i < players[msg.sender].game.tried_letters.length; i++) {
                if (letter == players[msg.sender].game.tried_letters[i]){
                    guessed = true; 
                    break;
                }
            }
        return guessed;
    }

    function guess(bytes1 letter) public returns(bool){
        require(keccak256(abi.encodePacked(players[msg.sender].nickname)) != keccak256(""), "guess(): You have not payed yet. Call pay_game first");
        //check if you are allowed to play (payed) 
        require(players[msg.sender].game.started, "guess(): No game is running right now, you cannot guess.");
        require(
            !(alreadyGuessed(letter)),
            "guess(): You've already guessed that letter."
        );

        Game memory game = players[msg.sender].game;

        bool occured = false;
        for (uint i=0; i<game.word_length; i++) {
            if (letter == game.true_word[i]){
                game.current_word[i] = letter;
                occured = true;
            }
        }
        if (!occured) {
            game.remaining_lifes -= 1;
        }
        // write the updated game object to storage
        players[msg.sender].game = game;

        // return text
        bool ret = false;
        // check if game is finished
        // if(game.remaining_lifes == 0){
        //     //lost because no lifes left
        //     ret = end_game(false);
        // }
        // else if(check_words()){
        //     //won because words are equal
        //     ret = end_game(true);
        // }
        if(occured){
            ret = true;
        }else{
            ret = false;
        }
        return ret;
    }

    function check_words() public view returns(bool){
        bool correct = true;
        Game memory game = players[msg.sender].game;

        correct = keccak256(abi.encodePacked(game.current_word)) == keccak256(abi.encodePacked(game.true_word));

        return correct;
    }

    function end_game(bool success) private returns(bytes memory) {
        bytes memory temp;
        Player memory player = players[msg.sender];
        if(success){
            temp = abi.encodePacked(
                                    bytes("Congratulation, you won.\n"),
                                    bytes("The word "),
                                    bytes(player.game.true_word),
                                    bytes(" is correct!\n"),
                                    bytes("You have now won "),
                                    bytes(uint2str(player.won_games)),
                                    bytes(" games in total.\n\n"),
                                    bytes("You have "),
                                    bytes(uint2str(player.free_games)),
                                    bytes(" free games left.\n"));
            player.won_games += 1;
        }
        else{
            temp = abi.encodePacked(
                                    bytes("Well, you did not win.\n"),
                                    bytes("The word was "),
                                    bytes(player.game.true_word),
                                    bytes("\nAnyways, you have already won "),
                                    bytes(uint2str(player.won_games)),
                                    bytes(" games in total.\n\n"),
                                    bytes("You have "),
                                    bytes(uint2str(player.free_games)),
                                    bytes(" free games left.\n"));
        }
        // reset the current game in the player object
        player.game = Game({started:false,
                                true_word:"",
                                current_word:"",
                                word_length:0,
                                level:LevelDifficulty.Easy,
                                remaining_lifes:0,
                                tried_letters:""
                            });
        // safe the modified player to storage                   
        players[msg.sender] = player;
        // return the message in bytes
        return temp;
    }

    function get_hint() public returns(bytes memory ret){
        require(keccak256(abi.encodePacked(players[msg.sender].nickname)) != keccak256(""), "get_hint(): You have not payed yet. Call pay_game first");
        Game memory game = players[msg.sender].game;
        // a hint costs one life
        game.remaining_lifes -= 1;
        uint idx = random() % game.word_length;
        bytes1 letter = game.true_word[idx];
        while (alreadyGuessed(letter)){
            idx = random() % game.word_length;
            letter = game.true_word[idx];
        }
        // write game to storage
        players[msg.sender].game = game;

        // return section
        ret = " ";

        // end game if no lifes left
        if(game.remaining_lifes <=0){
            // return output of endgame
            ret = end_game(false);
        }
        // a bit ugly but works
        ret[0] = letter;
        return ret;
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
