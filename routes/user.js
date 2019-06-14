const express = require('express');
const _ = require('lodash');
const db = require('../db');
const config = require('config')
const valid = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/_auth');
const isMod = require('../middleware/isMod');





router.get('/me', auth, async(req,res)=>{
    const email = req.user.id;
    try {
        console.log(email);
        const user = await db.isUnique(email);
        res.json(user);
    } catch (e) {
        console.log('ERROR', e.message);
    }



});


router.get('/:id', async  (req, res)=> {
    try {
        const email = await db.isUnique(req.params.id);
        res.json(email);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});



//Add Admin
//Checks if Admin Exists
//If doesnt exist adds it to registry
router.post('/',[auth,isMod] ,async (req,res)=>{
    try {
        //Vars
        let insertData = _.pick(req.body, ['fldName' ,'pmkEmail', 'fldPassword', 'fldAdmin']);

        //validate that no one already has that email
        const email = await db.isUnique(insertData.pmkEmail);
        //if not used
        if(email.length == 0 || email == undefined){

            //validate input && throw error if does not pass validation
            const {error} = valid.validRegistrar(insertData);
            console.log(insertData.pmkEmail);
            if (error) return res.status(400).send(error.details[0].message);

//insert new admin
    //hash password //
            //create salt (begining or end that is added on for extra security)
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(insertData.fldPassword,salt);
//PUSH VALS TO ARRAY TO BE INSERTED
            let values = [];
            values.push([insertData.fldName, insertData.pmkEmail, hash, insertData.fldAdmin]);
            const added = await db.Register(values);
//JWS TOKEN
            const token =  jwt.sign({id: insertData.pmkEmail, admin: insertData.fldAdmin}, config.get('env.jwt.jwtPrivateKey'));

                res.header('x-auth-token', token).json(insertData);
                console.log(added);
        //if already used
        }else{
            return res.status(400).send("User already registered");
        }
    }catch (e) {
        console.log('ERROR', e.message);
    }
});







module.exports = router;