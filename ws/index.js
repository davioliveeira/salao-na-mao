require('./database')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const busboyBodyParser = require('busboy-body-parser')
const busboy = require('connect-busboy')
const multer = require('multer');
const port = 8080;

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Variables

// Routes 
app.use('/salao', require('./src/routes/salao.routes.js'));
app.use('/servicos', require('./src/routes/servicos.routes.js'));



app.listen( port, () => {
    console.log(`Ws server listening on ${port}`);
});
