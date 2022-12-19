const data = require('../data/zoo_data');

const localizaColaborador = (idColaborador) =>
  data.employees.find((elem) => elem.id === idColaborador);

const primeiroAnimalColaborador = (idPrimeiro) => localizaColaborador(idPrimeiro).responsibleFor[0];

const idadeMaior = (idMaior) => {
  let aux = 0;
  let specieSelecionada = data.species.find((elem) => elem.id === idMaior);
  specieSelecionada = Object.values(specieSelecionada.residents);
  specieSelecionada.forEach((elem) => {
    if (elem.age > aux) {
      aux = elem.age;
    }
  });
  return specieSelecionada.find((elem) => elem.age === aux);
};

function getOldestFromFirstSpecies(id) {
  const objRetornado = idadeMaior(primeiroAnimalColaborador(id));
  return [objRetornado.name, objRetornado.sex, objRetornado.age];
}

module.exports = getOldestFromFirstSpecies;
