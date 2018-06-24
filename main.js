const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('html'));

app.post('/', (req, res) => {
    console.log("A request was made: " + Object.keys(req));
});

app.listen(3000, () => {
    console.log("Webserver online!");
})