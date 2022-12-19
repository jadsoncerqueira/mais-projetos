const data = require('../data/zoo_data');

//  este bloco de codigo é responsavel por categorizar todos os animais somente pela região

const buscaAnimal = (regiao) => {
  const resultado = [];
  const ani = data.species.filter((animais) => animais.location === regiao);
  ani.forEach((nomes) => resultado.push(nomes.name));
  return resultado;
};

const categorizadosregiao = () => {
  const resultado = {
    NE: buscaAnimal('NE'),
    NW: buscaAnimal('NW'),
    SE: buscaAnimal('SE'),
    SW: buscaAnimal('SW'),
  };
  return resultado;
};

//  esse bloco é responsavel por retornar os nomes dos animais de cada especie

//  função auxiliar
const filtoAux = (resultado, sexo) => {
  const toResultado = resultado.residents;
  const resutadoFinal = [];
  toResultado.forEach((elem) => {
    if (sexo) {
      if (elem.sex === sexo) { resutadoFinal.push(elem.name); }
    } else { resutadoFinal.push(elem.name); }
  });
  return resutadoFinal;
};

//  função auxiliar
const aniEspecies = (nome, sexo, sorted) => {
  let resutadoFinal = [];
  const resultadoAnimais = data.species.find((elem) => elem.name === nome);
  resutadoFinal = filtoAux(resultadoAnimais, sexo);
  if (sorted) { resutadoFinal.sort(); }
  return resutadoFinal;
};

//  função secundaria | principal : retorna nomes de animais por especie
const mergeArray = (arrayEspecie, sexo = false, sorted = false) => {
  let resultado = {};
  const listResultado = [];
  arrayEspecie.forEach((elem) => {
    resultado[elem] = aniEspecies(elem, sexo, sorted);
    listResultado.push(resultado);
    resultado = {};
  });
  return listResultado;
};

//  esse bloco é responsavel por retornar a saida final caso a função final tenha como parametro 'includeNames = true'

//  função auxiliar
const funcaoAuxiliar = (arr) => {
  const includeNames = arr.some((elem) => elem === 'includeNames');
  const sexo = arr.some((elem) => elem === 'sex');
  const sorted = arr.some((elem) => elem === 'sorted');

  const op1 = includeNames && sexo && sorted;
  const op2 = includeNames && sexo;
  const op3 = includeNames && sorted;

  return { includeNames, op1, op2, op3 };
};

//  função auxiliar
const saidaFinal = (sex = false, sorted = false) => {
  const resultado = {
    NE: mergeArray(categorizadosregiao().NE, sex, sorted),
    NW: mergeArray(categorizadosregiao().NW, sex, sorted),
    SE: mergeArray(categorizadosregiao().SE, sex, sorted),
    SW: mergeArray(categorizadosregiao().SW, sex, sorted),
  };
  return resultado;
};
// função secundaria | principal : retorna valor final
const verificaEntrada = (obj) => {
  const chaves = Object.keys(obj);
  const { includeNames, op1, op2, op3 } = funcaoAuxiliar(chaves);
  if (op1) {
    return saidaFinal(obj.sex, obj.sorted);
  }
  if (op2) {
    return saidaFinal(obj.sex);
  }
  if (op3) {
    return saidaFinal(false, obj.sorted);
  }
  if (includeNames) {
    return saidaFinal();
  }
  return categorizadosregiao();
};

// função principal | principal
function getAnimalMap(options) {
  let resultado;
  if (options) {
    resultado = verificaEntrada(options);
  } else {
    resultado = categorizadosregiao();
  }
  return resultado;
}

module.exports = getAnimalMap;
