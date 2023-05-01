require('./database')
const express = require('express')
const morgan = require('morgan')
const app = express();
const port = 8080;

// Middleware
app.use(morgan('dev'));

// Variables
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log(`Ws server listening on ${app.get('port')}`);
});