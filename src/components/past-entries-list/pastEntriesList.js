import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pastEntriesList.css';

export default class PastEntriesList extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);
    this.calculateMPG = this.calculateMPG.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidUpdate() {
    this.props.syncDatabase();
  }

  calculateMPG(liters, km) {
    return liters / km * 100;
  }

  convertDate(GMTDate) {
    const date = new Date(GMTDate);
    return date.toLocaleDateString();
  }
  
  renderEntries() {
    const entries = this.props.entries;
    let result = null;
    if (entries.length > 0) {
      result = (
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Liters</th>
              <th>KM</th>
              <th>Towing</th>
              <th>L/100KM</th>
              <th></th>
            </tr>
            {entries.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{this.convertDate(entry.date)}</td>
                  <td>{entry.liters}</td>
                  <td>{entry.km}</td>
                  <td>{entry.towing ? 'Yes' : 'No'}</td>
                  <td>{this.calculateMPG(entry.liters, entry.km).toFixed(2)}</td>
                  <td><button onClick={() => this.props.removeEntry(index)} key={index} className="delete" type="button">X</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      result = <div>No entries yet. Add one!</div>;
    }
      return result;
  }

  render() {
    return (
      <div className="PastEntriesList">
        <h4>Previous Entries</h4>
        {this.renderEntries()}
      </div>
    )
  }

  static propTypes = {
    removeEntry: PropTypes.func.isRequired,
    syncDatabase: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired
  }
}