const valid = require('../models/DogTag');
const express = require('express');
const db = require('../db')
const router = express.Router();


//INSERT A DOG
router.post('/', async (req,res)=>{
    try {
        const {error} = valid.validateDogTag(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let insertData = req.body;
        let values = [];
        values.push([insertData.pfkDogId, insertData.pfkTagId]);
        const added = await db.insertDogTag(values);
        res.json(added);
        console.log(added);
    }catch (e) {
        console.log('ERROR', e.message);
    }
});



//GET Adoptable and Fosterable DOGS by NAME
//Takes Dog Id and matches all tags associated with it
router.get('/:id', async (req,res)=>{
    try {
        console.log("here");
        const id = req.params.id;
        const dogs = await db.queryDogTagbyId(id);
        res.json(dogs)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});

router.get('/', async (req,res)=>{
    try {
        const dogs = await db.queryDogTags();
        res.json(dogs)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});



module.exports = router;
