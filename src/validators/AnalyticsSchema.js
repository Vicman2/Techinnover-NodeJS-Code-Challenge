const Joi = require("joi")


const AddAnalyticsSchema = Joi.array().items({
    user: Joi.number().required(),
    eventType: Joi.string().required()
}).required()


module.exports = {
    AddAnalyticsSchema
}