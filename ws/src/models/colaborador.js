const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema ({
    name: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    email: {
        type : String,
        required : [true, "Esse campo é obrigatório! "]
    },
    description: {
        type: String,
        default: null,
    },
    type: {
        type : String,
        enum : ["individual", "company"],
        default : null,
    },
    foto: {
        type: String,
        default: null,
    },
    document: {
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
    telefone: {
        type: String,
        required: true,
        unique: true,
      },
    status: {
        type : String,
        required : [true, "Esse campo é obrigatório! "],
        enum : ["A", "I"],
        default : ['A']
    },
    default_bank_account : {
        holder_name : {
            type : String,
            required : true
        },
        holder_document : {
            type : String,
            required : true
        },
        holder_type : {
            type : String,
            enum : ["individual", "company"],
            required : true
        },
        bank : {
            type : String,
            required : true
        },
        branch_number : {
            type : String,
            required : true
        },
        branch_check_digit : {
            type : String,
            required : true
        },
        account_number : {
            type : String,
            required : true
        },
        account_check_digit : {
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true
        },
    },
    recipientId : {
        type : String,
        required : true
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },
})

module.exports = mongoose.model('Colaborador', colaborador)