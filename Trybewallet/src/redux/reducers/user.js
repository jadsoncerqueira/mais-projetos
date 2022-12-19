import { SET_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: 'jadson',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;
