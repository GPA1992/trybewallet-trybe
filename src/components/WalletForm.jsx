import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    allCategory: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    paymentMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  };

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { allCategory, paymentMethod } = this.state;
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <form action="">
          <label htmlFor="expenseValue">
            <p>Adicionar valor da despesa</p>
            <input
              data-testid="value-input"
              type="number"
            />
          </label>
          <br />
          <br />
          <label htmlFor="expenseDescribre">
            <p>Descrição da Despesa</p>
            <textarea
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (state) => dispatch(fetchCurrencies(state)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
