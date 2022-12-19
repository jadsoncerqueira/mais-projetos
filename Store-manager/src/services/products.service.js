const { validateIdReq, validateNameReq } = require('./validations/validationsInputs');
const { productsModel } = require('../models');

const findAll = async () => {
  const response = await productsModel.findAll();
  return { type: null, message: response };
};

const findById = async (id) => {
  const error = validateIdReq(id);
  if (error.type) return error;

  const response = await productsModel.findById(id);
  if (response.length !== 0) return { type: null, message: response };
  return { type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' };
};

const insert = async (name) => {
  const error = validateNameReq(name);
  if (error.type) return error;
  const insertId = await productsModel.insert(name);
  return { type: null, message: { insertId } };
};

const update = async (id, name) => {
  const error = validateNameReq(name);
  if (error.type) return error;

  const response = await productsModel.findById(id);
  if (response.length === 0) return { type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' };
  await productsModel.update(id, name);
  return { type: null, message: 'ok' };
};

const del = async (id) => {
  const response = await productsModel.findById(id);
  if (response.length === 0) return { type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' };
  await productsModel.del(id);
  return { type: null, message: 'ok' };
};

const findName = async (term) => {
  const response = await productsModel.findName(term);
  return { type: null, message: response };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  del,
  findName,
};