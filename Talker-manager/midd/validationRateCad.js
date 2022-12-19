const aux = (rate) => {
    const r = rate >= 1 && rate <= 5;
    const v = !r && rate !== undefined;
    return { v, r };
};

const validationRateCad = async (req, res, next) => {
    const { rate } = req.body.talk;
    const { v, r } = aux(rate);
    if ('rate' in req.body.talk && r) {
      next();
    } else {
      res.status(400).json({
        message: v
          ? 'O campo "rate" deve ser um inteiro de 1 à 5'
          : 'O campo "rate" é obrigatório',
      });
    }
};
  
module.exports = validationRateCad;

// O campo \"rate\" deve ser um inteiro de 1 à 5