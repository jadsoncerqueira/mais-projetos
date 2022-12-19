const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find((elem) =>
      elem.firstName === employeeName || elem.lastName === employeeName);
  }
  return {};
}

module.exports = getEmployeeByName;
