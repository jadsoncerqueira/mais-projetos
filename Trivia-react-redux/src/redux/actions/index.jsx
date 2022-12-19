import { SUB_LOGIN, SAV_SCORE, RESET_PLAYER } from '../reducers/player';

import { SAV_QUEST } from '../reducers/questions';

export const submitLogin = (payload) => ({ type: SUB_LOGIN, payload });

export const saveQuestions = (payload) => ({ type: SAV_QUEST, payload });

export const saveScore = (payload) => ({ type: SAV_SCORE, payload });

export const resetPlayer = () => ({ type: RESET_PLAYER });
