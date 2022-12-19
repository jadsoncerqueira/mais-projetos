const INITIAL_STATE = {
  results: [],
};

export const SAV_QUEST = 'SAV_QUEST';

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAV_QUEST:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default questions;
