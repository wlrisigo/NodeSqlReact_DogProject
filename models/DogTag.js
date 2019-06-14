const Joi = require('joi');

function validateDogTag(dogTag){
    const schema = {
        pfkTagId: Joi.string().min(1).max(11).required(),
        pfkDogId: Joi.string().min(1).max(11).required()
    }
    return Joi.validate(dogTag, schema);
}

exports.validateDogTag = validateDogTag;