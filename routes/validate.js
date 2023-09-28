const joi = require('@hapi/joi');

const blogValidation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        title: joi.string().min(6).required(),
        description: joi.string().required(),
        markdown: joi.string(),
        time: joi.date()
    })
    return schema.validate(data);
}

module.exports = {blogValidation}