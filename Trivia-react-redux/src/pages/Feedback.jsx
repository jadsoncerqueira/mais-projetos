import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { resetPlayer } from '../redux/actions';

export default function Feedback() {
  const { assertions, name, score, gravatarEmail } = useSelector((state) => state.player);
  const history = useHistory();
  const dispatch = useDispatch();
  const THREE = 3;

  // atualiza ranking do local storage --------------------------

  const HASH = md5(gravatarEmail).toString();
  const novoJogador = {
    name,
    score,
    picture: HASH,
  };

  if (localStorage.getItem('ranking')) {
    const players = JSON.parse(localStorage.getItem('ranking'));

    const newPlayers = [...players, novoJogador];

    newPlayers.sort((a, b) => {
      const menosUm = -1;
      if (Number(a.score) > Number(b.score)) {
        return menosUm;
      }
      return 1;
    });

    localStorage.setItem('ranking', JSON.stringify(newPlayers));
    // dispatch(resetPlayer());
  } else {
    localStorage.setItem('ranking', JSON.stringify([novoJogador]));
    // dispatch(resetPlayer());
  }

  // ------------------------------------------------------------

  const handlePlayAgain = () => {
    dispatch(resetPlayer());
    history.push('/');
  };

  const handleRanking = () => {
    dispatch(resetPlayer());
    history.push('/ranking');
  };

  return (
    <>
      <Header />
      <h1>Tela de Feedback</h1>
      <p data-testid="feedback-text">
        { assertions < THREE ? 'Could be better...' : 'Well Done!' }
      </p>
      <p data-testid="feedback-total-score">{score}</p>
      <p data-testid="feedback-total-question">{assertions}</p>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ handlePlayAgain }
      >
        Jogar novamente
      </button>
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ handleRanking }
      >
        Ranking
      </button>
    </>
  );
}
