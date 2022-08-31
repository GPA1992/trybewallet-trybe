import React, { Component } from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesKeys, fetchCurrencies,
  getExpenses, getCurrentExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      allCategory: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      paymentMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
      totalExpenseValue: 0,
    };
  }

  async componentDidMount() {
    const { getCurrenciesKey } = this.props;
    await getCurrenciesKey();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { value, description, method, currency, tag, totalExpenseValue } = this.state;
    const { getCurrencies, getCurrentExpenses,
      expenses, getTotalValueExpense } = this.props;
    await getCurrencies();
    const { currencies } = this.props;
    const exchangeRates = currencies;
    const id = expenses.length;
    const currentExpense = {
      id,
      value,
      description,
      method,
      currency,
      tag,
      exchangeRates,
    };
    getCurrentExpenses(currentExpense);
    const currentCurrency = exchangeRates[currency];
    const { ask } = currentCurrency;
    const expenseValue = ask * value;
    const previousExpense = expenseValue + totalExpenseValue;
    const expenseFixed = Number(previousExpense.toFixed(2));
    getTotalValueExpense(expenseFixed);
    this.setState({ totalExpenseValue: previousExpense });
  };

  render() {
    const { allCategory, paymentMethod } = this.state;
    const { currenciesKey } = this.props;
    return (
      <div>
        <form className="wallet-form" action="">

          <div className="form-item">
            <label htmlFor="expenseValue">
              Adicionar valor da despesa
              <br />
              <input
                onChange={ this.handleChange }
                name="value"
                data-testid="value-input"
                type="number"
              />
            </label>
          </div>

          <div className="form-item">
            <label htmlFor="expenseDescribre">
              Descrição da Despesa
              <br />
              <textarea
                onChange={ this.handleChange }
                name="description"
                data-testid="description-input"
                id="expenseDescribre"
                cols="30"
                rows="1"
              />
            </label>
          </div>

          <div className="form-item">
            <label htmlFor="selectExchange">
              Selecione qual moeda sera usada
              <br />
              <select
                onChange={ this.handleChange }
                name="currency"
                data-testid="currency-input"
                id="selectExchange"
              >
                { currenciesKey.map((currency, index) => (
                  <option
                    key={ index }
                    value={ currency }
                  >
                    {currency}
                  </option>))}
              </select>
            </label>
          </div>

          <div className="form-item">
            <label htmlFor="method">
              Método de pagamento
              <br />
              <select
                onChange={ this.handleChange }
                name="method"
                id="method"
                data-testid="method-input"
              >
                { paymentMethod.map((myMethod, index) => (
                  <option
                    key={ index }
                    value={ myMethod }
                  >
                    {myMethod}
                  </option>))}
              </select>
            </label>
          </div>

          <div className="form-item">
            <label htmlFor="category">
              Categoria da Despesa
              <br />
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
          </div>
          <div className="form-item">
            <button
              onClick={ this.handleClick }
              type="reset"
            >
              Adicionar Despesa

            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesKey: state.wallet.currenciesKey,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesKey: (state) => dispatch(fetchCurrenciesKeys(state)),
  getCurrencies: (state) => dispatch(fetchCurrencies(state)),
  getCurrentExpenses: (state) => dispatch(getExpenses(state)),
  getTotalValueExpense: (state) => dispatch(getCurrentExpense(state)),
});

WalletForm.propTypes = {
  currenciesKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrenciesKey: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getCurrentExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
    value: PropTypes.string.isRequired,
  })).isRequired,
  getTotalValueExpense: PropTypes.func.isRequired,
  currencies: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
