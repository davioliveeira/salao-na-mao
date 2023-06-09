require('./database')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();
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
app.use('/horarios', require('./src/routes/horarios.routes.js'));
app.use('/colaboradores', require('./src/routes/colaboradores.routes.js'));



app.listen( port, () => {
    console.log(`Ws server listening on ${port}`);
});
