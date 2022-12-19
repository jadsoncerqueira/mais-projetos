const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export const SUB_LOGIN = 'SUB_LOGIN';
export const SAV_SCORE = 'SAV_SCORE';
export const RESET_PLAYER = 'RESET_PLAYER';

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUB_LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case SAV_SCORE:
    return {
      ...state,
      score: (state.score + action.payload),
      assertions: (state.assertions + 1),
    };
  case RESET_PLAYER:
    return INITIAL_STATE;
  default: return state;
  }
};

export default player;
