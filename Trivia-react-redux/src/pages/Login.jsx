import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveQuestions, submitLogin } from '../redux/actions';
import getToken from '../helpers/getToken';
import { saveToken } from '../helpers/handleLocalStorage';
import getQuestions from '../helpers/getQuestions';

export default function Login() {
  const [name, setName] = useState('');
  const [gravatarEmail, setGravatarEmail] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.name === 'input-player-name') {
      setName(target.value);
    } else {
      setGravatarEmail(target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name,
      gravatarEmail,
    };
    dispatch(submitLogin(payload));
    const token = await getToken();
    saveToken(token);
    const code = await getQuestions(token);
    if (code.response_code === 0) {
      dispatch(saveQuestions(code));
      history.push('./game');
    } else {
      saveToken('');
      history.go(0);
    }
  };

  const navSettings = async () => {
    history.push('./settings');
  };

  return (
    <>
      <button onClick={ navSettings } data-testid="btn-settings" type="button">
        Configurações
      </button>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="input-player-name"
            data-testid="input-player-name"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="email"
            name="input-gravatar-email"
            data-testid="input-gravatar-email"
            value={ gravatarEmail }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !(name && gravatarEmail) }
        >
          Play
        </button>
      </form>
    </>
  );
}
