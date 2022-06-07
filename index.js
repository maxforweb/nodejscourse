const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

const port = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = require('./routes/routes');
app.use('/', router);

const server = app.listen(port, (error) => {
    if (error) return console.error(`Error: ${error}`);
    console.info(`Server listening on port ${server.address().port}`);
});
