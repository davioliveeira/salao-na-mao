const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendamento = new Schema ({
    salaoId : {
        types : mongoose.Types.ObjectId,
        ref : 'Salao',
    },
    clienteId : {
        types : mongoose.Types.ObjectId,
        ref : 'Cliente',
    },
    colaboradorId : {
        types : mongoose.Types.ObjectId,
        ref : 'Colaborador',
    },
    servicoId : {
        types : mongoose.Types.ObjectId,
        ref : 'Servico',
    },
    data : {
        type : Date,
        required : true,
    },
    comissao : {
        type : Number,
        required : true,
    },
    valor : {
        type : Number,
        required : true,
    },
    transactionId :  {
        type : String,
        required : true,
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },
});


module.exports = mongoose.model('Agendamento', agendamento)