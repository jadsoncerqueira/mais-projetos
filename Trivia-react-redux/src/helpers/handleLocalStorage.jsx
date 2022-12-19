const GAME_TOKEN = 'token';

// if (!JSON.parse(localStorage.getItem(GAME_TOKEN))) {
//   localStorage.setItem(GAME_TOKEN, JSON.stringify([]));
// }

export const readToken = () => localStorage.getItem(GAME_TOKEN);

export const saveToken = (token) => localStorage.setItem(GAME_TOKEN, token);
