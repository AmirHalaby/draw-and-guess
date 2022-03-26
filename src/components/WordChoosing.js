import React, { Component, useRef } from 'react';
import { observer, inject } from 'mobx-react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CanvasDraw from "react-canvas-draw";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { io } from "socket.io-client";


const socket = io("http://localhost:3000")

class WordChoosing extends Component {
    constructor() {
        super();
        this.state = {
            canvasRef: React.createRef(),
            drawing: "",
            WordChoosing: "",
            words: ["A", "b", "c"],
            TextSocket: "" ,
            receiveMessage : "receiveMessage"
        }
    }

    async componentDidMount() {
        let tempWords = await this.props.drawStore.getWords()
        console.log(this.words);
        this.setState({
            words: tempWords,
            
        })
    }
    handleExport = () => {
        const base64 = this.state.canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        this.setState({
            drawing: base64
        })
        this.props.drawStore.saveDrawingData(base64, this.state.WordChoosing);
    };
    onChangeWordChoosing = (e) => {
        this.setState({
            WordChoosing: e.target.value,
        })
    }
    
    render() {
        return (
            <div>
                <label>Choose a word and draw the meaning of the word</label>
                <br />
                <br />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value={this.state.words[0]} onChange={this.onChangeWordChoosing} control={<Radio />} label={this.state.words[0]} />
                        <FormControlLabel value={this.state.words[1]} onChange={this.onChangeWordChoosing} control={<Radio io />} label={this.state.words[1]} />
                        <FormControlLabel value={this.state.words[2]} onChange={this.onChangeWordChoosing} control={<Radio />} label={this.state.words[2]} />
                    </RadioGroup>
                </FormControl>
                <br />
                <CanvasDraw
                    lazyRadius={0}
                    brushRadius={2}
                    Width={"250px"}
                    Height={"250px"}
                    ref={this.state.canvasRef}
                />
                <br></br>
                <br></br>

                <Button variant="outlined"
                    onClick={this.handleExport}
                >
                    SEND
                </Button>
                
            </div>
        );
    }
}
export default inject("drawStore")(observer(WordChoosing));
