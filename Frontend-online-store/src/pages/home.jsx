import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../componets/sidebar';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this.allCategories();
  }

  allCategories = async () => {
    const api = await getCategories();
    this.setState({ categorias: api });
  }

  render() {
    const { categorias } = this.state;
    const { produts, search, getProduts, handleChange, addCart } = this.props;
    return (
      <div>
        <label htmlFor="input-search">
          <input
            type="text"
            id="input-search"
            name="search"
            value={ search }
            data-testid="query-input"
            onChange={ handleChange }
          />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          <button
            type="button"
            data-testid="query-button"
            onClick={ getProduts }
          >
            Pesquisar

          </button>
        </div>
        <div>
          <div>
            <ul>
              {categorias.map((elem) => (
                <li key={ elem.id }>
                  <label htmlFor={ elem.id }>
                    <input
                      type="button"
                      data-testid="category"
                      value={ elem.name }
                      name={ elem.id }
                      id={ elem.id }
                      onClick={ getProduts }
                    />
                  </label>
                </li>))}
            </ul>
          </div>
        </div>
        <div>
          <Sidebar produtos={ produts } cart={ addCart } />
        </div>
        <div />
        <div>
          <Link to="/ShoppingCart" data-testid="shopping-cart-button">
            carrinho
          </Link>
        </div>
      </div>

    );
  }
}

Home.propTypes = {
  produts: PropTypes.array,
  search: PropTypes.string,
  getProduts: PropTypes.func,
  handleChange: PropTypes.func,
}.isRequired;

export default Home;
