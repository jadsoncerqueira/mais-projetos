import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { About } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando o componente About', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const information = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(information).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstPara = screen.getByText(/This application simulate/i);
    expect(firstPara).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByRole('img');
    const atributoImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem).toHaveAttribute('src', atributoImg);
  });
});
