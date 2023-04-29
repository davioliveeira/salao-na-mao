const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salao = new Schema ({
    nome: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    foto: String,
    capa: String,
    email:  {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    senha:  {
        type : String,
        default : null,
    },
    telefone: String,
    endereco: {
        cidade: String,
        uf: String,
        cep: String,
        numero: String,
        pais: String,
        cidade: String
    },
    geo : {
        tipo : String,
        coordinate : Array,
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },

})