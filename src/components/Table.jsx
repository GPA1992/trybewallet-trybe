import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TH_ITEM } from '../Data/Index';
import './Table.css';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, removeCurrentExpense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              { TH_ITEM.map((tableHead, i) => (
                <th key={ i }>{ tableHead }</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ Number(exp.value).toFixed(2) }</td>
                <td>{ exp.currency }</td>
                <td>{`${exp.exchangeRates[exp.currency].name}`}</td>
                <td>
                  {
                    Number(exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
                  }
                </td>
                <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td key={ exp.id }>
                  <button type="button">Editar</button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => removeCurrentExpense(exp.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeCurrentExpense: (state) => dispatch(removeExpense(state)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
    value: PropTypes.string.isRequired,
  })).isRequired,
  removeCurrentExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
