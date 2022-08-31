import React, { Component } from 'react';
import { TH_ITEM } from '../Data/Index';

class Table extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
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
        </table>
      </div>
    );
  }
}

export default Table;
