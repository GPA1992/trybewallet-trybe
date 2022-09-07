import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Teste dos itens da pagina wallet', () => {
  it(`Testa se o componente header é carregado e renderiza, o email do usuario
    o valor, o valor atualizado das desespesas e se a moeda é em BRL`, () => {
    renderWithRouterAndRedux(<Wallet />);

    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();

    const expensesTotalValue = screen.getByTestId('total-field');
    expect(expensesTotalValue).toBeInTheDocument();

    const BRL = screen.getByText(/brl/i);
    expect(BRL).toBeInTheDocument();
  });
  it(`Testa se o componente form é renderizado e se existe os campos:
      'Adicionar valor da despesa', 'Descrição da Despesa', 
      'selecione qual moeda sera usada', 'Método de pagamento',
      'categoria da despesa','adicionar despesa'`, () => {
    renderWithRouterAndRedux(<Wallet />);
    // Campo adicionar valor
    const totalValueInput = screen.getByTestId('value-input');
    const textLabelValue = screen.getByText(/adicionar valor da despesa/i);
    expect(totalValueInput).toBeInTheDocument();
    expect(textLabelValue).toBeInTheDocument();

    // Campo com a Descrição
    const descriptionInput = screen.getByTestId('description-input');
    const textLabelDescription = screen.getByText(/descrição da despesa/i);
    expect(descriptionInput).toBeInTheDocument();
    expect(textLabelDescription).toBeInTheDocument();

    // Campo com a moeda usada
    const currencyInput = screen.getByRole('combobox', {
      name: /selecione qual moeda sera usada/i,
    });
    expect(currencyInput).toBeInTheDocument();

    // Campo com o metodo de pagamento
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });
    expect(methodInput).toBeInTheDocument();

    // Campo com a categoria da despesa
    const categoryInput = screen.getByRole('combobox', {
      name: /categoria da despesa/i,
    });
    expect(categoryInput).toBeInTheDocument();

    // Botão para adicionar despesa
    const addNewExpenseButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addNewExpenseButton).toBeInTheDocument();
  });
});
