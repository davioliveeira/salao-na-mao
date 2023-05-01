const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arquivoSchema = new Schema ({
    path : {
        type : String,
        required : true,
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },
})

module.exports = mongoose.model('Arquivo', arquivoSchema)
