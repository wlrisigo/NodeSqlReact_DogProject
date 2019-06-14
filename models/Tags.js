const Joi = require('joi');

function validateTag(tag){
    const schema = {
        fldTag: Joi.string().min(1).max(11).required()
    }
    return Joi.validate(tag, schema);
}

exports.validateTag = validateTag;