const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema ({
    nome: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    telefone: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    email: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    senha: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    foto: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    dataNascimento: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    sexo: {
        type : String,
        enum : ["M", "F"],
        required : [true, "Esse campo é obrigatório! "]
    },
    status: {
        type : String,
        required : [true, "Esse campo é obrigatório! "],
        enum : ["A", "I"],
        default : ['A']

    },
})

module.exports = mongoose.model('Colaborador', colaborador)