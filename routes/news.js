const valid = require('../models/News');
const express = require('express');
const db = require('../db')
const path = require('path');
const router = express.Router();
const app = express();



//Insert News
router.get('/', async (req, res) => {
    try {
        const name = await db.queryNews();
        console.log("Grabbed News");
        console.log(name);

        res.send(name)
    } catch (e) {
        console.log('ERROR', e.message);
    }
});


//INSERT News
router.post('/', async (req,res)=>{
    try {
        const {error} = valid.validateNews(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let insertData = req.body;
        let values = [];
        values.push([insertData.fldAuthor, insertData.fldTitle, insertData.fldDate, insertData.fldContent]);
        const added = await db.insertNews(values);
        res.json(added);
        console.log(added);
    }catch (e) {
        console.log('ERROR', e.message);
    }
});


router.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;
