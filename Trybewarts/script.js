// FUNÇÃO QUE VERIFICA DADOS DE EMAIL E SENHA
function login() {
  const email = document.querySelector('#campoEmail');
  const senha = document.querySelector('#campoSenha');
  if (email.value === 'tryber@teste.com' && senha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

const btnLogin = document.querySelector('#login');
btnLogin.addEventListener('click', login);

// FUNÇÃO QUE HABILITA BOTÃO DE ENVIAR
const check = document.getElementById('agreement');
const enviar = document.getElementById('submit-btn');

function habilitar() {
  if (check.checked === true) {
    enviar.disabled = false;
  } else {
    enviar.disabled = true;
  }
}

check.addEventListener('click', habilitar);

// FUNÇÃO QUE CRIA O CONTADOR
const contador = document.getElementById('counter');
const text = document.getElementById('textarea');

function contar() {
  const sobra = text.maxLength - text.value.length;
  contador.innerText = sobra;
}

contar();
text.addEventListener('keyup', contar);

// FUNÇÃO QUE APAGA O CONTEÚDO DE FORM E ADICIONA AS INFORMAÇÕES
const form = document.getElementById('evaluation-form');
const sec = document.getElementById('section-formulario');
const div = document.getElementById('div');
const divCheck = document.getElementById('div-check');
const aval = document.getElementById('aval');
const obs = document.getElementById('textarea');

// IDS UTILIZADOS:
const nam = document.getElementById('input-name');
const sNam = document.getElementById('input-lastname');
const em = document.getElementById('input-email');
const cas = document.getElementById('house');

// DECLARAÇÃO DE VALOR
let nomeSobrenome = `Nome: ${nam.value} ${sNam.value}`;
let email = `Email: ${em.value}`;
let familia = 'Familia não selecionada';
let materias = [];
let avaliacao = 'Não Avaliado';
let observacoes = 'Sem observações';

// FUNÇÃO QUE ATUALIZA O NOME A CADA DIGITAÇÃO
function attN() {
  nomeSobrenome = `Nome: ${nam.value} ${sNam.value}`;
  console.log(nomeSobrenome);
}

nam.addEventListener('keyup', attN);
sNam.addEventListener('keyup', attN);

// FUNÇÃO QUE ATUALIZA O EMAIL
function attE() {
  email = `Email: ${em.value}`;
}

em.addEventListener('keyup', attE);

// FUNÇÃO QUE ATUALIZA A FAMÍLIA

function attF() {
  const ft = document.getElementById('ft');
  const bk = document.getElementById('bk');
  const fs = document.getElementById('fs');
  if (ft.checked === true) {
    familia = ft.value;
  } else if (bk.checked === true) {
    familia = bk.value;
  } else if (fs.checked === true) {
    familia = fs.value;
  }
}

div.addEventListener('click', attF);

// FUNÇÃO QUE ATUALIZA MATÉRIAS

function attM() {
  materias = [];
  for (let index = 0; index < divCheck.children.length; index += 1) {
    if (divCheck.children[index].checked === true) {
      materias.push(` ${divCheck.children[index].value}`);
    }
  }
  console.log(materias);
}

divCheck.addEventListener('click', attM);

// FUNÇÃO QUE ATUALIZA AVALIAÇÃO

function attA() {
  for (let index = 0; index < aval.children.length; index += 1) {
    if (aval.children[index].checked === true) {
      avaliacao = `Avaliação: ${aval.children[index].value}`;
    }
  }
  console.log(avaliacao);
}

aval.addEventListener('click', attA);

// FUNÇÃO QUE ATUALIZA OBSERVAÇÕES

function attO() {
  observacoes = `Observações: ${obs.value}`;
  console.log(observacoes);
}

obs.addEventListener('keyup', attO);

// CRIANDO PARAGRAFOS

const pn = document.createElement('p');
const pe = document.createElement('p');
const pc = document.createElement('p');
const pf = document.createElement('p');
const pm = document.createElement('p');
const pa = document.createElement('p');
const po = document.createElement('p');

// FUNÇÃO QUE JUNTA TUDO

function apaga() {
  form.remove();
  const novoForm = document.createElement('form');
  novoForm.id = 'evaluation-form';
  sec.appendChild(novoForm);
  pn.innerText = nomeSobrenome;
  novoForm.appendChild(pn);
  pe.innerText = email;
  novoForm.appendChild(pe);
  pc.innerText = `Casa: ${cas.value}`;
  novoForm.appendChild(pc);
  pf.innerText = `Família: ${familia}`;
  novoForm.appendChild(pf);
  pm.innerText = `Matérias: ${materias}`;
  novoForm.appendChild(pm);
  pa.innerText = avaliacao;
  novoForm.appendChild(pa);
  po.innerText = observacoes;
  novoForm.appendChild(po);
}

enviar.addEventListener('click', apaga);
