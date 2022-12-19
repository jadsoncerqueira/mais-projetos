import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    const { produtos, cart } = this.props;
    console.log(produtos);
    if (produtos.length === 0) return <h1>Nenhum produto foi encontrado</h1>;
    return (
      <div>
        {produtos.map((elem, index) => {
          const { thumbnail, price, title } = elem;
          return (
            <div key={ index }>
              <Link to={ `/details/${elem.id}` } data-testid="product-detail-link">
                <div data-testid="product">
                  <h3>{title}</h3>
                  <img src={ thumbnail } alt={ title } />
                  <p>{price}</p>
                </div>
              </Link>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => cart(elem) }
              >
                adicionar ao carrinho de compras

              </button>
            </div>);
        })}
      </div>
    );
  }
}

Sidebar.propTypes = {
  produts: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Sidebar;
