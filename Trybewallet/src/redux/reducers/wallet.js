import {
  SET_COIN,
  SET_DESPESA,
  DELETE_DESPESA,
  EDITAR_DESPESA,
  NEW_DESPESA,
} from '../actions';

import { countTotal } from '../../helpers/Apis';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    valorTotal: 0,
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

function wallet(state = INITIAL_STATE, action) {
  const values = state.expenses !== undefined ? state.expenses : [];
  // const { expenses } = state;
  switch (action.type) {
  case NEW_DESPESA:
    return {
      ...state,
      expenses: action.newd,
      editor: false,
      valorTotal: countTotal(action.newd),
    };
  case SET_COIN:
    return {
      currencies: action.moedas,
      ...state,
    };

  case DELETE_DESPESA:
    return {
      ...state,
      expenses: action.newDespesa,
      valorTotal: countTotal(action.newDespesa),
    };
  case SET_DESPESA:
    return {
      ...state,
      expenses: [...values, action.despesas],
      valorTotal: countTotal([...values, action.despesas]),
    };

  case EDITAR_DESPESA:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  default:
    return state;
  }
}

export default wallet;
