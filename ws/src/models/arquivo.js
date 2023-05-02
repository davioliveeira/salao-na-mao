const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arquivoSchema = new Schema ({
    referenceId : {
        type : Schema.Types.ObjectId ,
        refPath : 'model'
    },
    model : {
        type : String,
        required : true,
        enum: ['Servico', 'Salao']
    },
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
