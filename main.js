const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('html'));

app.post('/', (req, res) => {
    console.log("A request was made: " + JSON.stringify(req.body.stuff));
});

app.get('/', (req, res) => {
    console.log('A user has logged on.');
})

app.listen(3000, () => {
    console.log("Webserver online!");
});

//Test
const Entity = require('./game/entity');

var a = new Entity("mage");
a.damage(4);
