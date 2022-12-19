import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';

describe('testing the App', () => {

  //it('test if the Filters component is rendered', () => {
  //  render(<App />)
  //  const filtersPage = screen.getByTestId('filters-component');
  //  expect(filtersPage).toBeInTheDocument();
  //})

  test('verificar input de pesquisa', async () => {
    renderWithContext(<App />);
    const nameInput = screen.getByTestId("name-filter");
    userEvent.type(nameInput, 'Tatooine');
    const Tatu = await screen.findByText('Tatooine');
    expect(Tatu).toBeInTheDocument()
  })

})