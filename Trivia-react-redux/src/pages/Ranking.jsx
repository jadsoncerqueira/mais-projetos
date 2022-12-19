import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Ranking() {
  const history = useHistory();

  const players1 = JSON.parse(localStorage.getItem('ranking'));

  return (
    <>
      <h1 data-testid="ranking-title">Tela de ranking</h1>
      <button
        data-testid="btn-go-home"
        value="inicio"
        type="button"
        onClick={ () => history.push('/') }
      >
        Inicio
      </button>
      <h1 data-testid="ranking-title">Tela de ranking</h1>
      {players1.map((elem, index) => (
        <div key={ index }>
          <img src={ `https://www.gravatar.com/avatar/${elem.picture}` } alt="avatar" />
          {' '}
          <span>
            <strong>Nome:</strong>
            <span data-testid={ `player-name-${index}` }>{elem.name}</span>
          </span>
          {' '}
          <span>
            <strong>Pontuação:</strong>
            <span data-testid={ `player-score-${index}` }>{elem.score}</span>
          </span>
        </div>))}

    </>
  );
}
