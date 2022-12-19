const { getData } = require('../data/index.js');

const validationId = async (req, res, next) => {
  const data = await getData();
  const { id } = req.params;
  if (Number(id) <= data.length) {
    next();
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = validationId;