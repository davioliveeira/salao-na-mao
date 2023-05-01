const express = require('express')
const router = express.Router();
const Salao = require('../models/salao.js');

router.post('/', async (req, res) => {
    try {
      
        const salao = await new Salao(req.body).save();
        res.json({ salao });
    } catch (err) {
        res.json({ error: true, message : err.message });
    }
})

module.exports = router ; 