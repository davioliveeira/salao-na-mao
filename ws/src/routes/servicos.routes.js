// const express = require('express');
// const router = express.Router();
// const Servico = require('../models/services.js');

const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws.js');
const Salao = require('../models/salao.js');
const Servico = require('../models/services.js');
const Arquivo = require('../models/arquivo.js');
const { uploadFile, deleteFile } = require('../config/multer.js')
const multer = require('multer')
const dotenv = require('dotenv');
const sharp = require('sharp');
dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


/*  PROCURA TODOS OS SERVICOS DE UM SALAO  */ 
router.get('/salao/:salaoId', async (req, res) => {
  try {
    let servicesSalao = [];
    const services = await Servico.find({
      salaoId: req.params.salaoId,
      status : { $ne: 'E' },
    })

    for (let service of services) {
      const arquivos = await Arquivo.find({
        model: "Servico",
        referenceId: service._id,
      })
      servicesSalao.push({ ...service, arquivos })
    }
    res.status(201).json({message : `Foram encontrados ${servicesSalao.length} serviços!`, servicos : servicesSalao})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
})

/*  CRIA SERVIÇO E FAZ UPLOAD DE IMG DO SERVICO */ 
router.post('/', upload.array('image'), async (req, res) => {
      try {  
          const { salaoId , servicos } = req.body
          let arquivos = [];
          let errors = [];

          if ( req.files  && Object.keys(req.files).length > 0 ){
              for ( let key of Object.keys(req.files) ) {
                  // console.log(req.files[key] );
                  const file = req.files[key];
                  const nameParts = file.originalname.split('.');
                  const nameFile = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
                  const path = `servicos/${ salaoId }/${nameFile}`
                  const fileBuffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()

                  const response = await uploadFile(file, path, file.mimetype)  
                  // console.log(response);
                  
                  if( response.errors ){
                      errors.push({ error: true, message: response.message })
                  }else { 
                      arquivos.push(path);    
                  }

              }
          }
          if( errors.length > 0 ){
              res.json(errors[0])
              return false
          }
            // // Create Service :
            const jsonServicos = JSON.parse(servicos)
            const servicoCadastrado = await Servico.create(jsonServicos);
            // Create File DB :
            arquivos = arquivos.map( (file) => ({
                referenceId: servicoCadastrado._id,
                model: 'Servico',
                path: file

            }));
          
            await Arquivo.insertMany(arquivos)
            res.status(201).json({ error: false, message: `Upload de Arquivos realizado com sucess! ${arquivos}` });
          } catch (err) {
          console.error(err);
          res.status(500).json({ error: true, message: err.message });
        }
})

/*  FAZ UPDATE DE QUALQUER PROP DOS SERVIÇOS  */ 
router.put('/:id', upload.array('image'), async (req, res) => {
  try {  
      const { salaoId , servicos } = req.body
      let arquivos = [];
      let errors = [];

      if ( req.files  && Object.keys(req.files).length > 0 ){
          for ( let key of Object.keys(req.files) ) {
              // console.log(req.files[key] );
              const file = req.files[key];
              const nameParts = file.originalname.split('.');
              const nameFile = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
              const path = `servicos/${ salaoId }/${nameFile}`
              const fileBuffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()

              const response = await uploadFile(file, path, file.mimetype)  
              // console.log(response);
              
              if( response.errors ){
                  errors.push({ error: true, message: response.message })
              }else { 
                  arquivos.push(path);    
              }

          }
      }
      if( errors.length > 0 ){
          res.json(errors[0])
          return false
      }
        // Create Service :
        const jsonServicos = JSON.parse(servicos)
        await Servico.findByIdAndUpdate(req.params.id, jsonServicos);
        // Create File DB :
        arquivos = arquivos.map( (file) => ({
            referenceId: req.params.id,
            model: 'Servico',
            path: file

        }));
      
        await Arquivo.insertMany(arquivos)
        res.status(201).json({ error: false, message: `Update realizado com sucess! Suas alterações de serviço foram : ${jsonServicos}` });
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: err.message });
    }
})

/*  FAZ DELETE DE QUALQUER FILE  */ 
router.post('/delete-file', async (req, res) => {
  try {
    const { id } = req.body;
    
    // DELETING AWS ...
    await deleteFile(id);

    // DELETING DB ...
    await Arquivo.findOneAndDelete(id);

    res.status(201).json({message: `Successfully deleted file : ${id}`});
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: err.message });
  }
});


/*  FAZ DELETE DE QUALQUER SERVICE  */ 
router.post('/delete-service/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Servico.findOneAndDelete(id,{ status: 'E' })
    res.status(201).json({message : `Deleting service with id : ${id}`})
    
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: err.message });
  }
});
module.exports = router ;
