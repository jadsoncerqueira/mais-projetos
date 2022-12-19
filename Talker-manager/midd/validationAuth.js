const validatio = (token) => {
  const val1 = token ? token.length === 16 : false;
  return val1;
};

const validationAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token && validatio(token)) {
      next();
    } else {
      res.status(401).json({ message: token ? 'Token inválido'
        : 'Token não encontrado',
    });
    }
};
  
module.exports = validationAuth;
