// User Story: I am presented with a random series of button presses.
// User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
// User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
// User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
// User Story: I can see how many steps are in the current series of button presses.
// User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
// User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

let counter = 0;
let currentAnswer = '';
let sequence = generateSequence();
let isPlaying = false;
let turn = 1;
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

var playSequence = (turn) => new Promise((resolve, reject) => {
    counter = 0;
    console.log(sequence);
    isPlaying = true;
    for (var i = 0; i < turn; i++) {
        (function (ind) {
            setTimeout(function () {
                switch (sequence[ind]) {
                    case "0":
                        audioOne.play(); console.log("audio 1");
                        $('#0').css("background-color", "green");
                        setTimeout(function () {
                            $('#0').css("background-color", "white");
                        }, 500);
                        break;
                    case "1":
                        audioTwo.play(); console.log("audio 2");
                        $('#1').css("background-color", "red");
                        setTimeout(function () {
                            $('#1').css("background-color", "white");
                        }, 500);
                        break;
                    case "2":
                        audioThree.play(); console.log("audio 3");
                        $('#2').css("background-color", "yellow");
                        setTimeout(function () {
                            $('#2').css("background-color", "white");
                        }, 500);
                        break;
                    case "3":
                        audioFour.play(); console.log("audio 4");
                        $('#3').css("background-color", "blue");
                        setTimeout(function () {
                            $('#3').css("background-color", "white");
                        }, 500);
                        break;
                    default:
                        break;
                }
                resolve;
                console.log("current seq[index] is: " + sequence[ind]);
            }, 1000 + (2000 * ind));
        })(i);
    }
});

$('.button').click(function (e) {
    if (isPlaying){
        console.log("sequence is playing!");
        return;
    }
    
    if (sequence[counter] !== e.currentTarget.id) {
        playSequence(turn);
        counter = 0;
        return;
    }
    counter++;

    // make sound;
    switch (e.currentTarget.id) {
        case "0": audioOne.play();
            $('#0').css("background-color", "green");
            setTimeout(function () {
                $('#0').css("background-color", "white");
            }, 500);
            break;
        case "1": audioTwo.play();
            $('#1').css("background-color", "red");
            setTimeout(function () {
                $('#1').css("background-color", "white");
            }, 500);
            break;
        case "2": audioThree.play();
            $('#2').css("background-color", "yellow");
            setTimeout(function () {
                $('#2').css("background-color", "white");
            }, 500);
            break;
        case "3": audioFour.play();
            $('#3').css("background-color", "blue");
            setTimeout(function () {
                $('#3').css("background-color", "white");
            }, 500);
            break;
        default: break;
    }


    if (counter == turn) {
        $('#comm').html('success!');
        turn++;
        playSequence(turn);
    }

    if (turn > 20) {
        //win game;
        console.log("you've won teh game! but you have lost 'the game'.");
    }
});
playSequence(turn).then(() => {isPlaying = false;});