import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pastEntriesList.css';
import { calculateMileage, labelNames, convertDistance, convertVolume, convertDate } from '../../utilities';

export default class PastEntriesList extends Component {
  constructor() {
    super();

    this.renderEntries = this.renderEntries.bind(this);
  }
  
  renderEntries() {
    const entries = this.props.entries;
    const labels = labelNames(this.props.currentUnits);
    const currentUnits = this.props.currentUnits;
    let result = null;
    if (entries.length > 0) {
      result = (
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>{labels.distance}</th>
              <th>{labels.volume}</th>
              <th>Towing</th>
              <th>{labels.mileage}</th>
              <th></th>
            </tr>
            {entries.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{convertDate(entry.date)}</td>
                  <td>{convertDistance(entry.km, currentUnits)}</td>
                  <td>{convertVolume(entry.liters, currentUnits)}</td>
                  <td>{entry.towing ? 'Yes' : 'No'}</td>
                  <td>{calculateMileage(entry.liters, entry.km, currentUnits)}</td>
                  <td><button onClick={() => this.props.removeEntry(index)} className="delete" type="button">X</button></td>
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
    entries: PropTypes.array.isRequired,
    currentUnits: PropTypes.string.isRequired
  }
}