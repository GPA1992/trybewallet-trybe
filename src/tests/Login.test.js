import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';

describe('Testes no componente Login', () => {
  it('Testa se na página inicial existe um label email e um campo para inserir o email', () => {
    renderWithRouterAndRedux(<App />);
    const labelEmail = screen.getByText(/email/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
  });
  it('Testa se na página inicial existe um label e um campo para inserir a senha', () => {
    renderWithRouterAndRedux(<App />);
    const labelPassword = screen.getByText(/senha/i);
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
  });
  it(`Testa se na página inicial existe um botão de logine quando ele é clicado,
   a pagina é redirecionada para a /carteira`, () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(loginButton).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', {
      name: 'email',
    });
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, 'a@a.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
