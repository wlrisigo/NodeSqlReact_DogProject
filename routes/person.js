const valid = require('../models/Person');
const express = require('express');
const db = require('../db')

const router = express.Router();


//INSERT A Person
router.post('/', async (req,res)=>{
    try {
        const {error} = valid.validatePerson(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let insertData = req.body;
        let values = [];
        values.push([insertData.fldFirstName, insertData.fldLastName, insertData.fldAddress, insertData.fldEmail, insertData.fldPhoneNumber]);
        const added = await db.insertPerson(values);
        res.json(added);
        console.log(added);
    }catch (e) {
        console.log('ERROR', e.message);
    }
});

//GET Person BY ID
router.get('/:id', async (req, res) => {
    try {
        const name = await db.queryPersonbyId(req.params.id);
        res.json(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const name = await db.queryPerson();
        res.json(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});


//UPDATE Person BY ID
router.put('/:id', async (req, res) => {
    try {
        //////GET BY ID/////
        const getDogs = await db.queryPersonbyId(req.params.id);
        const id =getDogs[0].pmkPeople;
        console.log(id);
       //////UPDATE BY ID/////

        const {error} = valid.validatePerson(req.body); ////validate user input
        if (error) return res.status(400).send(error.details[0].message);
        let updateData = req.body; //get Post request
        let values = [];
        values.push([updateData.fldFirstName, updateData.fldLastName, updateData.fldAddress, updateData.fldEmail, updateData.fldPhoneNumber]);
        const added = await db.updatePerson(req.body,id);
        res.json(added);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});


module.exports = router;
