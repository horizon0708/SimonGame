import React from 'react';
import Buttons from './Buttons';
import Whilst from 'async/whilst';

class SimonGame extends React.Component {
    constructor() {
        super();
        this.state = {
            gameState: 'OFF',
            strict: false,
            turn: 1,
            sequence: '',
            currentSequence: 0, //index of current sequence
            playing: -1
        }
    }

    // --- lifecycle ---
    componentDidMount() {
        this.generateSequence();
    }

    componentDidUpdate(prevProps, prevState) {
        // Go to Next Turn when inputs are right
        if(prevState.gameState === "AWAITING_INPUT" && this.state.gameState === "NEXT_TURN"){
            this.setState({
                gameState: "PLAYING_INSTRUCTION",
                turn: turn++,
                currentSequence: 0
            });
        }
        // Replay instruction when input is wrong
        if(prevState.gameState === "AWAITING_INPUT" && this.state.gameState === "INCORRECT"){
            this.setState({ gameState: "PLAYING_INSTRUCTION"});
        }

        if(this.state.gameState === "PLAYING_INSTRUCTION"){
            this.playInstruction()
        }
        // on Off, GameOver or Win, reset the game.
        if(this.state.gameState === "WIN" 
            || this.state.gameState ==="GAMEOVER"
            || this.state.gameState ==="OFF"){
            this.setState({
                currentSequence: 0,
                playing: -1
            })
            this.generateSequence();
        }

        if(prevState.gameState === "OFF" && this.state.gameState == "ON"){

        }
    }

    // --- game logic --- 
    generateSequence() {
        let sequence;
        for (var i = 0; i < 20; i++) {
            sequence += Math.floor(Math.random() * 4).toString();
        }
        this.setState({ sequence: sequence });
    }

    playInstruction() {
        Whilst(
            () => {
                return this.state.currentSequence < this.state.turn;
            },
            (cb) => {
                this.setState({
                    gameState: "PLAYING_INSTRUCTION",
                    playing: sequence[currentSequence],
                    currentSequence: currentSequence++
                }, () => {
                    setTimeout(() => {
                        cb();
                    }, 1000);
                });
            },
            (err, res) => {
                this.setState({
                    game: "AWAITING_INPUT"
                });
            }
        );
    }

    // --- button clicks ---
    handleGameStart() {
        this.setState({gameState: "PLAYING_INSTRUCTION"});
    }

    handleStrictToggle(){
        this.setState({strict: !this.state.strict})
    }
    
    handleColorClick(id) {
        this.setState({playing: id});
        
        if (this.state.gameState === "PLAYING_INSTRUCTION") {
            console.log("Please wait while the instruction is being played!");
            return;
        }
        
        if (this.state.gameState === "AWAITING_INPUT") {
            if (this.state.sequence[this.state.currentSequence] !== id
                && this.state.strict) {
                this.setState({ gameState: "GAMEOVER" });
                return;
            }
            if (this.state.sequence[this.state.currentSequence] !== id
                && !this.state.strict) {
                this.setState({ gameState: "INCORRECT" });
                return;
            }
            if (this.state.sequence[this.state.currentSequence] === id
                && this.state.currentSequence + 1 === this.state.turn) {
                this.setState({ gameState: "NEXT_TURN" });
                return;
            }
            if (this.state.sequence[this.state.currentSequence] === id
                && this.state.currentSequence + 1 === this.state.turn
                && this.state.turn === 20) {
                this.setState({ gameState: "WIN" });
                return;
            }
        }
    }

    render() {
        const buttons = new Array(4).map((x, i) => <Buttons
            color={colors[i]}
            sound={`https://s3.amazonaws.com/freecodecamp/simonSound${i + 1}.mp3`}
            onClick={(e) => this.handleColorClick(i, e)}
            key={i}
            id={i}
            playing={this.state.playing} />);

        return (
            <Row>
                {buttons}
            </Row>
        );
    }
}