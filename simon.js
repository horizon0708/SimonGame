// User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

let counter = 0;
let sequence = generateSequence();
let isPlaying = false;
let turn = 1;
let strictMode = false;
const audioOne = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const audioTwo = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const audioThree = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const audioFour = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

function generateSequence() {
    let sequence = '';
    for (let i = 0; i < 20; i++) {
        sequence += Math.floor(Math.random() * 4).toString();
    }
    return sequence;
}

$('#restart').click(function () {
    restartGame();
});

$('#strict').click(function () {
    if (strictMode) {
        strictMode = false;
        $('#strict').html("strict mode: OFF");
    } else {
        strictMode = true;
        $('#strict').html("strict mode: ON");
    }
});

$('#start').click((e) => {
    playSequence(turn).then(() => {
        isPlaying = false;
    });
})

function restartGame() {
    counter = 0;
    sequence = generateSequence();
    isPlaying = false;
    turn = 1;
    $('#count').html('count: ' + turn);
    playSequence(turn).then(() => {
        isPlaying = false;
    });
}

var playSequence = (turn) => new Promise((resolve, reject) => {
    counter = 0;
    isPlaying = true;
    for (var i = 0; i < turn; i++) {
        (function (ind) {
            setTimeout(function() {
            playSound(sequence[ind]);
            }, 1000 + (500 * ind));
        })(i);
    }
    (function (ind) {
        setTimeout(function () {
            resolve();
        }, 1000 + (500 * ind));
    })(turn - 1);
});

$('.button').click(function (e) {
    if (isPlaying) {
        console.log("yo wait!");
        return;
    }

    if (sequence[counter] !== e.currentTarget.id) {
        console.log("failed!");
        if (strictMode) {
            restartGame();
        }
        playSequence(turn).then(() => {
            isPlaying = false;
        });
        counter = 0;
        return;
    }
    counter++;

    // make sound;
    playSound(e.currentTarget.id);

    if (counter == turn) {
        $('#comm').html('success!');
        turn++;
        $('#count').html('count: ' + turn);
        playSequence(turn).then(() => {
            isPlaying = false;
        });
    }

    if (turn > 20) {
        //win game;
        console.log("you've won teh game! but you have lost 'the game'.");
        restartGame();
    }
});

function playSound(num) {
    switch (num) {
        case "0":
            audioOne.play();
            $('#0').css("background-color", "green");
            setTimeout(function () {
                $('#0').css("background-color", "white");
            }, 300);
            break;
        case "1":
            audioTwo.play();
            $('#1').css("background-color", "red");
            setTimeout(function () {
                $('#1').css("background-color", "white");
            }, 300);
            break;
        case "2":
            audioThree.play();
            $('#2').css("background-color", "yellow");
            setTimeout(function () {
                $('#2').css("background-color", "white");
            }, 300);
            break;
        case "3":
            audioFour.play();
            $('#3').css("background-color", "blue");
            setTimeout(function () {
                $('#3').css("background-color", "white");
            }, 300);
            break;
        default:
            break;
    }
}