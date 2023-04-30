const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new Schema ({
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
    documento : {
        tipo :{
            type : String,
            enum : ["cpf", "cnpj"],
            required : True 
        },
        numero :{
            type : String,
            required : True 
        },
    },
    endereco: {
        cidade:{
            type : String,
            required : True 
        },
        uf:{
            type : String,
            required : True 
        },
        cep:{
            type : String,
            required : True 
        },
        numero:{
            type : String,
            required : True 
        },
        pais:{
            type : String,
            required : True 
        },
        cidade:{
            type : String,
            required : True 
        },
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },
})

module.exports = mongoose.model('Cliente', cliente)