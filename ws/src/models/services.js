const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicos = new Schema ({
    salaoId : {
        type : Schema.Types.ObjectId,
        ref : 'Salao',
    },
    titulo : {
        type : String,
        required : true,
    },
    preco : {
        type : Number,
        required : true,
    },
    duracao : {
        type : Number,
        required : true,
    },
    comissao : {
        type : Number,
        required : true,
    },
    recorrencia : {
        type : Number,
        required : true,
    },
    descricao : {
        type : String,
        required : true,
    },
    status: {
        type : String,
        required : [true, "Esse campo é obrigatório! "],
        enum : ["A", "I", "E"],
        default : ['A']
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },

});

module.exports = mongoose.model('Servicos', servicos)