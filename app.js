'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('myssql2');
const errorHandler = require('./middleware/errHandler');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Host and Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server-side connected to port', PORT);
})


//Routes
const routes = require('./routes')
app.use(routes);