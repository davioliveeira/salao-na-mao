const express = require('express')
const router = express.Router();
const Salao = require('../models/salao.js');
const Servicos = require('../models/services.js');

router.post('/', async (req, res) => {
    try {
      
        const salao = await new Salao(req.body).save();
        res.json({ salao });
    } catch (err) {
        res.json({ error: true, message : err.message });
    }
})

router.get('/services/:salaoId', async (req, res) => {
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

module.exports = router ; 