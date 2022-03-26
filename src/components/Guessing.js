import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { io } from "socket.io-client";
import '../App.css';
const socket = io("http://localhost:3000")
class Guessing extends Component {
    constructor() {
        super();

        this.state = {
            guess: "",
            succeeded: null,
            status: false
        }
    }
    componentDidMount() {
        this.props.drawStore.getGuessingData()
    }
    onChangeGuess = (e) => {
        this.setState({
            guess: e.target.value,
        })
    }
    checkgussIsCorrect = () => {
        if (this.state.guess === this.props.drawStore.worldChossing) {
            this.setState({
                succeeded: true,
                status: true
            })
            console.log('succeeded!');
        }
        if (this.state.guess !== this.props.drawStore.worldChossing) {
            this.setState({
                succeeded: false,
                status: false
            })
            console.log('try again no succeeded!')
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <br></br>

                <img                     className='center'
 src={this.props.drawStore.imageUrl} alt="exported drawing" />
                <br></br>
                <br></br>

                What is painted above

                <br></br>
                <br></br>
                <TextField
                    className='center'

                    onChange={this.onChangeGuess}
                    id="filled-basic"
                    label="your guess"
                    variant="filled" />
                <br></br>
                <br></br>

                <Button
                    style={{ textAlign: "center" }}
                    variant="outlined"
                    onClick={this.checkgussIsCorrect}
                >
                    Guess
                </Button>
                {/* <h3 style={{ display: this.succeeded === true  &&'none' }}>Succeeded</h3>
                <h3 style={{ display: this.succeeded === false && 'flex' }}>no Succeeded</h3> */}

            </div>

        );
    }
}

export default inject("drawStore")(observer(Guessing));




