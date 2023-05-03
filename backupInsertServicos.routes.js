const express = require('express');
const router = express.Router();
const Servico = require('../models/services.js');

router.post('/', async (req, res) => {
  try {
    const { salaoId, servico } = req.body;

    // Create Service
    const servicoCadastrado = await Servico.create(servico);
    console.log(servicoCadastrado);

    res.json({ servicos: servicoCadastrado });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
