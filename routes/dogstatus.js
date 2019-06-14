const valid = require('../models/DogStatus');
const express = require('express');
const db = require('../db')
const router = express.Router();

//insert into news
//get news

//GET Adoptable and Fosterable DOGS
router.get('/', async (req,res)=>{
    try {
        const dogs = await db.queryAvailbleDogs();
        console.log(dogs);
        res.json(dogs)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});


//Get ONLY Adoptable Dogs (Already Fostered)
router.get('/Adoptable', async (req,res)=>{
    try {
        const name = await db.queryAdoptableDogs();
        res.json(name)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});

//Get Adopted Dogs
router.get('/Adopted', async (req,res)=>{
    try {
        const name = await db.queryAdoptedDogs();
        res.json(name)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});


//GET Adoptable and Fosterable DOGS by NAME
router.get('/:name', async (req,res)=>{
    try {
        const name = req.params.name;
        const dogs = await db.queryDogStatusbyName(name);
        res.json(dogs)
    }
    catch (e) {
        console.log('ERROR', e.message);
    }
});



//INSERT A DOG
router.post('/', async (req,res)=>{
    try {
        const {error} = valid.validateStatus(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let insertData = req.body;
        let values = [];
        values.push([insertData.pfkDogs, insertData.pfkPeople, insertData.pfkStatus]);
        const added = await db.insertDogStatus(values);
        res.json(added);
        console.log(added);
    }catch (e) {
        console.log('ERROR', e.message);
    }
});



//UPDATE DOG STATUS by ID
router.put('/:id', async (req, res) => {
    try {
        //GET BY ID
        const getDogs = await db.queryDogbyId(req.params.id);
        const id =getDogs[0].pfkDogs;
        console.log(id);
        //UPDATE BY ID
//validate user input
        const {error} = valid.validateStatus(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let updateData = req.body;
        let values = [];
        values.push([updateData.pfkDogs, updateData.pfkPeople, updateData.pfkStatus]);
        const added = await db.updateDogStatus(req.body,id);
        res.json(added);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});




module.exports = router;
