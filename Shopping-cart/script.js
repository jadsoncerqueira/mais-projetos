const totalPrice = (valor) => {
  const areaTotalPreco = document.querySelector('#preco-total');
  const elemPreco = document.createElement('div');
  elemPreco.className = 'total-price';
  areaTotalPreco.innerText = '';
  elemPreco.innerText = valor;
  areaTotalPreco.appendChild(elemPreco);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const totalCarrinho = () => {
  const valores = [];
  const valoresCarrinho = document.querySelectorAll('.valores');
  valoresCarrinho.forEach((elem) => {
    valores.push(parseFloat(elem.innerText));
  });
  localStorage.setItem('Valores', valores.reduce((acc, item) => acc + item, 0));
};

const cartItemClickListener = (event) => {
  const elemento = event.target;
  elemento.parentElement.removeChild(elemento);
  saveCartItems();
  totalCarrinho();
  totalPrice(localStorage.getItem('Valores'));
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.className = 'valores';
  span.innerHTML = salePrice;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $`;
  li.appendChild(span);
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const adicionaCarrinho = async (id) => {
  const produtoClicado = id.target.parentElement.children[0].innerText;
  const areaDeposito = document.querySelector('.cart__items');
  const resposta = await fetchItem(produtoClicado);
  const sku = resposta.id;
  const name = resposta.title;
  const salePrice = resposta.price;
  const elementoresposta = createCartItemElement({ sku, name, salePrice });
  areaDeposito.appendChild(elementoresposta);
  saveCartItems();
  totalCarrinho();
  totalPrice(localStorage.getItem('Valores'));
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.addEventListener('click', adicionaCarrinho);
  return section;
};

const setProduto = async () => {
  const itemsPagina = document.querySelector('.items');
  const resultado = await fetchProducts('computador');
  itemsPagina.innerHTML = '';
  resultado.results.forEach((elem) => {
    const sku = elem.id;
    const name = elem.title;
    const image = elem.thumbnail;
    itemsPagina.appendChild(createProductItemElement(
      { sku, name, image },
    ));
  });
};

const btnLimpaCarrinho = document.querySelector('.empty-cart');

const removeitensCarrinho = () => {
  const areaDeposito = document.querySelector('.cart__items');
  areaDeposito.innerHTML = '';
  totalCarrinho();
  totalPrice(localStorage.getItem('Valores'));
  localStorage.setItem('Produtos', JSON.stringify([]));
};

btnLimpaCarrinho.addEventListener('click', removeitensCarrinho);

window.onload = () => { 
  setProduto();
  getSavedCartItems(cartItemClickListener);
 };
