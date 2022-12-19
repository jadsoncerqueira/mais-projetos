export const SET_EMAIL = 'SET_EMAIL';
export const SET_COIN = 'SET_COIN';
export const SET_DESPESA = 'SET_DESPESA';
export const DELETE_DESPESA = 'DELETE_DESPESA';
export const EDITAR_DESPESA = 'EDITAR_DESPESA';
export const NEW_DESPESA = 'NEW_DESPESA';

export const salvarEmail = (email) => ({ type: SET_EMAIL, email });

export const salvarMoedas = (moedas) => ({ type: SET_COIN, moedas });

export const editarDespesa = (edit, id) => ({ type: EDITAR_DESPESA, edit, id });

export const newDes = (newd) => ({ type: NEW_DESPESA, newd });

export const deleteDespesa = (newDespesa, valor) => (
  { type: DELETE_DESPESA, newDespesa, valor }
);

export const salvarDespesa = (despesas, ask) => (
  { type: SET_DESPESA, despesas, ask }
);
