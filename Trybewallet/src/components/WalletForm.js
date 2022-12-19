import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { salvarDespesa, salvarMoedas, newDes } from '../redux/actions';
import { fetchAllCoin } from '../helpers/Apis';

class WalletForm extends Component {
  alimetacao = 'Alimentação';

  constructor() {
    super();
    this.state = {
      campoValor: '',
      campoDescricao: '',
      campoMoeda: 'USD',
      campoPagamento: 'Dinheiro',
      campoCategoria: this.alimetacao,
      resultadoMoedas: [],
    };
  }

  async componentDidMount() {
    const { setStateGlobal } = this.props;
    const resultado = await fetchAllCoin();
    const valuesList = Object.keys(resultado);
    const aux = valuesList.filter((elem) => elem !== 'USDT');

    this.setState({
      resultadoMoedas: aux,
    }, () => {
      const { resultadoMoedas } = this.state;
      setStateGlobal(resultadoMoedas);
    });
  }

  editItem = (id, list, moedas) => {
    const {
      campoValor,
      campoDescricao,
      campoMoeda,
      campoPagamento,
      campoCategoria,
    } = this.state;

    const despesa = {
      id,
      value: campoValor,
      description: campoDescricao,
      currency: campoMoeda,
      method: campoPagamento,
      tag: campoCategoria,
      exchangeRates: moedas,
    };

    const resultado = list;
    resultado.forEach((el, i) => {
      if (el.id === id) {
        resultado[i] = despesa;
      }
    });
    return resultado;
  }

  setStateGlobal = async () => {
    const { setStGlobal, expenses1, editor, idToEdit, newDes1 } = this.props;
    const {
      campoValor,
      campoDescricao,
      campoMoeda,
      campoPagamento,
      campoCategoria,
    } = this.state;

    const moedas = await fetchAllCoin();
    const cot = 'USDT';
    delete moedas[cot];

    const despesas = {
      id: expenses1 !== undefined ? expenses1.length : 0,
      value: campoValor,
      description: campoDescricao,
      currency: campoMoeda,
      method: campoPagamento,
      tag: campoCategoria,
      exchangeRates: moedas,
    };

    if (editor === true) {
      const listaAlterada = this.editItem(idToEdit, expenses1, moedas);
      console.log(listaAlterada);
      newDes1([...listaAlterada]);
    } else {
      setStGlobal(despesas, moedas);
      this.setState({
        campoValor: '',
        campoDescricao: '',
        campoMoeda: 'USD',
        campoPagamento: 'Dinheiro',
        campoCategoria: this.alimetacao,
      });
    }
  }

  setStateGeneric = (event) => {
    const estado = event.target.name;
    this.setState({
      [estado]: event.target.value,
    });
  }

  render() {
    const {
      campoValor,
      campoDescricao,
      campoMoeda,
      campoPagamento,
      campoCategoria,
    } = this.state;

    const { currencies1, editor } = this.props;
    // if (expenses1 !== undefined) {
    //   console.log(expenses1);
    // }
    return (
      <form>
        <label htmlFor="campoValor">
          Valor:
          <input
            value={ campoValor }
            name="campoValor"
            onChange={ this.setStateGeneric }
            data-testid="value-input"
            id="campoValor"
            type="text"
          />
        </label>

        <label htmlFor="campoDescricao">
          Descrição:
          <textarea
            value={ campoDescricao }
            onChange={ this.setStateGeneric }
            name="campoDescricao"
            data-testid="description-input"
            id="campoDescricao"
            type="text"
          />
        </label>

        <label htmlFor="campoMoeda">
          Moeda:
          <select
            value={ campoMoeda }
            onChange={ this.setStateGeneric }
            name="campoMoeda"
            data-testid="currency-input"
            id="campoMoeda"
            type="text"
          >
            {
              currencies1.map((elem, index) => (
                <option
                  key={ index }
                  value={ elem }
                >
                  { elem }
                </option>))
            }
          </select>
        </label>

        <label htmlFor="campoPagamento">
          Metodo de pagamento:
          <select
            value={ campoPagamento }
            onChange={ this.setStateGeneric }
            name="campoPagamento"
            data-testid="method-input"
            id="campoPagamento"
            type="text"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="campoCategoria">
          Categoria:
          <select
            value={ campoCategoria }
            onChange={ this.setStateGeneric }
            name="campoCategoria"
            data-testid="tag-input"
            id="campoCategoria"
            type="text"
          >
            <option value="Alimentação">Alimentação </option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.setStateGlobal }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies1: state.wallet.currencies,
  expenses1: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  setStGlobal: (valor, ask) => dispatch(salvarDespesa(valor, ask)),
  setStateGlobal: (moedas) => dispatch(salvarMoedas(moedas)),
  newDes1: (moedas1) => dispatch(newDes(moedas1)),
});

WalletForm.propTypes = {
  currencies1: PropTypes.arrayOf,
  expenses1: PropTypes.arrayOf,
}.isRequired;

WalletForm.defaultProps = {
  currencies1: ['USD'],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
