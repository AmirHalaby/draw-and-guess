const express = require('express')
const router = express.Router()
const Guess = require('../models/guess');
var randomWords = require('random-words');
const Player = require('../models/player');


var PlayerConnecting = {
    0 : {name : "player1" , connect : false } ,
    1 : {name : "player2" , connect : false }
}
router.get('/player', async function (req, res) {
    if (!PlayerConnecting[0].connect) {
        PlayerConnecting[0].connect = true   
        const obj = {id:1 , name : "player1" , connect : true }
        res.send(obj)
        
    }
    else if (!PlayerConnecting[1].connect) {
        const obj = {id:2 , name : "player2" , connect : true }
        PlayerConnecting[1].connect = true        
        res.send(obj)
    }
    else{
        const obj = {
            id: 3 , 
            name : "there are two player join the play befor you , please wait some one to desconnect" 
        }
        res.send(obj)
    }
    // var query = { name: "player1" };
    // Player.findOne({query}, function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   res.send(result)
    // });
})

router.get('/words', async function (req, res) {
    console.log(randomWords());
    let words =randomWords({exactly: 3});
    res.send(words)
})
router.post('/guess', async function (req, res) {
    console.log(req.body.worldChoosing);
    console.log(req.body.url);
    console.log("transactions is working");
    await Guess.deleteMany({})
    let newGuess = new Guess({
        imageURL: req.body.url,
        wordToGuess: req.body.worldChoosing,
    })
    let toReturn = await newGuess.save()
    res.send(toReturn)
})
router.get('/guess', function (req, res) {
    Guess.find({}).exec(function (err, guess) {
        res.send(guess)
    })
})

router.post('/transaction', function (req, res) {

})

module.exports = router