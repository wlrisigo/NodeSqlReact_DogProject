const express = require('express');
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const config = require('config');
const _ = require('lodash');
const db = require('../db');
const valid = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');





router.get('/:id', async  (req, res)=> {
    try {
        const email = await db.isUnique(req.params.id);
        res.json(email);
    } catch (e) {
        console.log('ERROR', e.message);
    }
});



//INSERT A Person
//Checks if Admin Exists
//If doesnt exist adds it to registry
router.post('/', async (req,res)=>{
    try {
        //Vars
       let userReq = _.pick(req.body, ["pmkEmail", "fldPassword, fldAdmin"]);
        //validate input && throw error if does not pass validation
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        //validate that no one already has that email
        const userDB = await db.auth(userReq.pmkEmail);
        const email = userDB[0].pmkEmail;
        console.log(userDB[0].fldPassword);


        //if not used
        if(userDB[0].length != 0 || userDB[0] != undefined){
          const validPassword = await bcrypt.compare(req.body.fldPassword, userDB[0].fldPassword);
          console.log("Does password match: " + validPassword)
          if(!validPassword) return res.status(400).send("Invalid email or password.");

         const token = jwt.sign({id: email, admin: userReq.fldAdmin}, config.get('env.jwt.jwtPrivateKey'));

          res.send(token);
        }else{
           return res.status(400).send("Invalid email or password.");
        }

    }catch (e) {
        console.log('ERROR', e.message);
    }
});



function validate(req) {
    const schema =
        {
            pmkEmail: Joi.string().min(3).max(50).required(),
            fldPassword: Joi.string().min(6).max(25).required()
        }
    return Joi.validate(req, schema);
}



module.exports = router;