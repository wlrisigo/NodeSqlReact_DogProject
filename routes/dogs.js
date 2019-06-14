const valid = require('../models/Dogs');
const auth = require('../middleware/_auth');
const isAdmin = require('../middleware/isAdmin');
const express = require('express');
const db = require('../db')
const router = express.Router();




//GET DOG ALL DOGS
router.get('/', async (req, res) => {
    try {
        const name = await db.queryAdoptableDogs();
        res.json(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});

router.get('/Foster', async (req, res) => {
    try {
        const name = await db.queryFosterable();
        res.json(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});

router.get('/All', async (req, res) => {
    try {
        const name = await db.queryAllDogs();
        res.json(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});


router.get('/Adopted', async (req, res) => {
    try {
        const name = await db.queryAdoptedDogs();
        res.json(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});





        //GET DOG BY ID
router.get('/:id', async (req, res) => {
    try {
        const name = await db.queryDogbyId(req.params.id);
        res.json(name);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});


//INSERT A DOG
router.post('/', [auth, isAdmin], async (req,res)=>{
    try {
        const {error} = valid.validateDogs(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let insertData = req.body;
        let values = [];
        values.push([insertData.fldName, insertData.fldBreed, insertData.fldAge, insertData.fldDescription, insertData.fldPhoto, insertData.fldStatus]);
        const added = await db.insertDog(values);
        res.json(added);
        console.log(added);
    }catch (e) {
        console.log('ERROR', e.message);
    }
});


    //UPDATE DOG BY ID
router.put('/:id', async (req, res) => {
    try {
        //GET BY ID
        const getDogs = await db.queryDogbyId(req.params.id);
         const id =getDogs[0].pmkDogs;
         console.log(id);


        //UPDATE BY ID
//validate user input
        const {error} = valid.validateDogs(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let updateData = req.body;
        let values = [];
        values.push([updateData.fldName, updateData.fldBreed, updateData.fldAge, updateData.fldDescription, updateData.fldPhoto, updateData.fldStatus]);
        const added = await db.updateDog(req.body, id);
        res.json(added);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});

//DELETE dog by id
router.delete('/delete/:id', async (req, res) => {
    try {
        await db.DeleteDogbyId(req.params.id);
        res.send("Dog Deleted")
    } catch (e) {
        console.log('ERROR', e.message);
    }
});




module.exports = router;