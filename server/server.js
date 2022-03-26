// Server setup
const express = require('express')
const app = express()
const api = require('./routes/api')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require("cors");
const Player = require('./models/player');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
// Mongoose setup
const mongoose = require('mongoose')
// const { Socket } = require('socket.io')
mongoose.connect('mongodb://localhost/DrawAndGuessDB', { useNewUrlParser: true })
app.use(express.json())
// app.use(cors({
//     origin : ["http://localhost:3000"] , 
//     methods : ["GET" , "POST"],
//     credentials : true
// }));

var PlayerConnecting = {
    0 : {name : "player1" , connect : "false" } ,
    1 : {name : "player2" , connect : "false" }
}
const io = require('socket.io')(3000 , {
    cors : {
        origin : ["http://localhost:3001"],
    }
})  
io.on('connection' , socket => {


    // var query = { name: "player1" };
    // Player.findOne({query}, function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });
    console.log("socket connection");
    socket.on("connectPlayer" , message => {
        if (!PlayerConnecting[0].connect) {
            PlayerConnecting[0].connect = true
            io.emit("PlayerConnected" ,PlayerConnecting[0].name )
        }
        if (!PlayerConnecting[1].connect) {
            PlayerConnecting[1].connect = true        
            io.emit("PlayerConnected" ,PlayerConnecting[1].name )
        }
        else{
            io.emit("PlayerConnected" ,"cantConnecting" )
        }
    })
    socket.on("send-drawAndWord" , obj => {
        io.emit('receiveDrawAndWord' , obj)
    })
    socket.on("send-message" , message => {
        io.emit('receive-message' , message)
        console.log(message);
    })
})

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended : true}));

// app.use(session({
//     key : "name" ,
//     secret: "palyerName",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { encode : 60 * 60 * 24 }
// }))


app.use(express.urlencoded({extended:false}))
app.use('/' , api)

const port = 4002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})
