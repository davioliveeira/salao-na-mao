const express = require('express')
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws.js');
const Salao = require('../models/salao.js');
const Servicos = require('../models/services.js');
const arquivo = require('../models/arquivo.js');


router.post('/', async (req, res) => {
    req.headers['content-type'] = req.headers['content-type'] || 'application/octet-stream';
    let busboy = new Busboy({ headers: req.headers });
        busboy.on('Finished', async () =>{
            try {
                const { salaoId } = req.body
                let errors = [];
                let arquivos = []; 
                /*
                    {
                        "Object": {...},
                        "Object": {...},
                        "Object": {...},
                    }
                */ 
                if (req.files && Object.keys(req.files).length > 0) {
                        for (let key of Object.keys(req.files)) {
                            const files = req.files[key];
                            const fileName = `${new Date().getTime()}.${files.name.split('.').pop()}`;
                            const path = `servicos/${salaoId}/${fileName}`;
                            const response = await aws.uploadToS3(files, path);
        
                            if (response.error) {
                                errors.push({ error: true, message: response.message });
                            } else {
                                arquivos.push(path);
                            }
                        }
                }
                if (errors.length > 0 ){
                    res.json(errors[0])
                    return false;
                }
                // Create Service 
                let jsonServico = JSON.parse(Servicos);
                const servicoCadastrado = await Servicos(jsonServico).save();
                // Create File 
                arquivos = arquivos.map((file) => ({
                    referenciaId: servicoCadastrado._id,
                    models: 'Servico',
                    caminho: arquivo
                }));

                await arquivo.insertMany(arquivos);
                
            } catch (err) {
                res.json({ error: true, message : err.message });
            }
        })
        request.pipe(busboy);
})


module.exports = router ; 