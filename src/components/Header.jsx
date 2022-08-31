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
    const { user, actualExpenseValue } = this.props;
    const { currentExchange } = this.state;
    return (
      <div>
        <div className="header-expenses">
          <h2 data-testid="email-field">{ `Usuario ${user.email}` }</h2>
          <div className="expense-value">
            <span
              data-testid="total-field"
            >
              {actualExpenseValue}
            </span>
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
  actualExpenseValue: state.wallet.totalExpenseValue,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  actualExpenseValue: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
