const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guessSchema = new Schema({    
//    id : Number ,
    imageURL : String,
    wordToGuess : String,
})

const Guess = mongoose.model("Guess", guessSchema)
module.exports = Guess