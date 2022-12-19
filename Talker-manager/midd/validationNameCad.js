const validationNameCad = async (req, res, next) => {
  const { name } = req.body;
  if ('name' in req.body && name.length >= 3) {
    next();
  } else {
    const resposta = !('name' in req.body) ? 'O campo "name" é obrigatório'
      : 'O "name" deve ter pelo menos 3 caracteres';
    res.status(400).json({ message: resposta });
  }
};

module.exports = validationNameCad;