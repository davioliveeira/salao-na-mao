const mongoose = require('mongoose');
const URI = 'mongodb+srv://davioliveeira:tsQBSXTtiHwferuh@salaonamao.kdhoh9j.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('useNewUrlParser', true, 'useFindAndModify', false, 'useUnifiedTopology', true);


mongoose.connect(URI).then(() => console.log('DataBase is Up!')).catch((err) => console.log(err));
