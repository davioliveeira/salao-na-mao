const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horario = new Schema ({
    salaoId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Salao',
    },
    especialidades: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Especialidades',
    },
    colaborador: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Colaborador',
    },
    dias :{
        type : [Number],
        required : true,
    },
    inicio : {
        type: Date,
        required: true,
    },
    fim : {
        type: Date,
        required: true,
    },
    dataCadastro :  {
        type : Date,
        default : Date.now,
    },
});

module.exports = mongoose.model('Horario', horario);
