let cor = 'black';
let statusClick = 0;
let corOriginal = '';

window.onload = function inicial() {
  const corPreta = document.querySelector('.color');
  corPreta.className = 'color preto selected';
};

function selecao(pix) {
  const evento = pix.target;
  const pixelColor = document.getElementsByClassName('color');
  for (let i = 0; i < pixelColor.length; i += 1) {
    if (pixelColor[i].className.includes('selected')) {
      pixelColor[i].className = pixelColor[i].className.replace('selected', '');
      evento.className = `${pix.target.className} selected`;
      cor = evento.style.backgroundColor;
    }
  }
}

document.querySelector('#head').addEventListener('input', (e) => {
  cor = e.target.value;
});

const elementoSelecionado = document.getElementsByClassName('color');
for (let i3 = 0; i3 < elementoSelecionado.length; i3 += 1) {
  elementoSelecionado[i3].addEventListener('click', selecao);
}

function colorPixel(event) {
  const pixel = event.target;
  pixel.style.backgroundColor = cor;
  statusClick = 1;
}

function corHover(event) {
  const pixel = event.target;
  corOriginal = pixel.style.backgroundColor;
  pixel.style.backgroundColor = cor;
  statusClick = 0;
}

function corSai(event) {
  if (statusClick === 0) {
    const acao = event.target;
    acao.style.backgroundColor = corOriginal;
  }
}

function geradorQuadroPixel(tamanho) {
  const divPai = document.querySelector('#pixel-board');
  divPai.style.setProperty('--tamanho', tamanho);
  divPai.innerHTML = '';
  for (let i = 0; i < tamanho * tamanho; i += 1) {
    const pixels = document.createElement('div');
    pixels.className = 'pixel';
    pixels.style.backgroundColor = 'rgb(255, 255, 255)';
    pixels.addEventListener('mouseover', corHover);
    pixels.addEventListener('mouseout', corSai);
    pixels.addEventListener('click', colorPixel);
    divPai.appendChild(pixels);
  }
}

geradorQuadroPixel(5);
function limpaQuadro() {
  const divPixel = document.getElementsByClassName('pixel');
  for (let i = 0; i < divPixel.length; i += 1) {
    divPixel[i].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

function geraQuadro() {
  let entrada = document.querySelector('#board-size').value;
  if (entrada === '') {
    alert('Board inválido!');
  } else if (entrada > 50) {
    entrada = 50;
  } else if (entrada < 5) {
    entrada = 5;
  }
  geradorQuadroPixel(entrada);
}

const botaoGerar = document.querySelector('#generate-board');
botaoGerar.addEventListener('click', geraQuadro);

const botaoClear = document.querySelector('#clear-board');
botaoClear.addEventListener('click', limpaQuadro);

function geradorHexadecimal() {
  const paleta = document.getElementsByClassName('color');
  for (let index = 1; index < paleta.length - 1; index += 1) {
    let codigoHexa = '#';
    const base = '0123456789ABCDEF';
    for (let i = 0; i < 6; i += 1) {
      codigoHexa += base.charAt(Math.floor(Math.random() * base.length));
    }
    paleta[index].style.backgroundColor = codigoHexa;
  }
}

geradorHexadecimal();

function removeGrade() {
  const grade = document.getElementsByClassName('pixel');
  for (let i = 0; i < grade.length; i += 1) {
    if (grade[i].style.border === 'none') {
      grade[i].style.border = '1px solid black';
    } else {
      grade[i].style.border = 'none';
    }
  }
}

const botaoRemoveGrade = document.querySelector('#remove-grade');
botaoRemoveGrade.addEventListener('click', removeGrade);
