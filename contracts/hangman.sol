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
        uint word_length;
        uint number_failures;
        LevelDifficulty level;
        bytes tried_letters;
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
    function pay_game (uint amount, string memory nickname) payable public returns(bool success) {
        //checks
        if (amount < game_cost[0] ) return false;
        require(msg.value == amount);

        //send money to owner
        send_to_owner(amount);
        // create player
        if(keccak256(bytes(players[msg.sender].nickname)) == keccak256(bytes(""))){
            store_new_player(nickname);
        }
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
        //curr_player = players[msg.sender];

        return true;
    }

    function get_game_costs() public view returns (string memory) {

        string memory message = string(abi.encodePacked("Game costs:\n 1 game: ",  uint2str(game_cost[0]),"\n 2 games: " , uint2str(game_cost[1]), "\n 3 games: " , uint2str(game_cost[2])));

        return message;
    }




    function store_new_player(string memory nickname) private{
        Player memory temp_player = Player({
            player_address:msg.sender, 
            nickname:nickname,
            free_games:0,
            won_games:0,
            game:Game({
                true_word:"",
                current_word:"",
                word_length:0,
                number_failures:0,
                level:LevelDifficulty.Easy,
                tried_letters:""
        })});
        players[msg.sender] = temp_player; 
    }

    function get_player_info() public view returns(Player memory){
        return players[msg.sender];
    }

    function start_game(LevelDifficulty _level) public{
        Game memory game = players[msg.sender].game;

        players[msg.sender].free_games -= 1; 
        game.level = _level;
        game.number_failures = 0;

        // Init word
        game.true_word = WordGenerator.randomWord();
        game.word_length = bytes(game.true_word).length;

        // Initiliaze current word with dashes
        game.current_word = "";
        for (uint i=0; i<game.word_length; i++) {
            game.current_word = abi.encodePacked(game.current_word, "");
        }
        // store game state
        players[msg.sender].game = game;
    }

    function guess(bytes1 letter) public returns(bool){
        //check if you are allowed to play (payed) 
        // Game game = players[msg.sender].game;
        // require(
        //     game.level == LevelDifficulty.Easy && game.number_failures == 3 ||
        //     game.level == LevelDifficulty.Normal && game.number_failures == 4 ||
        //     game.level == LevelDifficulty.Challenging && game.number_failures == 5,
        //     "You can do better. No guess left."
        // );
        // // require(
        // //     //game.tried_letters[letter],
        // //     "You've already guessed that letter."
        // // );

        // // bytes memory result = new bytes(game.word_length);
        // bytes memory result = new bytes(game.word_length);
        // bool occured = false;
        // for (uint i=0; i<game.word_length; i++) {
        //     if (letter == game.true_word[i]){
        //         result[i] = letter;
        //         occured = true;
        //     }else{
        //         result[i]=game.true_word[i];
        //     }
        // }
        // game.current_word = result;

        // if (!occured) {
        //     game.number_failures += 1;
        //     return occured;
        // }else{
        //     // Check if words are equal --> Probably not here --> TODO
        //     check_words;

        //     return occured;
        // }
    }

    function check_words() private view returns(bool){
        bool correct = true;
            for (uint i=0; i< players[msg.sender].game.word_length; i++) {
                if (players[msg.sender].game.current_word[i] != players[msg.sender].game.true_word[i]){
                    correct = false;
                    break;
                }
            }
        return correct;
    }

    function random() private view returns (uint) {
        // sha3 and now have been deprecated
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        // convert hash to integer
    }


    function print_word() public view returns (string memory){
        return string(players[msg.sender].game.true_word);
        // Game game = players[msg.sender].game;
        // return string(abi.encode(game.current_word));
    }

    function set_word(bytes memory word) private{
        // Game game = players[msg.sender].game;
        // game.true_word = word;
    }

    function get_hint() public view returns(bytes1){
        // Game game = players[msg.sender].game;
        // uint idx = random() % game.word_length;
        // bytes1 letter = game.true_word[idx];
        // while (tried_letters[letter]){
        //     idx = random() % game.word_length;
        //     letter = game.true_word[idx];
        // }

        // return letter;
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