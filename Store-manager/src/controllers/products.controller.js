const { productsService } = require('../services');
const { mapError } = require('../../mapError');

const getProducts = async (_req, res) => {
  const response = await productsService.findAll();
  res.status(200).json(response.message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const productsAll = await productsService.findById(Number(id));

  if (productsAll.type) {
    return res.status(mapError(productsAll.type)).json({ message: productsAll.message });
  }

  return res.status(200).json(productsAll.message[0]);
};

const insertProducts = async (req, res) => {
  const { name } = req.body;
  const response = await productsService.insert(name);

  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  return res.status(201).json({ id: response.message.insertId, name });
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const response = await productsService.update(id, name);

  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  res.status(200).json({ id, name, response });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.del(id);

  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  res.status(204).json();
};

const getProductName = async (req, res) => {
  const { q } = req.query;
  const response = await productsService.findName(q);
  res.status(200).json(response.message);
};

module.exports = {
  getProducts,
  getProductsById,
  insertProducts,
  updateProduct,
  deleteProduct,
  getProductName,
};

// novo