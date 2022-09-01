import React, { Component } from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CATEGORY_EXP, PAYMENT_METHOD } from '../Data/Index';
import { fetchCurrenciesKeys, fetchCurrencies,
  getExpenses, startExpenseEdit, removeExpense } from '../redux/actions';

class WalletEditForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
      newTagOrder: [],
      newMethodOrder: [],
    };
  }

  async componentDidMount() {
    const { getCurrenciesKey, inEditingExpense } = this.props;
    const { id, value, description, currency,
      method, tag, exchangeRates } = inEditingExpense;
    const newTagOrder = CATEGORY_EXP.filter((category) => category !== tag);
    const newMethodOrder = PAYMENT_METHOD
      .filter((paymentMethod) => paymentMethod !== method);
    newTagOrder.unshift(tag);
    newMethodOrder.unshift(method);
    this.setState({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      newTagOrder,
      newMethodOrder,
    });
    await getCurrenciesKey();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { id, value, description, currency,
      method, tag, exchangeRates } = this.state;
    const { getCurrentExpenses, startEdit } = this.props;
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
    startEdit(true);
  };

  render() {
    const { currenciesKey } = this.props;
    const { newTagOrder, newMethodOrder } = this.state;
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
                { newMethodOrder.map((myMethod, index) => (
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
                { newTagOrder.map((category, index) => (
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
              Editar despesa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesKey: state.wallet.currencies,
  currencies: state.wallet.currenciesFull,
  expenses: state.wallet.expenses,
  inEditingExpense: state.wallet.inEditingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesKey: (state) => dispatch(fetchCurrenciesKeys(state)),
  getCurrencies: (state) => dispatch(fetchCurrencies(state)),
  getCurrentExpenses: (state) => dispatch(getExpenses(state)),
  getTotalValueExpense: (state) => dispatch(getCurrentExpenseValue(state)),
  startEdit: (state) => dispatch(startExpenseEdit(state)),
  removeCurrentExpense: (state) => dispatch(removeExpense(state)),
});

WalletEditForm.propTypes = {
  currenciesKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrenciesKey: PropTypes.func.isRequired,
  getCurrentExpenses: PropTypes.func.isRequired,
  inEditingExpense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.shape({}).isRequired,
  startEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletEditForm);
