const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Game = require('./game');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('html'));

var game = new Game();

app.post('/', (req, res) => {
    res.send({text: game.parse(req.body.stuff)});
});

app.listen(3000, () => {
    console.log("Webserver online!");
});
