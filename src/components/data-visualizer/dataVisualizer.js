import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './dataVisualizer.css';

export default class DataVisualizer extends Component {
  constructor() {
    super();

    this.renderAverages = this.renderAverages.bind(this);
    this.calculateMPG = this.calculateMPG.bind(this);
  }

  calculateMPG(liters, km) {
    return liters / km * 100;
  }

  renderAverages() {
    const allEntries = this.props.entries;
    const towingEntries = allEntries.filter((entry) => entry.towing);

    const allDetails = {
      km: allEntries.reduce((total, entry) => total += parseInt(entry.km, 10), 0),
      liters: allEntries.reduce((total, entry) => total += parseInt(entry.liters, 10), 0),
      mpg: allEntries.reduce((total, entry) => {
        return total += parseFloat(this.calculateMPG(entry.liters, entry.km));
      }, 0) / allEntries.length
    }

    const towingDetails = {
      towing: true,
      km: towingEntries.reduce((total, entry) => total += parseInt(entry.km, 10), 0),
      liters: towingEntries.reduce((total, entry) => total += parseInt(entry.liters, 10), 0),
      mpg: towingEntries.reduce((total, entry) => {
        return total += this.calculateMPG(entry.liters, entry.km);
      }, 0) / towingEntries.length
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Total KM</th>
              <th>Total Liters</th>
              <th>Average MPG</th>
            </tr>
            {buildRow(allDetails)}
            {towingEntries.length > 0 ? buildRow(towingDetails) : false}
          </tbody>
        </table>
      </div>
    )

    function buildRow(data) {
      return (
        <tr>
          <td>{data.towing ? 'Towing': 'All'}</td>
          <td>{data.km}</td>
          <td>{data.liters}</td>
          <td>{data.mpg.toFixed(2)}</td>
        </tr>
      )
    }

  }

  render() {
    return (
      <div className="DataVisualizer">
        <h4>Totals & Average MPG</h4>
        {this.props.entries.length > 0 ? this.renderAverages() : ''}
      </div>
    )
  }

  static propTypes = {
    entries: PropTypes.array.isRequired
  }
}