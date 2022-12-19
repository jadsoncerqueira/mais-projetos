const validationATalkCad = async (req, res, next) => {
    if ('talk' in req.body) {
      next();
    } else {
      res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
};
  
module.exports = validationATalkCad;