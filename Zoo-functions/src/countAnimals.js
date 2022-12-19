const data = require('../data/zoo_data');

function countAnimals(animal) {
  const relatorio = {};
  if (animal) {
    let animalRetornado = data.species.find((element) => element.name === animal.specie);
    if (animal.sex !== undefined) {
      animalRetornado = animalRetornado.residents.filter((elem) => elem.sex === animal.sex);
      return animalRetornado.length;
    }
    return animalRetornado.residents.length;
  }
  data.species.forEach((element) => {
    const nome = element.name;
    const totalSpecies = element.residents;
    relatorio[nome] = totalSpecies.length;
  });
  return relatorio;
}

module.exports = countAnimals;
