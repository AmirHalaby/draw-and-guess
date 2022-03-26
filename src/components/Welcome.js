import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Button } from '@mui/material';
import {
    BrowserRouter,
    Routes,
    Route , 
    Link
  } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001")


class Welcome extends Component {
    constructor() {
        super();
        this.Drawing = "/Drawing" 
        this.state = {
            player: "amir",
            href : "/"
        }
    }
    insertGame() {
        this.props.drawStore.createNewPlayer()
    }
    startGame = async () => {
         await this.props.drawStore.startGame()
        // this.setState({
        //     player: palyerName
        // })
        if(this.props.drawStore.playerName === "player1")
        {
            this.setState({
                href: "/Drawing"
            })
        }
        else if(this.props.drawStore.playerName === "player2")
        {
            this.setState({
                href: "/Guessing"
            })
        }

    }
    render() {
        // let role = this.state.player
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>Welcome</h1>
                <br></br>
                <br></br>
                <h2>Draw & Guess</h2>
                <h2>    Game    </h2>
                <Button variant="outlined"
                    onClick={this.startGame}
                >
                Start Game
                    {/* { <a 
                        href="/" 
                        alt='Broken Link'>
                        Start Game
                    </a>} */}
                </Button>
                <br></br>
                <Link to="/Drawing"  activeStyle={{color: 'red'}}>Start Game player1</Link>
                <br></br>
                
                <Link to="/Guessing"  activeStyle={{color: 'red'}}>Start Game player2</Link>    
               <h1>{this.props.drawStore.playerName}</h1> 
            </div>
        );
    }
}
export default inject("drawStore")(observer(Welcome));
