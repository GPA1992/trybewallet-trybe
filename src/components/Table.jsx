import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TH_ITEM } from '../Data/Index';
import './Table.css';

class Table extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { expenses } = this.props;
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
                <td>{ exp.value }</td>
                <td>{ exp.currency }</td>
                <td>{`${exp.exchangeRates[exp.currency].name}`}</td>
                <td>
                  {
                    Number(exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
                  }
                </td>
                <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  <button key={ exp.id } type="button">Editar/Excluir</button>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
