const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaboradorServicos = new Schema ({
    salaoId : {
        types : mongoose.Types.ObjectId,
        ref : 'Salao',
    },
    servicoId : {
        types : mongoose.Types.ObjectId,
        ref : 'Servico',
    },
    status: {
        type : String,
        required : [true, "Esse campo é obrigatório! "],
        enum : ["A", "I"],
        default : ['A']
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },

});


module.exports = mongoose.model('ColaboradorServicos', colaboradorServicos)