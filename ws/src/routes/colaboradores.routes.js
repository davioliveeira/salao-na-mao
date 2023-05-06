const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const pagarme = require('../config/pagarme.js');
const Colaborador = require('../models/colaborador.js');
const SalaoColaborador = require('../models/relationship/salaoColaborador.js');


router.post('/', async (req, res) => {
    const db = mongoose.connection; 
    const session = await db.startSession();
   
    try {
        const { colaborador , salaoId } = req.body;
        let newColaborador = null;

        const existentColaborador = await Colaborador.findOne({ 
            $or: [
                { email: colaborador.email },
                { telefone : colaborador.telefone }
            ]
        })
        // Verificando se colaborador existe :
        if(!existentColaborador){
            // Create account bank :
            const { contaBancaria } = colaborador; 
            const pagarmeBankAccount = await pagarme("bank_accounts", {
                agencia : contaBancaria.agencia,
                bank_code : contaBancaria.banco,
                conta : contaBancaria.numero,
                conta_dv : contaBancaria.dv,
                document_number : contaBancaria.cpfCnpj,
                legal_name : contaBancaria.titular
            })

            if (pagarmeBankAccount.error){
                throw pagarmeBankAccount
            }

            // Create Recievers:
            const recievers = await pagarme('/recipients', {
                transfer_interval : 'day',
                transfer_enabled : true,
                bank_account_id : pagarmeBankAccount.id,
            })
            if (recievers.error){
                throw recievers
            }

            // Create New Colaborator : 
            newColaborador = await Colaborador({
                ...colaborador, recipientId: recievers.id,
            })

        }
        // Relationship :
        const colaboradorId = existentColaborador
            ? existentColaborador._id
            : newColaborador._id;
        // Verify Relationship Tables :
        const existentRelationship = await SalaoColaborador.findOne(({
            salaoId,
            colaboradorId
        }))

        if( !existentRelationship ){
            await new SalaoColaborador({
                salaoId,
                colaboradorId,
            })
        }


        res.status(200)
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.json({ error: true, message : err.message });
    }

})


module.exports = router;