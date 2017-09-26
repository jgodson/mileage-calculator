import React, { Component } from 'react';
import './pastEntriesList.css';

export default class PastEntriesList extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);
    this.calculateMPG = this.calculateMPG.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  calculateMPG(liters, km) {
    return (liters / km * 100).toFixed(2);
  }

  convertDate(GMTDate) {
    const date = new Date(GMTDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
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
            </tr>
            {entries.map((entry) => {
              return (
                <tr key={entry.date}>
                  <td>{this.convertDate(entry.date)}</td>
                  <td>{entry.liters}</td>
                  <td>{entry.km}</td>
                  <td>{entry.towing ? 'Yes' : 'No'}</td>
                  <td>{this.calculateMPG(entry.liters, entry.km)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      result = <div>No entries yet. Please add a new entry</div>;
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
}