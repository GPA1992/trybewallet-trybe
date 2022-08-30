import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesKeys, getExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      allCategory: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      paymentMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.handleClick();
  };

  handleClick = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { getCurrencies, getCurrentExpenses, expenses } = this.props;
    const exchangeRates = await getCurrencies();
    const id = expenses.length;
    const currentExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    getCurrentExpenses(currentExpense);
    console.log('fui chamado');
  };

  render() {
    const { allCategory, paymentMethod } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form action="">
          <label htmlFor="expenseValue">
            <p>Adicionar valor da despesa</p>
            <input
              onChange={ this.handleChange }
              name="value"
              data-testid="value-input"
              type="number"
            />
          </label>
          <br />
          <br />
          <label htmlFor="expenseDescribre">
            <p>Descrição da Despesa</p>
            <textarea
              onChange={ this.handleChange }
              name="description"
              data-testid="description-input"
              id="expenseDescribre"
              cols="30"
              rows="10"
            />
          </label>
          <br />
          <br />
          <label htmlFor="selectExchange">
            <p>
              Selecione qual moeda sera usada
            </p>
            <select
              onChange={ this.handleChange }
              name="currency"
              data-testid="currency-input"
              id="selectExchange"
            >
              { currencies.map((currency, index) => (
                <option
                  key={ index }
                  value={ currency }
                >
                  {currency}
                </option>))}
            </select>
          </label>
          <br />
          <br />
          <label htmlFor="method">
            <p>Método de pagamento</p>
            <select
              onChange={ this.handleChange }
              name="method"
              id="method"
              data-testid="method-input"
            >
              { paymentMethod.map((method, index) => (
                <option
                  key={ index }
                  value={ method }
                >
                  {method}
                </option>))}
            </select>
          </label>
          <br />
          <br />
          <label htmlFor="category">
            <p>Categoria da Despesa</p>
            <select
              onChange={ this.handleChange }
              name="tag"
              id="category"
              data-testid="tag-input"
            >
              { allCategory.map((category, index) => (
                <option
                  key={ index }
                  value={ category }
                >
                  {category}
                </option>))}
            </select>
          </label>
          <br />
          <br />
          <button onClick={ this.handleClick } type="submit">Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (state) => dispatch(fetchCurrenciesKeys(state)),
  getCurrentExpenses: (state) => dispatch(getExpenses(state)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getCurrentExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
