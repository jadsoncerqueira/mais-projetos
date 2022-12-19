const saveCartItems = () => {
  const aux = [];
  const produtos = document.querySelectorAll('.cart__item');
  produtos.forEach((elem) => {
    aux.push([elem.innerText]);
  });
  localStorage.setItem('cartItems', JSON.stringify(aux));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
