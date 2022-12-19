// Desafio 1
function compareTrue(valor1, valor2) {
  if (valor1 === true && valor2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  let resultado = (base * height) / 2;
  return resultado;
}

// Desafio 3
function splitSentence(frase) {
  let listaPalavra = [];
  let palavra = '';
  for (let i = 0; i <= frase.length; i += 1) {
    if (frase[i] === ' ' || i === frase.length) {
      listaPalavra.push(palavra);
      palavra = '';
    } else {
      palavra += frase[i];
    }
  }
  return listaPalavra;
}

// Desafio 4
function concatName(lista) {
  let ultimoItem = lista[lista.length - 1];
  let primeiroItem = lista[0];
  return (ultimoItem, ', ', primeiroItem);
}

// Desafio 5
function footballPoints(wins, ties) {
  let resultado = (wins * 3) + (ties * 1);
  return resultado;
}

// Desafio 6
function highestCount(repMaior) {
  let maiorNum = repMaior[0];
  let contador = 1;
  for (let index = 1; index < repMaior.length; index += 1) {
    if (repMaior[index] > maiorNum) {
      contador = 1;
      maiorNum = repMaior[index];
    } else if (repMaior[index] === maiorNum) {
      contador += 1;
    }
  }
  return contador;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let dist1 = Math.abs(mouse - cat1);
  let dist2 = Math.abs(mouse - cat2);
  if (dist1 > dist2) {
    return 'cat2';
  } if (dist1 === dist2) {
    return 'os gatos trombam e o rato foge';
  }
  return 'cat1';
}
// Desafio 8
function fizzBuzz(numbers) {
  let result = [];
  for (let index of numbers) {
    if (index % 3 === 0 && index % 5 === 0) {
      result.push('fizzBuzz');
    } else if (index % 3 === 0) {
      result.push('fizz');
    } else if (index % 5 === 0) {
      result.push('buzz');
    } else {
      result.push('bug!');
    }
  }
  return result;
}

// Desafio 9
function encode(text) {
  let enc = text.replace(/a/g, '1')
    .replace(/e/g, '2')
    .replace(/i/g, '3')
    .replace(/o/g, '4')
    .replace(/u/g, '5');
  return enc;
}
function decode(text) {
  let dec = text.replace(/1/g, 'a')
    .replace(/2/g, 'e')
    .replace(/3/g, 'i')
    .replace(/4/g, 'o')
    .replace(/5/g, 'u');
  return dec;
}
// Desafio 10
function techList(lista, nome) {
  let objetos = [];
  let lista2 = lista.sort();
  for (let i = 0; i < lista2.length; i += 1) {
    let aux = lista2[i];
    let object = {
      tech: aux,
      name: nome,
    };
    objetos.push(object);
  }
  if (objetos.length > 0) {
    return objetos;
  }
  return 'Vazio!';
}
module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
