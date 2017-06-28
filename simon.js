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
const audioOne = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const audioTwo = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const audioThree = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const audioFour = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

function generateSequence () {
    let sequence = '';
    for (let i = 0; i < 20; i++) {
        sequence += Math.floor(Math.random() * 4).toString();
    }
    return sequence;
}

var playSequence = (turn) => {
    isPlaying = true;
    counter = 0;
    userInput = '';
    currentAnswer = ''; // reset current answer
    for (let i = 0; i < turn; i++) {
        answer += sequence[num];    
    }
    for (var i=0;i<=turn;i++) {
        (function(ind) {
            setTimeout(function(){
                switch (sequence[ind]){
                    case 0: audioOne.play(); break;
                    case 1: audioTwo.play(); break;
                    case 2: audioThree.play(); break;
                    case 3: audioFour.play(); break;
                    default: break;
                }
                console.log(ind); 
                console.log(isPlaying);
            }, 1000 + (3000 * ind));
        })(i);
    }
    isPlaying = false;
}

var playNote = (num) => {
    //play the note using sequnce[num]

}

$('.button').click(function(e){
    if (currentAnswer[counter] !== e.currentTarget.id){
        //repeat
        counter = 0;
        return;
    }
    counter++;
    
    //

    // make sound;
    switch (e.currentTarget.id){
        case 0: audioOne.play(); break;
        case 1: audioTwo.play(); break;
        case 2: audioThree.play(); break;
        case 3: audioFour.play(); break;
        default: break;
    }

    if (counter == turn){
        // playSequence();
    }

    turn++;
    if (turn > 20) {
        //win game;
        console.log("you've won teh game! but you have lost 'the game'."); 
    }
});
playSequence(10);