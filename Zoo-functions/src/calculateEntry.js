const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const resultado = {
    child: entrants.filter((elem) => elem.age < 18).length,
    adult: entrants.filter((elem) => elem.age >= 18 && elem.age < 50).length,
    senior: entrants.filter((elem) => elem.age >= 50).length,
  };
  return resultado;
}

function calculateEntry(en) {
  if (en && Object.keys(en).length > 0) {
    const entradas = countEntrants(en);
    const valores = [data.prices.child * entradas.child, data.prices.adult * entradas.adult,
      data.prices.senior * entradas.senior];
    return valores.reduce((valorA, ValorB) => valorA + ValorB);
  }
  return 0;
}

module.exports = { calculateEntry, countEntrants };
