import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      currentExchange: 'BRL',
    };
  }

  render() {
    const { user, expenses } = this.props;
    const { currentExchange } = this.state;
    return (
      <div>
        <div className="header-expenses">
          <h2 data-testid="email-field">{ `Usuario ${user.email}` }</h2>
          <div className="expense-value">
            { expenses.length > 0 ? (
              <span
                data-testid="total-field"
              >
                { Number(expenses.reduce((acc, act) => acc + act.value * act
                  .exchangeRates[act.currency].ask, 0.00).toFixed(2)) }
              </span>
            ) : (<span data-testid="total-field">0.00</span>) }
            <span data-testid="header-currency-field">{ currentExchange }</span>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
