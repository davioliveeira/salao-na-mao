const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaoColaborador = new Schema ({
    salaoId : {
        type : mongoose.Types.ObjectId,
        ref : 'Salao',
    },
    colaboradorId : {
        type : mongoose.Types.ObjectId,
        ref : 'Colaborador',
    },
    status: {
        type : String,
        required : [true, "Esse campo é obrigatório! "],
        enum : ["A", "I","E"],
        default : ['A']
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },

});

module.exports = mongoose.model('SalaoColaborador', salaoColaborador);
