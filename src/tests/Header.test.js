import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Header from '../components/Header';

describe('Testes no componente Header', () => {
  it('Testa se existe um titulo com o email do usuario', () => {
    renderWithRouterAndRedux(<Header />);
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
  });
  it('Testa se existe um span com o valor atualizado das despesas', () => {
    renderWithRouterAndRedux(<Header />);
    const expensesTotalValue = screen.getByTestId('total-field');
    expect(expensesTotalValue).toBeInTheDocument();
  });
  it('Testa se existe um campo de texto com a sigla BRL', () => {
    renderWithRouterAndRedux(<Header />);
    const BRL = screen.getByText(/brl/i);
    expect(BRL).toBeInTheDocument();
  });
});
