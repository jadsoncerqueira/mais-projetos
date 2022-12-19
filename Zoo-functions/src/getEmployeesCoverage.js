const data = require('../data/zoo_data');

const localizaPessoa = (idNameFunc) => {
  const verificaChave = Object.keys(idNameFunc);
  let pessoaRetornada;
  if (verificaChave[0] === 'id') {
    pessoaRetornada = data.employees.find((elem) => elem.id === idNameFunc.id);
  } if (verificaChave[0] === 'name') {
    pessoaRetornada = data.employees.find((elem) =>
      elem.firstName === idNameFunc.name || elem.lastName === idNameFunc.name);
  } else if (pessoaRetornada === undefined) {
    throw new Error('Informações inválidas');
  }
  return pessoaRetornada;
};

const nomesSpecies = (ids) => {
  const species = [];
  const nomes = [[], []];
  ids.forEach((elem) => {
    species.push(data.species.find((elem1) => elem1.id === elem));
  });
  species.forEach((elem) => {
    nomes[0].push(elem.name);
    nomes[1].push(elem.location);
  });
  return nomes;
};

const informacaoFuncionario = (informacao) => {
  const pessoaEncontrada = localizaPessoa(informacao);
  const nomesLocations = nomesSpecies(pessoaEncontrada.responsibleFor);
  return {
    id: pessoaEncontrada.id,
    fullName: `${pessoaEncontrada.firstName} ${pessoaEncontrada.lastName}`,
    species: nomesLocations[0],
    locations: nomesLocations[1],
  };
};

function getEmployeesCoverage(idName) {
  if (idName) {
    return informacaoFuncionario(idName);
  }
  const todosIds = [];
  const todosFuncionarios = [];
  data.employees.forEach((pessoa) => {
    todosIds.push(pessoa.id);
  });
  todosIds.forEach((elem) => {
    todosFuncionarios.push(informacaoFuncionario({ id: elem }));
  });
  return todosFuncionarios;
}

module.exports = getEmployeesCoverage;
