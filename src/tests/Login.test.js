import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testes no componente Login', () => {
  it('Testa se na página inicial existe um label email e um campo para inserir o email', () => {
    renderWithRouterAndRedux(<Login />);
    const labelEmail = screen.getByText(/email/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
  });
  it('Testa se na página inicial existe um label e um campo para inserir a senha', () => {
    renderWithRouterAndRedux(<Login />);
    const labelPassword = screen.getByText(/senha/i);
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
  });
});
