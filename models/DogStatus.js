const Joi = require('joi');

function validateStatus(status){
    const schema = {
        pfkDogs: Joi.string().min(1).max(11).required(),
        pfkPeople: Joi.string().min(1).max(11).required(),
        pfkStatus: Joi.string().min(1).max(11).required()
    }
    return Joi.validate(status, schema);
}

exports.validateStatus = validateStatus;