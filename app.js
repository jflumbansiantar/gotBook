'use strict'

const express = require('express');
const app = express();

//Host and Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server-side connected to port', PORT);
})


//Routes
const routes = require('./routes')
app.use(routes);