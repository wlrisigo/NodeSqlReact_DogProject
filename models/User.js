const Joi = require('joi');

function validRegistrar(admin) {
const schema =
    {
        fldName: Joi.string().min(2).max(50).required(),
        pmkEmail: Joi.string().min(3).max(50).required(),
        fldPassword: Joi.string().min(6).max(25).required(),
        fldAdmin: Joi.string().max(1).required()
    }
    return Joi.validate(admin, schema);
}




exports.validRegistrar = validRegistrar;