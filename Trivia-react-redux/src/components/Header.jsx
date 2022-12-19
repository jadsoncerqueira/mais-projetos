import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

export default function Header() {
  const { name, score, gravatarEmail } = useSelector((state) => state.player);

  const HASH = md5(gravatarEmail).toString();

  return (
    <section>
      <span data-testid="header-player-name">{name}</span>
      <span data-testid="header-score">{score}</span>
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${HASH}` }
        alt="gravatar pic"
      />
    </section>
  );
}
