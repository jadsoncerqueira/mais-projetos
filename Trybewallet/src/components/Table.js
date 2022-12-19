import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTask } from '../helpers/Apis';
import { deleteDespesa, editarDespesa } from '../redux/actions';

class Table extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     editSave: false,
  //   };
  // }

  editDespesa = (bo, id) => {
    const { ediDespesa } = this.props;
    ediDespesa(bo, id);
  }

  render() {
    const { expenses1, deleteDespesa1, valorTo, ediDespesa } = this.props;
    // console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses1
            && expenses1.map((uni) => {
              const cambioUtilizado = Number(uni.exchangeRates[uni.currency].ask);
              const valorCo = Number(uni.value)
              * Number(uni.exchangeRates[uni.currency].ask);

              const valorToAtu = Math.abs(Number(valorTo) - valorCo);

              return (
                <tr key={ uni.id }>
                  <td>{ uni.description }</td>
                  <td>{ uni.tag }</td>
                  <td>{ uni.method }</td>
                  <td>{ Number(uni.value).toFixed(2) }</td>
                  <td>{ uni.exchangeRates[uni.currency].name }</td>
                  <td>{ cambioUtilizado.toFixed(2) }</td>
                  <td>{ valorCo.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      // key={ uni.id }
                      data-testid="edit-btn"
                      onClick={
                        () => ediDespesa(true, uni.id)
                      }
                    >
                      Editar despesa
                    </button>
                    <button
                      type="button"
                      key={ uni.id }
                      data-testid="delete-btn"
                      onClick={
                        () => deleteDespesa1(deleteTask(expenses1, uni.id), valorToAtu)
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>);
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses1: state.wallet.expenses,
  valorTo: state.wallet.valorTotal,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDespesa1: (list, valort) => dispatch(deleteDespesa(list, valort)),
  ediDespesa: (bo, id) => dispatch(editarDespesa(bo, id)),
});

Table.propTypes = {
  expenses1: PropTypes.objectOf,
}.isRequired;

Table.defaultProps = {
  // expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
