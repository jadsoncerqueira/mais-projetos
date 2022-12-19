function validateEmail(req, res, next) {
  let email = null;
  if ('email' in req.body) {
    email = req.body.email;
  }
  const re = /\S+@\S+\.\S+/;
  const resultado = re.test(email);

  const mess = email === null ? 'O campo "email" é obrigatório'
    : 'O "email" deve ter o formato "email@email.com"';

  if (resultado) {
    next();
  } else {
    res.status(400).json({ message: mess });
  }
}

module.exports = validateEmail;