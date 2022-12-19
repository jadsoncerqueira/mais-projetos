const data = require('../data/zoo_data');

function isManager(id) {
  const colaboradores = data.employees.filter((elem) =>
    elem.managers.find((elem2) => elem2 === id));
  return colaboradores.length > 0;
}

function getRelatedEmployees(managerId) {
  const pessoasLideradas = [];
  if (isManager(managerId) === true) {
    const colaboradores = data.employees.filter((elem1) =>
      elem1.managers.find((elem2) => elem2 === managerId));
    colaboradores.forEach((elem) => {
      pessoasLideradas.push(`${elem.firstName} ${elem.lastName}`);
    });
    return pessoasLideradas;
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
