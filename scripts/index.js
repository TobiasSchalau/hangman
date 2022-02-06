var game_started = false;
var player_exists = false;

window.onload = function () {
    
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    document.getElementById('start').addEventListener('click', start_game);
    document.getElementById('pay').addEventListener('click', pay_game);
    document.getElementById('break').addEventListener('click', return_settings);
    document.getElementById('costs').addEventListener('click', show_costs);

    var loadScreen = document.getElementById('loadScreen');
 
    hide_load_screen();

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var geusses = [];      // Stored geusses

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("catagoryName");
    var getHint = document.getElementById("hint");
    getHint.addEventListener('click', get_hint);
    var showClue = document.getElementById("clue");
    


    stats = function(){
        show_load_screen("fetching stats..");
        var freeGames = document.getElementById("free-games");
        var wonGames = document.getElementById("won-games");
        const exist_promise = check_player_exist();
        exist_promise.then(
            (exists) => {
                player_exists = exists;
                if(player_exists){
                    const won_games_promise = get_won_games();
                    won_games_promise.then(
                        (won_games) => {
                            wonGames.innerHTML = "Won Games: "+ won_games;
                        })
                    const free_games_promise = get_free_games();
                    free_games_promise.then(
                        (free_games) => {
                            freeGames.innerHTML = "Free Games left: "+ free_games;
                        })
                }
                hide_load_screen();
            })
    }
    stats();

    // create alphabet ul
    buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');
        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        if(game_started){
            // word with underscores - represents current status
            // which format? with underscores and spaces?
            const promis_word = print_word();
            promis_word.then(
                (word) => {
                    // this is handled in solidity
                    wordHolder.innerHTML = word ;
                }
            )
        }
        
    }

    // Show lives and maybe end the game
    comments = function () {
        if(game_started){
            const promise_lives = get_lives();
            promise_lives.then(
                (lives) => {
                    showLives.innerHTML = "You have " + lives + " lives";
                    if (lives < 1) {
                        showLives.innerHTML = "Game Over";
                        drawArray[5]();
                        const promise_word = get_real_word();
                        promise_word.then(
                            (real_word) =>{
                                wordHolder = document.getElementById('hold');
                                wordHolder.innerHTML = "The word was: " + real_word +".";
                            }
                        )
                        return;
                    }
                    const promise_finished = get_game_status(); 
                    promise_finished.then(
                        (finished) => {
                            if (finished) {
                                showLives.innerHTML = "You won the game!";
                            }
                        }
                    )
                }
            )
        }
        

    }




    // OnClick Function - guess
    check = function () {
        list.onclick = function () {
            var char = (this.innerHTML);
            

            this.setAttribute("class", "active");
            this.onclick = null;


            //exchange with contract.guess()

            // was guess correct?
            show_load_screen("Checking the guess in the blockchain...");
            const promise_success = guess(web3.utils.asciiToHex(char));

            promise_success.then(
                (success) => {
                    console.log("Guess(): ", promise_success);
                    var promis_word = print_word();
                    promis_word.then(
                        (word) => {
                            var oldWord = wordHolder.innerHTML;
                            // assign new word to html
                            wordHolder.innerHTML = word;
                            // retrieve it. this might make them comparable..weird stuff.
                            var newWord = wordHolder.innerHTML;
                            console.log("Old word: ", oldWord, " vs newWord: ", word);
                            if(oldWord == newWord){
                                showClue.innerHTML = "Your guess was wrong.";
                                animate();
                            }
                            else{
                                showClue.innerHTML = "Your guess was correct.";
                            }
                            comments();
                            //animate man if failed
                            // it is a transaction, and transactions do not return values, we need another function to read 
                            // the result(if guess was correct)
                            // I use the word function and check, if word has changed.
                            // https://stackoverflow.com/questions/49965349/contract-function-returning-a-transaction-object-instead-of-a-bool
                            hide_load_screen();
                        }
                    )
                }
            )
            

            // word with underscores - represents current status
            // which format? with underscores and spaces?
            
        }
    }

    function get_hint() {
        
        //exchange with contract.guess()

        // was guess correct?
        show_load_screen("Requesting a hint from the contract...");
        const promise_success = request_hint();

        promise_success.then(
            (success) => {
                show_load_screen(success);
                console.log("Guess(): ", promise_success);
                var promise_hint = get_last_hint();
                promise_hint.then(
                    (hint) => {
                        showClue.innerHTML = "Clue: " + hint;
                       
                        comments();
                        animate();

                        hide_load_screen();
                    }
                )
            }
        )
    }

    // start game - initialise
    play = function () {

        buttons();

        geusses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        canvas();
        stats();
        console.log("Going to draw frame now.");
        drawArray[6]();
        drawArray[7]();
        drawArray[8]();
        drawArray[9]();

    }


    // Reset
    document.getElementById('reset').onclick = function () {
        wordHolder.innerHTML = "";
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
        stats();
    }

    // Animate man
    var animate = function () {
        const promise_lives = get_lives();
        promise_lives.then(
            (lives) => {
                var drawMe = lives;
                drawArray[drawMe]();
            }
        )
    }

    // Hangman
    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };


    // constant
    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


    //init
    play();
}


function start_game() {
    // start game here if payed before
    show_load_screen("Starting the game and saving it to the blockchain..");
    const promise_start = start_game_contract();
    promise_start.then(
        (answer) => {
            if (answer){
                // if success
                //print the word
                var promis_word = print_word();
                show_load_screen("Fetching the word from the blockchain..");
                promis_word.then(
                    (word) => {
                        wordHolder.innerHTML = word;
                        comments();
                    }
                )
                hide_load_screen();
                game_started = true;
                document.getElementById('game').style.display = 'inline';
                document.getElementById('settings').style.display = 'none';
            }else{
                hide_load_screen();
                document.getElementById('info').innerHTML = "You have to pay first!";
            }
        }
    )
}

function pay_game() {
    show_load_screen("Processing the payment..");
    // pay money
    var info = document.getElementById('info');
    var amount = document.getElementById('amount').value;
    const promise_payment = pay_for_game(amount);
    promise_payment.then(
        (answer) => {
            console.log(answer);
            info.innerHTML=answer;
            show_load_screen(answer);
            // stats();
            hide_load_screen();
        }
    ).finally(
        function(){ stats();}
    )

}

function show_load_screen(message){
    loadScreen.style.display = "block";
    loadScreen.innerHTML = message;
}

function hide_load_screen(){
    loadScreen.style.display = "none";
    loadScreen.innerHTML = "";
}

function return_settings() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('settings').style.display = 'inline';
    stats();
}

function show_costs() {
    var info = document.getElementById('info');
    const promise_costs = get_game_costs();
    promise_costs.then(
        (costs) => {
            info.innerHTML = costs;
        }
    )
}
