const { salesService } = require('../services');
const { mapError } = require('../../mapError');

const insertSales = async (req, res) => {
  const { body } = req;
  const response = await salesService.insert(body);
  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  res.status(201).json({ ...response });
};

const getSales = async (_req, res) => {
  const response = await salesService.findAll();
  res.status(200).json(response);
};

const getByIdSales = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.findById(id);
  if (response.type) return res.status(mapError(response.type)).json(response);
  return res.status(200).json(response);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.del(id);
  if (response.type) return res.status(mapError(response.type)).json(response);
  return res.status(204).json(response.message);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const response = await salesService.update(id, body);
  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  return res.status(200).json({ saleId: Number(id), itemsUpdated: body });
};

module.exports = {
  insertSales,
  getSales,
  getByIdSales,
  deleteSales,
  updateSales,
};
