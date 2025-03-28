import joi from 'joi';

export const createArticleSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    imageurls: joi.array().required(),
    tags: joi.array().required(),
    category: joi.string().required(),
    author: joi.string().required(),
});