const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const animais = [];
  if (ids) {
    ids.forEach((element1) => {
      const aux = data.species.find((element2) => element2.id === element1);
      animais.push(aux);
    });
  }
  return animais;
}

module.exports = getSpeciesByIds;
