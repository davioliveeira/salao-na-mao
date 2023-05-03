const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws.js');
const Servico = require('../models/services.js');
const Arquivo = require('../models/arquivo.js');

router.post('/', async (req, res) => {
  req.headers['content-type'] = req.headers['content-type'] || 'application/octet-stream';
  let busboy = Busboy({ headers: req.headers }); 
  busboy.on('finish', async () => {
    try {
      const { salaoId, servico } = req.body;
      const errors = [];
      let arquivos = [];
      /*
          {
              "Object": {...},
              "Object": {...},
              "Object": {...},
          }
      */

     if (req.files && Object.keys(req.files).length > 0) {
        for (const key of Object.keys(req.files)) {
          const file = req.files[key];
          const nameParts = file.name.slit('.');
          const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
          const path = `servicos/${salaoId}/${fileName}`;

          const response = await aws.uploadToS3(file, path);

          if (response.error) {
            errors.push({ error: true, message: response.message });
          } else {
            arquivos.push(path);
          }
        }
      } 

      if (errors.length > 0) {
        res.json(errors[0]);
        return false;
      }

      // Create Service
      const jsonServico = JSON.parse(servico); // alteração aqui
      const servicoCadastrado = await Servico(jsonServico).save();

      // Create File
      arquivos = arquivos.map((file) => ({
        referenciaId: servicoCadastrado._id,
        models: 'Servico',
        caminho: file, 
      }));

      await Arquivo.insertMany(arquivos);

      res.json({ servicos: servicoCadastrado, arquivos });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  req.pipe(busboy);
});

module.exports = router;
