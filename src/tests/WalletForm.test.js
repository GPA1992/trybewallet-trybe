import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

describe('Testes no componente Form', () => {
  it(`Testa se existe um campo para inserir o valor da despesa com um label com o label
  'Adicionar valor da despesa'`, () => {
    renderWithRouterAndRedux(<WalletForm />);
    const totalValueInput = screen.getByTestId('value-input');
    const textLabel = screen.getByText(/adicionar valor da despesa/i);
    expect(totalValueInput).toBeInTheDocument();
    expect(textLabel).toBeInTheDocument();
  });
  it(`Testa se existe um campo para inserir a descrição da despesa com um label com o 
  label  'Descrição da Despesa'`, () => {
    renderWithRouterAndRedux(<WalletForm />);
    const descriptionInput = screen.getByTestId('description-input');
    const textLabel = screen.getByText(/descrição da despesa/i);
    expect(descriptionInput).toBeInTheDocument();
    expect(textLabel).toBeInTheDocument();
  });
  it(`Testa se existe um campo para inserir em qual moeda será a despesa com o  
  label  'selecione qual moeda sera usada'`, () => {
    renderWithRouterAndRedux(<WalletForm />);
    const currencyInput = screen.getByRole('combobox', {
      name: /selecione qual moeda sera usada/i,
    });
    expect(currencyInput).toBeInTheDocument();
  });
  it(`Testa se existe um campo para inserir qual sera o metodo de pagamento com o  
  label  'Método de pagamento'`, () => {
    renderWithRouterAndRedux(<WalletForm />);
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });
    expect(methodInput).toBeInTheDocument();
  });
  it('Testa se existe um botão com o texto "adicionar despesa"', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const addNewExpenseButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addNewExpenseButton).toBeInTheDocument();
  });
});
