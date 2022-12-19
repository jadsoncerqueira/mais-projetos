import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando component App', () => {
  test('Testa se a pagina contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(linkHome);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/fdgfgf');

    const notFoundHeader = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundHeader).toBeInTheDocument();
  });
});
