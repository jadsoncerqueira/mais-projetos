const { validateQuantity } = require('./validations/validationsInputs');
const { salesModel, productsModel } = require('../models');

const aux = async (arr) => {
  const ids = arr.map((el) => el.productId);
  let valAux = false;

  const results = ids.map(async (el) => {
    const result = await productsModel.findById(el);
    return result;
  });

  await Promise.all(
    results.map(async (el) => {
      const poxa = await el;
      if (poxa.length < 1) {
        valAux = true;
      }
    }),
  );
  return valAux;
};

const insert = async (arr) => {
  let err = null;
  arr.forEach(async (element) => {
    const error = validateQuantity(element.quantity);
    if (error.type) err = error;
  });
  if (err) return err;
  if (await aux(arr)) return { type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' };
  
  const id = await salesModel.insert(arr);
  return { id, itemsSold: arr };
};

const findAll = async () => {
  const response = await salesModel.findAll();
  return response;
};

const findById = async (id) => {
  const response = await salesModel.findById(id);
  if (response.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return response;
};

const del = async (id) => {
  const response = await salesModel.findById(id);
  if (response.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  await salesModel.del(id);
  return { type: null, message: '' };
};

const update = async (id, arr) => {
  const response = await salesModel.findById(id);
  if (response.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  let err = null;
  arr.forEach(async (element) => {
    const error = validateQuantity(element.quantity);
    if (error.type) err = error;
  });
  if (err) return err;

  if (await aux(arr)) return { type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' };

  await Promise.all(
    arr.map(async (item) => {
      await salesModel.update(item.quantity, id, item.productId);
    }),
  );
  return { type: null, message: '' };
};

module.exports = {
  insert,
  findAll,
  findById,
  del,
  update,
};