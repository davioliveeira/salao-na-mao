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
        type : {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates : {
            type: [Number],
            required: true
        }
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },

});

function coordinatesLimit(val) {
    return val.length === 2 && val.every(v => typeof v === 'number');
}

module.exports = mongoose.model('Salao', salao);