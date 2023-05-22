const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Colaborador = require('../models/colaborador');
const SalaoColaborador = require('../models/relationship/salaoColaborador');
const ColaboradorServico = require('../models/relationship/colaboradorServicos');
const moment = require('moment');
const pagarme = require('../config/pagarme');

/*
  FAZER NA #01
*/
router.post('/', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { colaborador, salaoId } = req.body;
    let newColaborador = null;

   const existentColaborador = await Colaborador.findOne({
      $or: [
        { email: colaborador.email },
        { telefone: colaborador.telefone },
        //{ cpf: colaborador.cpf },
      ],
    });

    if (!existentColaborador) {
      const options = {
        method: 'POST',
        url: 'https://api.pagar.me/core/v5/recipients',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic c2tfdGVzdF95WlJ3UnpxdDlqSGwwd3piOkJyZWFraW5nMWEyYi4='
        },
        data: {
          name: colaborador.name,
          email: colaborador.email,
          description: colaborador.description,
          document: colaborador.document,
          type: colaborador.type,
          default_bank_account: {
            holder_name: colaborador.default_bank_account.holder_name,
            holder_type: colaborador.default_bank_account.holder_type,
            holder_document: colaborador.default_bank_account.holder_document,
            bank: colaborador.default_bank_account.bank,
            branch_number: colaborador.default_bank_account.branch_number,
            branch_check_digit: colaborador.default_bank_account.branch_check_digit,
            account_number: colaborador.default_bank_account.account_number,
            account_check_digit: colaborador.default_bank_account.account_check_digit,
            type: colaborador.default_bank_account.type,
            metadata: {key: 'value'}
          },
          transfer_settings: {
            transfer_enabled: colaborador.transfer_settings.transfer_enabled,
            transfer_interval: colaborador.transfer_settings.transfer_interval, 
            transfer_day: colaborador.transfer_settings.transfer_day
          },
          automatic_anticipation_settings: {
            enabled: colaborador.automatic_anticipation_settings.enabled, 
            type: colaborador.automatic_anticipation_settings.type, 
            volume_percentage: colaborador.automatic_anticipation_settings.volume_percentage, 
            delay: colaborador.automatic_anticipation_settings.delay
          },
          metadata: {key: 'value'}
        }
      };
  
      const pargarmeReceiver = await axios.request(options);
      // console.log(pargarmeReceiver.data);

      if (pargarmeReceiver.data.error) {
        throw pargarmeReceiver.data;
      }
      
      newColaborador = await new Colaborador({
        ...colaborador,
        recipientId: pargarmeReceiver.data.id,
      }).save({ session });
      console.log('Dados do novo colaborador: ',newColaborador);
    }

    const colaboradorId = existentColaborador
        ? existentColaborador._id
        : newColaborador._id;

      // RELAÇÃO COM O SALÃO
    const existentRelationship = await SalaoColaborador.findOne({
        salaoId,
        colaboradorId,
      });

    if (!existentRelationship) {
        await new SalaoColaborador({
          salaoId,
          colaboradorId,
          status: colaborador.vinculo,
        }).save({ session });
    }

    if (existentRelationship && existentRelationship.status === 'I') {
      await SalaoColaborador.findOneAndUpdate(
        {
          salaoId,
          colaboradorId,
        },
        { status: "A" },
        { session }
      );
    }

    // RELAÇÃO COM OS SERVIÇOS / ESPECIALIDADES
    await ColaboradorServico.insertMany(
      colaborador.especialidades.map((servicoId) => ({
        servicoId,
        colaboradorId,
      }))
    );

    await session.commitTransaction();
    session.endSession();

    if (existentRelationship && existentColaborador) {
      res.json({ error: true, message: 'Colaborador já cadastrado!' });
    } else {
      res.json({ error: false, message: 'Colaborador cadastrado com sucesso!' });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ error: true, message: err.message });
  }
});
/*
  FAZER NA #01
*/
router.post('/filter', async (req, res) => {
    try {
        const colaboradores = await Colaborador.find(req.body.filters);
        res.json({error: false, colaboradores});
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});

/*
  FAZER NA #01
*/
router.get('/salao/:salaoId', async (req, res) => {
    try {
        const {salaoId} = req.params;
        let listaColaboradores = [];

        const colaboradores = await SalaoColaborador.find({
            salaoId,
            status: {
                $ne: 'E'
            }
        }).populate('colaboradorId').select('colaboradorId dataCadastro status');

        for (let colaborador of colaboradores) {
            const especialidades = await ColaboradorServico.find({colaboradorId: colaborador.colaboradorId._id});

            listaColaboradores.push({
                ... colaborador._doc,
                especialidades: especialidades.map((e) => e.servicoId)
            });
        }

        res.json({
            error: false,
            colaboradores: listaColaboradores.map((c) => ({
                ...c.colaboradorId._doc,
                vinculoId: c._id,
                vinculo: c.status,
                especialidades: c.especialidades,
                dataCadastro: moment(c.dataCadastro).format('DD/MM/YYYY')
            }))
        });
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});

/*
  FAZER NA #01
*/
router.put('/:colaboradorId', async (req, res) => {
    try {
        const {vinculo, vinculoId, especialidades} = req.body;
        const {colaboradorId} = req.params;

        await Colaborador.findByIdAndUpdate(colaboradorId, req.body);

        // ATUALIZANDO VINCULO
        if (vinculo) {
            await SalaoColaborador.findByIdAndUpdate(vinculoId, {status: vinculo});
        }

        // ATUALIZANDO ESPECIALIDADES
        if (especialidades) {
            await ColaboradorServico.deleteMany({colaboradorId});

            await ColaboradorServico.insertMany(especialidades.map((servicoId) => ({servicoId, colaboradorId})));
        }

        res.status(200).json({error: false});
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});

/*
  FAZER NA #01
*/
router.delete('/vinculo/:id', async (req, res) => {
    try {
        await SalaoColaborador.findByIdAndUpdate(req.params.id, {status: 'E'});
        res.status(200).json({error: false});
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});

module.exports = router;
