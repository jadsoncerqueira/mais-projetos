import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    this.setState({
      cart,
    });
  }

aumentaDiminui = (produto, sinal) => {
  const { cart } = this.props;
  const { id } = produto;
  if (sinal === '+') {
    produto.quantidade += 1;
    const search = cart.filter((elem) => elem.id !== id);
    this.setState({
      cart: [...search, produto],
    });
  }
  if (sinal === '-') {
    produto.quantidade -= 1;
    const search = cart.filter((elem) => elem.id !== id);
    this.setState({
      cart: [...search, produto],
    });
  }
}

/* reform = () => {
  const { cart } = this.state;
  const result = cart.map((elem) => {
    const { id, price } = elem;
    const obj = {
      id,
      price,
      quantidade: 1,
    };
    return obj;
  });
  console.log(result);
  this.setState({
    newCart: result,
  });
} */

render() {
  const { cart } = this.state;
  console.log(cart);
  if (cart.length === 0) {
    return (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
  }
  /*  if (newCart.length === 0 || newCart === undefined) return <h1>Carregando</h1>; */
  return (
    <div>
      { cart.map((produto) => (
        <div key={ produto.id }>
          <div>
            <p data-testid="shopping-cart-product-name">{produto.title}</p>
            ,
            <p>{produto.price}</p>
            ,
            <p
              data-testid="shopping-cart-product-quantity"
            >
              {produto.quantidade}

            </p>
          </div>
          <div>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.aumentaDiminui(produto, '+') }
            >
              +
            </button>
          </div>
          <div>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => this.aumentaDiminui(produto, '-') }
            >
              -
            </button>
          </div>
        </div>)) }
    </div>
  );
}
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ShoppingCart;
