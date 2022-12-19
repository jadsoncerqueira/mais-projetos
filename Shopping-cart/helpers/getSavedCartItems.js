const getSavedCartItems = (func) => {
  if (!localStorage.getItem('cartItems')) {
    localStorage.cartItems = JSON.stringify([]);
  }
  const itens = JSON.parse(localStorage.getItem('cartItems'));
  itens.forEach((element) => {
    const ol = document.querySelector('.cart__items');
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = element;
    li.addEventListener('click', func);
    ol.appendChild(li);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
