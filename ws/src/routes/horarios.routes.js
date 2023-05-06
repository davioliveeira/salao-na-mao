const router = require('express').Router();
const Horario = require('../models/horario.js');

router.post('/', async (req, res) => {
    try {
        const horarios = await Horario( req.body ).save();
        res.status(200).json( {message : 'Horarios criados com Sucesso!', horarios : horarios});
    } catch (err) {
        res.json({ error: true, message : err.message });
    }

})


module.exports = router;