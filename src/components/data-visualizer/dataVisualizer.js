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
    const normalEntries = allEntries.filter((entry) => !entry.towing);
    const towingEntries = allEntries.filter((entry) => entry.towing);

    const allDetails = {
      km: allEntries.reduce((total, entry) => total += parseInt(entry.km, 10), 0),
      liters: allEntries.reduce((total, entry) => total += parseInt(entry.liters, 10), 0),
      mpg: allEntries.reduce((total, entry) => {
        return total += parseFloat(this.calculateMPG(entry.liters, entry.km));
      }, 0) / allEntries.length
    }

    const normalDetails = {
      type: 'Normal',
      km: normalEntries.reduce((total, entry) => total += parseInt(entry.km, 10), 0),
      liters: normalEntries.reduce((total, entry) => total += parseInt(entry.liters, 10), 0),
      mpg: normalEntries.reduce((total, entry) => {
        return total += parseFloat(this.calculateMPG(entry.liters, entry.km));
      }, 0) / normalEntries.length
    }

    const towingDetails = {
      type: 'Towing',
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
            {normalEntries.length > 0 && buildRow(normalDetails)}
            {towingEntries.length > 0 && buildRow(towingDetails)}
          </tbody>
        </table>
      </div>
    )

    function buildRow(data) {
      return (
        <tr>
          <td>{data.type ? data.type : 'Combined'}</td>
          <td>{data.km}</td>
          <td>{data.liters}</td>
          <td>{data.mpg.toFixed(2)}</td>
        </tr>
      )
    }

  }

  render() {
    const hasEntries = this.props.entries.length > 0;
    return (
      <div className="DataVisualizer">
        {hasEntries && <h4>Totals & Average MPG</h4>}
        {hasEntries && this.renderAverages()}
      </div>
    )
  }

  static propTypes = {
    entries: PropTypes.array.isRequired
  }
}