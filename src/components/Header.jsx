import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    allExpense: 0,
    currentExchange: 'BRL',
  };

  render() {
    const { user } = this.props;
    const { allExpense, currentExchange } = this.state;
    return (
      <div>
        <h2 data-testid="email-field">{ `Usuario ${user.email}` }</h2>
        <p data-testid="total-field">{ `Despesa Total: ${allExpense}` }</p>
        <p data-testid="header-currency-field">{ currentExchange }</p>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
