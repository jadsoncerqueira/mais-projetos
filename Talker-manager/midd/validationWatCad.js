const messageError = [
  'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  'O campo "watchedAt" é obrigatório',
];

const aux = (origin) => {
    if ('watchedAt' in origin
    && origin.watchedAt[2] === '/'
    && origin.watchedAt[5] === '/'
    && origin.watchedAt.length === 10) {
      return true;
    }
    return false;
};

const validationWatCad = async (req, res, next) => {
    const validation = aux(req.body.talk);
    const tes = 'watchedAt' in req.body.talk;
    if (validation) {
      next();
    } else {
      res.status(400).json({
        message: tes && !validation
        ? messageError[0]
        : messageError[1],
      });
    }
};
  
module.exports = validationWatCad;