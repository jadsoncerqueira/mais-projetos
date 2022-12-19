import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      card: {},
    };
  }

  componentDidMount() {
    this.checkElement();
  }
  /* nada  */

checkElement = () => {
  const { match: { params: { id } }, produts } = this.props;
  const check = produts.find((elem) => elem.id === id);
  console.log(check);
  this.setState({
    card: check,
  });
}

render() {
  const { addCart } = this.props;
  const { card } = this.state;
  const { title, thumbnail, price } = card;
  return (
    <div>
      <header>
        <h1 data-testid="product-detail-name">{title}</h1>
      </header>
      <section>
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
      </section>
      <section>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addCart(card) }
        >
          {' '}
          Adicionar ao Carrinho

        </button>
      </section>
      <div>
        <Link to="/ShoppingCart" data-testid="shopping-cart-button">
          carrinho
        </Link>
      </div>
    </div>
  );
}
}

Details.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  produts: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Details;
