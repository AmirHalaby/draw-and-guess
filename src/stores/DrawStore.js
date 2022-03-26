/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable, computed } from 'mobx'
import { io } from "socket.io-client";
import { Redirect } from "react-router-dom";

const socket = io("http://localhost:3000")
export class DrawStore {
    constructor() {
        this.imageUrl = "https://cdn.w600.comps.canstockphoto.com/waiting-moment-draw-image_csp55749771.jpg"
        this.worldChossing;
        this.playerId 
        this.playerName = "amir"
        makeAutoObservable(this, {
            imageUrl: observable,
            worldChossing: observable ,
            saveDrawingData: action

        })
    }
    async getWords() {
        let words = await axios.get('http://localhost:4002/words')
        return words.data
    }

    getGuessingData = () => {
        console.log("getGuessingData");
    }
    getGuessingData = async () => {
        // let guess = await axios.get('http://localhost:4002/guess')
        // this.imageUrl = guess.data[0].imageURL;
        // this.worldChossing = guess.data[0].wordToGuess;
        socket.on("receiveDrawAndWord", obj => {
            this.imageUrl = obj.url
            this.worldChossing = obj.worldChoosing
        })
    }
    createNewPlayer = async () => {
        await fetch(`http://localhost:4002/player`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
    }
    startGame = async () => {
        let player = await axios.get(`http://localhost:4002/player`)
        this.playerName = player.data.name
        this.playerId = player.data.id 
        // return player.data.name
    }
    implemntationSochetio = (message) => {
        socket.on("receive-message", message => {
            console.log(message);
        })
        console.log(message);
        socket.emit('send-message', message);
    }
    async saveDrawingData(url, worldChoosing) {
        const obj = {
            url,
            worldChoosing
        }
        socket.on("receiveDrawAndWord", obj => {
            this.imageUrl = obj.url
            this.worldChossing = obj.worldChoosing
        })
        socket.emit('send-drawAndWord', obj);

        await fetch(`http://localhost:4002/guess`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }

}
