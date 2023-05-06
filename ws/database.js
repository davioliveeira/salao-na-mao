const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const URI = `${process.env.URL_DB}`

mongoose.set('useNewUrlParser', true, 'useFindAndModify', false, 'useUnifiedTopology', true);


mongoose.connect(URI).then(() => console.log('DataBase is Up!')).catch((err) => console.log(err));
