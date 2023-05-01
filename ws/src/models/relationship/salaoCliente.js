const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaoCliente = new Schema ({
    salaoId : {
        types : mongoose.Types.ObjectId,
        ref : 'Salao',
    },
    clienteId : {
        types : mongoose.Types.ObjectId,
        ref : 'Cliente',
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


module.exports = mongoose.model('SalaoCliente', salaoCliente)