const Joi = require('joi');


function validatePerson(person){
    const schema = {
        fldFirstName: Joi.string().min(1).max(25).required(),
        fldLastName: Joi.string().min(1).max(25).required(),
        fldAddress: Joi.string().min(10).required(),
        fldEmail: Joi.string().email({ minDomainAtoms: 1 }),
        fldPhoneNumber: Joi.string().min(10).max(11)
    }
    return Joi.validate(person, schema);
}

exports.validatePerson = validatePerson;