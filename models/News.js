const Joi = require('joi');

function validateNews(News){
    const schema = {
        fldAuthor: Joi.string().min(4).max(50).required(),
        fldTitle: Joi.string().min(3).max(50).required(),
        fldDate: Joi.date().required(),
        fldContent: Joi.string().min(4).max(100).required()

    }
    return Joi.validate(News, schema);
}

exports.validateNews = validateNews;