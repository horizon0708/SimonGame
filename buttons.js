import React from 'react';

class Buttons extends React.Component {
    constructor() {
        super();
        this.state = {
            sound: undefined,
            activated: false
        }
    }
    componentDidMount() {
        this.setState({ sound: new Audio(this.props.sound) })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.playing === this.props.id){
            this.state.sound.play();
            this.setState({activated: true}, ()=>{
                setTimeout(()=>{
                    this.setState({activated: false})
                }, 500);
            })
        }
    }

    render() {
        const btnStyle = {
            color: this.state.activated ? this.props.color : shadeColor(this.props.color, 50)
        }

        return (
            <div style={btnStyle}>

            </div>
        );
    }
}

function shadeColor(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}