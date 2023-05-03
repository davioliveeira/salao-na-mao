require('./database')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const BusboyBodyPaser = require('busboy-body-parser')
const Busboy = require('connect-busboy')
const port = 8000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(Busboy());
app.use(BusboyBodyPaser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Variables
app.set('port', port);

// Routes 
app.use('/salao', require('./src/routes/salao.routes.js'));
app.use('/servico', require('./src/routes/servicos.routes.js'));

app.listen(app.get('port'), () => {
    console.log(`Ws server listening on ${app.get('port')}`);
});
