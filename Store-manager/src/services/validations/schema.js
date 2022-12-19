const Joi = require('joi');

const idReq = Joi.number().min(1);

const nameJoi = Joi.string().min(5).required();

const quantityJoi = Joi.number().min(1).required();
const productJoi = Joi.number().min(1).required();

module.exports = {
  idReq,
  nameJoi,
  quantityJoi,
  productJoi,
};