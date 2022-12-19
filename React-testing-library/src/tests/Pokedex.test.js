import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('testa o component Pokedex', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokémon da lista com o botao sendo clicado', () => {
    renderWithRouter(<App />);
    const actualPokemon = screen.getByTestId(/pokemon-name/i);
    const buttonDom = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonDom).toBeInTheDocument();
    expect(actualPokemon).toHaveTextContent(/Pikachu/i);
    userEvent.click(buttonDom);
    expect(actualPokemon).not.toHaveTextContent(/Pikachu/i);
  });

  it('Testa se é mostrado apenas um pokémon por vez:', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId(/pokemon-name/i)).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    let todosPokemosn = pokemons.map((el) => el.type);
    todosPokemosn = [...new Set(todosPokemosn)];
    const elementosBotoes = screen.getAllByTestId(/pokemon-type-button/i);

    todosPokemosn.forEach((el, index) => {
      expect(elementosBotoes[index]).toHaveTextContent(el);
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const botaoReset = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(botaoReset);
  });
});
