import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Teste dos itens da pagina wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });
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
      'categoria da despesa','adicionar despesa' // 
      E também testa se após preencher todos os campos do form que é usado para adicionar
      uma nova despesa uma tabela é renderizada contendo todas as informações que foram 
      adicionadas no form`, async () => {
    renderWithRouterAndRedux(<Wallet />);
    // Campo adicionar valor
    const valueInput = screen.getByTestId('value-input');
    const textLabelValue = screen.getByText(/adicionar valor da despesa/i);
    expect(valueInput).toBeInTheDocument();
    expect(textLabelValue).toBeInTheDocument();
    userEvent.type(valueInput, '50');

    // Campo com a Descrição
    const descriptionInput = screen.getByTestId('description-input');
    const textLabelDescription = screen.getByText(/descrição da despesa/i);
    expect(descriptionInput).toBeInTheDocument();
    expect(textLabelDescription).toBeInTheDocument();
    userEvent.type(descriptionInput, 'coxinha');

    // Campo com a moeda usada
    const currencyInput = screen.getByRole('combobox', {
      name: /selecione qual moeda sera usada/i,
    });
    expect(currencyInput).toBeInTheDocument();
    await waitFor(() => {
      userEvent.selectOptions(currencyInput, within(currencyInput).getByRole('option', { name: /DOGE/i }));
    });

    // Campo com o metodo de pagamento
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });
    expect(methodInput).toBeInTheDocument();
    userEvent.selectOptions(methodInput, within(methodInput).getByRole('option', { name: /Cartão de débito/i }));

    // Campo com a categoria da despesa
    const tagInput = screen.getByRole('combobox', {
      name: /categoria da despesa/i,
    });
    expect(tagInput).toBeInTheDocument();
    userEvent.selectOptions(tagInput, within(tagInput).getByRole('option', { name: /Lazer/i }));

    // Botão para adicionar despesa
    const addNewExpenseButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addNewExpenseButton).toBeInTheDocument();
    userEvent.click(addNewExpenseButton);

    // Tabela com as despesas
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Descrição
    const coxinha = await screen.findByRole('cell', {
      name: /coxinha/i,
    });
    expect(coxinha).toBeInTheDocument();

    // Tag
    const lazer = await screen.findByRole('cell', {
      name: /lazer/i,
    });
    expect(lazer).toBeInTheDocument();

    // Metodo de Pagamento
    const cartaDeDebito = screen.getByRole('cell', {
      name: /cartão de débito/i,
    });
    expect(cartaDeDebito).toBeInTheDocument();

    // Valor
    const fifty = screen.getByRole('cell', {
      name: /50\.00/i,
    });
    expect(fifty).toBeInTheDocument();

    // Cambio
    const cambio = screen.getByRole('cell', {
      name: /dogecoin\/real brasileiro/i,
    });
    expect(cambio).toBeInTheDocument();

    // Editar
    const editButton = screen.getByTestId('edit-btn');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);

    const editDescription = screen.getByRole('textbox', {
      name: /descrição da despesa/i,
    });
    userEvent.type(editDescription, 'encapotado');

    // Editar no form
    const editForm = screen.getByTestId('edit-form');
    expect(editForm).toBeInTheDocument();
    userEvent.click(editForm);
    expect(editForm).not.toBeInTheDocument();

    // Confirma se a descrição foi atualizada
    const encapotado = await screen.findByRole('cell', {
      name: /encapotado/i,
    });
    expect(encapotado).toBeInTheDocument();

    // Excluir Despesa
    const deleteButton = screen.getByRole('button', {
      name: /excluir/i,
    });
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    expect(encapotado).not.toBeInTheDocument();
  });
});
