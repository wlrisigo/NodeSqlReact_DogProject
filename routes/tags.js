const valid = require('../models/Tags');
const express = require('express');
const db = require('../db')
const router = express.Router();




//GET ALL TAGS
router.get('/', async (req,res)=>{
    try {
        const dogs = await db.queryTags();
        res.json(dogs)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});

//GET Adoptable and Fosterable DOGS by NAME
router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const dogs = await db.queryTagbyId(id);
        res.json(dogs)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});




//INSERT A Tag
router.post('/', async (req,res)=>{
    try {
        const {error} = valid.validateTag(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let insertData = req.body;
        let values = [];
        values.push([insertData.fldTag]);
        const added = await db.insertTag(values);
        res.json(added);
        console.log(added);
    }catch (e) {
        console.log('ERROR', e.message);
    }
});



//UPDATE Tag STATUS by ID
router.put('/:id', async (req, res) => {
    try {
        //GET BY ID
        const getDogs = await db.queryTagbyId(req.params.id);
        const id =getDogs[0].pmkTagId;
        console.log(id);
        //UPDATE BY ID
//validate user input
        const {error} = valid.validateTag(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let updateData = req.body;
        let values = [];
        values.push([updateData.fldTag]);
        const added = await db.updateTag(req.body,id);
        res.json(added);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});



module.exports = router;
