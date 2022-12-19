import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailLogado, valorTotal } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          Email:
          {' '}
          <span>{ emailLogado }</span>
        </span>
        {' '}
        <span style={ { marginLeft: '50px' } }>
          Despesa total:
          {' '}
          <span data-testid="total-field">
            { valorTotal === undefined ? 0 : valorTotal.toFixed(2) }
          </span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailLogado: state.user.email,
  valorTotal: state.wallet.valorTotal,
});

Header.propTypes = {
  emailLogado: PropTypes.string,
  valorTotal: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
