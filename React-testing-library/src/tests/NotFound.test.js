import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o component NotFound', () => {
  test('Testa se a página contém titulo com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imagem = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    const srcImagem = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagem).toHaveAttribute('src', srcImagem);
  });
});
