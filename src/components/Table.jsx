import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>nome</th>
            <th>idade</th>
          </tr>
          <tr>
            <td>gabriel</td>
            <td>29</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
