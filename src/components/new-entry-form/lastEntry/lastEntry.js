import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './lastEntry.css';
import { labelNames, convertDistance, convertVolume, convertDate, calculateMileage } from '../../../utilities';

export default class LastEntry extends Component {
  constructor() {
    super();

    this.renderLastEntry = this.renderLastEntry.bind(this);
  }

  renderLastEntry() {
    const lastEntry = this.props.entries[this.props.entries.length - 1];
    const currentUnits = this.props.currentUnits;
    const labels = labelNames(currentUnits);
    return (
      <div className="LastEntry">
      <h4>Last Entry</h4>
        <table>
          <tbody>
            <tr>
              <td>Date</td>
              <td>{convertDate(lastEntry.date)}</td>
            </tr>
            <tr>
              <td>{labels.distance}</td>
              <td>{convertDistance(lastEntry.km, currentUnits)}</td>
            </tr>
            <tr>
              <td>{labels.volume}</td>
              <td>{convertVolume(lastEntry.liters, currentUnits)}</td>
            </tr>
            <tr>
              <td>Towing</td>
              <td>{lastEntry.towing ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>{labels.mileage}</td>
              <td>{calculateMileage(lastEntry.liters, lastEntry.km, currentUnits)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    const hasEntries = this.props.entries.length > 0;
    return hasEntries && this.renderLastEntry()
  }

  static PropTypes = {
    entries: PropTypes.array.isRequired,
    currentUnits: PropTypes.string.isRequired
  }
}