const Joi = require('joi');


function validateDogs(dogs){
    const schema = {
        fldName: Joi.string().min(3).max(50).required(),
        fldBreed: Joi.string().min(5).max(50).required(),
        fldAge: Joi.number().min(1).max(2).required(),
        fldDescription: Joi.string().min(3).required(),
        fldPhoto: Joi.string().min(4).max(50),
        fldStatus: Joi.string().min(4).max(50)
    }
    return Joi.validate(dogs, schema);
}

exports.validateDogs = validateDogs;