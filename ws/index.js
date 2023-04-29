const express = require('express')
const morgan = require('morgan')

const app = express();
const port = 8080;


app.use(morgan('dev'));
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log(`Ws server listening on ${app.get('port')}`);
});