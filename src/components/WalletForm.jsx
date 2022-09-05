import React, { Component } from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CATEGORY_EXP, PAYMENT_METHOD } from '../Data/Index';
import { fetchCurrenciesKeys, fetchCurrencies,
  getExpenses } from '../redux/actions';
import WalletEditForm from './EditForm';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
    const { value, description, method, currency, tag } = this.state;
    const { getCurrencies, getCurrentExpenses,
      expenses } = this.props;
    await getCurrencies();
    const { currencies } = this.props;
    const exchangeRates = currencies;
    const id = expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;
    const newValue = value;
    const currentExpense = {
      id,
      value: newValue,
      description,
      method,
      currency,
      tag,
      exchangeRates,
    };
    getCurrentExpenses(currentExpense);
  };

  render() {
    const { currenciesKey, inEditing } = this.props;
    return (
      <div>
        { inEditing ? (
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
                  { PAYMENT_METHOD.map((myMethod, index) => (
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
                  { CATEGORY_EXP.map((category, index) => (
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
        ) : (
          <WalletEditForm />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesKey: state.wallet.currencies,
  currencies: state.wallet.currenciesFull,
  expenses: state.wallet.expenses,
  inEditing: state.wallet.inEditing,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesKey: (state) => dispatch(fetchCurrenciesKeys(state)),
  getCurrencies: (state) => dispatch(fetchCurrencies(state)),
  getCurrentExpenses: (state) => dispatch(getExpenses(state)),
  getTotalValueExpense: (state) => dispatch(getCurrentExpenseValue(state)),
});

WalletForm.propTypes = {
  currenciesKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrenciesKey: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getCurrentExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
    value: PropTypes.string.isRequired,
  })).isRequired,
  currencies: PropTypes.shape({}).isRequired,
  inEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
