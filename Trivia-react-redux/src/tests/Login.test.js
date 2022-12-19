import { screen } from "@testing-library/react"
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import React from 'react'
import userEvent from "@testing-library/user-event";
import App from '../App'

describe('Testa a página de Login', () => {
  it('Testa se os inputs corretos são renderizados', () => {

    renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se o botão play inicialmente está desabilitado', () => {

    renderWithRouterAndRedux(<App />)

    const btnPlay = screen.getByTestId('btn-play');

    expect(btnPlay.disabled).toBeTruthy();
  });

  it('Testa se ao preeencher os dois inputs o botão play é habilitado', () => {

    renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    
    userEvent.type(nameInput, 'Batata Frita')
    userEvent.type(emailInput, 'batatinhafrita@email.com')
    expect(btnPlay.disabled).not.toBeTruthy();
  });

  it('Testa se ao clicar em "Play" o fetch é chamado', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({

      })
    })

    renderWithRouterAndRedux(<App />);
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    
    userEvent.type(nameInput, 'Batata Frita');
    userEvent.type(emailInput, 'batatinhafrita@email.com');
    
    const btnPlay = screen.queryByText('Play');
    
    userEvent.click(btnPlay);
    
    expect(fetch).toBeCalledTimes(1);
  });

  it('Testa se o botão settings é renderizado', () => {

    renderWithRouterAndRedux(<App />)

    const settings = screen.getByTestId('btn-settings');

    expect(settings).toBeInTheDocument();
  })

  it('Testa se ao clicar em settings é redirecionado para a página de configurações', () => {

    const { history } = renderWithRouterAndRedux(<App />)

    const settings = screen.getByTestId('btn-settings');

    userEvent.click(settings);

    expect(history.location.pathname).toBe('/settings');
  })
})