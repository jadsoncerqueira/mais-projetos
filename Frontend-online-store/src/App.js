import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import ShoppingCart from './pages/shoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';
import Details from './pages/Details';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      produts: [],
      cart: [],
    };
  }

  addCart = (elemento) => {
    elemento.quantidade = 1;
    console.log(elemento);
    this.setState((elem) => ({
      cart: [...elem.cart, elemento],
    }));
  };

  getProduts = async (event) => {
    const { search } = this.state;
    const { name } = event.target;
    const result = await getProductsFromCategoryAndQuery(name, search);
    console.log(name);
    this.setState({
      produts: result.results,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search, produts, cart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              search={ search }
              produts={ produts }
              handleChange={ this.handleChange }
              getProduts={ this.getProduts }
              addCart={ this.addCart }
            />) }
          />
          <Route path="/ShoppingCart" render={ () => <ShoppingCart cart={ cart } /> } />
          <Route
            path="/details/:id"
            render={ (props) => (<Details
              { ...props }
              produts={ produts }
              addCart={ this.addCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
