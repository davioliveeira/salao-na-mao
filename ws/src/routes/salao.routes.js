const express = require('express')
const router = express.Router();
const Salao = require('../models/salao.js');
const Servicos = require('../models/services.js');
const turf = require('turf'); 


router.post('/', async (req, res) => {
    try {
      
        const salao = await new Salao(req.body).save();
        res.json({ salao });
    } catch (err) {
        res.json({ error: true, message : err.message });
    }
})

router.get('/servicos/:salaoId', async (req, res) => {
    try {
        const { salaoId } = req.params;
        const servicos = await Servicos.find({
            salaoId,
            status: 'A'
        }).select('_id titulo');
        res.json({
            servicos : servicos.map( servico  => ({label: servico.titulo , value : servico._id }))
        })
        
    } catch (err) {
        res.json({ error: true, message : err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const salao = await Salao.findById(req.params.id).select(
            'capa nome enderco.cidade geo.coordinates telefone'
        );
        // Calculando a distancia :
        const distance = turf.distance(turf.point(salao.geo.coordinates),turf.point([-3.8276774, -38.5146807]))


        res.status(200).json({ message : `Essas são as informações desse Salão : ${salao}` , distancia : distance });
    }catch (err) {
        res.json({ error: true, message : err.message });
    }
});


module.exports = router ; 