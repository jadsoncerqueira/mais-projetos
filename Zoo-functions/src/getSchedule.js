const data = require('../data/zoo_data');

// função verifica animais do dia passado como parametro

const verificaAnimais = (dia) => {
  const animaisList = [];
  const animais = data.species.filter((elem) => elem.availability.some((elem1) => elem1 === dia));
  animais.forEach((elem) => animaisList.push(elem.name));
  return animaisList;
};

// constante que guarda objeto com as chaves dos dias semana com seus respectivos horarios e animais em exibição

const todosAnimais = {};

const horarios = Object.keys(data.hours);

const listaAux = horarios.map((elem) => {
  if (elem === 'Monday') {
    return { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
  }
  return {
    officeHour: `Open from ${data.hours[elem].open}am until ${data.hours[elem].close}pm`,
    exhibition: verificaAnimais(elem),
  };
});

horarios.forEach((elem, index) => {
  todosAnimais[elem] = listaAux[index];
});

function auxFunction(scheduleTarget1) {
  const diasSemana = Object.keys(data.hours);
  let diasSelecionado;
  if (diasSemana.some((elem) => elem === scheduleTarget1)) {
    const dia = {};
    dia[scheduleTarget1] = todosAnimais[scheduleTarget1];
    return dia;
  }
  data.species.forEach((elem) => {
    if (elem.name === scheduleTarget1) {
      diasSelecionado = elem.availability;
    }
  });
  if (diasSelecionado === undefined) {
    return todosAnimais;
  }
  return diasSelecionado;
}

function getSchedule(scheduleTarget) {
  if (scheduleTarget) {
    return auxFunction(scheduleTarget);
  }
  return todosAnimais;
}

module.exports = getSchedule;
