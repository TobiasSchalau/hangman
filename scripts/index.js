window.onload = function () {

    document.getElementById('start').addEventListener('click', start_game);
    document.getElementById('pay').addEventListener('click', pay_game);
    document.getElementById('break').addEventListener('click', return_settings);
    document.getElementById('costs').addEventListener('click', show_costs);

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // var categories;         // Array of topics
    // var chosenCategory;     // Selected catagory
    // var getHint ;          // Word getHint
    // var word;              // Selected word
    //var guess;             // Geuss
    var geusses = [];      // Stored geusses
    // var lives;             // Lives
    // var counter;           // Count correct geusses
    // var space;              // Number of spaces in word '-'

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");



    // create alphabet ul
    var buttons = function () {
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


    // // Select Catagory
    // var selectCat = function () {
    //   if (chosenCategory === categories[0]) {
    //     catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
    //   } else if (chosenCategory === categories[1]) {
    //     catagoryName.innerHTML = "The Chosen Category Is Films";
    //   } else if (chosenCategory === categories[2]) {
    //     catagoryName.innerHTML = "The Chosen Category Is Cities";
    //   }
    // }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        // word with underscores - represents current status
        // which format? with underscores and spaces?
        const promis_word = print_word();
        promis_word.then(
            (word) => {
                word = word.replace(/(\s)/gm, ''); //remove all letters not relevant to get the word length
                for (var i = 0; i < word.length; i++) {
                    correct.setAttribute('id', 'my-word');
                    var guess = document.createElement('li');
                    guess.setAttribute('class', 'guess');
                    if (word[i] === "-") {
                        guess.innerHTML = "-";
                        space = 1;
                    } else {
                        guess.innerHTML = "_";
                    }

                    geusses.push(guess);
                    wordHolder.appendChild(correct);
                    correct.appendChild(guess);
                }
            }
        )
    }

    // Show lives
    comments = function () {
        const promise_lives = get_lives();
        promise_lives.then(
            (lives) => {
                showLives.innerHTML = "You have " + lives + " lives";
                if (lives < 1) {
                    showLives.innerHTML = "Game Over";
                }
            }
        )

        // for (var i = 0; i < geusses.length; i++) {
        //     if (counter + space === geusses.length) {
        //         showLives.innerHTML = "You Win!";
        //     }
        // }

        const promise_finished = get_game_status(); //expect sth. like ("You Win!", undefined)
        promise_finished.then(
            (finished) => {
                if (finished) {
                    showLives.innerHTML = finished
                }
            }
        )

    }




    // OnClick Function - guess
    check = function () {
        list.onclick = function () {
            var char = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;


            //exchange with contract.guess()

            // was guess correct?
            const promise_success = guess(char);


            // word with underscores - represents current status
            // which format? with underscores and spaces?
            var promis_word = print_word();
            promis_word.then(
                (word) => {
                    word=word.replace(/(_|\s)/gm, '');//not necessary at all
                    for (var i = 0; i < word.length; i++) {
                        if (word[i] === char) {
                            geusses[i].innerHTML = char;
                        }
                    }

                    var j = (word.indexOf(char));
                    if (j === -1) {
                        // lives -= 1;
                        comments();
                        animate();
                    } else {
                        comments();
                    }
                }
            )
        }
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
    }


    // Reset
    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
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

    // if success
    document.getElementById('game').style.display = 'inline';
    document.getElementById('settings').style.display = 'none';
}

function pay_game() {
    // pay money
    var info = document.getElementById('info');
    var amount = document.getElementById('amount').value;
    const promise_payment = pay_for_game(amount);
    promise_payment.then(
        (answere) => {
            console.log(answere);
            info.innerHTML=answere;
        }
    )
}

function return_settings() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('settings').style.display = 'inline';
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
