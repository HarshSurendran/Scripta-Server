import joi from 'joi';

export const signupSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.number().required(),
    dob: joi.date().required(),
    password: joi.string().required(),
});