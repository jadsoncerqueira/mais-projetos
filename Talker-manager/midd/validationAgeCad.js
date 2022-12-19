const validationAgeCad = async (req, res, next) => {
    const { age } = req.body;
    if ('age' in req.body && age > 18) {
      next();
    } else {
      const resposta = !('age' in req.body) ? 'O campo "age" é obrigatório'
        : 'A pessoa palestrante deve ser maior de idade';
      res.status(400).json({ message: resposta });
    }
};
  
module.exports = validationAgeCad;